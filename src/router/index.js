import {createRouter, createWebHistory} from 'vue-router'
import {useAccountStore} from "@/stores/account.js"

// Only import Landing eagerly (first page users see)
import Landing from '../views/Landing.vue'

// Lazy load all other views for code splitting
const JobBoard = () => import('../views/Jobs/JobBoard.vue')
const JobDetails = () => import('../views/Jobs/JobDetails.vue')
const ApplicationForm = () => import('../views/Jobs/ApplicationForm.vue')
const News = () => import('../views/News/News.vue')
const NewsArticle = () => import('../views/News/NewsArticle.vue')
const About = () => import('../views/About.vue')
const Services = () => import('../views/Services.vue')
const SignIn = () => import('../views/Connection/SignIn.vue')
const SignUp = () => import('../views/Connection/SignUp.vue')
const ForgotPassword = () => import('../views/Connection/ForgotPassword.vue')
const ResetPassword = () => import('../views/Connection/ResetPassword.vue')

// BackOffice - lazy load (admin only)
const BackOfficeDashboard = () => import('../views/BackOffice/Dashboard.vue')
const BackOfficeLayout = () => import('../views/BackOffice/BackOfficeLayout.vue')
const JobsManagement = () => import('../views/BackOffice/JobsManagement.vue')
const NewsManagement = () => import('../views/BackOffice/NewsManagement.vue')
const ApplicationsManagement = () => import('../views/BackOffice/ApplicationsManagement.vue')
const UsersManagement = () => import('../views/BackOffice/UsersManagement.vue')

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
        label: 'Qui sommes-nous ?',
        menuGroup: 'main',
        needAuth: false,
        displayInMenu: true
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/Contact.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/commitments',
        name: 'commitments',
        component: () => import('../views/Commitments.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/legal',
        name: 'legal',
        component: () => import('../views/LegalNotice.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/clients-partners',
        name: 'clients-partners',
        component: () => import('../views/ClientsPartners.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/glossary',
        name: 'glossary',
        component: () => import('../views/Glossary.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/faq',
        name: 'faq',
        component: () => import('../views/Faq.vue'),
        needAuth: false,
        displayInMenu: false
    },
    {
        path: '/accessibility',
        name: 'accessibility',
        component: () => import('../views/Accessibility.vue'),
        needAuth: false,
        displayInMenu: false
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
