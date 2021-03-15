<template>
	<div class="book-card" @click="goRead">
		<i class="iconfont iconwancheng" :style="{color: (bookObj.isSelect ? '#ff0000' : '#a1a1a1')}" v-if="showSelect"></i>
		<img :src="bookObj.bookImg" :onerror="defaultImg" />
		<div class="card-right">
			<div class="book-name">{{bookObj.bookName}}</div>
			<div class="new-chapter">
				<span>{{newTime}}</span>
				<span class="new">{{newChapter}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default{
	data() {
		return {
			defaultImg: 'this.src="'+ require('@/assets/img/1.jpg') +'"' // 图片加载错误时的默认图片
		}
	},
	
	computed: {
		newTime() {
			return moment(this.bookObj.updatedTime).format('YYYY-MM-DD');
		},
		newChapter() {
			let chapters = this.bookObj.chapters;
			let lastChapter = chapters[chapters.length-1];
			return lastChapter ? lastChapter.title : '';
		}
	},
	
	props: {
		bookObj: {
			type: [Object, String],
			default: () => {}
		},
		showSelect: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		goRead() {
			this.$emit('click')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.book-card{
		display: flex;
		padding: 10px 15px;
		.iconwancheng{
			margin-right: 15px;
			margin: auto 15px auto 0;
		}
		img{
			width: 50px;
		}
		.card-right{
			flex: 1;
			height: auto;
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			overflow: hidden;
			.new-chapter{
				font-weight: normal;
				font-size: 12px;
				color: #646464;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.new{
					margin-left: 5px;
				}
			}
		}
	}
</style>
