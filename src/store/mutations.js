import * as types from './mutation-types'

const mutations = {
	// 书籍列表
  [types.SET_BOOKLIST](state, bookList) {
    state.bookList = bookList
  },
	
	// 设置
	[types.SET_SETTING](state, setting) {
	  state.setting = setting
	},
}

export default mutations
