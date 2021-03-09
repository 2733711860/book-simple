<template>
	<div :class="['tool-page-top', showTool ? 'show' : '']">
		<div class="top-left">
			<van-icon name="arrow-left" @click="goBack" />
			<span>{{this.currentBook.bookName}}</span>
		</div>
		<van-icon name="bookmark-o" @click="addMark()" />
	</div>
</template>

<script>
import { Toast } from 'vant'
import bookMixin from '@/minxin/book.js';
export default {
	mixins: [ bookMixin ],
	
	data () {
		return {
			showTool: this.value
		}
	},
	
	props: {
		value: false
	},
	
	watch: {
		showTool () {
			this.$emit('input', this.showTool)
		},
		value () {
			this.showTool = this.value
		}
	},
	
	methods: {
		goBack () {
			history.go(-1)
		},
		
		addMark () {
			Toast('敬请期待！')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-top{
		position: absolute;
		height: 40px;
		width: 100%;
		color: #FFFFFF;
		top: 0;
		background-color: rgba(50, 51, 52, 0.9);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		transform: translateY(-40px);
		transition: transform 0.5s;
		overflow: hidden;
		.top-left{
			flex: 1;
			display: flex;
			align-items: center;
			overflow: hidden;
			span{
				margin-left: 5px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-size: 14px;
			}
		}
	}
	.tool-page-top.show{
		transform: translateY(0);
	}
</style>
