const state = {
	bookList: [], // 书籍列表
	currentBook: {}, // 当前书籍
	setting: {
		dayNight: 'day', // day:日间模式  night:夜间模式,
		bookSource: '', // 当前小说源(换源)
		brightness: 0.9, // 亮度
		defaultBrightness: 0.9, // 默认亮度
		fontSize: 18, // 字体大小
		defaultFontSize: 18, // 默认字体大小
		lineHeight: 40, // 30:紧凑  35:舒适  45:松散  40:默认
		defaultLineHeight: 30, // 默认行间距
		turnPageMode: 3, // 翻页模式 0:整页   1:平滑   2:点滑   3:无   4:仿真
		backgroundColor: 'rgba(250, 228, 190, .8)', // 阅读背景颜色
		shelfTheme: '1', // 书架布局  0：经典书架  1：简约列表
	}
}

export default state
