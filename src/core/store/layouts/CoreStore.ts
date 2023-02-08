import router from '@/core/router';
import { useFullscreen, useWindowSize, useDark, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, nextTick, reactive, ref, watch, WritableComputedRef } from 'vue';
import TabsStore from './TabsStore';

interface IState {
    // 菜单收展状态
    isMobile: boolean
    // 全屏
    isFullscreen: boolean
    // 鉴定是否移动设备分界值
    demarcation: number
}

export default defineStore("CoreStore", () => {

    const tabsStore = TabsStore();

    let state = reactive<IState>({
        //菜单收展状态
        isMobile: false,
        //全屏
        isFullscreen: false,
        // 鉴定是否移动设备分界值
        demarcation: 768
    });

    //窗口宽高变化
    const { width, height } = useWindowSize();
    state.isMobile = width.value < state.demarcation;
    watch(() => width.value, (value) => {
        state.isMobile = value < state.demarcation;
    });

    //全屏
    const { isFullscreen, enter, exit, toggle } = useFullscreen();
    watch(() => isFullscreen.value, (value) => {
        state.isFullscreen = value;
    });
    const toggleFullscreen = () => toggle();

    const isDark = useDark();
    /**
     * 黑白主题切换
     */
    const toggleDark = useToggle(isDark);

    /**
     * 刷新
     * 
     * @param {*} fullPath 
     * @param {*} componentName 
     */
    function refresh(fullPath: string, componentName: string) {
        console.log(fullPath, componentName);
        tabsStore.delCacheView(componentName, () => {
            nextTick(() => {
                router.push("/redirect" + fullPath);
            });
        })
    }

    return {
        state,
        //是否暗黑
        isDark,
        toggleFullscreen,
        //暗黑切换
        toggleDark,
        refresh
    }

});