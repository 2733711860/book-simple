<template>
	<div class="all-page searchPage">
		<van-nav-bar>
			<template #title>
			  <van-search
					v-model="keyWord"
					show-action
					autofocus
					shape="round"
					background="#fff"
					placeholder="请输入搜索关键词"
					@search="onSearch"
					@cancel="onCancel"
				/>
			</template>
		</van-nav-bar>
		<div class="page-content">
			<van-field
				v-for="(item, index) in resultList"
				:key="index"
			  v-model="item.bookName"
			  :label="`[${item.bookType ? item.bookType : item.bookAuthor}]`"
				readonly
			  input-align="right"
				@click="goDetail(item)"
			/>
		</div>
	</div>
</template>

<script>
import { getSearch } from '@/api';
import { Notify } from 'vant';
export default {
	data() {
		return {
			keyWord: '', // 检索关键字
			resultList: '', // 搜索结果列表
		}
	},
	methods: {
		onSearch() { // 搜索
			if (!this.keyWord) {
				Notify('请输入检索关键字');
				return;
			}
			getSearch({
				keyWord: this.keyWord,
				searchType: '1' // 0：笔趣阁；1：新笔趣阁
			}).then(res => {
				if (res.status == 200) {
					this.resultList = res.data;
				} else {
					Notify(res.msg);
				}
			}).catch(() => {
				Notify('网络异常，请稍后再试');
			})
		},
		
		goDetail(bookMsg) { // 到书籍详情
			this.$router.push({
				path: '/detail',
				query: {
					bookId: bookMsg.bookId,
					source: bookMsg.source
				}
			})
		},
		
		onCancel() { // 取消
			history.go(-1);
		}
	}
}
</script>

<style lang="less">
	.searchPage{
		.van-nav-bar__title{
			max-width: 100%;
			width: 100%;
		}
	}
</style>

<style scoped="scoped" lang="less">
	.all-page{
		display: flex;
		flex-direction: column;
		.page-content{
			flex: 1;
			overflow-y: auto;
			.search-tips{
				font-size: 12px;
				color: #646464;
				text-align: center;
				padding: 15px 0;
				span{
					color: #1989FA;
				}
			}
		}
	}
</style>
