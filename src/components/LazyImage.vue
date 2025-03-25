<template>
  <div class="lazy-image-container" ref="imageContainer" :class="wrapperClass">
    <div
      v-if="!error"
      class="lazy-image-placeholder"
      :style="{
        opacity: isPlaceholderVisible ? 1 : 0,
        transition: `opacity ${transitionDuration}`,
      }"
    >
      <div v-if="!placeholderLoaded" class="loading-spinner"></div>
      <div
        v-if="placeholder && placeholderLoaded"
        class="placeholder-image"
        :style="{ backgroundImage: `url(${placeholder})` }"
      ></div>
    </div>

    <div v-if="error" class="lazy-image-error">
      <slot name="error">
        <div class="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Failed to load image</span>
        </div>
      </slot>
    </div>

    <img
      v-if="!error"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="['lazy-image', customClass]"
      :style="{ opacity: imageLoaded ? 1 : 0, transition: `opacity ${transitionDuration}` }"
      @load="onImageLoaded"
      @error="handleError"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
  wrapperClass: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
  threshold: {
    type: Number,
    default: 0.1,
  },
  loadingDelay: {
    type: Number,
    default: 0,
  },
  transitionDuration: {
    type: String,
    default: '0.5s ease',
  },
})

const emit = defineEmits(['loaded', 'error'])

const imageContainer = ref(null)
const imageLoaded = ref(false)
const placeholderLoaded = ref(false)
const isPlaceholderVisible = ref(true)
const error = ref(false)
let observer: IntersectionObserver | null = null
let timeout: number | null = null

const loadPlaceholder = () => {
  if (!props.placeholder) {
    placeholderLoaded.value = true
    return
  }

  const placeholderImg = new Image()
  placeholderImg.onload = () => {
    placeholderLoaded.value = true
  }
  placeholderImg.src = props.placeholder
}

// Function to preload the main image
const preloadImage = () => {
  const img = new Image()

  img.onload = () => {
    if (props.loadingDelay > 0) {
      timeout = setTimeout(() => {
        imageLoaded.value = true
        setTimeout(() => {
          isPlaceholderVisible.value = false
        }, 50)
        emit('loaded')
      }, props.loadingDelay)
    } else {
      imageLoaded.value = true
      setTimeout(() => {
        isPlaceholderVisible.value = false
      }, 50)
      emit('loaded')
    }
  }

  img.src = props.src
}
const onImageLoaded = () => {
  if (!imageLoaded.value) {
    imageLoaded.value = true
    setTimeout(() => {
      isPlaceholderVisible.value = false
    }, 50)
    emit('loaded')
  }
}

const handleError = () => {
  error.value = true
  isPlaceholderVisible.value = false
  emit('error')
}

onMounted(() => {
  loadPlaceholder()

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          preloadImage()
          if (observer) {
            observer.disconnect()
            observer = null
          }
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: props.threshold,
      },
    )

    if (imageContainer.value) {
      observer.observe(imageContainer.value)
    }
  } else {
    preloadImage()
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
  if (timeout) {
    clearTimeout(timeout)
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
  border-radius: 4px;
}

.lazy-image {
  display: block;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
}

.lazy-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ef4444;
}

.error-message svg {
  margin-bottom: 8px;
  color: #ef4444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
