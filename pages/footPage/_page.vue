<template>
	<div>
		<div class="f-container">
			<div class="module" v-html="modules"></div>
		</div>
		<f-footer></f-footer>
	</div>
</template>

<script>
	import fFooter from "@/components/footer/f-footer";
	import htmlModule from "@/utils/htmlModule";
	import htmlModule_ from "@/utils/htmlModule_";

	export default {
		name: "FQAs",
		components: {
			fFooter
		},
		asyncData({ params, store, app: { $apis } }) {
			let modules = ""
			// let  flag = store.getters.getCountry == 'United Kingdom (UK)';
			switch (params.page) {
				case "FAQs":
					// modules = flag ? htmlModule.FAQs : htmlModule_.FAQs;
					modules = htmlModule.FAQs;
					break;
				case "Delivery":
					// modules = flag ? htmlModule.Delivery : htmlModule_.Delivery;
					modules = htmlModule.Delivery;
					break;
				case "Arrange":
					modules = htmlModule.Arrange;
					break;
				case "About":
					modules = htmlModule.About;
					break;
				case "Term":
					modules = htmlModule.Term;
					break;
				case "Privacy":
					modules = htmlModule.Privacy;
					break;
				case "BrandName":
					modules = htmlModule.BrandName;
					break;
				default:
					break;
			}
			return {
				modules: modules
			};
		},
		mounted(){
			this.buryingPoint.pageView();
		}
	};
</script>

<style lang="scss" scoped>
	.module {
		padding: 30px 0;
		overflow: hidden;
    line-height: 0;
    width: 530px;
    margin: auto;
	}
	.module {
    font-size: 14px;
		/deep/ p,/deep/ span {
			line-height: 2em;
			font-size: 14px;
			width: 100% !important;
		}
		/deep/ ul li,
		/deep/ ol li {
			list-style: disc;
			line-height: 26px;
			font-size: 14px;
			span,
			p {
				font-size: 14px;
			}
		}
		/deep/ figure ol li {
			list-style: none;
			margin-left: 0.2em !important;
		}
		/deep/ a span,/deep/ a {
			color: blue !important;
		}
	}
  /deep/ b span{
    font-weight: 900 !important;
  }
//   .f-container {
//     margin-top: 158px;
//   }
</style>
