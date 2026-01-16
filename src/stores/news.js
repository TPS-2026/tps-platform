import {defineStore} from 'pinia'
import apiClient from '@/utils/axios.js'

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        currentArticle: null,
        loading: false,
        pagination: {
            page: 1,
            pageSize: 10,
            total: 0
        }
    }),
    actions: {
        async fetchNews(page = 1) {
            this.loading = true
            try {
                const response = await apiClient.get('/news', {
                    params: {
                        page,
                        pageSize: this.pagination.pageSize
                    }
                })
                this.news = response.data.items || response.data || []
                this.pagination.total = response.data.total || response.data.length || 0
                this.pagination.page = page
                console.log('News fetched:', this.news.length)
                return this.news
            } catch (error) {
                console.error('Error fetching news:', error)
                console.error('API URL:', '/news')
                console.error('Error details:', error.response?.data || error.message)
                this.news = []
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchArticleById(articleId) {
            try {
                const response = await apiClient.get(`/news/${articleId}`)
                this.currentArticle = response.data
                return response.data
            } catch (error) {
                console.error('Error fetching article:', error)
                throw error
            }
        }
    }
})

