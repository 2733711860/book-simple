import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Notify } from 'vant';
export default {
	data() {
		return {
		}
	},
	
	computed: {
		...mapGetters([ 'bookList' ]),
		
		currentBook() {
			let type = this.$route.query.source == '笔趣阁' ? 'biquge' : 'xinbiquge';
			let thisBook = this.bookList.find(item => item.bookOnlyId == `${type}_${this.$route.query.bookId}`);
			return thisBook;
		}
	},
	
  methods: {
    setBook(bookObj) { // 保存更新书籍基本信息
			this.setBookList(bookObj);
    },
		
		cancelBook(bookObj) { // 删除书籍
			if (bookObj instanceof Array) { // 删除多本书
				this.deleteBook(bookObj);
			} else { // 删除单本书
				this.deleteBook([bookObj]);
			}
		},
		
		...mapActions(['setBookList', 'deleteBook'])
  }
}
