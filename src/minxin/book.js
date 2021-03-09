import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Notify } from 'vant';
export default {
	data() {
		return {
		}
	},
	
	computed: {
		...mapGetters([ 'bookList', 'currentBook' ])
	},
	
  methods: {
    setBook(bookObj, flag) { // 保存更新书籍基本信息
			if (flag) { // true：保存添加
				this.setBookList(bookObj);
			} else { // false：删除
				this.deleteBook([bookObj]);
			}
    },
		
		setNowBook(book) { // 保存当前书籍
			this.setCurrentBook(book);
		},
		
		...mapActions(['setBookList', 'deleteBook', 'setCurrentBook'])
  }
}
