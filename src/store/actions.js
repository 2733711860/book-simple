import * as types from './mutation-types'

// 添加更新书籍列表
export const setBookList = function({ state, commit }, bookObj) {
	let originBook = {
		"bookId": "",
		"bookName": "",
		"bookAuthor": "",
		"bookType": "",
		"bookRate": '',
		"bookDesc": "",
		"latelyFollower": '',
		"retentionRatio": '',
		"bookImg": "",
		"wordCount": '',
		"lastChapter": '',
		"chaptersCount": '',
		"isSerial": "",
		"updatedTime": "",
		"detailUrl": "",
		"commentNum": '',
		"source": "",
	  "currentIndex": -1,
		"currentPage": 1,
	  "chapters": []
	}
	let bookList = JSON.parse(JSON.stringify(state.bookList)); // 拷贝一份书籍列表
	let thisOne = bookList.find(item => item.bookId == bookObj.bookId);
	if (thisOne) { // 已有则更新
		let thisIndex = bookList.findIndex(item => item.bookId == bookObj.bookId);
		Object.assign(thisOne, bookObj);
		bookList.splice(thisIndex, 1, thisOne);
	} else { // 没有则添加
		Object.assign(originBook, bookObj);
		bookList.push(originBook);
	}
  commit(types.SET_BOOKLIST, bookList)
}

// 批量删除书籍
export const deleteBook = function({ state, commit }, deleteList) {
	let bookList = JSON.parse(JSON.stringify(state.bookList)); // 拷贝一份书籍列表
	deleteList.forEach((deleteItem, deleteIndex) => {
		let thisIndex = bookList.findIndex(item => item.bookId == deleteItem.bookId);
		if (thisIndex != -1) { // 已有则删除
			bookList.splice(thisIndex, 1);
		}
	})
  commit(types.SET_BOOKLIST, bookList)
}

// 当前书籍
export const setCurrentBook = function({ state, commit }, bookObj) {
	if (bookObj == 'delete') {
		commit(types.SET_CURRENTBOOK, {})
	} else {
		let currentBook = JSON.parse(JSON.stringify(state.currentBook)); // 拷贝一份当前书籍
		Object.assign(currentBook, bookObj);
		commit(types.SET_CURRENTBOOK, currentBook)
	}
}

// 设置
export const setSetting = function({ state, commit }, settingObj) {
	let setting = JSON.parse(JSON.stringify(state.setting)); // 拷贝一份设置
	Object.assign(setting, settingObj);
	commit(types.SET_SETTING, setting)
}
