import {defineStore} from 'pinia'
import axios from "axios";
import {useI18nStore} from './i18n.js'

// API Base URL - Always use localhost:3000 for now
const apiBaseURL = 'http://localhost:3000/api'

export const useJobsStore = defineStore('jobs', {
    state: () => ({
        jobs: [],
        currentJob: null,
        filters: {
            sector: null, // 'telecom' | 'btp'
            location: null,
            contractType: null, // 'regie' | 'tjm' | 'package'
            search: null
        },
        loading: false
    }),
    actions: {
        async fetchJobs(filters = {}) {
            this.loading = true
            try {
                const i18nStore = useI18nStore()
                const locale = i18nStore.currentLocale || 'fr'
                const params = {...this.filters, ...filters, locale}
                const response = await axios.get(`${apiBaseURL}/jobs`, { params })
                this.jobs = response.data || []
                console.log('Jobs fetched:', this.jobs.length)
                return response.data
            } catch (error) {
                console.error('Error fetching jobs:', error)
                console.error('API URL:', `${apiBaseURL}/jobs`)
                console.error('Error details:', error.response?.data || error.message)
                this.jobs = []
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchJobById(jobId) {
            try {
                const i18nStore = useI18nStore()
                const locale = i18nStore.currentLocale || 'fr'
                const response = await axios.get(`${apiBaseURL}/jobs/${jobId}`, { params: { locale } })
                this.currentJob = response.data
                return response.data
            } catch (error) {
                console.error('Error fetching job:', error)
                throw error
            }
        },
        setFilters(filters) {
            this.filters = {...this.filters, ...filters}
        },
        resetFilters() {
            this.filters = {
                sector: null,
                location: null,
                contractType: null,
                search: null
            }
        },
        async submitApplication(jobId, applicationData) {
            try {
                const response = await axios.post(
                    `${apiBaseURL}/jobs/${jobId}/applications`,
                    applicationData
                )
                return response.data
            } catch (error) {
                console.error('Error submitting application:', error)
                throw error
            }
        }
    }
})

