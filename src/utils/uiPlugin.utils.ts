const PLUGIN_PREFIX = "ui-plugin";

export type BasePluginData = Record<string, unknown>;
export interface UIPlugin<T = BasePluginData> {
  name?: string;
  transformData?: () => T;
  render: (data: T) => JSX.Element;
}

export const createUIPlugin = <T>({
  transformData,
  render,
}: UIPlugin<T>): UIPlugin<T> => {
  return { transformData, render };
};

export const getPluginPrefix = (index: number) => `${PLUGIN_PREFIX}-${index}`;
