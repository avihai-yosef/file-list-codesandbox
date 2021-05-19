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
    <section>
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
            <th></th>
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
    </section>
  );
};

function SelectedCount({ count }: { selectedCount: number }) {
  return (
    <span data-testid="selected-count">
      {count > 0 ? `Selected ${count}` : "None Selected"}
    </span>
  );
}

function DownloadButton({ files }: { selectedFiles: File[] }) {
  const handleDownload = () => {
    const formattedMessage = files
      .map((f) => `Path: ${f.path}, Device: ${f.device}`)
      .join("\n");

    alert(formattedMessage);
  };
  return (
    <button
      role="button"
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
      role="row"
    >
      <td>
        <Checkbox checked={isSelected} />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
