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
                        <el-form @keyup.enter="onSubmit(formRef)" ref="formRef" :rules="rules" size="large" :model="form">
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
                                        <img
                                            @click="onChangeCaptcha"
                                            class="captcha-img"
                                            :src="buildCaptchaUrl() + '&id=' + state.captchaId"
                                            alt=""
                                        />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-checkbox v-model="form.keep" :label="'保持会话'" size="default"></el-checkbox>
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
import { ElNotification } from 'element-plus'
import { useConfig } from '/@/stores/config'
import { useAdminInfo } from '/@/stores/adminInfo'
import { uuid } from '/@/utils/random'
import { buildValidatorData } from '/@/utils/validate'
import { getAPI, feature } from '/@/utils/axios'
import { AuthApi } from '/@/api-services'
import router from '/@/router'
var timer: NodeJS.Timer

const config = useConfig()
const adminInfo = useAdminInfo()

const state = reactive({
    showCaptcha: false,
    captchaId: uuid(),
})

const onChangeCaptcha = () => {
    form.captcha = ''
    state.captchaId = uuid()
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
    captcha: [
        buildValidatorData({ name: 'required', title: '验证码' }),
        {
            min: 4,
            max: 4,
            message: '请输入4位长度的验证码',
            trigger: 'blur',
        },
    ],
})

const buildCaptchaUrl = () => {}

const focusInput = () => {
    if (form.username === '') {
        usernameRef.value!.focus()
    } else if (form.password === '') {
        passwordRef.value!.focus()
    } else if (form.captcha === '') {
        captchaRef.value!.focus()
    }
}

onMounted(() => {
    timer = setTimeout(() => {
        pageBubble.init()
    }, 1000)
    state.showCaptcha = true
    onChangeCaptcha()
    nextTick(() => {
        focusInput()
    })
})

onBeforeUnmount(() => {
    clearTimeout(timer)
    pageBubble.removeListeners()
})

const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            form.loading = true
            form.captcha_id = state.captchaId
            const [err, res] = await feature(getAPI(AuthApi).apiV1AuthLoginPost({ userName: form.username, password: form.password }))
            if (err) {
                console.log(err)
                onChangeCaptcha()
                form.loading = false
            } else {
                form.loading = false
                // adminInfo.dataFill(res.data.userInfo)
                ElNotification({
                    message: res.data.msg ?? '',
                    type: 'success',
                })
                router.push({ path: '/' })
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
