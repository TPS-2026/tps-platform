<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Network Grid Pattern -->
    <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96, 165, 250, 0.3)" stroke-width="1"/>
        </pattern>
        <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:0.6" />
          <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:0.4" />
          <stop offset="100%" style="stop-color:#60A5FA;stop-opacity:0.6" />
        </linearGradient>
      </defs>
      
      <!-- Grid Background -->
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <!-- Network Nodes -->
      <circle cx="10%" cy="15%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse"/>
      <circle cx="25%" cy="30%" r="4" fill="#A78BFA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.3s"/>
      <circle cx="15%" cy="50%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.6s"/>
      <circle cx="30%" cy="20%" r="4" fill="#A78BFA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.9s"/>
      <circle cx="20%" cy="70%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse" style="animation-delay: 1.2s"/>
      
      <!-- Right Side Nodes -->
      <circle cx="85%" cy="25%" r="4" fill="#A78BFA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.2s"/>
      <circle cx="75%" cy="45%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.5s"/>
      <circle cx="90%" cy="60%" r="4" fill="#A78BFA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.8s"/>
      <circle cx="80%" cy="75%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse" style="animation-delay: 1.1s"/>
      
      <!-- Connection Lines -->
      <line x1="10%" y1="15%" x2="25%" y2="30%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      <line x1="25%" y1="30%" x2="15%" y2="50%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      <line x1="15%" y1="50%" x2="20%" y2="70%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      <line x1="30%" y1="20%" x2="25%" y2="30%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      
      <line x1="85%" y1="25%" x2="75%" y2="45%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      <line x1="75%" y1="45%" x2="90%" y2="60%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      <line x1="90%" y1="60%" x2="80%" y2="75%" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.4"/>
      
      <!-- Cross connections -->
      <line x1="30%" y1="20%" x2="75%" y2="45%" stroke="url(#networkGradient)" stroke-width="1" opacity="0.2" stroke-dasharray="5,5"/>
      <line x1="25%" y1="30%" x2="85%" y2="25%" stroke="url(#networkGradient)" stroke-width="1" opacity="0.2" stroke-dasharray="5,5"/>
      
      <!-- Large Circular Network -->
      <circle cx="50%" cy="50%" r="200" fill="none" stroke="url(#networkGradient)" stroke-width="2" opacity="0.15" class="animate-pulse-slow"/>
      <circle cx="50%" cy="50%" r="150" fill="none" stroke="url(#networkGradient)" stroke-width="1.5" opacity="0.1" class="animate-pulse-slow" style="animation-delay: 1s"/>
      <circle cx="50%" cy="50%" r="100" fill="none" stroke="url(#networkGradient)" stroke-width="1" opacity="0.08" class="animate-pulse-slow" style="animation-delay: 2s"/>
      
      <!-- Hexagonal Network Pattern -->
      <g opacity="0.1">
        <polygon points="50%,20% 60%,25% 60%,35% 50%,40% 40%,35% 40%,25%" fill="none" stroke="url(#networkGradient)" stroke-width="2"/>
        <polygon points="70%,50% 80%,55% 80%,65% 70%,70% 60%,65% 60%,55%" fill="none" stroke="url(#networkGradient)" stroke-width="2"/>
        <polygon points="30%,50% 40%,55% 40%,65% 30%,70% 20%,65% 20%,55%" fill="none" stroke="url(#networkGradient)" stroke-width="2"/>
        <polygon points="50%,80% 60%,85% 60%,95% 50%,100% 40%,95% 40%,85%" fill="none" stroke="url(#networkGradient)" stroke-width="2"/>
      </g>
      
      <!-- Data Flow Lines -->
      <path d="M 20% 30% Q 35% 20%, 50% 30% T 80% 30%" fill="none" stroke="url(#networkGradient)" stroke-width="2" opacity="0.3" class="animate-pulse-slow"/>
      <path d="M 25% 60% Q 40% 50%, 55% 60% T 85% 60%" fill="none" stroke="url(#networkGradient)" stroke-width="2" opacity="0.3" class="animate-pulse-slow" style="animation-delay: 1.5s"/>
    </svg>
    
    <!-- Floating Connection Icons -->
    <div class="absolute top-20 left-10 w-12 h-12 border-2 border-blue-400/30 rounded-full flex items-center justify-center opacity-50 animate-pulse-slow">
      <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
    </div>
    <div class="absolute top-40 right-20 w-10 h-10 border-2 border-purple-400/30 rounded-full flex items-center justify-center opacity-50 animate-pulse-slow" style="animation-delay: 0.5s">
      <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
    </div>
    <div class="absolute bottom-32 left-20 w-8 h-8 border-2 border-blue-400/30 rounded-full flex items-center justify-center opacity-50 animate-pulse-slow" style="animation-delay: 1s">
      <div class="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
    </div>
    <div class="absolute bottom-20 right-16 w-14 h-14 border-2 border-purple-400/30 rounded-full flex items-center justify-center opacity-50 animate-pulse-slow" style="animation-delay: 1.5s">
      <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
    </div>
    
    <!-- Signal Waves -->
    <div class="absolute top-1/4 left-1/4 w-24 h-24">
      <div class="absolute inset-0 border-2 border-blue-400/20 rounded-full animate-ping"></div>
      <div class="absolute inset-0 border-2 border-blue-400/20 rounded-full animate-ping" style="animation-delay: 0.5s"></div>
      <div class="absolute inset-0 border-2 border-blue-400/20 rounded-full animate-ping" style="animation-delay: 1s"></div>
    </div>
    
    <div class="absolute bottom-1/4 right-1/4 w-20 h-20">
      <div class="absolute inset-0 border-2 border-purple-400/20 rounded-full animate-ping" style="animation-delay: 0.3s"></div>
      <div class="absolute inset-0 border-2 border-purple-400/20 rounded-full animate-ping" style="animation-delay: 0.8s"></div>
      <div class="absolute inset-0 border-2 border-purple-400/20 rounded-full animate-ping" style="animation-delay: 1.3s"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionBackground'
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
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>








