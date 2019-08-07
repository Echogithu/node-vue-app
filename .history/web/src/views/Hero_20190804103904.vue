<template>
  <div class="page-hero">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center" >
      <img src="../assets/logo.jpg" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button  type="button" class="btn bg-primary">立即下载</button>
    </div>
    <router-link to="/" tag="div">更多英雄 &gt;</router-link>
  </div>
</template>


<script>
export default {
  props:{
    id:{required:true}
  }
}
</script>