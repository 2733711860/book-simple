export default [
	{
	  path: '/',
	  redirect: '/index'
	},
  {
    path: '/index',
    name: 'index',
    component: resolve => {
      require(['@/views/index.vue'], resolve)
    },
    meta: {
    	title: '书架',
    	aniName: 'move-fade-top-to-bottom',
    	showTop: true
    }
  }, {
    path: '/search',
    name: 'search',
    component: resolve => {
      require(['@/views/search.vue'], resolve)
    },
    meta: {
    	title: '搜索',
    	aniName: 'move-fade-top-to-bottom',
    	showTop: true
    }
  }, {
    path: '/read',
    name: 'read',
    component: resolve => {
      require(['@/views/read.vue'], resolve)
    },
    meta: {
    	title: '正文',
    	aniName: 'move-fade-top-to-bottom',
    	showTop: true
    }
  }, {
    path: '/detail',
    name: 'detail',
    component: resolve => {
      require(['@/views/detail.vue'], resolve)
    },
    meta: {
    	title: '详情',
    	aniName: 'move-fade-top-to-bottom',
    	showTop: true
    }
  }
]
