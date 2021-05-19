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

  const filesForDownload = files.filter(
    (f) => isSelected(f) && f.status === FileStatus.Available
  );

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
        <DownloadButton files={filesForDownload} />
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
              isSelected={isSelected(file)}
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
  isSelected,
  onSelect
}: {
  file: File;
  isSelected: boolean;
  onSelect: (file: File) => void;
}) {
  const onClick = () => onSelect(file);
  return (
    <tr
      className={styles.row}
      onClick={onClick}
      aria-selected={isSelected}
    >
      <td>
        <Checkbox checked={isSelected} readOnly />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
