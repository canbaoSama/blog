<template>
  <div :id="`valine-wrap-${uuid}`" class="valine-module"></div>
</template>

<script>
export default {
  name: "Valine",
  data() {
    return {
      uuid: new Date().getTime() + Math.round(Math.random() * 10000),
    };
  },
  mounted: function () {
    // require window
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      this.window = window;
      window.AV = require("leancloud-storage");
    }

    new Valine({
      el: `#valine-wrap-${this.uuid}`,
      appId: "rl9uH6xgSWAMIyWlRT9GnO6L-gzGzoHsz", // your appId
      appKey: "w0vBAGeaB8EJL3AOV94DrSSm", // your appKey
      notify: false,
      verify: false,
      avatar: "monsterid",
      placeholder: "",
      visitor: true,
      recordIP: true,
      meta: ["nick", "mail"],
      path: window.location.pathname,
      placeholder: "欢迎留言与我分享您的想法...",
    });
  },
};
</script>
<style lang="scss">
.valine-module {
  margin: 50px 0;
  .vcopy.txt-right {
    display: none;
  }
}
</style>
