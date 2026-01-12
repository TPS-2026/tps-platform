import {defineStore} from 'pinia'
import axios from "axios";
import {getToastForError} from "@/utils/errors.js";

// API Base URL - Always use localhost:3000 for now
const accountBaseURL = 'http://localhost:3000/api'

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
        register(email, password) {
            this.userEmail = email
            localStorage.setItem('userEmail', email)

            const promise = axios.post(
                `${accountBaseURL}/auth/register`,
                {
                    email: email,
                    password: password
                }
            ).then(res => {
                if (res.data) {
                    this.userID = res.data["user_id"]
                    this.accessToken = res.data["access_token"]
                    this.accessTokenExpirationDate = res.data["access_token_expires_in"] * 1000 + Date.now()

                    localStorage.setItem('userID', this.userID)
                    localStorage.setItem('accessToken', this.accessToken)
                    localStorage.setItem('accessTokenExpirationDate', this.accessTokenExpirationDate)
                }
            })

            return promise
        },
        login(email, password) {
            this.userEmail = email
            localStorage.setItem('userEmail', email)

            const promise = axios.post(
                `${accountBaseURL}/auth/login`,
                {
                    email: email,
                    password: password
                }
            ).then(res => {
                if (res.data) {
                    this.userID = res.data["user_id"]
                    this.accessToken = res.data["access_token"]
                    this.accessTokenExpirationDate = res.data["access_token_expires_in"] * 1000 + Date.now()

                    localStorage.setItem('userID', this.userID)
                    localStorage.setItem('accessToken', this.accessToken)
                    localStorage.setItem('accessTokenExpirationDate', this.accessTokenExpirationDate)
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
        askResetPassword(email) {
            return axios.post(
                `${accountBaseURL}/auth/reset-password/request`,
                {
                    email: email,
                }
            )
        },
        submitResetPassword(code, password) {
            return axios.post(
                `${accountBaseURL}/auth/reset-password/submit`,
                {
                    reset_password_code: code,
                    password: password,
                }
            )
        },
        getMe() {
            this.getMePromise = axios.get(
                `${accountBaseURL}/user/me`,
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    }
                }
            ).then(res => {
                this.profile = res.data
                this.userID = res.data["user_id"]
                this.userEmail = res.data["email"]

                localStorage.setItem('userID', this.userID)
                localStorage.setItem('userEmail', this.userEmail)
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
    }
})

