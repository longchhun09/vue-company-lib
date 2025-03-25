import type { Meta, StoryObj } from '@storybook/vue3';
import LazyImage from '../components/LazyImage.vue';

// Meta information for the component
const meta = {
  title: 'Components/LazyImage',
  component: LazyImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image',
    },
    placeholder: {
      control: 'text',
      description: 'URL of a placeholder image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the image',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the image',
    },
    wrapperClass: {
      control: 'text',
      description: 'CSS class for the wrapper div',
    },
    customClass: {
      control: 'text',
      description: 'CSS class for the image',
    },
    threshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Intersection Observer threshold',
    },
    loadingDelay: {
      control: { type: 'number', min: 0, max: 5000, step: 100 },
      description: 'Delay in milliseconds before showing the loaded image',
    },
    transitionDuration: {
      control: 'text',
      description: 'CSS transition duration for fading effects',
    },
    onLoaded: { action: 'loaded' },
    onError: { action: 'error' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A lazy-loading image component that loads images only when they enter the viewport, optimizing page performance.'
      }
    }
  }
} satisfies Meta<typeof LazyImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image URLs for the stories
const sampleImageUrl = 'https://picsum.photos/800/400';
const placeholderImageUrl = 'https://picsum.photos/200/100?blur=2';
const brokenImageUrl = 'https://example.com/nonexistent-image.jpg';

// Basic usage story
export const Basic: Story = {
  args: {
    src: sampleImageUrl,
    alt: 'Sample image',
    width: 800,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the LazyImage component with only required props.'
      }
    }
  }
};

// With placeholder image
export const WithPlaceholder: Story = {
  args: {
    ...Basic.args,
    placeholder: placeholderImageUrl,
  },
  parameters: {
    docs: {
      description: {
        story: 'LazyImage with a low-resolution placeholder image that displays while the main image loads.'
      }
    }
  }
};

// With loading delay
export const WithLoadingDelay: Story = {
  args: {
    ...WithPlaceholder.args,
    loadingDelay: 1500,
  },
  parameters: {
    docs: {
      description: {
        story: 'LazyImage with a 1.5 second artificial delay to simulate slow network conditions.'
      }
    }
  }
};

// Error handling
export const ErrorState: Story = {
  args: {
    ...Basic.args,
    src: brokenImageUrl,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles failed image loads.'
      }
    }
  }
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    ...Basic.args,
    wrapperClass: 'custom-wrapper',
    customClass: 'custom-image',
    width: 400,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'LazyImage with custom CSS classes and dimensions.'
      }
    }
  },
  decorators: [
    () => ({
      template: `
        <div style="padding: 20px; background-color: #f0f0f0;">
          <style>
            .custom-wrapper {
              border: 2px solid #3b82f6;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .custom-image {
              border-radius: 8px;
            }
          </style>
          <story />
        </div>
      `,
    }),
  ],
};

// Different transition durations
export const CustomTransition: Story = {
  args: {
    ...Basic.args,
    transitionDuration: '1.5s ease-in-out',
  },
  parameters: {
    docs: {
      description: {
        story: 'LazyImage with a slower and different easing transition effect.'
      }
    }
  }
};

// Gallery example with multiple images
export const Gallery: Story = {
  render: (args) => ({
    components: { LazyImage },
    setup() {
      const images = [
        { src: 'https://picsum.photos/id/10/800/600', alt: 'Nature landscape 1' },
        { src: 'https://picsum.photos/id/11/800/600', alt: 'Nature landscape 2' },
        { src: 'https://picsum.photos/id/12/800/600', alt: 'Nature landscape 3' },
        { src: 'https://picsum.photos/id/13/800/600', alt: 'Nature landscape 4' },
        { src: 'https://picsum.photos/id/14/800/600', alt: 'Nature landscape 5' },
        { src: 'https://picsum.photos/id/15/800/600', alt: 'Nature landscape 6' },
      ];
      return { images, ...args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
        <LazyImage
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          :placeholder="args.placeholder"
          :loadingDelay="args.loadingDelay"
          :transitionDuration="args.transitionDuration"
          style="aspect-ratio: 4/3;"
        />
      </div>
    `,
  }),
  args: {
    src: 'https://picsum.photos/800/600', // Default src as fallback
    placeholder: placeholderImageUrl,
    loadingDelay: 0,
    transitionDuration: '0.5s ease',
  },
  parameters: {
    docs: {
      description: {
        story: 'A gallery implementation showing how LazyImage can be used in a grid layout.'
      }
    }
  }
};

// Responsive example
export const Responsive: Story = {
  args: {
    src: 'https://picsum.photos/1200/600',
    alt: 'Responsive image',
    placeholder: 'https://picsum.photos/300/150?blur=2',
    width: '100%',
    height: 'auto',
    loadingDelay: 0,
    transitionDuration: '0.5s'
  },
  render: () => ({
    components: { LazyImage },
    template: `
      <div>
        <h3>The image below is responsive and will adapt to the container width</h3>
        <div style="width: 100%; max-width: 800px; margin: 0 auto;">
          <LazyImage
            src="https://picsum.photos/1200/600"
            alt="Responsive image"
            placeholder="https://picsum.photos/300/150?blur=2"
            style="width: 100%; height: auto;"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'An example showing how LazyImage can be used in responsive layouts.'
      }
    }
  }
};

