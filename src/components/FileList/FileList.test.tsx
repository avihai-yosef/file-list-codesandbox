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

const scheduledFile = {
  id: 1,
  name: "smss.exe",
  device: "Stark",
  path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
  status: "scheduled"
};

const availableFile = {
  id: 2,
  name: "netsh.exe",
  device: "Targaryen",
  path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
  status: "available"
};

const getAllChecboxSelector = () =>
  screen.getByRole("checkbox", { name: "all-selector" });

const getSelectedRows = () => screen.queryAllByRole("row", { selected: true });

const getAllRows = () => screen.queryAllByRole("row");

describe("FileList Test case", () => {
  it("When no files should display empty table", () => {
    render(<FileList files={[]} />);
    const rows = getAllRows();
    expect(rows).toEqual([]);
  });
  it("Should display list of files", () => {
    const files = [scheduledFile];
    render(<FileList files={files} />);
    // TODO: query by role.
    const rows = getAllRows();
    expect(rows.length).toEqual(1);
  });

  it("Clicking a row should mark the row as selected and checked", () => {
    const files = [scheduledFile];

    render(<FileList files={files} />);

    const row = getAllRows()[0];

    expect(row.getAttribute("aria-selected")).toBe("false");
    expect(getByRole(row, "checkbox").checked).toBe(false);

    fireEvent.click(row);
    expect(row.getAttribute("aria-selected")).toBe("true");
    expect(getByRole(row, "checkbox").checked).toBe(true);
  });

  describe("Select all checkbox", () => {
    it("The select-all checkbox should be in an unselected state if no items are selected", () => {
      render(<FileList files={[scheduledFile]} />);
      const allSelector = getAllChecboxSelector();
      expect(allSelector.checked).toBe(false);
      expect(allSelector.indeterminate).toBe(false);
    });

    it("The select-all checkbox should be in a selected state if all items are selected", () => {
      render(<FileList files={[scheduledFile]} />);
      const row = getAllRows()[0];
      fireEvent.click(row);

      const allSelector = getAllChecboxSelector();
      expect(allSelector.checked).toBe(true);
      expect(allSelector.indeterminate).toBe(false);
    });

    it("The select-all checkbox should be in an indeterminate state if some but not all items are selected", () => {
      render(<FileList files={[scheduledFile, availableFile]} />);
      const row = getAllRows()[0];
      fireEvent.click(row);

      const allSelector = getAllChecboxSelector();
      expect(allSelector.checked).toBe(false);
      expect(allSelector.indeterminate).toBe(true);
    });

    it("Clicking the select-all checkbox should select all items if none or some are selected", () => {
      const files = [scheduledFile, availableFile];

      render(<FileList files={files} />);

      const allSelector = getAllChecboxSelector();

      fireEvent.click(allSelector);

      expect(allSelector.checked).toBe(true);
      expect(getSelectedRows().length).toBe(files.length);
    });

    it("Clicking the select-all checkbox should de-select all items if all are currently selected", () => {
      const files = [scheduledFile, availableFile];

      render(<FileList files={files} />);

      const allSelector = getAllChecboxSelector();

      fireEvent.click(allSelector);

      expect(getSelectedRows().length).toBe(files.length);

      fireEvent.click(allSelector);

      expect(allSelector.checked).toBe(false);

      expect(getSelectedRows().length).toBe(0);
    });
  });

  describe("Selected counter", () => {
    it("Given 2 item selected should display Selected 2", () => {
      const files = [scheduledFile, availableFile];
      render(<FileList files={files} />);

      fireEvent.click(getAllChecboxSelector());

      expect(screen.getByTestId("selected-count")).toHaveTextContent(
        "Selected 2"
      );
    });

    it("Given none selected should display None selected", () => {
      const files = [scheduledFile];

      render(<FileList files={files} />);
      expect(screen.getByTestId("selected-count")).toHaveTextContent(
        "None Selected"
      );
    });
  });
});
