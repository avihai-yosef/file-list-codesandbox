import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByRole
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FileList from "./FileList";

describe("FileList Test case", () => {
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

  it("Clicking a row should mark the row as selected and checked", () => {
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

    const row = screen.queryAllByTestId("row")[0];

    expect(row.getAttribute("aria-selected")).toBe("false");
    expect(getByRole(row, "checkbox").checked).toBe(false);

    fireEvent.click(row);
    expect(row.getAttribute("aria-selected")).toBe("true");
    expect(getByRole(row, "checkbox").checked).toBe(true);
  });
});
