<template>
  <div class="example-container">
    <h1>Vue Company Library Components</h1>
    
    <!-- Button Component Examples -->
    <section class="component-section">
      <h2>Button Component</h2>
      <p>
        The Button component is a versatile UI element that can be customized using the
        <code>variant</code> and <code>size</code> props. It accepts content through its
        default slot.
      </p>

      <div class="demo-row">
        <div class="demo-item">
          <h3>Variants</h3>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="warning">Warning Button</Button>
          <Button variant="info">Info Button</Button>
        </div>

        <div class="demo-item">
          <h3>Sizes</h3>
          <Button size="small" variant="primary">Small Button</Button>
          <Button size="medium" variant="primary">Medium Button</Button>
          <Button size="large" variant="primary">Large Button</Button>
        </div>
      </div>

      <div class="code-example">
        <pre><code>
&lt;Button variant="primary"&gt;Primary Button&lt;/Button&gt;
&lt;Button variant="secondary" size="large"&gt;Large Secondary Button&lt;/Button&gt;
        </code></pre>
      </div>
    </section>

    <!-- Card Component Examples -->
    <section class="component-section">
      <h2>Card Component</h2>
      <p>
        The Card component provides a flexible container with optional header, body, and footer
        sections. You can customize its appearance using the <code>border</code> and
        <code>shadow</code> props.
      </p>

      <div class="demo-row">
        <div class="demo-item">
          <h3>Basic Card</h3>
          <Card>
            <template #header>
              <h3>Card Header</h3>
            </template>
            <template #default>
              <p>This is the main content of the card.</p>
              <p>You can place any content here.</p>
            </template>
            <template #footer>
              <p>Card Footer</p>
            </template>
          </Card>
        </div>

        <div class="demo-item">
          <h3>Card with Shadow</h3>
          <Card shadow="large">
            <template #header>
              <h3>Card with Shadow</h3>
            </template>
            <template #default>
              <p>This card has a large shadow effect.</p>
              <Button variant="primary" size="small">Action Button</Button>
            </template>
          </Card>
        </div>
      </div>

      <div class="demo-item">
        <h3>Card with Border</h3>
        <Card border="rounded">
          <template #header>
            <h3>Card with Rounded Border</h3>
          </template>
          <template #default>
            <p>This card has rounded borders and contains a button.</p>
            <Button variant="secondary">Learn More</Button>
          </template>
          <template #footer>
            <small>Last updated: October 2023</small>
          </template>
        </Card>
      </div>

      <div class="code-example">
        <pre><code>
&lt;Card shadow="medium" border="rounded"&gt;
  &lt;template #header&gt;
    &lt;h3&gt;Card Title&lt;/h3&gt;
  &lt;/template&gt;
  &lt;template #default&gt;
    &lt;p&gt;Card content goes here.&lt;/p&gt;
    &lt;Button variant="primary"&gt;Action&lt;/Button&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;small&gt;Footer information&lt;/small&gt;
  &lt;/template&gt;
&lt;/Card&gt;
        </code></pre>
      </div>
    </section>

    <!-- Combined Usage Example -->
    <section class="component-section">
      <h2>Combining Components</h2>
      <p>
        Components can be easily combined to create more complex UI elements.
        Here's an example of a Card with multiple Buttons:
      </p>

      <div class="demo-item">
        <Card shadow="medium" border="rounded">
          <template #header>
            <h3>Product Details</h3>
          </template>
          <template #default>
            <p>This premium product offers excellent features and benefits.</p>
            <div class="button-group">
              <Button variant="primary" size="medium">Buy Now</Button>
              <Button variant="secondary" size="medium">Add to Cart</Button>
              <Button variant="info" size="small">Learn More</Button>
            </div>
          </template>
          <template #footer>
            <p>Free shipping on orders over $50</p>
          </template>
        </Card>
      </div>

      <div class="code-example">
        <pre><code>
&lt;Card shadow="medium" border="rounded"&gt;
  &lt;template #header&gt;
    &lt;h3&gt;Product Details&lt;/h3&gt;
  &lt;/template&gt;
  &lt;template #default&gt;
    &lt;p&gt;Product description here.&lt;/p&gt;
    &lt;div class="button-group"&gt;
      &lt;Button variant="primary" size="medium"&gt;Buy Now&lt;/Button&gt;
      &lt;Button variant="secondary" size="medium"&gt;Add to Cart&lt;/Button&gt;
      &lt;Button variant="info" size="small"&gt;Learn More&lt;/Button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;p&gt;Free shipping information&lt;/p&gt;
  &lt;/template&gt;
&lt;/Card&gt;
        </code></pre>
      </div>
    </section>

    <!-- LazyImage Component Examples -->
    <section class="component-section">
      <h2>LazyImage Component</h2>
      <p>
        The LazyImage component optimizes image loading performance by using the Intersection Observer API 
        to load images only when they enter the viewport. It provides placeholder display while 
        images are loading and handles loading errors gracefully.
      </p>

      <div class="demo-row">
        <div class="demo-item">
          <h3>Basic Image Loading</h3>
          <LazyImage 
            src="https://picsum.photos/400/300" 
            alt="Random sample image"
            width="400"
            height="300"
          />
        </div>

        <div class="demo-item">
          <h3>With Custom Placeholder</h3>
          <LazyImage 
            src="https://picsum.photos/400/300?random=2" 
            placeholder-src="https://via.placeholder.com/400x300?text=Loading..."
            alt="Image with custom placeholder"
            width="400"
            height="300"
          />
        </div>
      </div>

      <div class="demo-row">
        <div class="demo-item">
          <h3>With Loading Delay</h3>
          <LazyImage 
            src="https://picsum.photos/400/300?random=3" 
            alt="Image with loading delay"
            delay="1000"
            width="400"
            height="300"
          />
          <p class="note">This image has a 1 second artificial loading delay</p>
        </div>

        <div class="demo-item">
          <h3>With Custom Transition</h3>
          <LazyImage 
            src="https://picsum.photos/400/300?random=4" 
            alt="Image with custom transition"
            transition="slide"
            width="400"
            height="300"
          />
        </div>
      </div>

      <div class="code-example">
        <pre><code>
&lt;!-- Basic usage --&gt;
&lt;LazyImage 
  src="https://example.com/image.jpg" 
  alt="Description of image"
  width="400"
  height="300"
/&gt;

&lt;!-- Advanced usage with options --&gt;
&lt;LazyImage 
  src="https://example.com/image.jpg" 
  placeholder-src="https://example.com/placeholder.jpg"
  alt="Description of image"
  width="400"
  height="300"
  transition="fade"
  delay="500"
  error-src="https://example.com/error.jpg"
/&gt;
        </code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button, Card, LazyImage } from '../index';
</script>

<style scoped>
.example-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.component-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eaeaea;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.demo-item {
  flex: 1;
  min-width: 300px;
  margin-bottom: 1.5rem;
}

.demo-item h3 {
  margin-bottom: 1rem;
  color: #555;
}

.code-example {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

pre {
  margin: 0;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.note {
  font-size: 0.875rem;
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}
</style>
