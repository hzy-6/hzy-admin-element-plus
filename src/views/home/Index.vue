<script lang="ts">
// 组件命名
export default { name: "HomeIndexCom" };
</script>
<!-- 逻辑代码 -->
<script lang="ts" setup>
import WorkOrder from "./components/WorkOrder.vue";
import WorkOrderStatistics from "./components/WorkOrderStatistics.vue";
import HomeChart1 from "./components/HomeChart1.vue";
import HomeChart2 from "./components/HomeChart2.vue";
import HomeChart3 from "./components/HomeChart3.vue";
import image1 from "@/assets/images/下楼做核酸.png";
import image2 from "@/assets/images/核酸检测.png";
import image3 from "@/assets/images/抗疫必胜.png";
import AppConsts from "@/utils/AppConsts";
import PageContainer from "@/core/components/PageContainer.vue";

var now = new Date();
</script>

<template>
  <PageContainer :show="false">
    <!-- 基础统计数据 -->
    <div><WorkOrder /></div>
    <!-- 近一年设备销售量 -->
    <div>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="mb-16">
          <WorkOrderStatistics />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <div class="mb-16">
            <a href="https://gitee.com/hzy6/HzyAdmin/stargazers"><img src="https://gitee.com/hzy6/HzyAdmin/badge/star.svg?theme=dark" alt="star" /></a>
          </div>
          <img src="https://gitee.com/hzy6/HzyAdmin/widgets/widget_card.svg?colors=eae9d7,2e2f29,272822,484a45,eae9d7,747571" style="width: 100%; height: 320px" />
        </el-col>
      </el-row>
    </div>

    <!-- 更多图形报表 -->
    <div>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <HomeChart1 />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <HomeChart2 />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <HomeChart3 />
        </el-col>
      </el-row>
    </div>

    <!-- 更多图形报表 -->
    <div>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <el-card shadow="never">
            <el-image :src="image1" fit="cover" />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <el-card shadow="never">
            <el-image :src="image2" fit="cover" />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-16">
          <el-card shadow="never">
            <el-image :src="image3" fit="cover" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 页脚 -->
    <el-footer class="text-center p-16"> {{ AppConsts.appTitle }} ©{{ now.getFullYear() }} author by hzy </el-footer>
  </PageContainer>
</template>

<style lang="less"></style>
