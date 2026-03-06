<template>
  <div class="turnstile-wrapper">
    <div v-if="!siteKey" class="text-sm text-amber-600 dark:text-amber-400 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
      {{ $t('captcha.notConfigured') }}
    </div>
    <div
      v-else
      ref="containerRef"
      class="turnstile-container min-h-[65px] flex items-center justify-center"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let scriptLoadPromise = null

function loadScript() {
  if (typeof window !== 'undefined' && window.turnstile) {
    return Promise.resolve()
  }
  if (scriptLoadPromise) return scriptLoadPromise
  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.onload = () => {
      if (window.turnstile && window.turnstile.ready) {
        window.turnstile.ready(resolve)
      } else {
        resolve()
      }
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
  return scriptLoadPromise
}

export default {
  name: 'TurnstileWidget',
  props: {
    siteKey: {
      type: String,
      default: () => import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
    },
    theme: {
      type: String,
      default: 'auto' // 'light' | 'dark' | 'auto'
    },
    size: {
      type: String,
      default: 'normal' // 'normal' | 'compact'
    }
  },
  emits: ['update:token', 'expired', 'error'],
  setup(props, { emit }) {
    const containerRef = ref(null)
    let widgetId = null

    function render() {
      if (!containerRef.value || !props.siteKey || typeof window === 'undefined' || !window.turnstile) return
      if (widgetId != null) {
        try {
          window.turnstile.remove(widgetId)
        } catch (_) {}
        widgetId = null
      }
      widgetId = window.turnstile.render(containerRef.value, {
        sitekey: props.siteKey,
        theme: props.theme,
        size: props.size,
        callback: (token) => {
          emit('update:token', token)
        },
        'expired-callback': () => {
          emit('update:token', '')
          emit('expired')
        },
        'error-callback': (code) => {
          emit('update:token', '')
          emit('error', code)
        }
      })
    }

    function reset() {
      if (typeof window !== 'undefined' && window.turnstile && widgetId != null) {
        try {
          window.turnstile.reset(widgetId)
        } catch (_) {}
        emit('update:token', '')
      }
    }

    onMounted(async () => {
      if (!props.siteKey) return
      try {
        await loadScript()
        render()
      } catch (e) {
        console.error('Turnstile load error:', e)
        emit('error', e)
      }
    })

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined' && window.turnstile && widgetId != null) {
        try {
          window.turnstile.remove(widgetId)
        } catch (_) {}
        widgetId = null
      }
    })

    watch(() => props.siteKey, () => {
      if (props.siteKey && containerRef.value && window.turnstile) {
        render()
      }
    })

    return { containerRef, reset }
  },
  expose: ['reset']
}
</script>
