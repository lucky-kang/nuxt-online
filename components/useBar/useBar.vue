<template>
    <div
        class="topbarUseofprotocolBAR"
        v-if="showpPrivacy"
    >
        {{
        $t("header.ByUsing1")
        }}
        <nuxt-link to="/footPage/Privacy">
            <span style="font-size: 14px;   text-decoration: underline;  cursor: pointer;color: white">
                {{
                $t("header.ByUsing2")
                }}
            </span>
        </nuxt-link>
        <div
            @click="closepbar()"
            class="closetopbaruserofprotocolBAR"
        >
            {{
            $t("header.ByUsingOk")
            }}
        </div>
    </div>
</template>

<script>
export default {
  name: "useBar",
  props: {},
  data() {
    return {
      showpPrivacy: false
    };
  },
  mounted() {
    // showpPrivacy
    let showprivacy = localStorage.getItem("showpPrivacy");
    if (showprivacy == "1") {
      this.showpPrivacy = false;
    } else {
      this.showpPrivacy = true;
    }
  },
  methods: {
    closepbar() {
      localStorage.setItem("showpPrivacy", "1");
      this.showpPrivacy = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.topbarUseofprotocolBAR {
  background: #2d2f43;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}

.closetopbaruserofprotocolBAR {
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  /* float: right; */
  line-height: 26.665px;
  /* line-height: 1.6666rem; */
  margin-left: 10px;
  padding: 6px 10px;
  white-space: nowrap;
  display: initial;
}
</style>
