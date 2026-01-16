import {defineStore} from 'pinia'
import apiClient from '@/utils/axios.js'
import {getToastForError} from "@/utils/errors.js"

export const useAccountStore = defineStore('account', {
    state: () => ({
        userID: localStorage.getItem('userID'),
        accessToken: localStorage.getItem('accessToken'),
        userEmail: localStorage.getItem('userEmail'),
        accessTokenExpirationDate: localStorage.getItem('accessTokenExpirationDate'),
        profile: null,
        getMePromise: null
    }),
    actions: {
        // Note: User registration is now admin-only via POST /api/users
        // This function is kept for compatibility but will not work without admin auth
        register(email, password) {
            this.userEmail = email
            localStorage.setItem('userEmail', email)

            const promise = apiClient.post(
                '/users',
                {
                    email: email,
                    password: password,
                    fullName: email.split('@')[0] // Default fullName from email
                }
            ).then(res => {
                if (res.data) {
                    // Registration doesn't automatically log in, user needs to login separately
                    console.warn('User created. Please login with your credentials.')
                }
            })

            return promise
        },
        login(email, password) {
            this.userEmail = email
            localStorage.setItem('userEmail', email)

            const promise = apiClient.post(
                '/auth/login',
                {
                    email: email,
                    password: password
                }
            ).then(res => {
                if (res.data) {
                    // New backend returns {token, user} instead of {access_token, user_id, ...}
                    this.userID = res.data.user?.id || res.data.user_id
                    this.accessToken = res.data.token || res.data.access_token
                    // JWT tokens typically expire in 24h, set expiration accordingly
                    // You may want to decode the JWT to get actual expiration
                    this.accessTokenExpirationDate = Date.now() + (24 * 60 * 60 * 1000) // 24 hours

                    localStorage.setItem('userID', this.userID)
                    localStorage.setItem('accessToken', this.accessToken)
                    localStorage.setItem('accessTokenExpirationDate', this.accessTokenExpirationDate)
                    
                    // Store user info if available
                    if (res.data.user) {
                        localStorage.setItem('userEmail', res.data.user.email || email)
                        if (res.data.user.fullName) {
                            localStorage.setItem('userFullName', res.data.user.fullName)
                        }
                    }
                }
            })

            return promise
        },
        logout() {
            this.userEmail = null
            this.userID = null
            this.accessToken = null
            this.accessTokenExpirationDate = null
            this.profile = null
            this.getMePromise = null

            localStorage.removeItem('userID')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('accessTokenExpirationDate')
            localStorage.removeItem('userEmail')
        },
        // Note: Password reset functionality not implemented in new backend yet
        askResetPassword(email) {
            return Promise.reject(new Error('Password reset not available. Please contact an administrator.'))
        },
        submitResetPassword(code, password) {
            return Promise.reject(new Error('Password reset not available. Please contact an administrator.'))
        },
        getMe() {
            this.getMePromise = apiClient.get('/users/me').then(res => {
                this.profile = res.data
                this.userID = res.data.id || res.data["user_id"]
                this.userEmail = res.data.email || res.data["email"]

                localStorage.setItem('userID', this.userID)
                localStorage.setItem('userEmail', this.userEmail)
                if (res.data.fullName) {
                    localStorage.setItem('userFullName', res.data.fullName)
                }
            })

            this.getMePromise.catch(err => {
                if (err.response && err.response.status === 401) {
                    this.logout()
                }
            })

            return this.getMePromise
        },
        getMeIfNeeded() {
            if (this.getMePromise) {
                return this.getMePromise
            }

            return this.getMe()
        },
        isAuthenticated() {
            // Check if token exists and is not expired
            if (!this.accessToken) {
                return false
            }
            
            const expirationDate = this.accessTokenExpirationDate
            if (expirationDate && parseInt(expirationDate) < Date.now()) {
                return false
            }
            
            return true
        },
        async verifyAuth() {
            // Verify authentication by calling getMe
            if (!this.isAuthenticated()) {
                return false
            }
            
            try {
                await this.getMe()
                return true
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.logout()
                    return false
                }
                throw err
            }
        }
    }
})

