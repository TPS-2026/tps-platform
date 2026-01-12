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
        icon: 'pi pi-newspaper',
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
        displayInMenu: false
    },
    {
        path: '/backoffice/jobs',
        name: 'backoffice-jobs',
        component: JobsManagement,
        displayInMenu: false
    },
    {
        path: '/backoffice/news',
        name: 'backoffice-news',
        component: NewsManagement,
        displayInMenu: false
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
    if (currentRoute && currentRoute.needAuth) {
        if (!accountStore.accessToken || accountStore.accessTokenExpirationDate < Date.now().valueOf()) {
            accountStore.logout()
            const query = {...to.query, next: to.name};
            return {
                name: 'sign-in', query: query
            }
        }

        try {
            await accountStore.getMeIfNeeded()
        } catch (err) {
            if (err.response && err.response.status === 401) {
                accountStore.logout()
                const query = {...to.query, next: to.name};
                return {
                    name: 'sign-in', query: query
                }
            }
        }
    } else if (currentRoute.name === 'sign-in' || currentRoute.name === 'sign-up') {
        if (accountStore.accessToken && accountStore.accessTokenExpirationDate > Date.now().valueOf()) {
            try {
                await accountStore.getMe()
                return {
                    name: 'home'
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    accountStore.logout()
                    const query = {...to.query, next: to.name};
                    return {
                        name: 'sign-in', query: query
                    }
                }
            }
        }
    }
})

export default router

