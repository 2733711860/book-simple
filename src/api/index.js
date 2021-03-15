/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

export const baseUrl = `http://121.41.79.10:8080/api`
// export const baseUrl = `http://localhost:8085/api`
// export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'


export const getSearch = params => get(`${baseUrl}/search/book`, params) // 搜索书籍

export const getBookDetail = params => get(`${baseUrl}/get/book/detail`, params) // 获取书籍详情

export const getBookChapter = params => get(`${baseUrl}/get/book/chapter`, params) // 获取书籍章节

export const getBookContent = params => get(`${baseUrl}/get/book/content`, params) // 获取章节正文
