import {createApp} from 'vue'
import {createPinia} from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {definePreset} from "@primeuix/themes";
import "primeicons/primeicons.css";
import {ConfirmationService, FocusTrap, ToastService} from "primevue";
import Tooltip from "primevue/tooltip";
import {useRoute} from "vue-router";
import {useThemeStore} from './stores/theme.js'

const app = createApp(App)
const pinia = createPinia()

// Initialize theme before mounting
pinia.use(({store}) => {
    store.$router = router;
    store.$route = useRoute();
})

app.use(pinia)
// Initialize theme store
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

app.use(router)
app.use(i18n)
app.use(VueAxios, axios)
app.use(PrimeVue, {
    theme: {
        preset: definePreset(Aura, {
            semantic: {
                colorScheme: {
                    dark: {
                        formField: {
                            background: '#1C1D1E',
                            padding: {
                                x: '16px',
                                y: '10px'
                            },
                            focus: {
                                border: {
                                    color: "#FFFFFF",
                                }
                            }
                        }
                    }
                },
                primary: {
                    '': '#6366F1', // Indigo-500
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366F1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b'
                },
            },
            components: {
                inputtext: {
                    border: {
                        radius: '10px',
                    },
                    focus: {
                        border: {
                            color: '#fff',
                        },
                    }
                },
                button: {
                    label: {
                        font: {
                            weight: '700',
                        }
                    },
                    lg: {
                        font: {
                            size: '15px',
                        }
                    }
                },
                checkbox: {
                    checked: {
                        border: {
                            color: '#fff'
                        },
                        background: '#fff',
                        hover: {
                            border: {
                                color: '#fff'
                            },
                            background: '#fff',
                        }
                    },
                },
            }
        }),
        options: {
            prefix: 'p',
            darkModeSelector: '.dark-mode',
            cssLayer: false
        },
    }
})
app.use(ConfirmationService);
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.directive('focustrap', FocusTrap);

app.mount('#app')

