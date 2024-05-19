export interface UIPlugin<T = unknown> {
  transformData?: () => T;
  render: (data: T) => JSX.Element;
}

export const createUIPlugin = <T>({
  transformData,
  render,
}: UIPlugin<T>): UIPlugin<T> => {
  return { transformData, render };
};
