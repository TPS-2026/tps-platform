<template>
  <div 
    class="min-h-screen overflow-x-hidden transition-colors duration-300"
    :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
  >
    <!-- Hero Section with Purple/Blue Gradient Background -->
    <div 
      class="relative min-h-[70vh] flex flex-col overflow-hidden transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
    >
      <!-- Network animated background -->
      <ConnectionBackground />
      <!-- Abstract Circuit Graphics on Left -->
      <div class="absolute left-0 top-0 w-1/3 h-full opacity-30">
        <!-- Circuit Lines -->
        <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:0.4" />
            </linearGradient>
          </defs>
          <!-- Horizontal lines -->
          <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse"/>
          <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse" style="animation-delay: 0.5s"/>
          <line x1="10%" y1="80%" x2="30%" y2="80%" stroke="url(#circuitGradient)" stroke-width="2" class="animate-pulse" style="animation-delay: 1s"/>
          <!-- Vertical lines -->
          <line x1="20%" y1="10%" x2="20%" y2="90%" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.5"/>
          <!-- Circular nodes -->
          <circle cx="20%" cy="20%" r="8" fill="#60A5FA" class="animate-pulse"/>
          <circle cx="20%" cy="50%" r="8" fill="#A78BFA" class="animate-pulse" style="animation-delay: 0.5s"/>
          <circle cx="20%" cy="80%" r="8" fill="#60A5FA" class="animate-pulse" style="animation-delay: 1s"/>
          <!-- Large circular element -->
          <circle cx="15%" cy="40%" r="60" fill="none" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.3" class="animate-pulse-slow"/>
          <circle cx="15%" cy="40%" r="30" fill="url(#circuitGradient)" opacity="0.2" class="animate-pulse-slow"/>
          <!-- Hexagonal shape -->
          <polygon points="25%,35% 30%,40% 25%,45% 20%,45% 15%,40% 20%,35%" fill="none" stroke="url(#circuitGradient)" stroke-width="2" opacity="0.2"/>
        </svg>
        
        <!-- Plus buttons -->
        <div 
          class="absolute top-20 left-10 w-8 h-8 border-2 rounded-full flex items-center justify-center transition-colors"
          :class="themeStore.isDark ? 'border-white/30' : 'border-gray-400/40'"
        >
          <span 
            class="text-lg transition-colors"
            :class="themeStore.isDark ? 'text-white/50' : 'text-gray-600/70'"
          >+</span>
        </div>
        <div 
          class="absolute top-1/2 left-16 w-8 h-8 border-2 rounded-full flex items-center justify-center transition-colors"
          :class="themeStore.isDark ? 'border-white/30' : 'border-gray-400/40'"
        >
          <span 
            class="text-lg transition-colors"
            :class="themeStore.isDark ? 'text-white/50' : 'text-gray-600/70'"
          >+</span>
        </div>
        <div 
          class="absolute bottom-32 left-20 w-8 h-8 border-2 rounded-full flex items-center justify-center transition-colors"
          :class="themeStore.isDark ? 'border-white/30' : 'border-gray-400/40'"
        >
          <span 
            class="text-lg transition-colors"
            :class="themeStore.isDark ? 'text-white/50' : 'text-gray-600/70'"
          >+</span>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-24 py-20">
        <div class="max-w-7xl mx-auto w-full">
          <div class="flex flex-col items-center justify-center text-center mb-12">
            <div class="space-y-10 max-w-4xl">
              <div 
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                :class="themeStore.isDark 
                  ? 'bg-white/10 border border-white/20 text-white' 
                  : 'bg-gray-100/80 border border-gray-300/50 text-gray-800'"
              >
                <i 
                  class="pi pi-star-fill transition-colors"
                  :class="themeStore.isDark ? 'text-yellow-400' : 'text-yellow-600'"
                ></i>
                <span>{{ $t('landing.hero.badge') }}</span>
              </div>
              
              <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                <span 
                  class="bg-clip-text text-transparent transition-all"
                  :class="themeStore.isDark 
                    ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
                    : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
                >
                  {{ $t('landing.hero.title1') }}
                </span>
                <br/>
                <span 
                  class="bg-clip-text text-transparent transition-all"
                  :class="themeStore.isDark 
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'"
                >
                  {{ $t('landing.hero.title2') }}
                </span>
              </h1>
              
              <p 
                class="text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light transition-colors"
                :class="themeStore.isDark ? 'text-white/90' : 'text-gray-700'"
              >
                {{ $t('landing.hero.description') }}
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                <RouterLink to="/jobs">
                  <Button 
                    :label="$t('landing.hero.cta1')" 
                    severity="contrast" 
                    size="large"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    class="min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
                  />
                </RouterLink>
                <RouterLink to="/services">
                  <Button 
                    :label="$t('landing.hero.cta2')" 
                    severity="secondary" 
                    size="large"
                    outlined
                    class="min-w-[200px] transition-all"
                    :class="themeStore.isDark 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
                  />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel intégré en bas du hero -->
        <div class="w-full relative z-10 -mb-16">
          <Carousel 
            :value="carouselImages" 
            :numVisible="5" 
            :numScroll="1"
            :responsiveOptions="carouselResponsiveOptions"
            :circular="true"
            :autoplayInterval="4000"
            class="custom-carousel-landing"
          >
            <template #item="slotProps">
              <div class="carousel-item-wrapper-landing">
                <div class="relative h-[520px] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden">
                  <img 
                    :src="slotProps.data.src" 
                    :alt="slotProps.data.alt"
                    class="carousel-image-landing"
                  />
                  <!-- Gradient overlay for title -->
                  <div 
                    class="absolute inset-0 bg-gradient-to-t transition-all"
                    :class="themeStore.isDark 
                      ? 'from-black/70 via-transparent to-transparent' 
                      : 'from-black/60 via-transparent to-transparent'"
                  ></div>
                  <!-- Title overlay -->
                  <div 
                    v-if="slotProps.data.title" 
                    class="absolute inset-0 flex items-end p-6 z-10"
                  >
                    <div 
                      class="transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-50'"
                    >
                      <h3 class="text-xl font-bold mb-2 drop-shadow-lg">{{ slotProps.data.title }}</h3>
                      <p 
                        v-if="slotProps.data.description" 
                        class="text-sm drop-shadow transition-colors"
                        :class="themeStore.isDark ? 'text-white/90' : 'text-gray-100/90'"
                      >
                        {{ slotProps.data.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </div>

    <!-- Services Section with 2-Column Layout -->
    <section 
      class="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-b from-indigo-900/50 via-purple-900/40 to-blue-900/50' 
        : 'bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Top Left: Télécoms Fibre -->
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30' 
              : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70 shadow-md'"
          >
            <!-- 3D Isometric Icon -->
            <div class="mb-6 relative">
              <div class="w-20 h-20 relative transform rotate-45">
                <!-- Hexagonal structure -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400/80 to-blue-600/80 rounded-lg"></div>
                <div class="absolute inset-2 bg-gradient-to-br from-purple-400/60 to-purple-600/60 rounded-lg"></div>
                <div class="absolute inset-4 bg-gradient-to-br from-blue-300/40 to-blue-500/40 rounded-lg"></div>
              </div>
              <div class="absolute top-2 left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div class="absolute bottom-2 right-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
            </div>
            
            <h2 
              class="text-3xl font-bold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ $t('landing.services.telecom.title') }}
            </h2>
            <p 
              class="mb-6 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
            >
              {{ $t('landing.services.telecom.description') }}
            </p>
            <RouterLink to="/services">
              <Button 
                :label="$t('landing.services.readMore')" 
                severity="secondary" 
                text
                class="uppercase text-sm font-semibold transition-colors"
                :class="themeStore.isDark 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:text-blue-600'"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </RouterLink>
          </div>

          <!-- Top Right: BTP / Ingénierie -->
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30' 
              : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70 shadow-md'"
          >
            <!-- 3D Isometric Icon - Stacked Layers -->
            <div class="mb-6 relative">
              <div class="space-y-2">
                <div class="w-20 h-6 bg-gradient-to-r from-purple-500/80 to-purple-700/80 rounded transform -skew-x-12"></div>
                <div class="w-20 h-6 bg-gradient-to-r from-blue-400/80 to-blue-600/80 rounded transform -skew-x-12 ml-4"></div>
                <div class="w-20 h-6 bg-gradient-to-r from-purple-500/80 to-purple-700/80 rounded transform -skew-x-12"></div>
              </div>
            </div>
            
            <h2 
              class="text-3xl font-bold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ $t('landing.services.btp.title') }}
            </h2>
            <p 
              class="mb-6 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
            >
              {{ $t('landing.services.btp.description') }}
            </p>
            <RouterLink to="/services">
              <Button 
                :label="$t('landing.services.readMore')" 
                severity="secondary" 
                text
                class="uppercase text-sm font-semibold transition-colors"
                :class="themeStore.isDark 
                  ? 'text-white hover:text-purple-400' 
                  : 'text-gray-900 hover:text-purple-600'"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </RouterLink>
          </div>

          <!-- Bottom Left: Staffing Rapide -->
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30' 
              : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70 shadow-md'"
          >
            <!-- 3D Isometric Icon - Hexagonal Chat -->
            <div class="mb-6 relative">
              <div class="w-20 h-20 relative">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-2xl transform rotate-12"></div>
                <div class="absolute inset-2 bg-gradient-to-br from-blue-400/60 to-purple-400/60 rounded-xl"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full"></div>
              </div>
            </div>
            
            <h2 
              class="text-3xl font-bold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ $t('landing.services.staffing.title') }}
            </h2>
            <p 
              class="mb-6 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
            >
              {{ $t('landing.services.staffing.description') }}
            </p>
            <RouterLink to="/services">
              <Button 
                :label="$t('landing.services.readMore')" 
                severity="secondary" 
                text
                class="uppercase text-sm font-semibold transition-colors"
                :class="themeStore.isDark 
                  ? 'text-white hover:text-pink-400' 
                  : 'text-gray-900 hover:text-pink-600'"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </RouterLink>
          </div>

          <!-- Bottom Right: Accompagnement -->
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30' 
              : 'bg-white/80 border-gray-200/50 hover:border-gray-300/70 shadow-md'"
          >
            <!-- 3D Isometric Icon - Faces/Profiles -->
            <div class="mb-6 relative">
              <div class="w-20 h-20 relative flex items-center justify-center">
                <div class="absolute left-0 w-10 h-10 bg-gradient-to-br from-blue-400/80 to-blue-600/80 rounded-full"></div>
                <div class="absolute right-0 w-10 h-10 bg-gradient-to-br from-purple-400/80 to-purple-600/80 rounded-full"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h2 
              class="text-3xl font-bold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >
              {{ $t('landing.services.support.title') }}
            </h2>
            <p 
              class="mb-6 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
            >
              {{ $t('landing.services.support.description') }}
            </p>
            <RouterLink to="/services">
              <Button 
                :label="$t('landing.services.readMore')" 
                severity="secondary" 
                text
                class="uppercase text-sm font-semibold transition-colors"
                :class="themeStore.isDark 
                  ? 'text-white hover:text-cyan-400' 
                  : 'text-gray-900 hover:text-cyan-600'"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Chiffres clés -->
    <section 
      class="relative py-20 px-6 md:px-12 lg:px-24 transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-b from-blue-900/60 via-indigo-900/50 to-purple-900/50' 
        : 'bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 
            class="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent tracking-tight transition-all"
            :class="themeStore.isDark 
              ? 'bg-gradient-to-r from-white to-blue-200' 
              : 'bg-gradient-to-r from-gray-900 to-blue-700'"
          >
            {{ $t('landing.keyStats.title') }}
          </h2>
          <p 
            class="text-lg md:text-xl font-light max-w-2xl mx-auto transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('landing.keyStats.subtitle') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            class="p-6 backdrop-blur-sm rounded-2xl border transition-all shadow-lg"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30 shadow-blue-500/10' 
              : 'bg-white/90 border-gray-200/50 hover:border-gray-300/70 shadow-blue-500/5'"
          >
            <div 
              class="text-4xl font-bold mb-2 transition-colors"
              :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
            >
              500+
            </div>
            <div 
              class="text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >
              {{ $t('landing.stats.professionals') }}
            </div>
          </div>
          <div 
            class="p-6 backdrop-blur-sm rounded-2xl border transition-all shadow-lg"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30 shadow-purple-500/10' 
              : 'bg-white/90 border-gray-200/50 hover:border-gray-300/70 shadow-purple-500/5'"
          >
            <div 
              class="text-4xl font-bold mb-2 transition-colors"
              :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'"
            >
              200+
            </div>
            <div 
              class="text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >
              {{ $t('landing.stats.projects') }}
            </div>
          </div>
          <div 
            class="p-6 backdrop-blur-sm rounded-2xl border transition-all shadow-lg"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30 shadow-pink-500/10' 
              : 'bg-white/90 border-gray-200/50 hover:border-gray-300/70 shadow-pink-500/5'"
          >
            <div 
              class="text-4xl font-bold mb-2 transition-colors"
              :class="themeStore.isDark ? 'text-pink-400' : 'text-pink-600'"
            >
              48h
            </div>
            <div 
              class="text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >
              {{ $t('landing.stats.delay') }}
            </div>
          </div>
          <div 
            class="p-6 backdrop-blur-sm rounded-2xl border transition-all shadow-lg"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30 shadow-cyan-500/10' 
              : 'bg-white/90 border-gray-200/50 hover:border-gray-300/70 shadow-cyan-500/5'"
          >
            <div 
              class="text-4xl font-bold mb-2 transition-colors"
              :class="themeStore.isDark ? 'text-cyan-400' : 'text-cyan-600'"
            >
              98%
            </div>
            <div 
              class="text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >
              {{ $t('landing.stats.satisfaction') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section 
      class="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-b from-blue-900/50 to-indigo-900/60' 
        : 'bg-gradient-to-b from-blue-50 to-indigo-50'"
    >
      <!-- Background Abstract Shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Large gradient circles -->
        <div class="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <!-- Floating geometric shapes -->
        <svg class="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="processGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:0.4" />
              <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:0.2" />
            </linearGradient>
            <linearGradient id="processGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.4" />
              <stop offset="100%" style="stop-color:#6366F1;stop-opacity:0.2" />
            </linearGradient>
          </defs>
          
          <!-- Arcs and curves -->
          <path d="M 10% 30% Q 30% 50%, 50% 40% T 90% 35%" stroke="url(#processGradient1)" stroke-width="2" fill="none" opacity="0.5" class="animate-draw-line"/>
          <path d="M 15% 70% Q 35% 50%, 55% 60% T 95% 65%" stroke="url(#processGradient2)" stroke-width="2" fill="none" opacity="0.5" class="animate-draw-line-delayed"/>
          
          <!-- Circular elements -->
          <circle cx="20%" cy="25%" r="40" fill="none" stroke="url(#processGradient1)" stroke-width="2" opacity="0.3" class="animate-pulse-slow"/>
          <circle cx="80%" cy="75%" r="50" fill="none" stroke="url(#processGradient2)" stroke-width="2" opacity="0.3" class="animate-pulse-slow" style="animation-delay: 1s"/>
          
          <!-- Hexagons -->
          <polygon points="25%,60% 30%,65% 30%,70% 25%,75% 20%,70% 20%,65%" fill="none" stroke="url(#processGradient1)" stroke-width="2" opacity="0.4" class="animate-rotate-slow"/>
          <polygon points="75%,30% 80%,35% 80%,40% 75%,45% 70%,40% 70%,35%" fill="none" stroke="url(#processGradient2)" stroke-width="2" opacity="0.4" class="animate-rotate-slow" style="animation-delay: 0.5s"/>
          
          <!-- Dots/points -->
          <circle cx="15%" cy="45%" r="4" fill="#60A5FA" opacity="0.6" class="animate-pulse"/>
          <circle cx="85%" cy="55%" r="4" fill="#A78BFA" opacity="0.6" class="animate-pulse" style="animation-delay: 0.5s"/>
          <circle cx="50%" cy="20%" r="4" fill="#8B5CF6" opacity="0.6" class="animate-pulse" style="animation-delay: 1s"/>
          <circle cx="50%" cy="80%" r="4" fill="#6366F1" opacity="0.6" class="animate-pulse" style="animation-delay: 1.5s"/>
        </svg>
        
        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <h2 
            class="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent tracking-tight transition-all"
            :class="themeStore.isDark 
              ? 'bg-gradient-to-r from-white to-blue-200' 
              : 'bg-gradient-to-r from-gray-900 to-blue-700'"
          >
            {{ $t('landing.process.title') }}
          </h2>
          <p 
            class="text-lg md:text-xl max-w-2xl mx-auto font-light transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('landing.process.subtitle') }}
          </p>
        </div>
        
        <div class="relative">
          <div 
            class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent transform -translate-y-1/2 transition-colors"
            :class="themeStore.isDark 
              ? 'via-white/30' 
              : 'via-gray-400/40'"
          ></div>
          
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div 
              v-for="(step, index) in processSteps" 
              :key="index"
              class="text-center relative group"
            >
              <!-- Connecting lines between steps (desktop only) -->
              <div 
                v-if="index < processSteps.length - 1" 
                class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-transparent to-transparent transform translate-x-4 transition-colors"
                :class="themeStore.isDark 
                  ? 'from-blue-400/50 via-purple-400/50' 
                  : 'from-blue-500/40 via-purple-500/40'"
              ></div>
              
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg group-hover:scale-110 transition-all duration-300"
                :class="themeStore.isDark ? 'shadow-blue-500/30 group-hover:shadow-blue-500/50' : 'shadow-blue-500/20 group-hover:shadow-blue-500/30'"
              >
                <span class="text-2xl font-bold text-white">{{ index + 1 }}</span>
                <!-- Glow effect on hover -->
                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              </div>
              
              <h3 
                class="text-lg font-semibold mb-2 transition-colors"
                :class="themeStore.isDark 
                  ? 'text-white group-hover:text-blue-300' 
                  : 'text-gray-900 group-hover:text-blue-600'"
              >
                {{ step.title }}
              </h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
              >
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section 
      class="relative py-24 px-6 md:px-12 lg:px-24 transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-b from-indigo-900/60 via-purple-900/50 to-blue-900/60' 
        : 'bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 
            class="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent tracking-tight transition-all"
            :class="themeStore.isDark 
              ? 'bg-gradient-to-r from-white to-blue-200' 
              : 'bg-gradient-to-r from-gray-900 to-blue-700'"
          >
            {{ $t('landing.testimonials.title') }}
          </h2>
          <p 
            class="text-lg md:text-xl max-w-2xl mx-auto font-light mb-12 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('landing.testimonials.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="group relative p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:border-white/30' 
              : 'bg-white/90 border-gray-200/50 hover:border-gray-300/70 shadow-md'"
          >
            <!-- Quote Icon -->
            <div 
              class="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              :class="themeStore.isDark 
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                : 'bg-gradient-to-br from-blue-100 to-purple-100'"
            >
              <i 
                class="pi pi-quote-right text-xl transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              ></i>
            </div>
            
            <!-- Stars Rating -->
            <div class="flex gap-1 mb-4">
              <i 
                v-for="star in 5" 
                :key="star"
                class="pi pi-star-fill text-sm transition-colors"
                :class="themeStore.isDark ? 'text-yellow-400' : 'text-yellow-600'"
              ></i>
            </div>
            
            <!-- Testimonial Text -->
            <p 
              class="mb-6 leading-relaxed italic transition-colors"
              :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
            >
              "{{ testimonial.text }}"
            </p>
            
            <!-- Author Info -->
            <div 
              class="flex items-center gap-4 pt-6 border-t transition-colors"
              :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white font-semibold">{{ testimonial.author.charAt(0) }}</span>
              </div>
              <div>
                <div 
                  class="font-semibold transition-colors"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >
                  {{ testimonial.author }}
                </div>
                <div 
                  class="text-sm transition-colors"
                  :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                >
                  {{ testimonial.role }}
                </div>
                <div 
                  class="text-xs mt-1 transition-colors"
                  :class="themeStore.isDark ? 'text-white/50' : 'text-gray-500'"
                >
                  {{ testimonial.company }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section 
      class="relative py-24 px-6 md:px-12 lg:px-24 transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'bg-gradient-to-br from-purple-900/40 via-blue-900/50 to-indigo-900/60' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
    >
      <div class="max-w-5xl mx-auto">
        <div 
          class="relative overflow-hidden backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center transition-colors duration-300"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/20' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div 
            class="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl transition-colors"
            :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
          ></div>
          <div 
            class="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl transition-colors"
            :class="themeStore.isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'"
          ></div>
          
          <div class="relative z-10">
            <h2 
              class="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent tracking-tight transition-all"
              :class="themeStore.isDark 
                ? 'bg-gradient-to-r from-white to-blue-200' 
                : 'bg-gradient-to-r from-gray-900 to-blue-700'"
            >
              {{ $t('landing.cta.title') }}
            </h2>
            <p 
              class="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light transition-colors"
              :class="themeStore.isDark ? 'text-white/90' : 'text-gray-700'"
            >
              {{ $t('landing.cta.description') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/jobs">
                <Button 
                  :label="$t('landing.cta.button1')" 
                  severity="contrast" 
                  size="large"
                  icon="pi pi-briefcase"
                  iconPos="right"
                  class="min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
                />
              </RouterLink>
              <RouterLink to="/services">
                <Button 
                  :label="$t('landing.cta.button2')" 
                  severity="secondary" 
                  size="large"
                  outlined
                  class="min-w-[200px] transition-all"
                  :class="themeStore.isDark 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
                />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer 
      class="py-12 px-6 md:px-12 lg:px-24 transition-colors duration-300"
      :class="themeStore.isDark 
        ? 'border-t border-white/10 bg-gradient-to-b from-indigo-900/60 to-blue-900/70' 
        : 'border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <RouterLink to="/" class="flex items-center group">
              <img 
                :src="themeStore.isDark ? '/Logo TPS.png' : '/Light Logo TPS.png'"
                alt="TPS Logo" 
                class="h-48 w-auto group-hover:scale-105 transition-transform duration-200"
              />
            </RouterLink>
          </div>
          
          <div>
            <h4 
              class="font-semibold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >{{ $t('landing.footer.navigation') }}</h4>
            <ul 
              class="space-y-2 text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
            >
              <li><RouterLink 
                to="/jobs" 
                class="transition-colors"
                :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
              >{{ $t('common.jobs') }}</RouterLink></li>
              <li><RouterLink 
                to="/services" 
                class="transition-colors"
                :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
              >{{ $t('common.services') }}</RouterLink></li>
              <li><RouterLink 
                to="/news" 
                class="transition-colors"
                :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
              >{{ $t('common.news') }}</RouterLink></li>
              <li><RouterLink 
                to="/about" 
                class="transition-colors"
                :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
              >{{ $t('common.about') }}</RouterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 
              class="font-semibold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >{{ $t('landing.footer.sectors') }}</h4>
            <ul 
              class="space-y-2 text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
            >
              <li>{{ $t('landing.footer.sectorsList.telecom') }}</li>
              <li>{{ $t('landing.footer.sectorsList.btp') }}</li>
              <li>{{ $t('landing.footer.sectorsList.projectManagement') }}</li>
              <li>{{ $t('landing.footer.sectorsList.engineering') }}</li>
            </ul>
          </div>
          
          <div>
            <h4 
              class="font-semibold mb-4 transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >{{ $t('landing.footer.contact') }}</h4>
            <ul 
              class="space-y-2 text-sm transition-colors"
              :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
            >
              <li class="flex items-center gap-2">
                <i 
                  class="pi pi-envelope transition-colors"
                  :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
                ></i>
                <span>contact@tps-platform.com</span>
              </li>
              <li class="flex items-center gap-2">
                <i 
                  class="pi pi-phone transition-colors"
                  :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
                ></i>
                <span>+33 1 XX XX XX XX</span>
              </li>
              <li class="flex items-center gap-2">
                <i 
                  class="pi pi-map-marker transition-colors"
                  :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
                ></i>
                <span>France</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div 
          class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors"
          :class="themeStore.isDark ? 'border-t border-white/10' : 'border-t border-gray-200'"
        >
          <p 
            class="text-sm transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >{{ $t('landing.footer.copyright') }}</p>
          <div class="flex gap-4">
            <a 
              href="#" 
              class="transition-colors hover:scale-110 inline-block"
              :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
            >
              <i class="pi pi-linkedin text-xl"></i>
            </a>
            <a 
              href="#" 
              class="transition-colors hover:scale-110 inline-block"
              :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
            >
              <i class="pi pi-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme.js'
import ConnectionBackground from '@/components/ConnectionBackground.vue'

export default {
  name: 'Landing',
  components: {
    ConnectionBackground
  },
  setup() {
    const { t } = useI18n()
    const themeStore = useThemeStore()
    
    const carouselImages = ref([
      {
        src: '/conception-study.jpg',
        alt: 'Conception TPS',
        title: t('landing.carousel.conception.title'),
        description: t('landing.carousel.conception.description')
      },
      {
        src: '/fibre-optic-tps.jpg',
        alt: 'Fibre optique TPS',
        title: t('landing.carousel.fibre.title'),
        description: t('landing.carousel.fibre.description')
      },
      {
        src: '/tps-green-energy.jpg',
        alt: 'Green Energy TPS',
        title: t('landing.carousel.greenEnergy.title'),
        description: t('landing.carousel.greenEnergy.description')
      },
      {
        src: '/solar-energy-tps.jpg',
        alt: 'Énergie solaire TPS',
        title: t('landing.carousel.solar.title'),
        description: t('landing.carousel.solar.description')
      },
      {
        src: '/5g-network-tps.jpg',
        alt: '5G Network TPS',
        title: t('landing.carousel.network5g.title'),
        description: t('landing.carousel.network5g.description')
      },
      {
        src: '/fibre-optic.jpg',
        alt: 'Fibre optique',
        title: t('landing.carousel.fibreOptic.title'),
        description: t('landing.carousel.fibreOptic.description')
      }
    ])

    const carouselResponsiveOptions = ref([
      {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '992px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1
      }
    ])
    
    const processSteps = [
      {
        title: t('landing.process.steps.qualification'),
        description: t('landing.process.steps.qualificationDesc')
      },
      {
        title: t('landing.process.steps.sourcing'),
        description: t('landing.process.steps.sourcingDesc')
      },
      {
        title: t('landing.process.steps.interviews'),
        description: t('landing.process.steps.interviewsDesc')
      },
      {
        title: t('landing.process.steps.alignment'),
        description: t('landing.process.steps.alignmentDesc')
      },
      {
        title: t('landing.process.steps.onboarding'),
        description: t('landing.process.steps.onboardingDesc')
      }
    ]
    
    const testimonials = [
      {
        text: t('landing.testimonialsList.testimonial1.text'),
        author: t('landing.testimonialsList.testimonial1.author'),
        role: t('landing.testimonialsList.testimonial1.role'),
        company: t('landing.testimonialsList.testimonial1.company')
      },
      {
        text: t('landing.testimonialsList.testimonial2.text'),
        author: t('landing.testimonialsList.testimonial2.author'),
        role: t('landing.testimonialsList.testimonial2.role'),
        company: t('landing.testimonialsList.testimonial2.company')
      },
      {
        text: t('landing.testimonialsList.testimonial3.text'),
        author: t('landing.testimonialsList.testimonial3.author'),
        role: t('landing.testimonialsList.testimonial3.role'),
        company: t('landing.testimonialsList.testimonial3.company')
      }
    ]
    
    return {
      themeStore,
      carouselImages,
      carouselResponsiveOptions,
      processSteps,
      testimonials
    }
  }
}
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes draw-line {
  0% {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.5;
  }
}

.animate-draw-line {
  animation: draw-line 6s ease-in-out infinite;
  stroke-dasharray: 1000;
}

.animate-draw-line-delayed {
  animation: draw-line 6s ease-in-out infinite;
  animation-delay: 2s;
  stroke-dasharray: 1000;
}

@keyframes rotate-slow {
  0% {
    transform: rotate(0deg);
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.4;
  }
}

.animate-rotate-slow {
  animation: rotate-slow 20s linear infinite;
  transform-origin: center;
}

/* Carousel Styles - More spacing and thinner images */
:deep(.custom-carousel-landing .p-carousel-content) {
  padding: 0;
}

:deep(.custom-carousel-landing .p-carousel-container) {
  padding: 0 4rem;
}

:deep(.custom-carousel-landing .p-carousel-prev),
:deep(.custom-carousel-landing .p-carousel-next) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.custom-carousel-landing .p-carousel-prev:hover),
:deep(.custom-carousel-landing .p-carousel-next:hover) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

:deep(.custom-carousel-landing .p-carousel-indicators) {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

:deep(.custom-carousel-landing .p-carousel-indicator button) {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.custom-carousel-landing .p-carousel-indicator.p-highlight button) {
  background: rgba(255, 255, 255, 0.8);
  width: 32px;
  border-radius: 6px;
}

.carousel-item-wrapper-landing {
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.carousel-item-wrapper-landing > div {
  max-width: 280px;
  height: 520px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.carousel-item-wrapper-landing > div:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 48px rgba(99, 102, 241, 0.4);
}

.carousel-image-landing {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  filter: brightness(0.85) contrast(1.1) saturate(0.9);
  transition: filter 0.3s ease;
}

.carousel-item-wrapper-landing > div:hover .carousel-image-landing {
  filter: brightness(0.9) contrast(1.15) saturate(0.95);
}

@media (max-width: 992px) {
  .carousel-item-wrapper-landing > div {
    max-width: 220px;
    height: 480px;
  }
  
  .carousel-item-wrapper-landing {
    padding: 0 1.25rem;
  }
}

@media (max-width: 768px) {
  .carousel-item-wrapper-landing > div {
    max-width: 200px;
    height: 420px;
  }
  
  :deep(.custom-carousel-landing .p-carousel-container) {
    padding: 0 2rem;
  }
  
  .carousel-item-wrapper-landing {
    padding: 0 1rem;
  }
}

@media (max-width: 576px) {
  .carousel-item-wrapper-landing > div {
    max-width: 100%;
    height: 400px;
  }
  
  .carousel-item-wrapper-landing {
    padding: 0 0.75rem;
  }
  
  :deep(.custom-carousel-landing .p-carousel-container) {
    padding: 0 1rem;
  }
}
</style>
