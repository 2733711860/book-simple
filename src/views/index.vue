<template>
	<div class="all-page">
		<van-nav-bar :title="$route.meta.title" fixed placeholder>
		  <template #right>
		    <van-icon name="search" size="18" @click="goSearch" />
				<span class="cancel" v-if="showSelect" @click="longPress">取消</span>
				<i class="iconfont iconlayout" @click="longPress" v-else></i>
		  </template>
		</van-nav-bar>
		
		<div class="sheet-content">
			<book-card 
				v-for="(item, index) in bookList" 
				:key="index" 
				:bookObj="item"
				:showSelect="showSelect"
				 v-long-press="longPress"
				@click="goRead(item, index)"
			></book-card>
		</div>
		
		<div class="button-div" v-if="showSelect">
			<van-checkbox v-model="checkAll" checked-color="#c03131" @click="checkall">全选</van-checkbox>
			<van-button round size="small" @click="deleteBookFunc">删除</van-button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import bookCard from '@/components/book-card.vue';
import bookMixin from '@/minxin/book.js';
import { Dialog } from 'vant';
export default {
	mixins: [bookMixin],
	
	data() {
		return {
			showSelect: false,
			checkAll: false,
		}
	},
	
	components: {
		bookCard
	},
	
	computed: {
		...mapGetters(['bookList'])
	},
	
	watch: {
		bookList() {
			let res = this.bookList.find(item => item.isSelect == false);
			this.checkAll = !res;
		}
	},
	
	methods: {
		goRead(bookObj, index) {
			if (this.showSelect) {
				let czBook = JSON.parse(JSON.stringify(this.bookList[index]));
				Object.assign(czBook, {
					isSelect: this.bookList[index].isSelect ? false : true
				})
				this.setBook(czBook);
			} else {
				this.$router.push({
					path: '/read',
					query: {
						bookId: bookObj.bookId,
						source: bookObj.source
					}
				})
			}
		},
		
		checkall() { // 全选反选
			let cacheBooks = JSON.parse(JSON.stringify(this.bookList));
			if (this.checkAll) { // 全选
				cacheBooks.forEach(item => {
					let oneBook = Object.assign(item, {
						isSelect: true
					});
					this.setBook(oneBook);
				})
			} else { // 全不选
				cacheBooks.forEach(item => {
					let oneBook = Object.assign(item, {
						isSelect: false
					});
					this.setBook(oneBook);
				})
			}
		},
		
		longPress() { // 长按
			this.showSelect = !this.showSelect;
			if (!this.showSelect) {
				let cacheBooks = JSON.parse(JSON.stringify(this.bookList));
				cacheBooks.forEach(item => {
					let oneBook = Object.assign(item, {
						isSelect: false
					});
					this.setBook(oneBook);
				})
			}
		},
		
		deleteBookFunc() { // 删除
			Dialog.confirm({
			  title: '提示',
			  message: '确认删除？',
			}).then(() => {
				let deleteBookList = this.bookList.filter(item => item.isSelect);
				this.cancelBook(deleteBookList);
			}).catch(() => {});
		},
		
		goSearch() {
			this.$router.push({
				path: "/search"
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.all-page{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.sheet-content{
			flex: 1;
			overflow-y: auto;
		}
		.cancel{
			font-size: 13px;
			margin-left: 10px;
		}
		.iconlayout{
			color: #c03131;
			margin-left: 10px;
		}
		.button-div{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			font-size: 13px;
		}
	}
</style>
