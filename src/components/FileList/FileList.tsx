import React from "react";
import { File, FileStatus } from "../../types";
import styles from "./FileList.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { useFileSelection } from "./hooks";

type Props = {
  files: File[];
};

const FileList = ({ files }: Props) => {
  const {
    isSelected,
    toggleAllHandler,
    toggleRowHandler,
    selectionState,
    selectedCount
  } = useFileSelection(files);

  const filesForDownload = files.filter((f) => isSelected(f));

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Checkbox
          checked={selectionState.all}
          indeterminate={selectionState.partial}
          onChange={toggleAllHandler}
          aria-label="all-selector"
          className={styles.allSelector}
        />
        <SelectedCount count={selectedCount} />
        <DownloadButton files={filesForDownload} isSelected={isSelected} />
      </div>
      <table data-testid="table" className={styles.table}>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <Row
              key={file.id}
              file={file}
              selected={isSelected(file)}
              disabled={file.status !== FileStatus.Available}
              onSelect={toggleRowHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO: extract to seperate file with css
function SelectedCount({ count }: { count: number }) {
  return (
    <span data-testid="selected-count">
      {count > 0 ? `Selected ${count}` : "None Selected"}
    </span>
  );
}

// TODO: extract to seperate file with css
function DownloadButton({ files }: { files: File[] }) {
  const handleDownload = () => {
    const formattedMessage = files
      .map((f) => `Path: ${f.path}, Device: ${f.device}`)
      .join("\n");

    alert(formattedMessage);
  };
  return (
    <button
      className={styles.downloadBtn}
      disabled={files.length === 0}
      onClick={handleDownload}
    >
      Download Selected
    </button>
  );
}

function Row({
  file,
  selected,
  disabled,
  onSelect
}: {
  file: File;
  selected: boolean;
  disabled: boolean;
  onSelect: (file: File) => void;
}) {
  const onClick = () => !disabled && onSelect(file);
  return (
    <tr
      className={styles.row}
      onClick={onClick}
      aria-selected={selected}
      aria-disabled={disabled}
    >
      <td>
        <Checkbox checked={selected} disabled={disabled} readOnly />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
