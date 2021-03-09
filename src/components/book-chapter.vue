<template>
	<div :class="['tool-page-menu', showMenu ? 'show' : '']">
		<div class="menu-div">
			<div class="menu-top">
				<div>{{currentBook.bookName}}</div>
				<i class="iconfont iconpaixu"></i>
			</div>
			
			<div class="menu-content">
				<div class="item-chapter"v-for="(item, index) in currentBook.chapters" @click="setChapter(index)">
					<i class="iconfont icondeng deng" v-if="currentBook.currentIndex == index"></i>
					<i class="iconfont icondian" v-else
						:style="{color: (currentBook.chapters[index].content ? '#07C160': '#d5d5d5')}"></i>
					<div :style="{color: (currentBook.currentIndex == index ? '#f80000' : '')}">{{item.title}}</div>
				</div>
			</div>
		</div>
		
		<div class="menu-bg" @click="closeMenu"></div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import bookMixin from '@/minxin/book.js';
import { getBookChapter } from '@/api';
import { Notify } from 'vant';
export default {
	mixins: [ bookMixin ],
	
	data () {
		return {
			showMenu: this.value,
		}
	},
	
	props: {
		value: false
	},
	
	watch: {
		showMenu () {
			this.setScroll()
			this.$emit('input', this.showMenu)
		},
		value () {
			this.showMenu = this.value
		}
	},
	
	mounted () {
		this.setScroll()
	},
	
	methods: {
		closeMenu () { // 关闭目录
			this.showMenu = false
		},
		
		setChapter (index) {
			this.$emit('getThisContent', index)
			this.showMenu = false
		},
		
		setScroll () { // 当前章节始终在中间位置
			if (this.showMenu) {
				if ($(".icondeng").offset().top > (document.body.clientHeight/2 + 30)) {
					let scrollHeight = $(".icondeng").offset().top - document.body.clientHeight/2
					$(".menu-content").scrollTop(scrollHeight)
				}
			} else {
				$(".menu-content").scrollTop(0)
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.tool-page-menu{
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		transform: translateX(-100%);
		transition: transform 0.5s;
		color: #535353;
		.menu-div{
			position: absolute;
			z-index: 11;
			width: 70%;
			height: 100%;
			background-color: #FFFFFF;
			box-shadow: 2px 0 10px 4px #d0d0d0;
			background-color: rgba(224, 232, 229, 1);
			display: flex;
			flex-direction: column;
			.menu-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px 15px;
				border-bottom: 1px solid #d5d5d5;
			}
			.menu-content{
				flex: 1;
				overflow-y: auto;
				.item-chapter{
					height: 40px;
					line-height: 40px;
					padding: 0 15px;
					border-bottom: 1px solid #d5d5d5;
					display: flex;
					.dian{
						margin-right: 5px;
					}
					.deng{
						margin-right: 5px;
						color: #f80000;
					}
					div{
						flex: 1;
						font-size: 12px;
						color: #999999;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
		.menu-bg{
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 10;
		}
	}
	.tool-page-menu.show{
		transform: translateX(0);
	}
</style>
