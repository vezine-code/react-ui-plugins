import React from "react";
import { useEffect, useState } from "react";
import { createUIPlugin, UIPlugin } from "./utils/uiPlugin.utils";

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
 * ```
 * @memberof @vezine/react-ui-plugins
 */
export const usePluginRenderer = (
  plugins: UIPlugin[],
  deps: unknown[] = []
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
          {plugin.render && plugin.render(pageData[`plugin_${index}`])}
        </React.Fragment>
      )),
  };
};

export { createUIPlugin, UIPlugin };
