<template>
  <div class="app">
  	<!-- <navigation>
	    <transition :name="$route.meta.aniName"> -->
	      <router-view class="app-router-view"></router-view>
	   <!-- </transition>
    </navigation> -->
  </div>
</template>

<script>
import transferUtil from '@/utils/middle-transfer.js';
import { Toast } from 'vant';
import { getBookContent } from '@/api';
import bookMixin from '@/minxin/book.js';
export default {
  name: "app",
	
	mixins: [ bookMixin ],
	
	mounted() {
		transferUtil.$on('testDemo', (startIndex, endIndex, nowBook) => {
			this.downLoadChapter(startIndex, endIndex, nowBook);
		})
	},
	
  methods: {
		downLoadChapter(startIndex, endIndex, nowBook) {
			if (startIndex < endIndex) { // 没有缓存完成
				let isCache = nowBook.chapters[startIndex].content ? true : false; // 本章是否缓存过
				if (!isCache) { // 没有缓存过
					let chapterId = nowBook.chapters[startIndex].chapterId;
					let bookId = nowBook.bookId;
					this.downLoadApi(bookId, chapterId, nowBook.source).then(res => {
						if (res.status == 200) {
							let thisBook = this.bookList.find(item => item.bookId == bookId);
							thisBook.chapters[startIndex].content = res.data.cpContent;
							this.setBook(thisBook); // 更新缓存列表
						}
						startIndex++;
						this.downLoadChapter(startIndex, endIndex, nowBook);
					});
				} else {
					startIndex++;
					this.downLoadChapter(startIndex, endIndex, nowBook);
				}
			} else { // 缓存完成
				Toast(`${nowBook.bookName} 缓存完成`);
			}
		},
		
		downLoadApi(bookId, chapterId, source) {
			return new Promise((resolve, reject) => {
				getBookContent({
					bookId,
					chapterId,
					searchType: source == '笔趣阁' ? '0' : '1'
				}).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				})
			})
		}
  }
}
</script>

<style>
	@import url("assets/css/transition.css"); /*vue路由切换特效，需要加以下样式才能生效*/
	*{
		padding: 0;
		margin: 0;
	}
	html,
  body,
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .app {
    perspective: 1500px;
  }
  .app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>



