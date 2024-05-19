import React from "react";
import { useEffect, useState } from "react";
import {
  UIPlugin,
  BasePluginData,
  createUIPlugin,
  getPluginName,
  getPluginPrefix,
  initializePlugins,
} from "./utils/uiPlugin.utils";

/**
 * React hook for rendering an array of plugins with optional dependencies.
 *
 * This hook is designed to simplify the rendering of plugin components in a React application.
 * It manages the state of the transformed data provided by each plugin and ensures that the data
 * is updated whenever the specified dependencies change.
 *
 * @param {UIPlugin[]} plugins - The array of plugins to render. Each plugin should have a `transformData`
 *                               method to process data and a `render` method to return a React element.
 * @param {unknown[]} [deps=[]] - The array of dependencies to watch for changes. When any dependency changes,
 *                                the plugin data is re-processed.
 * @returns {Object} - An object containing the renderPlugins function.
 * @returns {function} renderPlugins - A function that returns an array of React nodes representing the rendered plugins.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import { usePluginRenderer } from '@vezine/react-ui-plugins';
 * import { MyPlugin } from './plugins/MyPlugin';
 *
 * const plugins = [MyPlugin()];
 *
 * const MyComponent = () => {
 *  const dependencies = [];
 *
 *   const { renderPlugins } = usePluginRenderer(plugins, dependencies);
 *
 *   return (
 *     <div>
 *       {renderPlugins()}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 * @memberof @vezine/react-ui-plugins
 */
export const usePluginRenderer = <T extends BasePluginData = BasePluginData>(
  plugins: UIPlugin[] | UIPlugin<Partial<T>>[],
  deps: unknown[] = []
): { renderPlugins: () => React.ReactNode[] } => {
  const [pluginData, setPluginData] = useState<BasePluginData>({});

  useEffect(() => {
    setPluginData(initializePlugins(plugins));
  }, deps);

  const renderPluginData = (plugin: UIPlugin, index: number) => {
    return plugin.render(
      pluginData[getPluginName(plugin, index)] || ({} as any)
    );
  };

  const renderPlugins = () => {
    return plugins.map((plugin, index) => (
      <React.Fragment key={getPluginPrefix(index)}>
        {renderPluginData(plugin, index)}
      </React.Fragment>
    ));
  };

  return {
    /**
     * Renders the plugins.
     *
     * @returns {React.ReactNode[]} - An array of React nodes representing the rendered plugins.
     */
    renderPlugins,
  };
};

export { createUIPlugin, UIPlugin };
