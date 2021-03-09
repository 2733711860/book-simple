<template>
	<div class="book-card" @click="goRead">
		<img :src="bookObj.bookImg" />
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
		img{
			width: 50px;
		}
		.card-right{
			flex: 1;
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
