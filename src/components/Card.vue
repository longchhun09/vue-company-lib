<script setup lang="ts">
export interface CardProps {
  /** Controls the border style of the card */
  border?: 'none' | 'default' | 'rounded' | 'circle' | string;
  /** Controls the shadow effect of the card */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | string;
  /** Card width (CSS value) */
  width?: string;
  /** Card background color */
  backgroundColor?: string;
  /** Card padding (CSS value) */
  padding?: string;
  /** Card margin (CSS value) */
  margin?: string;
  /** Enables/disables hover effect */
  hover?: boolean;
  /** Custom CSS class */
  customClass?: string;
}

withDefaults(defineProps<CardProps>(), {
  border: 'default',
  shadow: 'md',
  width: 'auto',
  backgroundColor: 'white',
  padding: '1rem',
  margin: '0',
  hover: false,
  customClass: '',
});
</script>

<template>
  <div
    class="vue-company-card"
    :class="[
      `border-${border}`,
      `shadow-${shadow}`,
      { 'hover-effect': hover },
      customClass
    ]"
    :style="{
      width,
      backgroundColor,
      padding,
      margin
    }"
  >
    <!-- Card Header -->
    <div v-if="$slots.header" class="vue-company-card-header">
      <slot name="header"></slot>
    </div>

    <!-- Card Body -->
    <div class="vue-company-card-body">
      <slot></slot>
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="vue-company-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.vue-company-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.vue-company-card.border-none {
  border: none;
}

.vue-company-card.border-default {
  border: 1px solid #e2e8f0;
}

.vue-company-card.border-rounded {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.vue-company-card.border-circle {
  border: 1px solid #e2e8f0;
  border-radius: 50%;
}

.vue-company-card.shadow-none {
  box-shadow: none;
}

.vue-company-card.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.vue-company-card.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.vue-company-card.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.vue-company-card.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.vue-company-card.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.15);
}

.vue-company-card-header {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.vue-company-card-body {
  flex: 1;
  padding: 0.75rem 0;
}

.vue-company-card-footer {
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}
</style>

