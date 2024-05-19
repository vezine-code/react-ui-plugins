# @vezine/react-ui-plugins

A React library providing a custom hook for rendering an array of plugins with optional dependencies.

## Installation

To install the library, use npm or yarn:

```bash
npm install @vezine/react-ui-plugins
# or
yarn add @vezine/react-ui-plugins
```

## Usage

The `usePluginRenderer` hook simplifies the rendering of plugin components in a React application. It manages the state of the transformed data provided by each plugin and ensures that the data is updated whenever the specified dependencies change.

### Example

Here is an example of how to use the `usePluginRenderer` hook:

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

### Example Plugin

Below is an example of a plugin implementation using the `createPagePlugin` utility:

```tsx
import { createPagePlugin } from "../../../utils/pagePlugin.utils";
import SampleComponent from "../SampleComponent";

export const SamplePlugin = () =>
  createPagePlugin<{ title?: string; description?: string }>({
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

## API

### usePluginRenderer

A custom hook for rendering an array of plugins with optional dependencies.

#### Type Parameters

- `T`: The type of the plugins. Each plugin should conform to the `PagePlugin` interface.
- `K`: The type of the dependencies. These are used to determine when to re-run the effect that processes the plugin data.

#### Parameters

- `plugins` (`T[]`): The array of plugins to render. Each plugin should have a `transformData` method to process data and a `render` method to return a React element.
- `deps` (`K[]`, optional): The array of dependencies to watch for changes. When any dependency changes, the plugin data is re-processed.

#### Returns

An object containing the `renderPlugins` function.

- `renderPlugins` (`function`): A function that returns an array of React nodes representing the rendered plugins.

## License

MIT
