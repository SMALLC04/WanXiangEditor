<template>
  <!--新功能的前端扩展在这里进,在a-menu-item下添加新的item。-->
  <div class="menu">
    <a-menu mode="vertical" :default-selected-keys="['Explorer']" @menu-item-click="changeComponent">
      <a-menu-item key="Explorer"><icon-home :size="25" /></a-menu-item>
      <a-menu-item key="Search"><icon-find-replace :size="25" /></a-menu-item>
      <!-- <a-menu-item key="Editor"><icon-file-pdf :size="25"/></a-menu-item> -->
      <a-menu-item key="PDFLoader"><icon-file-pdf :size="25" /></a-menu-item>
      <!-- <a-menu-item key="notepad">Notepad</a-menu-item> -->
    </a-menu>
  </div>
</template>

<script>
export default {
  methods: {
    //当前组件识别到SideMenuItem点击的动作，执行Input组件名操作，发送Item的key值
    changeComponent(key) {
      //console.log(key);
      this.$emit('componentChange', key);
    },
  }
}
</script>

<style scoped>
.menu {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>