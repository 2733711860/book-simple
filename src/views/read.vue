<template>
	<div class="read-page" 
		:style="{fontSize: setting.fontSize + 'px', 
			backgroundColor: setting.dayNight == 'day' ? setting.backgroundColor : '#000',
			color: setting.dayNight == 'day' ? '#535353' : '#c1c1c1',
			filter: 'brightness(' + setting.brightness + ')'}"
	>
		<div ref="wrapper" class="content-page" @click="setRead($event)">
			<!-- 整页 -->
			<div class="book-contents" ref="content" v-if="pagingPattern===0">
			  <h1 class="book-title" :style="{fontSize: (setting.fontSize + 4) + 'px'}">{{bookContent.title}}</h1>
			  <div class="book-inner" :style="{lineHeight: setting.lineHeight + 'px'}" v-html="bookContent.content"></div>
				<div class="book-button">
					<div @click="prevChapter" :style="{fontSize: (setting.fontSize + 1) + 'px'}">上一章</div>
					<div @click="nextChapter" :style="{fontSize: (setting.fontSize + 1) + 'px'}">下一章</div>
				</div>
			</div>
			
			<!-- 平滑 -->
			<v-touch 
				v-on:panleft="panleft($event)" 
				v-on:panright="panright($event)" 
				v-on:panend="panend($event)"
				class="read-content" 
				v-if="pagingPattern==1 || pagingPattern==2 || pagingPattern==3 || pagingPattern==4"
			>
				<p class="book-title1" style="padding: 15px 20px;">{{bookContent.title}}</p>
				<div class="read-article" style="padding: 0 20px;">
				  <section class="read-section" :style="styleObject">
				    <div class="read-section-inner" :style="{columns: clWidth-40+'px', columnGap: 20+'px'}" ref="bookInner" id="bookInner">
				      <h1 class="book-title" :style="{fontSize: (setting.fontSize + 4) + 'px'}">{{bookContent.title}}</h1>
				      <div class="book-inner" :style="{lineHeight: setting.lineHeight + 'px'}" v-html="bookContent.content"></div>
				    </div>
				  </section>
				</div>
				<p class="article-page">{{currentPaging + '/' + resultPaging}}</p>
			</v-touch>
		</div>
		
		<book-chapter v-model="showMenu" @getThisContent="getThisContent"></book-chapter>
		<reader-tool-page-top v-model="showTool"></reader-tool-page-top>
		<reader-tool-page-bottom
			v-model="showTool"
			:resultPaging="resultPaging"
			:currentPaging="currentPaging"
			@prevChapter="prevChapter"
			@nextChapter="nextChapter"
			@openSetting="openSetting"
			@openDownload="openDownload"
			@openMenu="openMenu"></reader-tool-page-bottom>
		<reader-setting v-model="showSetting"></reader-setting>
		<readerDownload v-model="showDownload"></readerDownload>
	</div>
</template>

<script>
import bookMixin from '@/minxin/book.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import bookChapter from '@/components/book-chapter.vue';
import readerToolPageTop from '@/components/reader-tool-page-top.vue';
import readerToolPageBottom from '@/components/reader-tool-page-bottom.vue';
import readerSetting from '@/components/reader-setting.vue';
import readerDownload from '@/components/reader-download.vue'
import { _nromalBook } from '@/utils/bookUtil.js';
import { getBookContent } from '@/api';
import { Toast, Notify } from 'vant';
export default {
	mixins: [ bookMixin ],
	
	components: {
		bookChapter, readerToolPageTop, readerToolPageBottom, readerSetting, readerDownload
	},
	
	data () {
		return {
			bookContent: {
			  title: '',
			  content: ''
			},
			styleObject: '',
			clWidth: document.documentElement.clientWidth || document.body.clientWidth,
			clHeight: document.documentElement.clientHeight || document.body.clientHeight,
			currentPaging: 1, // 当前页
			resultPaging: 1, // 总页数
			currentIndex: -1, // 当前章节index
			isPrevChapter: false, // 是否上一章
			showTool: false, // 是否显示工具栏
			showMenu: false, // 是否显示目录
			showSetting: false, // 是否显示设置页
			showDownload: false, // 是否显示下载页面
		}
	},
	
	computed: {
		...mapGetters([ 'setting' ]),
		
		pagingPattern () { // 翻页模式 0:整页   1:平滑   2:点滑   3:无   4:仿真
			return this.setting.turnPageMode
		}
	},
	
	mounted() {
		this.currentIndex = this.currentBook.currentIndex;
	},
	
	watch: {
		currentPaging() {
			let nowBoook = JSON.parse(JSON.stringify(this.currentBook));
			Object.assign(nowBoook, {
				currentPage: this.currentPaging
			})
			this.setBook(nowBoook);
		},
		
		currentIndex() { // 章节发生变化就获取章节正文
			this.bookContent = {
				title: '',
				content: ''
			};
			let thisChapter = this.currentBook.chapters[this.currentIndex];
			if (thisChapter.content) { // 当前章节已缓存
				this.bookContent = _nromalBook(thisChapter.title, thisChapter.content);
			} else { // 当前章节未缓存
				let currentChapterId = this.currentBook.chapters[this.currentIndex].chapterId;
				this.getChapterContent(this.$route.query.bookId, currentChapterId, this.currentBook.source)
			}
			let nowBoook = JSON.parse(JSON.stringify(this.currentBook))
			Object.assign(nowBoook, {
				currentIndex: this.currentIndex
			})
			this.setBook(nowBoook);
		},
		
		bookContent () {
			this.$refs.wrapper.scrollTop = 0
			if (this.pagingPattern == 1 || this.pagingPattern == 2 || this.pagingPattern == 3 || this.pagingPattern==4) {
				this.$nextTick(function () {
				  let scrollW = this.$refs.bookInner.scrollWidth
				  let clientW = this.$refs.bookInner.clientWidth
				  this.resultPaging = Math.floor(scrollW / clientW)
					if (this.isPrevChapter) { // 上一章，默认最后一页
						this.isPrevChapter = false
						this.currentPaging = this.resultPaging;
						this.setTransForm((-(this.currentPaging - 1) * (this.clWidth - 20)), '0');
					} else {
						this.currentPaging = 1
						this.setTransForm('0', '0');
					}
				})
			}
		},
	},
	
	methods: {
		getChapterContent(bookId, chapterId, source) { // 获取章节正文
			getBookContent({
				bookId,
				chapterId,
				searchType: source == '笔趣阁' ? '0' : '1'
			}).then(res => {
				if (res.status == 200) {
					let nowBook = JSON.parse(JSON.stringify(this.currentBook));
					nowBook.chapters[this.currentIndex].content = res.data.cpContent;
					this.setBook(nowBook); // 更新缓存列表
					this.bookContent = _nromalBook(res.data.title, res.data.cpContent);
				} else {
					Notify(res.msg);
				}
			}).catch(e => {
				Notify('网络异常，请稍后再试');
			})
		},
		
		getThisContent (index) { // 从目录点击章节
			this.currentIndex = index
		},
		
		prevChapter() { // 上一章
			if (this.currentIndex == 0) { // 第一章
				Toast('第一章')
			} else {
				this.currentIndex--;
				if (this.pagingPattern == 1 || this.pagingPattern == 2 || this.pagingPattern == 3 || this.pagingPattern == 4) {
					let thisChapter = this.currentBook.chapters[this.currentIndex];
					if (thisChapter.content) { // 当前章节已缓存
						this.isPrevChapter = true;
					}
				}
			}
		},
		
		nextChapter() { // 下一章
			if (this.currentIndex == this.currentBook.chapters.length -1) { // 最后一章
				Toast('最后一章')
			} else {
				this.currentIndex++
			}
		},
		
		setRead(e) { // 点击
			if (this.showSetting) {
				this.showSetting = !this.showSetting;
				return;
			}
			if (this.showTool) {
				this.showTool = !this.showTool;
				return;
			}
			let currentX = e.pageX;
			let currentY = e.pageY;
			let offsetX = this.clWidth / 5;
			let offsetY = this.clHeight / 5;
			if (
				offsetX * 2 <= currentX && 
				currentX <= offsetX * 3 &&
				offsetY * 2 <= currentY &&
				currentY <= offsetY * 3
			) { // 用户点击中间1/5，弹出选择框
				this.showTool = !this.showTool;
				return;
			}
			if (this.pagingPattern == 2 || this.pagingPattern == 3 || this.pagingPattern == 4) {  // 点滑/无/点翻
				if (e.pageX <= this.clWidth / 2) { // 用户点击左边1/2
					if (this.currentPaging != 1) { // 不是本章第一页
						this.currentPaging--;
						if (this.pagingPattern == 2) {
							this.setTransForm(((1 - this.currentPaging) * (this.clWidth - 20)), '0.5s');
						} else if (this.pagingPattern == 3 || this.pagingPattern == 4) {
							this.setTransForm(((1 - this.currentPaging) * (this.clWidth - 20)), '0');
						}
					} else {
						this.prevChapter()
					}
				} else { // 用户点击右边1/2
					if (this.resultPaging == this.currentPaging) { // 最后一页
						this.nextChapter()
					} else { // 不是最后一页，则平滑下一页
						this.currentPaging++
						if (this.pagingPattern == 2) {
							this.setTransForm(((1 - this.currentPaging) * (this.clWidth - 20)), '0.5s');
						} else if (this.pagingPattern == 3 || this.pagingPattern == 4) {
							this.styleObject = {
								transform: 'translateX(' + ((1 - this.currentPaging) * (this.clWidth - 20)) + 'px' + ')'
							}
						}
					}
				}
			}
		},
		
		setTransForm(num, time) {
			this.styleObject = {
				transform: 'translateX(' + num + 'px' + ')',
				transitionDuration: time
			}
		},
		
		panleft (e) { // 左滑
			if (this.pagingPattern === 1 || this.pagingPattern == 4) {
				if (this.showSetting) {
					this.showSetting = !this.showSetting;
					return;
				}
				if (this.showTool) {
					this.showTool = !this.showTool;
					return;
				}
				this.offsetX = e.deltaX
				if (this.resultPaging > this.currentPaging && this.pagingPattern === 1) { // 不是最后一页
					if (Math.abs(this.offsetX) < this.clWidth) {
						this.setTransForm((this.offsetX + (1 - this.currentPaging) * (this.clWidth - 20)), '0');
					}
				}
			}
		},
		
		panend (e) { // 滑动结束
			if (this.pagingPattern === 1 || this.pagingPattern === 4) {
				let times = this.pagingPattern === 4 ? '0' : '0.5s';
				if (this.offsetX < 0) { // 左滑
					if (this.resultPaging == this.currentPaging) { // 最后一页
						this.nextChapter()
					} else {
						if (Math.abs(this.offsetX) > this.clWidth/20) { // 左滑距离小于六分之一，则不翻页
							this.currentPaging++
						}
						this.setTransForm(((1 - this.currentPaging) * (this.clWidth - 20)), times);
					}
				} else { // 右滑
					if (this.currentPaging != 1) { // 不是第一页
						if (Math.abs(this.offsetX) > this.clWidth/20) { // 右滑距离小于六分之一，则翻页
							this.currentPaging--
						}
						this.setTransForm(((1 - this.currentPaging) * (this.clWidth - 20)), times);
					} else {
						this.prevChapter()
					}
				}
				this.offsetX = 0
			}
		},
		
		panright (e) { // 右滑
			if (this.showSetting) {
				this.showSetting = !this.showSetting;
				return;
			}
			if (this.showTool) {
				this.showTool = !this.showTool;
				return;
			}
			if (this.pagingPattern == 1 || this.pagingPattern == 4) {
				if (this.currentPaging > 1) {
					this.offsetX = e.deltaX
					if (Math.abs(this.offsetX) < this.clWidth && this.pagingPattern === 1) {
						this.setTransForm((this.offsetX - (this.currentPaging - 1) * (this.clWidth - 20)), '0');
					}
				}
			}
		},
		
		openSetting () { // 打开设置
			this.showTool = false;
			this.showSetting = true;
		},
		
		openDownload () { // 打开下载页面
			this.showTool = false;
			this.showDownload = true;
		},
		
		openMenu () { // 打开目录
			this.showTool = false;
			this.showMenu = true;
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.read-page{
		height: 100%;
		position: relative;
		overflow-y: hidden;
	}
	.content-page{
		overflow-y: auto;
		height: 100%;
	}
	.book-contents{
		padding: 30px 20px 50px 20px;
		.book-inner{
			text-align: justify;
			text-indent: 2em;
		}
		.book-title{
			line-height: 30px;
			font-weight: 400;
			margin-bottom: 25px;
		}
		.book-button{
			display: flex;
			justify-content: space-around;
			margin-top: 30px;
			div{
				padding: 7px 20px;
				border-radius: 5px;
				border: 1px solid #999999;
			}
		}
	}
	    
	.read-content{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.book-title1{
			line-height: 20px;
			font-size: 12px;
			text-align: center;
			margin-bottom: 0;
		}
		.read-article{
			position: absolute;
			overflow: hidden;
			text-align: justify;
			bottom: 25px;
			top: 40px;
			.read-section{
				height: 100%;
				.read-section-inner{
					overflow: visible;
					height: 100%;
					.book-inner{
						text-indent: 2em;
					}
				}
				.book-title{
					line-height: 30px;
					font-weight: 400;
					margin-bottom: 25px;
				}
			}
		}
		.article-page{
			position: fixed;
			left: 15px;
			bottom: 0;
			font-size: 12px;
		}
	}
	    
	   
	    
</style>

<style lang="less">
	.read-page{
		p{
			margin-bottom: 15px;
		}
	}
</style>
