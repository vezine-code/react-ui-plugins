import React from "react";
import { useEffect, useState } from "react";
import {
  BasePluginData,
  createUIPlugin,
  getPluginPrefix,
  UIPlugin,
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
 * @param {Record<string, unknown>} [initialState={}] - The initial state of the transformed data.
 *                                                      This state is used to initialize the `pageData` state
 *                                                      and ensures that the plugins have defined values during
 *                                                      the initial render.
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
 *  const initialState = {}
 *
 *   const { renderPlugins } = usePluginRenderer(
 *    plugins,
 *    dependencies,
 *    initialState
 *   );
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
  const [pageData, setPageData] = useState<BasePluginData>({});

  useEffect(() => {
    const data: BasePluginData = {};

    plugins.forEach((plugin, index) => {
      if (typeof plugin.transformData === "function") {
        const pluginName = plugin?.name;
        data[pluginName || getPluginPrefix(index)] = plugin.transformData();
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
        <React.Fragment key={getPluginPrefix(index)}>
          {plugin.render(
            pageData[plugin?.name || getPluginPrefix(index)] || ({} as any)
          )}
        </React.Fragment>
      )),
  };
};

export { createUIPlugin, UIPlugin };
