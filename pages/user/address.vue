<template>
	<div>
		<div class="account-container">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">{{$t("common.HOME")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{$t("PersonalCenter.PersonalCenter")}}</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="coat">
				<el-row :gutter="20">
					<el-col :lg="4" :sm="4" :xs="4">
						<order-left></order-left>
					</el-col>
					<el-col :lg="20" :sm="20" :xs="20" style="border-left: 1px solid #DDDDDD;">
						<address-right></address-right>
					</el-col>
				</el-row>
			</div>
		</div>
		<f-footer></f-footer>
	</div>
</template>

<script>
	//   import {MH_API} from '@/api';
	import fFooter from "@/components/footer/f-footer";
	import orderLeft from "@/components/user/orderLeft";
	import addressRight from "@/components/user/addressRight";
	export default {
		name: "address",
		components: {
			fFooter,
			orderLeft,
			addressRight
		},
		data() {
			return {};
		},
		created() {},
		mounted(){
			this.buryingPoint.pageView();
		},
		methods: {}
	};
</script>

<style lang="scss" scoped>
.account-container{
	margin: 150px auto 0;
	width: 1200px;
	/deep/ .el-breadcrumb{
		/deep/ .el-breadcrumb__item:first-child{
			/deep/ span:first-child{
				color: #3B65B3!important;
			}
		}
	}
}
.el-breadcrumb{
	margin: 50px 0;
}
	.coat {
		margin-top: 24px;
	}
</style>
