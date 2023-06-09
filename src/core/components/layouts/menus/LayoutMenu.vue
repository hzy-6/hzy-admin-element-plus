<script lang="ts" setup>
import LayoutMenuSubVue from "./LayoutMenuSub.vue";
import CoreStore from "@/core/store/layouts/CoreStore";
import MenuStore, { EMenuMode } from "@/core/store/layouts/MenuStore";
import AppStore from "@/core/store/AppStore";
import { MenuItemClicked } from "element-plus";
import router from "@/core/router";
import AppIcon from "@/core/components/AppIcon.vue";
import { computed } from "vue";
import Tools from "@/core/utils/Tools";
import ThemeStore from "@/core/store/layouts/ThemeStore";
//
const coreStore = CoreStore();
const menuStore = MenuStore();
const appStore = AppStore();
const themeStore = ThemeStore();
// 当前路由地址
const currentRoutePath = computed(() => router.currentRoute.value.fullPath);

const textColor = computed(() => {
  if (themeStore.state.menuThemeIndex > 0) {
    return themeStore.menuThemes[themeStore.state.menuThemeIndex]?.textColor;
  }
  return themeStore.state.textColor ?? themeStore.menuThemes[themeStore.state.menuThemeIndex]?.textColor;
});
const activeTextColor = computed(() => themeStore.menuThemes[themeStore.state.menuThemeIndex]?.activeTextColor);
const backgroundColor = computed(() => themeStore.menuThemes[themeStore.state.menuThemeIndex]?.backgroundColor);

const menuTree = computed(() => {
  return Tools.genTreeData(appStore.state.userInfo.menus, null);
});

/**
 * 菜单选中
 */
function onSelectedMenuItem(index: string, indexPath: string[], item: MenuItemClicked) {
  console.log(index, indexPath, item);
  if (index.indexOf("http://") > -1 || index.indexOf("https://") > -1) {
    router.push("/external/jump/" + index);
  } else {
    router.push(index);
  }
}
</script>

<template>
  <el-menu
    :default-active="currentRoutePath"
    :collapse-transition="false"
    :collapse="menuStore.state.isCollapse && !coreStore.state.isMobile"
    :active-text-color="activeTextColor"
    :background-color="backgroundColor"
    :text-color="textColor"
    @select="(index: string, indexPath: string[], item: MenuItemClicked)=>onSelectedMenuItem(index,indexPath,item)"
  >
    <!-- 动态生成 topnav-->
    <template v-if="menuStore.state.menuMode != EMenuMode.default">
      <template v-for="item in appStore.state.subMenus">
        <el-menu-item
          v-if="!item.children || (item.children?.filter((w:any) => w.show).length == 0 && item.type == 2)"
          :index="item.jumpUrl ? item.jumpUrl : item.id + ''"
          :title="item.name"
          :key="item.id"
        >
          <i class="el-icon">
            <AppIcon :name="item.icon" v-if="item.icon" class="el-icon" />
          </i>
          <span style="font-weight: 400" class="el-menu-title">{{ item.name }}</span>
        </el-menu-item>
        <LayoutMenuSubVue v-else :menu-info="item" />
      </template>
    </template>
    <template v-else>
      <template v-for="item in menuTree">
        <el-menu-item
          v-if="!item.children || (item.children?.filter((w:any) => w.show).length == 0 && item.type == 2)"
          :index="item.jumpUrl ? item.jumpUrl : item.id + ''"
          :title="item.name"
          :key="item.id"
        >
          <i class="el-icon">
            <AppIcon :name="item.icon" v-if="item.icon" class="el-icon" />
          </i>
          <span style="font-weight: 400" class="el-menu-title">{{ item.name }}</span>
        </el-menu-item>
        <LayoutMenuSubVue v-else :menu-info="item" />
      </template>
    </template>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu {
  border-right: 0 !important;
}
.hzy-layou-menu {
  .hzy-layou-menu-title {
    padding: 20px 15px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
}

.el-aside {
  overflow-x: hidden;
  height: calc(100vh);
}

.hzy-layout-menu-dark {
  box-shadow: var(--el-box-shadow-dark);
}
.hzy-layout-menu-light {
  box-shadow: var(--el-box-shadow-light);
}
</style>
<style lang="less">
.hzy-layou-menu {
  .el-menu-item.is-active {
    background: v-bind("themeStore.menuThemes[themeStore.state.menuThemeIndex]?.activeBgColor");
    // color: #fff;
  }

  .el-menu--collapse > .el-menu-item > span,
  .el-menu--collapse > .el-sub-menu > .el-sub-menu__title > span {
    height: auto;
    width: auto;
    overflow: hidden;
    visibility: visible;
    display: inline-block;
  }

  .el-menu--collapse > .el-menu-item > .el-menu-title,
  .el-menu--collapse > .el-sub-menu > .el-sub-menu__title > .el-menu-title {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
}
</style>
