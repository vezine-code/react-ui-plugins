# @vezine/react-ui-plugins

A React library providing a custom hook for rendering an array of plugins with optional dependencies.

## Why is this useful?

Building feature-heavy React components can often lead to extensive and complex render functions, making it difficult to maintain and extend the codebase. This complexity can result in confusion and increased risk of introducing bugs when adding new features or modifying existing ones.

### Benefits of Plugin Architecture

- **Modularity**: Each plugin component is developed and maintained in isolation, ensuring that changes in one plugin do not affect others.
- **Maintainability**: Isolated plugin components simplify the code structure, making it easier to understand, maintain, and debug.
- **Scalability**: The plugin architecture allows you to add new features easily by simply integrating new plugins, promoting a scalable and flexible codebase.
- **Reduced Risk**: By isolating features into separate plugins, you minimize the risk of breaking existing functionality when introducing changes.

### Example Scenario

Consider a dashboard application with various widgets such as charts, tables, and forms. Using a plugin architecture, each widget can be developed as a separate plugin. This approach allows developers to focus on individual widgets without worrying about the overall dashboard complexity. New widgets can be added or existing ones modified independently, ensuring the dashboard remains robust and maintainable.

By adopting a plugin architecture, you can enhance the modularity, maintainability, and scalability of your React components, leading to a more manageable and flexible codebase.

## Installation

To install the library, use npm or yarn:

```bash
npm install @vezine/react-ui-plugins
# or
yarn add @vezine/react-ui-plugins
```

## Usage

The `usePluginRenderer` hook simplifies the rendering of plugin components in a React application. It manages the state of the transformed data provided by each plugin and ensures that the data is updated whenever the specified dependencies change.

## Example

In this example, we use the plugin architecture to conditionally render only the necessary plugins, improving performance and maintainability.

```tsx
import React from 'react';
import { usePluginRenderer } from '@vezine/react-ui-plugins';
import { SamplePlugin } from './plugins/SamplePlugin';

const plugins = [SamplePlugin()];

const MyComponent = () => {
  const dependencies = [] // Optional
  const intitialState = {} // Optional

  const { renderPlugins } = usePluginRenderer(
    plugins, 
    dependencies, 
    intitialState
    );

  return (
    <div>
      {renderPlugins()}
    </div>
  );
};

export default MyComponent;
```

### 🌟 Benefits of This Approach

- **🚀 Performance**: Only the necessary plugins are rendered, resulting in a faster and more efficient application.
- **🛠️ Maintainability**: Isolating plugin components simplifies the code structure, making it easier to manage and debug.
- **🔧 Flexibility**: Allows for dynamic and conditional rendering based on user interactions or specific conditions.

By adopting this approach, you can enhance the overall performance, maintainability, and flexibility of your application.

## Example: Conditional Plugin Rendering

Rendering a single plugin based on specific conditions:

```tsx
import React, { useState } from 'react';
import { usePluginRenderer } from '@vezine/react-ui-plugins';
import { PluginA, PluginB, PluginC } from './plugins';

const plugins = [PluginA(), PluginB(), PluginC()];

const MyComponent = () => {
  const [activePlugin, setActivePlugin] = useState('PluginA');
  const { renderPlugins } = usePluginRenderer(
    plugins.filter(plugin => plugin.name === activePlugin),
    [activePlugin]
  );

  return (
    <div>
      <button onClick={() => setActivePlugin('PluginA')}>Show Plugin A</button>
      <button onClick={() => setActivePlugin('PluginB')}>Show Plugin B</button>
      <button onClick={() => setActivePlugin('PluginC')}>Show Plugin C</button>
      {renderPlugins()}
    </div>
  );
};

export default MyComponent;
```

### Example Plugin Creation

Below is an example of a plugin implementation using the `createUIPlugin` utility:

```tsx
import { createUIPlugin } from "@vezine/react-ui-plugins";
import SampleComponent from "../SampleComponent";

export const SamplePlugin = () =>
  createUIPlugin<{ title?: string; description?: string }>({
    transformData: () => {
      return {
        title: "Sample Title",
        description: "This is a sample description for the plugin.",
      };
    },
    render: ({ title, description } = { title: "" }) => {
      return <SampleComponent title={title} description={description} />;
    },
  });
```

## The Old Way: Regularly Rendering All Components 🚫

In this example, all components are rendered regardless of whether they are needed or not. This can lead to performance issues and unnecessary complexity in the codebase.

```tsx
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
};

export default Dashboard;
```

### ⚠️ Issues with This Approach

- **🐢 Performance**: Rendering all components even when they are not needed can slow down the application.
- **🔄 Complexity**: Managing and maintaining a large number of components in a single render function can lead to confusion and increase the risk of bugs.
- **❌ Lack of Flexibility**: This approach does not allow for dynamic rendering based on user interactions or specific conditions.

## The New Way: Conditional Plugin Rendering ✅

In this example, we use the plugin architecture to conditionally render only the necessary plugins, improving performance and maintainability.

```tsx
import React from 'react';
import { usePluginRenderer } from '@vezine/react-ui-plugins';
import { SamplePlugin } from './plugins/SamplePlugin';

const plugins = [SamplePlugin()];

const MyComponent = () => {
  const { renderPlugins } = usePluginRenderer(plugins, []);

  return (
    <div>
      {renderPlugins()}
    </div>
  );
};

export default MyComponent;
```

### 🌟 Benefits of This Approach

- **🚀 Performance**: Only the necessary plugins are rendered, resulting in a faster and more efficient application.
- **🛠️ Maintainability**: Isolating plugin components simplifies the code structure, making it easier to manage and debug.
- **🔧 Flexibility**: Allows for dynamic and conditional rendering based on user interactions or specific conditions.

### Example of a Sample Plugin

Below is an example of what a sample plugin might look like. This plugin can be used with the `usePluginRenderer` hook to demonstrate conditional plugin rendering.

```tsx
import { createUIPlugin } from '@vezine/react-ui-plugins/utils/uiPlugin.utils';
import SampleComponent from './SampleComponent';

export const SamplePlugin = () =>
  createUIPlugin<{ title?: string; description?: string }>({
    transformData: () => {
      return {
        title: "Sample Title",
        description: "This is a sample description for the plugin.",
      };
    },
    render: ({ title, description } = { title: "" }) => {
      return <SampleComponent title={title} description={description} />;
    },
  });
```

### Sample Component

Here is the `SampleComponent` used in the plugin:

```tsx
import React from 'react';

const SampleComponent = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SampleComponent;
```

By adopting this approach, you can enhance the overall performance, maintainability, and flexibility of your application.

## API

### usePluginRenderer

A custom hook for rendering an array of plugins with optional dependencies.

#### Type Parameters

- `UIPlugin`: The type of the plugins. Each plugin should conform to the `UIPlugin` interface.
- `unknown`: The type of the dependencies. These are used to determine when to re-run the effect that processes the plugin data.

#### Parameters

- `plugins` (`UIPlugin[]`): The array of plugins to render. Each plugin should have a `transformData` method to process data and a `render` method to return a React element.
- `deps` (`unknown[]`, optional): The array of dependencies to watch for changes. When any dependency changes, the plugin data is re-processed.

#### Returns

An object containing the `renderPlugins` function.

- `renderPlugins` (`function`): A function that returns an array of React nodes representing the rendered plugins.

## What is Vezine?

Vezine is a cutting-edge toolkit designed to enhance the web development experience. Inspired by the need for modularity and flexibility, Vezine offers a powerful set of features that streamline the creation of robust web applications, supporting various design patterns and architectural paradigms.

## Who is the Author?

Wayne P is a seasoned Solution Engineer with several years of experience in web development. He is driven by a passion for simplifying complexity in the realm of UI development. Wayne believes in the philosophy: "When it's hard, make it easy," and strives to create solutions that enhance the development experience by making complex tasks more manageable and intuitive. Tweet him @djstylzdc

## License

MIT
