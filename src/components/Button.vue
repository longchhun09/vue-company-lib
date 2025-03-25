<script setup lang="ts">
interface ButtonProps {
  /**
   * The visual style variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * HTML button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button'
});

// Emit click event
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

// Handle button click
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="[
      'vue-button',
      `vue-button--${variant}`,
      `vue-button--${size}`,
      { 'vue-button--disabled': disabled }
    ]"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.vue-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* Size variants */
.vue-button--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.vue-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.vue-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Color variants */
.vue-button--primary {
  background-color: #3490dc;
  color: white;
  border-color: #3490dc;
}

.vue-button--primary:hover:not(.vue-button--disabled) {
  background-color: #2779bd;
  border-color: #2779bd;
}

.vue-button--secondary {
  background-color: #6c757d;
  color: white;
  border-color: #6c757d;
}

.vue-button--secondary:hover:not(.vue-button--disabled) {
  background-color: #5a6268;
  border-color: #5a6268;
}

.vue-button--success {
  background-color: #38c172;
  color: white;
  border-color: #38c172;
}

.vue-button--success:hover:not(.vue-button--disabled) {
  background-color: #2d9d5f;
  border-color: #2d9d5f;
}

.vue-button--danger {
  background-color: #e3342f;
  color: white;
  border-color: #e3342f;
}

.vue-button--danger:hover:not(.vue-button--disabled) {
  background-color: #cc1f1a;
  border-color: #cc1f1a;
}

.vue-button--warning {
  background-color: #ffed4a;
  color: #333;
  border-color: #ffed4a;
}

.vue-button--warning:hover:not(.vue-button--disabled) {
  background-color: #ffe817;
  border-color: #ffe817;
}

.vue-button--info {
  background-color: #6cb2eb;
  color: white;
  border-color: #6cb2eb;
}

.vue-button--info:hover:not(.vue-button--disabled) {
  background-color: #4aa0e6;
  border-color: #4aa0e6;
}

/* Disabled state */
.vue-button--disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>

