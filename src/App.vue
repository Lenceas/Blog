<template>
    <el-config-provider>
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import iconfontInit from '/@/utils/iconfont'
import { useRoute } from 'vue-router'
import { setTitleFromRoute } from '/@/utils/common'
// modules import mark, Please do not remove.

const route = useRoute()

onMounted(() => {
    iconfontInit()

    // Modules onMounted mark, Please do not remove.
})

// 监听路由变化时更新浏览器标题
watch(
    () => route.path,
    () => {
        setTitleFromRoute()
    }
)
</script>
