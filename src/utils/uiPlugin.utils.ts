import { ReactNode } from "react";

const PLUGIN_PREFIX = "ui-plugin";

export type BasePluginData<T = unknown> = Record<string, T>;
export interface UIPlugin<T = unknown> {
  name?: string;
  transformData?: () => T;
  render: (data: T) => JSX.Element | ReactNode;
}

export const createUIPlugin = <T>({
  name,
  transformData,
  render,
}: UIPlugin<T>): UIPlugin<T> => {
  return { name, transformData, render };
};

export const getPluginPrefix = (index: number) => {
  const prefix = `${PLUGIN_PREFIX}-${index}`;

  return prefix;
};

export const getPluginName = (plugin: UIPlugin, index: number) => {
  return plugin?.name || getPluginPrefix(index);
};

export const initializePlugins = (plugins: UIPlugin[]) => {
  const data: BasePluginData = {};

  plugins.forEach((plugin, index) => {
    if (typeof plugin.transformData === "function") {
      const pluginName = getPluginName(plugin, index);
      data[pluginName] = plugin;
    }
  });

  return data;
};
