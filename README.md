# Vue Company Library

A standardized Vue 3 component library for company-wide use. This library provides a set of reusable UI components built with Vue 3 and TypeScript to ensure consistency across all company applications.

[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-4.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔥 Built with Vue 3 and TypeScript
- 📦 Tree-shakable, only import what you need
- 🎨 Customizable theme
- 🌓 Full TypeScript support
- ✅ Thoroughly tested with Vitest
- 📄 Comprehensive documentation
- 🔧 Optimized for developer experience

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Button](#button)
  - [Card](#card)
- [Customization](#customization)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package using npm or yarn:

```bash
# npm
npm install vue-company-lib

# yarn
yarn add vue-company-lib

# pnpm
pnpm add vue-company-lib
```

## Usage

### Global Registration

You can register all components globally:

```ts
// main.ts
import { createApp } from 'vue'
import { install as VueCompanyLib } from 'vue-company-lib'
import App from './App.vue'

const app = createApp(App)
app.use(VueCompanyLib)
app.mount('#app')
```

### Individual Component Import

For better tree-shaking, import components individually:

```vue
<template>
  <div>
    <Button variant="primary" size="medium">Click Me</Button>
    <Card border shadow="medium">
      <template #header>Card Header</template>
      <template #default>Card Content</template>
      <template #footer>Card Footer</template>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Import components directly as named exports
import { Button, Card } from 'vue-company-lib'
</script>
```

## Components

### Button

A customizable button component with different variants and sizes.

#### Props

| Prop     | Type                                | Default    | Description                                |
|----------|-------------------------------------|------------|--------------------------------------------|
| variant  | 'primary' \| 'secondary' \| 'text'  | 'primary'  | The visual style of the button             |
| size     | 'small' \| 'medium' \| 'large'      | 'medium'   | The size of the button                     |
| disabled | boolean                             | false      | Whether the button is disabled             |

#### Slots

| Name    | Description                    |
|---------|--------------------------------|
| default | Content to display in button   |

#### Example

```vue
<Button variant="primary" size="medium">Submit</Button>
<Button variant="secondary" size="small">Cancel</Button>
<Button variant="text" :disabled="true">View Details</Button>
```

### Card

A flexible card component with header, body, and footer sections.

#### Props

| Prop    | Type                                       | Default  | Description                     |
|---------|--------------------------------------------|---------|---------------------------------|
| border  | boolean                                    | true     | Whether to show border          |
| shadow  | 'none' \| 'small' \| 'medium' \| 'large'   | 'small'  | Shadow depth                    |

#### Slots

| Name    | Description                    |
|---------|--------------------------------|
| header  | Card header content            |
| default | Main card content              |
| footer  | Card footer content            |

#### Example

```vue
<Card border :shadow="medium">
  <template #header>
    <h3>User Profile</h3>
  </template>
  
  <div>
    <p>User information and details go here</p>
  </div>
  
  <template #footer>
    <Button variant="primary">Edit Profile</Button>
  </template>
</Card>
```

## Customization

### Theme Customization

The library supports CSS variable customization for colors, spacing, and other design tokens:

```css
:root {
  --vue-company-primary-color: #3498db;
  --vue-company-secondary-color: #2ecc71;
  --vue-company-text-color: #333333;
  --vue-company-border-radius: 4px;
  /* Add more variable overrides as needed */
}
```

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-company/vue-company-lib.git
cd vue-company-lib
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm run test:unit

# Lint the codebase
npm run lint
```

## Contributing

We welcome contributions to the Vue Company Library! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation for any changes
- Make sure all tests pass before submitting a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
