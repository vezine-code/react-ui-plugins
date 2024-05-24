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
 * Represents the return type of the PluginRenderer function.
 */
/**
 * Represents the return type of the PluginRenderer.
 */
interface PluginRendererReturn {
  /**
   * Renders the plugins with the given props.
   * @param props - (Optional) The props to be passed to the plugins.
   * @returns An array of React nodes representing the rendered plugins.
   */
  renderPlugins: <T>(props?: T) => React.ReactNode[];

  /**
   * Renders the plugins with the given props.
   * @param props - (Optional) The props to be passed to the plugins.
   * @returns A JSX element representing the rendered plugins.
   */
  RenderPlugins: <T>(props: T) => JSX.Element[];
}

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
): PluginRendererReturn => {
  const [pluginCache, setPluginCache] = useState<BasePluginData>({});

  useEffect(() => {
    setPluginCache(initializePlugins(plugins));
  }, deps);

  const renderPluginData = <T,>(plugin: UIPlugin, index: number, props: T) => {
    const pluginName = getPluginName(plugin, index);
    const pluginObj = pluginName ? pluginCache[pluginName] : ({} as any);
    const pluginData = pluginObj?.transformData();
    const pluginProps = { ...pluginData, ...props };

    return plugin.render(pluginProps);
  };

  const renderPlugins = <T,>(props?: T) => {
    return plugins.map((plugin, index) => (
      <React.Fragment key={getPluginPrefix(index)}>
        {renderPluginData(plugin, index, props)}
      </React.Fragment>
    ));
  };

  const RenderPlugins = <T,>(props: T) => renderPlugins(props);

  return {
    /**
     * Renders the plugins.
     *
     * @returns {React.ReactNode[]} - An array of React nodes representing the rendered plugins.
     */
    renderPlugins,
    RenderPlugins,
  } as any;
};

export { createUIPlugin, UIPlugin };
