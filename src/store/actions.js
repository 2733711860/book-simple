import * as types from './mutation-types'
import { getBase64 } from '@/utils/bookUtil.js'

// 添加更新书籍列表(只有放入书架，或者到阅读页的书籍才会进入这个列表)
export const setBookList = async function({ state, commit }, bookObj) {
	let originBook = {
		"bookOnlyId": "",
		"bookId": "",
		"bookName": "",
		"bookAuthor": "",
		"bookDesc": "",
		"bookImg": "",
		"updatedTime": "",
	  "currentIndex": -1,
		"isOnShelf": false, // 是否放入书架
		"currentPage": 1,
	  "chapters": []
	}
	// bookObj.bookImg = await getBase64(bookObj.bookImg);
	let bookList = JSON.parse(JSON.stringify(state.bookList)); // 拷贝一份书籍列表
	let thisOne = bookList.find(item => item.bookOnlyId == bookObj.bookOnlyId);
	if (thisOne) { // 已有则更新
		let thisIndex = bookList.findIndex(item => item.bookOnlyId == bookObj.bookOnlyId);
		Object.assign(thisOne, bookObj);
		bookList.splice(thisIndex, 1, thisOne);
	} else { // 没有则添加
		if (!bookObj.isOnShelf) { // 添加不是书架的书，则先删除其他未入书架的书
			bookList = bookList.filter(item => item.isOnShelf);
		}
		Object.assign(originBook, bookObj);
		bookList.push(originBook);
	}
  commit(types.SET_BOOKLIST, bookList)
}

// 批量删除书籍
export const deleteBook = function({ state, commit }, deleteList) {
	let bookList = JSON.parse(JSON.stringify(state.bookList)); // 拷贝一份书籍列表
	deleteList.forEach((deleteItem, deleteIndex) => {
		let thisIndex = bookList.findIndex(item => item.bookOnlyId == deleteItem.bookOnlyId);
		if (thisIndex != -1) { // 已有则删除
			bookList.splice(thisIndex, 1);
		}
	})
  commit(types.SET_BOOKLIST, bookList)
}

// 设置
export const setSetting = function({ state, commit }, settingObj) {
	let setting = JSON.parse(JSON.stringify(state.setting)); // 拷贝一份设置
	Object.assign(setting, settingObj);
	commit(types.SET_SETTING, setting)
}
