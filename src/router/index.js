import {createRouter, createWebHistory} from 'vue-router'
import {useAccountStore} from "@/stores/account.js";

import Landing from '../views/Landing.vue'
import HomeView from '../views/HomeView.vue'
import JobBoard from '../views/Jobs/JobBoard.vue'
import JobDetails from '../views/Jobs/JobDetails.vue'
import ApplicationForm from '../views/Jobs/ApplicationForm.vue'
import News from '../views/News/News.vue'
import NewsArticle from '../views/News/NewsArticle.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import SignIn from '../views/Connection/SignIn.vue'
import SignUp from '../views/Connection/SignUp.vue'
import ForgotPassword from '../views/Connection/ForgotPassword.vue'
import ResetPassword from '../views/Connection/ResetPassword.vue'
import BackOfficeDashboard from '../views/BackOffice/Dashboard.vue'
import JobsManagement from '../views/BackOffice/JobsManagement.vue'
import NewsManagement from '../views/BackOffice/NewsManagement.vue'
import ApplicationsManagement from '../views/BackOffice/ApplicationsManagement.vue'
import UsersManagement from '../views/BackOffice/UsersManagement.vue'
import Reviews from '../views/Reviews.vue'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Landing,
        icon: 'pi pi-home',
        label: 'Accueil',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/home',
        redirect: { name: 'home' }
    },
    {
        path: '/jobs',
        name: 'job-board',
        component: JobBoard,
        icon: 'pi pi-briefcase',
        label: 'Offres d\'emploi',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/jobs/:id',
        name: 'job-details',
        component: JobDetails,
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/jobs/:id/apply',
        name: 'job-apply',
        component: ApplicationForm,
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/news',
        name: 'news',
        component: News,
        icon: 'pi pi-calendar-plus',
        label: 'Actualités',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/news/:id',
        name: 'news-article',
        component: NewsArticle,
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/services',
        name: 'services',
        component: Services,
        icon: 'pi pi-cog',
        label: 'Services',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        icon: 'pi pi-info-circle',
        label: 'À propos',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignIn,
        displayInMenu: false
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp,
        displayInMenu: false
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        displayInMenu: false
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword,
        displayInMenu: false
    },
    {
        path: '/backoffice',
        name: 'backoffice-dashboard',
        component: BackOfficeDashboard,
        displayInMenu: false,
        needAuth: true
    },
    {
        path: '/backoffice/jobs',
        name: 'backoffice-jobs',
        component: JobsManagement,
        displayInMenu: false,
        needAuth: true
    },
    {
        path: '/backoffice/news',
        name: 'backoffice-news',
        component: NewsManagement,
        displayInMenu: false,
        needAuth: true
    },
    {
        path: '/backoffice/applications',
        name: 'backoffice-applications',
        component: ApplicationsManagement,
        displayInMenu: false,
        needAuth: true
    },
    {
        path: '/backoffice/users',
        name: 'backoffice-users',
        component: UsersManagement,
        displayInMenu: false,
        needAuth: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach(async (to, from) => {
    let currentRoute = routes.find((route) => {
        if (route.path === to.path || (route.name && route.name === to.name)) {
            return true
        }
    })

    if (!currentRoute) {
        return {
            name: 'home'
        }
    }

    const accountStore = useAccountStore()
    
    // Check if route requires authentication
    if (currentRoute && currentRoute.needAuth) {
        // Check if token exists
        if (!accountStore.accessToken) {
            accountStore.logout()
            return {
                name: 'sign-in',
                query: { next: to.fullPath }
            }
        }

        // Check if token is expired
        const expirationDate = accountStore.accessTokenExpirationDate
        if (expirationDate && parseInt(expirationDate) < Date.now()) {
            accountStore.logout()
            return {
                name: 'sign-in',
                query: { next: to.fullPath, expired: 'true' }
            }
        }

        // Verify token with backend
        try {
            await accountStore.getMeIfNeeded()
        } catch (err) {
            // If 401, token is invalid
            if (err.response && err.response.status === 401) {
                accountStore.logout()
                return {
                    name: 'sign-in',
                    query: { next: to.fullPath, expired: 'true' }
                }
            }
            // For other errors, still allow access but log the error
            console.error('Error verifying authentication:', err)
        }
    } 
    // Redirect authenticated users away from login/signup pages
    else if (currentRoute.name === 'sign-in' || currentRoute.name === 'sign-up') {
        if (accountStore.accessToken) {
            const expirationDate = accountStore.accessTokenExpirationDate
            if (expirationDate && parseInt(expirationDate) > Date.now()) {
                try {
                    await accountStore.getMe()
                    // If user is authenticated, redirect to backoffice or home
                    return {
                        name: 'backoffice-dashboard'
                    }
                } catch (err) {
                    // If token is invalid, clear it and allow access to login page
                    if (err.response && err.response.status === 401) {
                        accountStore.logout()
                    }
                }
            } else {
                // Token expired, clear it
                accountStore.logout()
            }
        }
    }
})

export default router

