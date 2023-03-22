<template>
    <!-- 通用搜索 -->
    <transition name="el-zoom-in-bottom" mode="out-in">
        <ComSearch v-show="props.buttons.includes('comSearch') && baTable.table.showComSearch" />
    </transition>

    <!-- 操作按钮组 -->
    <div v-bind="$attrs" class="table-header ba-scroll-style">
        <el-tooltip v-if="props.buttons.includes('refresh')" :content="'刷新'" placement="top">
            <el-button v-blur @click="onAction('refresh', { loading: true })" color="#40485b" class="table-header-operate" type="info">
                <Icon name="fa fa-refresh" />
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="props.buttons.includes('add') && auth('add')" :content="'添加'" placement="top">
            <el-button v-blur @click="onAction('add')" class="table-header-operate" type="primary">
                <Icon name="fa fa-plus" />
                <span class="table-header-operate-text">添加</span>
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="props.buttons.includes('edit') && auth('edit')" :content="'编辑选中行'" placement="top">
            <el-button v-blur @click="onAction('edit')" :disabled="!enableBatchOpt" class="table-header-operate" type="primary">
                <Icon name="fa fa-pencil" />
                <span class="table-header-operate-text">编辑</span>
            </el-button>
        </el-tooltip>
        <el-popconfirm
            v-if="props.buttons.includes('delete') && auth('del')"
            @confirm="onAction('delete')"
            :confirm-button-text="'删除'"
            :cancel-button-text="'取消'"
            confirmButtonType="danger"
            :title="'确定删除选中记录？'"
            :disabled="!enableBatchOpt"
        >
            <template #reference>
                <div class="mlr-12">
                    <el-tooltip :content="'删除选中行'" placement="top">
                        <el-button v-blur :disabled="!enableBatchOpt" class="table-header-operate" type="danger">
                            <Icon name="fa fa-trash" />
                            <span class="table-header-operate-text">删除</span>
                        </el-button>
                    </el-tooltip>
                </div>
            </template>
        </el-popconfirm>
        <el-tooltip v-if="props.buttons.includes('unfold')" :content="(baTable.table.expandAll ? '收缩' : '展开') + '所有子菜单'" placement="top">
            <el-button
                v-blur
                @click="baTable.onTableHeaderAction('unfold', { unfold: !baTable.table.expandAll })"
                class="table-header-operate"
                :type="baTable.table.expandAll ? 'danger' : 'warning'"
            >
                <span class="table-header-operate-text">{{ baTable.table.expandAll ? '收缩所有' : '展开所有' }}</span>
            </el-button>
        </el-tooltip>

        <!-- slot -->
        <slot></slot>

        <!-- 右侧搜索框和工具按钮 -->
        <div class="table-search">
            <el-input
                v-if="props.buttons.includes('quickSearch')"
                v-model="state.quickSearch"
                class="xs-hidden quick-search"
                @input="debounce(onSearchInput, 500)()"
                :placeholder="quickSearchPlaceholder ? quickSearchPlaceholder : '搜索'"
            />
            <div class="table-search-button-group" v-if="props.buttons.includes('columnDisplay') || props.buttons.includes('comSearch')">
                <el-dropdown v-if="props.buttons.includes('columnDisplay')" :max-height="380" :hide-on-click="false">
                    <el-button
                        class="table-search-button-item"
                        :class="props.buttons.includes('comSearch') ? 'right-border' : ''"
                        color="#dcdfe6"
                        plain
                    >
                        <Icon size="14" name="el-icon-Grid" />
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item, idx) in columnDisplay" :key="idx">
                                <el-checkbox
                                    v-if="item.prop"
                                    @change="onChangeShowColumn($event, item.prop!)"
                                    :checked="!item.show"
                                    :model-value="item.show"
                                    size="small"
                                    :label="item.label"
                                />
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-tooltip
                    v-if="props.buttons.includes('comSearch')"
                    :disabled="baTable.table.showComSearch"
                    :content="'展开通用搜索'"
                    placement="top"
                >
                    <el-button
                        class="table-search-button-item"
                        @click="baTable.table.showComSearch = !baTable.table.showComSearch"
                        color="#dcdfe6"
                        plain
                    >
                        <Icon size="14" name="el-icon-Search" />
                    </el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, inject } from 'vue'
import { debounce, auth } from '/@/utils/common'
import type baTableClass from '/@/utils/baTable'
import ComSearch from '/@/components/table/comSearch/index.vue'

const baTable = inject('baTable') as baTableClass

interface Props {
    buttons: HeaderOptButton[]
    quickSearchPlaceholder?: string
}
const props = withDefaults(defineProps<Props>(), {
    buttons: () => {
        return ['refresh', 'add', 'edit', 'delete']
    },
    quickSearchPlaceholder: '',
})

const state = reactive({
    quickSearch: '',
})

const columnDisplay = computed(() => {
    let columnDisplayArr = []
    for (let item of baTable.table.column) {
        item.type === 'selection' || item.render === 'buttons' || item.enableColumnDisplayControl === false ? '' : columnDisplayArr.push(item)
    }
    return columnDisplayArr
})

const enableBatchOpt = computed(() => (baTable.table.selection!.length > 0 ? true : false))

const onAction = (event: string, data: anyObj = {}) => {
    baTable.onTableHeaderAction(event, data)
}

const onSearchInput = () => {
    baTable.onTableHeaderAction('quick-search', { keyword: state.quickSearch })
}

const onChangeShowColumn = (value: string | number | boolean, field: string) => {
    baTable.onTableHeaderAction('change-show-column', { field: field, value: value })
}
</script>

<style scoped lang="scss">
.table-header {
    position: relative;
    overflow-y: scroll;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    background-color: var(--ba-bg-color-overlay);
    border: 1px solid var(--ba-border-color);
    border-bottom: none;
    padding: 13px 15px;
    font-size: 14px;
    .table-header-operate-text {
        margin-left: 6px;
    }
}

.mlr-12 {
    margin-left: 12px;
}
.mlr-12 + .el-button {
    margin-left: 12px;
}
.table-search {
    display: flex;
    margin-left: auto;
    .quick-search {
        width: auto;
    }
}
.table-search-button-group {
    display: flex;
    margin-left: 12px;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    button:focus,
    button:active {
        background-color: var(--ba-bg-color-overlay);
    }
    button:hover {
        background-color: var(--el-color-info-light-7);
    }
    .table-search-button-item {
        border: none;
        border-radius: 0;
    }
    .el-button + .el-button {
        margin: 0;
    }
    .right-border {
        border-right: 1px solid var(--el-border-color);
    }
}

html.dark {
    .table-search-button-group {
        button:focus,
        button:active {
            background-color: var(--el-color-info-dark-2);
        }
        button:hover {
            background-color: var(--el-color-info-light-7);
        }
        button {
            background-color: #898a8d;
            el-icon {
                color: white !important;
            }
        }
    }
}
</style>
