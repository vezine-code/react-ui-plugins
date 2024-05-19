const PLUGIN_PREFIX = "ui-plugin";

export type BasePluginData<T = unknown> = Record<string, Required<T>>;
export interface UIPlugin<T = BasePluginData> {
  name?: string;
  transformData?: () => Required<T>;
  render: (data: Required<T>) => JSX.Element;
}

export const createUIPlugin = <T,>({
  transformData,
  render,
}: UIPlugin<T>): UIPlugin<T> => {
  return { transformData, render };
};

export const getPluginPrefix = (index: number) => `${PLUGIN_PREFIX}-${index}`;

export const initializePlugins = (plugins: UIPlugin[]) => {
  const data: BasePluginData = {};

  plugins.forEach((plugin, index) => {
    if (typeof plugin.transformData === "function") {
      const pluginName = plugin.name || getPluginPrefix(index);
      data[pluginName] = plugin.transformData();
    }
  });

  return data;
};

export const getPluginName = (plugin: UIPlugin, index: number) => {
  return plugin?.name || getPluginPrefix(index);
};
