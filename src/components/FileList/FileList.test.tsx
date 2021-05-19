import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FileList from "./FileList";

describe("FileList Test case", async () => {
  it("When no files should display empty table", () => {
    render(<FileList files={[]} />);
    const rows = screen.queryAllByTestId("row");
    expect(rows).toEqual([]);
  });
  it("Should display list of files", () => {
    const files = [
      {
        id: 1,
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled"
      }
    ];
    render(<FileList files={files} />);
    // TODO: query by role.
    const rows = screen.queryAllByTestId("row");
    expect(rows.length).toEqual(1);
  });
});
