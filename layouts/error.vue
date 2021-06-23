<template>
  <div class="notfoud-container">
    <img
      class="img-404"
      :src="require('assets/images/404.png')"
      alt="404"
    >
    <p class="notfound-p PangMenZhengDaoCuShuTi">Page not found</p>
    <nuxt-link
      class="goHome"
      to="/"
    >Home</nuxt-link>
    <!-- <div class="notfound-reason">
			<p class="PangMenZhengDaoCuShuTi">
				{{ error.statusCode }}-{{ error.message }}
			</p>
		</div> -->
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style lang="scss" scoped>
.Cartoon {
  font-family: "Cartoon";
}

.PangMenZhengDaoCuShuTi {
  font-family: "PangMenZhengDaoCuShuTi";
}
.goHome {
  display: block;
  width: 200px;
  height: 48px;
  background: #172d55;
  color: #fff;
  margin: 0 auto;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
}
a {
  text-decoration: none;
}
.notfoud-container {
  width: 750px;
  margin: 0 auto;
}
.notfoud-container .img-404 {
  display: block;
  width: 70%;
  height: auto;
  margin: 80px auto 40px;
}

.notfoud-container .notfound-p {
  line-height: 1.2;
  padding-bottom: 60px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  color: #999999;
  font-size: 36px;
}

.notfoud-container .notfound-reason {
  color: #9ca4ac;
  font-size: 28px;
  line-height: 1.4;
  text-align: left;
}

.notfoud-container .notfound-reason p {
  margin-top: 26px;
  text-align: center;
}

.notfoud-container .notfound-reason ul li {
  margin-top: 20px;
  margin-left: 72px;
  font-size: 26px;
}
</style>
