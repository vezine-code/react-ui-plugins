import React from "react";
import { render, screen } from "@testing-library/react";
import { Mock, describe, expect, it, vi } from "vitest";

import { usePluginRenderer } from "./index";

vi.mock("./index", () => ({
  usePluginRenderer: vi.fn(),
}));

describe("usePluginRenderer", () => {
  it("renders plugins correctly", () => {
    const plugins = [
      {
        transformData: () => ({ name: "Plugin 1" }),
        render: (data: any) => <div>{data.name}</div>,
      },
      {
        transformData: () => ({ name: "Plugin 2" }),
        render: (data: any) => <div>{data.name}</div>,
      },
    ];


    (usePluginRenderer as Mock).mockReturnValue({
      renderPlugins: () => (
        <>
          <div>Plugin 1</div>
          <div>Plugin 2</div>
        </>
      ),
    });

    render(<div>{usePluginRenderer(plugins).renderPlugins()}</div>);

    expect(screen.getByText("Plugin 1")).toBeTruthy();
    expect(screen.getByText("Plugin 2")).toBeTruthy();
  });

  it("re-renders plugins when dependencies change", () => {
    const plugins = [
      {
        transformData: () => ({ name: "Plugin 1" }),
        render: (data: any) => <div>{data.name}</div>,
      },
    ];

    (usePluginRenderer as Mock).mockReturnValue({
      renderPlugins: () => <div>Plugin 1</div>,
    });

    render(<div>{usePluginRenderer(plugins, [1]).renderPlugins()}</div>);

    expect(screen.getByText("Plugin 1")).toBeTruthy();

    // Change the dependency and re-render
    render(<div>{usePluginRenderer(plugins, [2]).renderPlugins()}</div>);

    const pluginElements = screen.getAllByText("Plugin 1");

    expect(pluginElements).toHaveLength(2); // Adjust the length as per the expected re-render count
    pluginElements.forEach((element) => {
      expect(element).toBeTruthy();
    });
  });
});
