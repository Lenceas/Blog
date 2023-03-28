<template>
    <div>
        <div @contextmenu.stop="" id="bubble" class="bubble">
            <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
        </div>
        <div class="login">
            <div class="login-box">
                <div class="head">
                    <img src="~assets/login-header.png" alt="" />
                </div>
                <div class="form">
                    <img class="profile-avatar" src="~assets/avatar.jpg" alt="" />
                    <div class="content">
                        <el-form
                            @keyup.enter="onSubmit(formRef)"
                            ref="formRef"
                            :rules="rules"
                            size="large"
                            :model="form"
                            :hide-required-asterisk="true"
                            :status-icon="true"
                        >
                            <el-form-item prop="username">
                                <el-input ref="usernameRef" type="text" clearable v-model="form.username" :placeholder="'请输入账号'">
                                    <template #prefix>
                                        <Icon name="fa fa-user" class="form-item-icon" size="16" color="var(--el-input-icon-color)" />
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input ref="passwordRef" v-model="form.password" type="password" :placeholder="'请输入密码'" show-password>
                                    <template #prefix>
                                        <Icon name="fa fa-unlock-alt" class="form-item-icon" size="16" color="var(--el-input-icon-color)" />
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item v-if="state.showCaptcha" prop="captcha">
                                <el-row class="w100" :gutter="15">
                                    <el-col :span="16">
                                        <el-input
                                            ref="captchaRef"
                                            type="text"
                                            :placeholder="'请输入验证码'"
                                            v-model="form.captcha"
                                            clearable
                                            autocomplete="off"
                                        >
                                            <template #prefix>
                                                <Icon name="fa fa-ellipsis-h" class="form-item-icon" size="16" color="var(--el-input-icon-color)" />
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <img @click="onChangeCaptcha" class="captcha-img" :src="state.captchaUrl" alt="" />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- <el-checkbox v-model="form.keep" :label="'保持会话'" size="default"></el-checkbox> -->
                            <el-form-item>
                                <el-button :loading="form.loading" class="submit-button" round type="primary" size="large" @click="onSubmit(formRef)">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, nextTick } from 'vue'
import * as pageBubble from '/@/utils/pageBubble'
import type { ElForm, ElInput } from 'element-plus'
import { ElMessage, ElNotification } from 'element-plus'
import { useConfig } from '/@/stores/config'
import { useAdminInfo } from '/@/stores/adminInfo'
import { uuid } from '/@/utils/random'
import { buildValidatorData } from '/@/utils/validate'
import { getAPI, feature, decryptJWT } from '/@/utils/axios'
import { DefaultApi } from '/@/api-services'
import router from '/@/router'
var timer: NodeJS.Timer

const config = useConfig()
const adminInfo = useAdminInfo()

const state = reactive({
    showCaptcha: false,
    captchaId: uuid(),
    captchaUrl: '',
})

const onChangeCaptcha = () => {
    form.captcha = ''
    state.captchaId = uuid()
    form.captcha_id = state.captchaId
    onGetCaptchaUrl()
}

const formRef = ref<InstanceType<typeof ElForm>>()
const usernameRef = ref<InstanceType<typeof ElInput>>()
const passwordRef = ref<InstanceType<typeof ElInput>>()
const captchaRef = ref<InstanceType<typeof ElInput>>()
const form = reactive({
    username: '',
    password: '',
    captcha: '',
    keep: false,
    loading: false,
    captcha_id: '',
})

// 表单验证规则
const rules = reactive({
    username: [buildValidatorData({ name: 'required', message: '请输入账号' }), buildValidatorData({ name: 'account' })],
    password: [buildValidatorData({ name: 'required', message: '请输入密码' }), buildValidatorData({ name: 'password' })],
    captcha: [buildValidatorData({ name: 'required', message: '请输入验证码' }), buildValidatorData({ name: 'captcha' })],
})

const focusInput = () => {
    if (form.username === '') {
        usernameRef.value!.focus()
    } else if (form.password === '') {
        passwordRef.value!.focus()
    } else if (form.captcha === '') {
        captchaRef.value!.focus()
    }
}

onMounted(async () => {
    timer = setTimeout(() => {
        pageBubble.init()
    }, 1000)

    // Api请求：是否启用登录验证码
    const [err, res] = await feature(getAPI(DefaultApi).apiV1BaseAuthLoginShowCaptcha10Get())
    if (err) {
        // console.log(err)
    } else {
        state.showCaptcha = !!res.data
        onGetCaptchaUrl()
        nextTick(() => {
            focusInput()
        })
    }
})

onBeforeUnmount(() => {
    clearTimeout(timer)
    pageBubble.removeListeners()
})

const onGetCaptchaUrl = async () => {
    // Api请求：获取登录图片验证码
    const [err, res] = await feature(getAPI(DefaultApi).apiV1BaseAuthLoginVerifyCode10IdGet(state.captchaId))
    if (err) {
        // console.log(err)
    } else {
        // console.log(res)
        state.captchaUrl = res.data as string
    }
}

const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            form.loading = true
            form.captcha_id = state.captchaId
            const [err, res] = await feature(
                getAPI(DefaultApi).apiV1BaseAuthLogin10Post({
                    id: form.captcha_id,
                    userName: form.username,
                    passWord: form.password,
                    captcha: state.showCaptcha ? form.captcha : '',
                })
            )
            if (err) {
                onChangeCaptcha()
                form.loading = false
            } else {
                form.loading = false
                console.log(res)
                var data = res.data!
                console.log('res.data.data! : ' + data)
                if (res.data) {
                    // console.log(data.token)
                    // adminInfo.dataFill(res.data.userInfo)
                    // const token = res.data.data?.token as string
                    // console.log('token:' + token)
                    // const tokenInfo = decryptJWT(token)
                    // console.log(tokenInfo)
                    // ElNotification.success('登录成功！')
                    // ElNotification({
                    //     message: res.data.msg ?? '',
                    //     type: 'success',
                    // })
                    // router.push({ path: '/' })
                }
            }
        } else {
            onChangeCaptcha()
            return false
        }
    })
}
</script>

<style scoped lang="scss">
.bubble {
    overflow: hidden;
    background: url(/@/assets/bg.jpg) repeat;
}
.form-item-icon {
    height: auto;
}
.login {
    position: absolute;
    top: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    .login-box {
        overflow: hidden;
        width: 430px;
        padding: 0;
        background: var(--ba-bg-color-overlay);
        margin-bottom: 80px;
    }
    .head {
        background: #ccccff;
        img {
            display: block;
            width: 430px;
            margin: 0 auto;
            user-select: none;
        }
    }
    .form {
        position: relative;
        .profile-avatar {
            display: block;
            position: absolute;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: 4px solid var(--ba-bg-color-overlay);
            top: -50px;
            right: calc(50% - 50px);
            z-index: 2;
            user-select: none;
        }
        .content {
            padding: 100px 40px 40px 40px;
        }
        .submit-button {
            width: 100%;
            letter-spacing: 2px;
            font-weight: 300;
            margin-top: 15px;
            --el-button-bg-color: var(--el-color-primary);
        }
    }
}

@media screen and (max-width: 720px) {
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        .login-box {
            width: 340px;
            margin-top: 0;
        }
    }
}
.content :deep(.el-input__prefix) {
    display: flex;
    align-items: center;
}
.captcha-img {
    width: 100%;
}

// 暗黑样式
@at-root .dark {
    .bubble {
        background: url(/@/assets/bg-dark.jpg) repeat;
    }
    .login {
        .login-box {
            background: #161b22;
        }
        .head {
            img {
                filter: brightness(61%);
            }
        }
        .form {
            .submit-button {
                --el-button-bg-color: var(--el-color-primary-light-5);
                --el-button-border-color: rgba(240, 252, 241, 0.1);
            }
        }
    }
    .captcha-img {
        filter: brightness(61%);
    }
}
@media screen and (max-height: 800px) {
    .login .login-box {
        margin-bottom: 0;
    }
}
</style>
