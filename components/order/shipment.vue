<template>
	<div class="editCoat">
		<div class="editCont">
			<div class="addressHead">
				<p>
					{{ $t("orderDetail.Trackinginformation") }}
				</p>
				<span class="el-icon-close" @click="closeEdit()"></span>
			</div>

			<div style="padding: 10px">
				<el-timeline :reverse="reverse">
					<el-timeline-item
						v-for="(activity, index) in activities"
						:key="index"
						:timestamp="activity.timestamp"
					>
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "shiPment",
		props: {
			editShow: {
				type: Boolean,
				value: false
			},
			dataInfo: {
				type: Object,
				default: undefined
			}
		},
		data() {
			return {
				reverse: true,
				activities: []
			};
		},
		mounted() {
			// You have not made any changes 您没有做任何改动
			let thif = this;
			this.dataInfo["details"].forEach(function(item) {
				thif.activities.push({
					content: item["message"] + " \n" + item["location"],
					timestamp: item["date"]
				});
			});
		},
		methods: {
			closeEdit() {
				this.$emit("editClose");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.editCoat {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}
	.editCont {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 50%;
		transform: translateY(-50%);
		font-size: 12px;
		background-color: #fff;
		width: 640px;
	}
	.addressHead {
		height: 36px;
		padding: 6px 22px 3px;
		display: flex;
		background-color: $bjColor;
		font-size: 14px;
		line-height: 27px;
		.el-icon-close {
			color: #fff;
			font-size: 18px;
			position: absolute;
			top: 10px;
			right: 10px;
		}
		p {
			font-weight: bold;
			color: #fff;
			span {
				font-size: 16px;
				color: #fff;
			}
		}
	}
	.sddressBody {
		padding: 24px;
	}
	.listCoat {
		margin-bottom: 12px;
		display: flex;
		.tilText {
			width: 20%;
			color: $fontColor1;
			line-height: 30px;
			em {
				color: #b20000;
			}
		}
		.iptCoat {
			width: 80%;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
			input {
				line-height: 18px;
				width: 100%;
				border: 1px solid $borderColor;
				padding: 5px 10px;
				border-radius: 3px;
				font-size: 12px;
				color: $fontColor1;
			}
			.ipt {
				width: 100%;
				p {
					color: #b20000;
					margin-top: 3px;
				}
			}
			.sort {
				width: 47%;
			}
		}
		.selCoat {
			position: relative;
			cursor: pointer;
			div {
				width: 100%;
			}
			input {
				cursor: pointer;
			}
			.el-icon-d-caret {
				position: absolute;
				right: 6px;
				top: 0;
				line-height: 26px;
			}
			.sel {
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				background-color: #fff;
				border: 1px solid $borderColor;
				padding: 6px 0;
				max-height: 200px;
				overflow-y: scroll;
				z-index: 999;
				box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
				p {
					line-height: 20px;
					padding: 0 12px;
					color: $fontColor1;
				}
				p:hover {
					background-color: $bjColor;
					color: #fff;
				}
			}
		}
	}
	.btnCoat {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
		div {
			width: 80%;
			button {
				width: 47%;
				font-size: 16px;
				background-color: $bjColor;
				font-weight: bold;
				color: #fff;
				letter-spacing: 1px;
				height: 36px;
				border-radius: 5px;
			}
		}
	}
</style>
