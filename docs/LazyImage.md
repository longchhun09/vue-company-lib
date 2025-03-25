# LazyImage Component

The LazyImage component is a high-performance, feature-rich image loader designed to optimize the loading of images in Vue.js applications. It implements lazy loading through the IntersectionObserver API, loading images only when they enter the viewport, which helps improve page load times and reduce unnecessary bandwidth usage.

## Features

- **Lazy Loading**: Images load only when they enter the viewport
- **Placeholder Support**: Display a loading placeholder until the main image loads
- **Loading Spinner**: Automatic loading spinner when a placeholder is not provided or still loading
- **Error Handling**: Graceful error handling with customizable error display
- **Smooth Transitions**: Configurable transition effects between loading states
- **Loading Delay**: Optional artificial delay for loading animations
- **Customization**: Fully customizable styling with custom class support
- **Accessible**: Maintains proper accessibility attributes for images
- **TypeScript Support**: Fully typed props and events

## Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | `String` | (Required) | The URL of the image to be loaded. |
| `placeholder` | `String` | `''` | Optional URL for a placeholder image shown while the main image is loading. |
| `alt` | `String` | `''` | Alternative text for the image for accessibility. |
| `width` | `Number` &#124; `String` | `null` | The width attribute of the image. |
| `height` | `Number` &#124; `String` | `null` | The height attribute of the image. |
| `wrapperClass` | `String` | `''` | CSS class to apply to the container div. |
| `customClass` | `String` | `''` | CSS class to apply to the image element. |
| `threshold` | `Number` | `0.1` | The IntersectionObserver threshold value (0 to 1) that determines how much of the element should be visible before loading. |
| `loadingDelay` | `Number` | `0` | Optional delay in milliseconds before showing the loaded image, useful for ensuring smooth transitions or showing loading states. |
| `transitionDuration` | `String` | `'0.5s ease'` | CSS transition value for the opacity transition during loading states. |

## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
| `loaded` | None | Emitted when the main image has loaded successfully. |
| `error` | None | Emitted when the main image fails to load. |

## Slots

| Slot Name | Description |
|-----------|-------------|
| `error` | Custom content to display when the image fails to load. If not provided, a default error message is shown. |

## Implementation Details

### IntersectionObserver Usage

The LazyImage component uses the IntersectionObserver API to detect when an image enters the viewport:

```javascript
if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        preloadImage()
        observer.disconnect()
        observer = null
      }
    },
    {
      root: null,
      rootMargin: '50px',
      threshold: props.threshold,
    },
  )

  observer.observe(imageContainer.value)
} else {
  // Fallback for browsers that don't support IntersectionObserver
  preloadImage()
}
```

Key aspects of the implementation:
- Uses a `rootMargin` of '50px' to start loading slightly before the image enters the viewport
- Configurable `threshold` value to control when the image starts loading
- Proper cleanup with `disconnect()` on component unmount
- Falls back to immediate loading for browsers without IntersectionObserver support

### Loading States Management

The component manages several states to handle different phases of image loading:

- `imageLoaded`: Tracks if the main image has fully loaded
- `placeholderLoaded`: Tracks if the placeholder image has loaded
- `isPlaceholderVisible`: Controls the visibility of the placeholder
- `error`: Tracks if there was an error loading the main image

These states are used to orchestrate smooth transitions between loading, loaded, and error states.

## Performance Considerations

- **Network Efficiency**: By loading images only when needed, the component reduces unnecessary bandwidth usage and improves initial page load time.
- **Reduced Memory Usage**: Fewer images in the DOM at load time means less memory usage.
- **Smooth Scrolling**: Reduces jank while scrolling by loading images in advance (using rootMargin).
- **Placeholder Optimization**: Consider using low-resolution, compressed placeholder images to ensure they load quickly.
- **Browser Support**: Falls back gracefully for browsers without IntersectionObserver, but for optimal performance, use in modern browsers.

## Accessibility Notes

- Always provide meaningful `alt` text for images to ensure screen reader compatibility.
- The component maintains the img element's native accessibility features.
- Error states are visually distinguishable and include an icon for better visibility.
- The component preserves all native image attributes through `v-bind="$attrs"`.

## Basic Usage

```vue
<template>
  <LazyImage 
    src="https://example.com/large-image.jpg"
    alt="Description of the image"
    width="400"
    height="300"
  />
</template>

<script setup>
import { LazyImage } from 'vue-company-lib'
</script>
```

## Advanced Usage Examples

### With Placeholder and Custom Styling

```vue
<template>
  <LazyImage 
    src="https://example.com/large-image.jpg"
    placeholder="https://example.com/placeholder.jpg"
    alt="Mountain landscape"
    wrapperClass="rounded-lg shadow-md"
    customClass="object-cover"
    :loadingDelay="200"
    transitionDuration="0.8s ease-in-out"
    @loaded="handleImageLoaded"
    @error="handleImageError"
  />
</template>

<script setup>
import { LazyImage } from 'vue-company-lib'

const handleImageLoaded = () => {
  console.log('Image has loaded successfully!')
}

const handleImageError = () => {
  console.error('Failed to load image')
}
</script>
```

### Custom Error Display

```vue
<template>
  <LazyImage 
    src="https://example.com/non-existent-image.jpg"
    alt="Image that will fail to load"
  >
    <template #error>
      <div class="custom-error">
        <img src="/error-icon.svg" alt="Error icon" />
        <p>Unable to load this image. Please try again later.</p>
        <button @click="retryLoading">Retry</button>
      </div>
    </template>
  </LazyImage>
</template>

<script setup>
import { LazyImage } from 'vue-company-lib'
import { ref } from 'vue'

const imageUrl = ref('https://example.com/non-existent-image.jpg')

const retryLoading = () => {
  // Force reload by changing the URL slightly
  imageUrl.value = `${imageUrl.value}?retry=${Date.now()}`
}
</script>
```

### In a Grid or List

```vue
<template>
  <div class="image-grid">
    <LazyImage 
      v-for="image in images"
      :key="image.id"
      :src="image.url"
      :alt="image.description"
      :threshold="0.2"
      wrapperClass="grid-item"
    />
  </div>
</template>

<script setup>
import { LazyImage } from 'vue-company-lib'

const images = [
  { id: 1, url: 'https://example.com/image1.jpg', description: 'Image 1' },
  { id: 2, url: 'https://example.com/image2.jpg', description: 'Image 2' },
  // More images...
]
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.grid-item {
  aspect-ratio: 16/9;
}
</style>
```

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome, Edge, Firefox, Opera | Full support |
| Safari | Full support (since Safari 12.1) |
| IE | No support for IntersectionObserver (falls back to immediate loading) |

For browsers that don't support IntersectionObserver, consider adding a polyfill:

```javascript
// In your main.js or entry file
if (!('IntersectionObserver' in window)) {
  import('intersection-observer')
}
```

