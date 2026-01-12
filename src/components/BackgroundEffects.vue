<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Abstract Circuit Graphics on Left -->
    <div class="absolute left-0 top-0 w-1/3 h-full opacity-20">
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse"/>
        <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse" style="animation-delay: 0.5s"/>
        <line x1="10%" y1="80%" x2="30%" y2="80%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse" style="animation-delay: 1s"/>
        <line x1="20%" y1="10%" x2="20%" y2="90%" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.5"/>
        <circle cx="20%" cy="20%" r="8" fill="#60A5FA" class="animate-pulse"/>
        <circle cx="20%" cy="50%" r="8" fill="#A78BFA" class="animate-pulse" style="animation-delay: 0.5s"/>
        <circle cx="20%" cy="80%" r="8" fill="#60A5FA" class="animate-pulse" style="animation-delay: 1s"/>
        <circle cx="15%" cy="40%" r="60" fill="none" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.3" class="animate-pulse-slow"/>
        <circle cx="15%" cy="40%" r="30" fill="url(#circuitGradient)" opacity="0.2" class="animate-pulse-slow"/>
        <polygon points="25%,35% 30%,40% 25%,45% 20%,45% 15%,40% 20%,35%" fill="none" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.2"/>
      </svg>
      
      <div class="absolute top-20 left-10 w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center">
        <span class="text-white/30 text-lg">+</span>
      </div>
      <div class="absolute top-1/2 left-16 w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center">
        <span class="text-white/30 text-lg">+</span>
      </div>
      <div class="absolute bottom-32 left-20 w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center">
        <span class="text-white/30 text-lg">+</span>
      </div>
    </div>

    <!-- Gradient Orbs -->
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s"></div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundEffects'
}
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>

