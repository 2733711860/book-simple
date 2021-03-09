<template>
	<div class="detail-page">
		<div class="page-content" @scroll="onScrollChange($event)">
			<reader-header-two :navBarStyle="navBarStyle" :title="title"></reader-header-two>
			
			<div class="detail-top">
				<img :src="bookDetail.bookImg" />
				<div class="detail-top-content">
					<div class="book-title">{{bookDetail ? bookDetail.bookName : ''}}</div>
					<div class="book-author">{{bookDetail ? bookDetail.bookAuthor : ''}}</div>
					<div class="book-type">{{bookDetail ? bookDetail.bookType : ''}}</div>
					<div class="book-type">{{bookDetail ? bookDetail.isSerial : ''}}</div>
				</div>
			</div>
			
			<div class="like-div">
				<div class="module-top">
					<div class="module-top-left">
						<span></span>
						<div>故事简介</div>
					</div>
					<div class="module-top-right" @click="showAll = !showAll">
						<van-icon :name="showAll ? 'arrow-up' : 'arrow-down'" />
					</div>
				</div>
				<div class="detail-brief">
					<div :class="{'moreClass' : !showAll}">{{bookDetail ? bookDetail.bookDesc : ''}}</div>
				</div>
			</div>
			
			<div class="like-div">
				<div class="module-top">
					<div class="module-top-left">
						<span></span>
						<div>热门书评</div>
					</div>
					<div class="module-top-right">
						<van-icon name="edit" />
						<span>写书评</span>
					</div>
				</div>
				
				<div class="book-comment">
					<reader-comment></reader-comment>
					<reader-comment></reader-comment>
					<reader-comment></reader-comment>
					<reader-comment></reader-comment>
					<div class="book-comment-btn">全部书评22条</div>
				</div>
			</div>
		</div>
		
		<div class="detail-bottm">
			<div class="btn-one" @click="shelfFunc()">{{!isOnShelf ? '放入书架' : '移除书架'}}</div>
			<div class="btn-two" @click="goTxt()">开始阅读</div>
		</div>
	</div>
</template>

<script>
import readerHeaderTwo from '@/components/reader-header-two.vue'
import readerComment from '@/components/reader-comment.vue'
import { getBookDetail, getBookChapter } from '@/api'
import { Notify } from 'vant';
import bookMixin from '@/minxin/book.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
const ANCHOR_SCROLL_TOP = 160
export default {
	mixins: [bookMixin],
	
	components: {
		readerHeaderTwo, readerComment
	},
	
	data () {
		return {
			navBarStyle: { // 顶部样式
				backgroundColor: '',
				position: 'fixed',
				color: '#ffffff'
			},
			scrollTopValue: -1, // 滚动距顶部的距离
			title: '书籍信息',
			showAll: false, // 简介是否显示全部
			bookDetail: '', // 书籍详情
		}
	},
	
	computed: {
		...mapGetters([ 'bookList' ]),
		
		isOnShelf() { // 是否放入书架
			let nowBook = this.bookList.find(item => item.bookId == this.$route.query.bookId);
			if (nowBook) {
				this.setNowBook({
					isOnShelf: nowBook ? true : false
				});
			}
			return nowBook ? true : false;
		}
	},
	
	mounted() {
		this.getDetail();
	},
	
	methods: {
		getDetail() { // 获取书籍详情
			getBookDetail({
				bookId: this.$route.query.bookId
			}).then(res => {
				if (res.status == 200) {
					this.bookDetail = res.data;
					this.setNowBook(this.bookDetail);
				} else {
					Notify(res.msg);
				}
			}).catch((err) => {
				Notify('网络异常，请稍后再试1');
			})
		},
		
		onScrollChange ($event) { // 监听页面滚动
			this.scrollTopValue = $event.target.scrollTop
			let opacity = this.scrollTopValue / ANCHOR_SCROLL_TOP
			if (opacity <= 1) 
				this.navBarStyle.backgroundColor = "rgba(255, 255, 255, " + opacity + ")",
				this.navBarStyle.color = "#ffffff",
				this.title = '书籍信息';
			else 
				this.navBarStyle.backgroundColor = "rgba(255, 255, 255, 1)",
				this.navBarStyle.color = "#000",
				this.title = this.bookDetail.bookName;
		},
		
		shelfFunc () { // 加入书架、移除书架
			Object.assign(this.bookDetail, {
				isOnShelf: !this.isOnShelf
			})
			this.setBook(this.bookDetail, !this.isOnShelf);
			this.setNowBook({
				isOnShelf: this.isOnShelf
			});
			this.getChapter(this.$route.query.bookId);
		},
		
		goTxt() { // 开始阅读
			if (this.currentBook && !this.currentBook.chapters) { // 没有章节信息
				this.getChapter(this.$route.query.bookId, () => {
					this.$router.push({
						path: '/read',
						query: {
							bookId: this.$route.query.bookId
						}
					})
				});
			} else {
				this.$router.push({
					path: '/read',
					query: {
						bookId: this.$route.query.bookId
					}
				})
			}
		},
		
		getChapter(bookId, callback) { // 获取书籍章节
			getBookChapter({
				bookId
			}).then(res => {
				if (res.status == 200) {
					if (this.currentBook.isOnShelf) { // 本书已在书架，则保存章节列表（更新书架）
						this.setBook({
							bookId,
							currentIndex: 0,
							chapters: res.data
						}, true);
					}
					this.setNowBook({
						bookId,
						currentIndex: 0,
						chapters: res.data
					});
					if (callback) {
						callback();
					}
				} else {
					Notify(res.msg);
				}
			}).catch(e => {
				Notify('网络异常，请稍后再试');
			})
		}
	},
	
	beforeRouteLeave (to, from, next) {
		if (!this.currentBook.isOnShelf && to.name != 'read') { // 还没有加入书架，则离开页面时删除缓存书籍
			this.setNowBook('delete');
			next()
		} else {
			next()
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.detail-page{
		height: 100%;
		display: flex;
		flex-direction: column;
		.page-content{
			flex: 1;
			overflow: scroll;
		}
		.detail-bottm{
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid #EFEDEF;
			background-color: #FFFFFF;
			div{
				height: 30px;
				line-height: 30px;
				width: 150px;
				text-align: center;
				border-radius: 30px;
				font-size: 14px;
			}
			.btn-one{
				color: #F48E4E;
				background-color: #FFDEC6;
			}
			.btn-two{
				color: #FFEAE1;
				background-color: #F24747;
			}
		}
	}
	.detail-top{
		width: 100%;
		background: url(../assets/img/14.jpg) no-repeat;
		background-size: 100% 100%;
		display: flex;
		padding: 50px 15px 10px;
		color: #FFFFFF;
		img{
			width: 100px;
			height: 120px;
			margin-right: 20px;
			border-radius: 5px;
		}
		.detail-top-content{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.book-title{
				font-weight: bold;
			}
			.book-author{
				font-size: 14px;
				margin-top: 15px;
				line-height: 20px;
			}
			.book-type{
				font-size: 14px;
				line-height: 20px;
				margin-top: 5px;
			}
		}
	}
	.detail-brief{
		font-size: 12px;
		line-height: 18px;
		text-indent: 28px;
		padding: 10px 15px;
		position: relative;
		background-color: #FFFFFF;
	}
	.moreClass{
		word-break: break-all;
		display: -webkit-box; /**对象作为伸缩盒子模型展示**/
		-webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
		-webkit-line-clamp: 3; /**显示的行数**/
		overflow: hidden; /**隐藏超出的内容**/
	}
	
	.like-div{
		margin-top: 10px;
		background-color: #FFFFFF;
		.module-top{
			height: 40px;
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #EFEDEF;
			.module-top-left, .module-top-right{
				display: flex;
				align-items: center;
			}
			.module-top-left{
				span{
					display: inline-block;
					width: 4px;
					height: 14px;
					margin-right: 5px;
					border-radius: 1px;
					background-color: #1989fa;
				}
				div{
					font-weight: 550;
				}
			}
			.module-top-right{
				color: #1989fa;
				font-size: 12px;
			}
		}
		
		.book-comment{
			.book-comment-btn{
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				text-align: center;
				color: #1989fa;
			}
		}
	}
</style>
