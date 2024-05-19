import React from "react";
import { useEffect, useState } from "react";
import { createUIPlugin, UIPlugin } from "./utils/pagePlugin.utils";

/**
 * React hook for rendering an array of plugins with optional dependencies.
 *
 * This hook is designed to simplify the rendering of plugin components in a React application.
 * It manages the state of the transformed data provided by each plugin and ensures that the data
 * is updated whenever the specified dependencies change.
 *
 * @template T - The type of the plugins. Each plugin should conform to the `UIPlugin` interface.
 * @template K - The type of the dependencies. These are used to determine when to re-run the effect
 *               that processes the plugin data.
 * @param {T[]} plugins - The array of plugins to render. Each plugin should have a `transformData`
 *                        method to process data and a `render` method to return a React element.
 * @param {K[]} [deps=[]] - The array of dependencies to watch for changes. When any dependency changes,
 *                          the plugin data is re-processed.
 * @returns {Object} - An object containing the renderPlugins function.
 * @returns {function} renderPlugins - A function that returns an array of React nodes representing the rendered plugins.
 *
 * @example
 * // Example usage of the usePluginRenderer hook
 * import React from 'react';
 * import { usePluginRenderer } from '@vezine/react-ui-plugins';
 * import { MyPlugin } from './plugins/MyPlugin';
 *
 * const plugins = [MyPlugin()];
 *
 * const MyComponent = () => {
 *   const { renderPlugins } = usePluginRenderer(plugins, [someDependency]);
 *
 *   return (
 *     <div>
 *       {renderPlugins()}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 *
 * @memberof @vezine/react-ui-plugins
 */

export const usePluginRenderer = <T extends UIPlugin, K>(
  plugins: T[],
  deps: K[] = []
): { renderPlugins: () => React.ReactNode[] } => {
  const [pageData, setPageData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const data: Record<string, unknown> = {};

    plugins.forEach((plugin, index) => {
      if (typeof plugin.transformData === "function") {
        data[`plugin_${index}`] = plugin.transformData();
      }
    });

    setPageData(data);
  }, deps);

  return {
    /**
     * Renders the plugins.
     *
     * @returns {React.ReactNode[]} - An array of React nodes representing the rendered plugins.
     */
    renderPlugins: (): React.ReactNode[] =>
      plugins.map((plugin, index) => (
        <React.Fragment key={`plugin_${index}`}>
          {plugin.render(pageData[`plugin_${index}`])}
        </React.Fragment>
      )),
  };
};

export { createUIPlugin, UIPlugin };
