<template>
	<div class="all-page">
		<van-nav-bar :title="$route.meta.title" fixed placeholder>
		  <template #right>
		    <van-icon name="search" size="18" @click="goSearch" />
		  </template>
		</van-nav-bar>
		
		<div>
			<book-card 
				v-for="(item, index) in bookList" 
				:key="index" 
				:bookObj="item"
				@click="goRead(item)"
			></book-card>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import bookCard from '@/components/book-card.vue';
import bookMixin from '@/minxin/book.js';
export default {
	mixins: [bookMixin],
	
	components: {
		bookCard
	},
	
	computed: {
		...mapGetters(['bookList'])
	},
	
	methods: {
		goRead(bookObj) {
			this.setNowBook(bookObj);
			this.$router.push({
				path: '/read',
				query: {
					bookId: bookObj.bookId
				}
			})
		},
		
		goSearch() {
			this.$router.push({
				path: "/search"
			})
		}
	}
}
</script>

<style>
</style>
