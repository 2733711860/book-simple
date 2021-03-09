/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

// export const baseUrl = `http://121.41.79.10:8080/api`
// export const baseUrl = `http://localhost:8085/api`
export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'


export const getBiqugeSearch = params => get(`${baseUrl}/crawl/biquge/search`, params) // 爬取笔趣阁搜索书籍

export const getSearch = params => get(`${baseUrl}/get/biquge/search`, params) // 从数据库搜索书籍

export const getBookDetail = params => get(`${baseUrl}/get/biquge/detail`, params) // 获取书籍详情

export const getBookChapter = params => get(`${baseUrl}/get/biquge/chapter`, params) // 获取书籍章节

export const getBookContent = params => get(`${baseUrl}/get/biquge/content`, params) // 获取章节正文
