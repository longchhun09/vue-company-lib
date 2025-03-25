// Import components

// Import all components
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import type { App } from 'vue'
// Note: You may need to update these imports based on your actual component files
// This is a starter template to export components from the library

// Example of synchronous component imports
// import Modal from './components/Modal.vue'

// Define components object to hold all exportable components
const components: Record<string, any> = {
  Button,
  Card,
  // Modal,
  // Add more components here as they are created
}

// Auto-register all components with Vue app when used with app.use()
export function install(app: App): App {
  for (const componentName in components) {
    app.component(componentName, components[componentName])
  }
  return app
}

// Named exports for individual component imports
export { Button, Card }

// Export the components object as a named export
export { components }

