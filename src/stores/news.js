import {defineStore} from 'pinia'
import axios from "axios";

// API Base URL - Always use localhost:3000 for now
const apiBaseURL = 'http://localhost:3000/api'

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
                const response = await axios.get(`${apiBaseURL}/news`, {
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
                console.error('API URL:', `${apiBaseURL}/news`)
                console.error('Error details:', error.response?.data || error.message)
                this.news = []
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchArticleById(articleId) {
            try {
                const response = await axios.get(`${apiBaseURL}/news/${articleId}`)
                this.currentArticle = response.data
                return response.data
            } catch (error) {
                console.error('Error fetching article:', error)
                throw error
            }
        }
    }
})

