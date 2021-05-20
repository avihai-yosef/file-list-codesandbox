import React from "react";
import { File, FileStatus } from "../../types";
import styles from "./FileList.module.css";
import Checkbox from "../Checkbox/Checkbox";
import { useFileSelection } from "./hooks";
import Button from "../Button/Button";

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
        <DownloadButton files={filesForDownload} />
      </div>
      <table data-testid="table" className={styles.table}>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th aria-hidden={true} />
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <Row
              key={file.id}
              file={file}
              selected={isSelected(file)}
              onSelect={toggleRowHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO: extract to seperate file
function SelectedCount({ count }: { count: number }) {
  return (
    <span data-testid="selected-count">
      {count > 0 ? `Selected ${count}` : "None Selected"}
    </span>
  );
}

function DownloadButton({ files }: { files: File[] }) {
  const handleDownload = () => {
    const formattedMessage = files
      .map((f) => `Path: ${f.path}, Device: ${f.device}`)
      .join("\n");

    alert(formattedMessage);
  };
  return (
      <Button className={styles.downloadBtn} onClick={handleDownload} disabled={files.length === 0}>
        <i className="fa fa-download" /> Download Selected
      </Button>
  );
}

function Row({
  file,
  selected,
  onSelect
}: {
  file: File;
  selected: boolean;
  onSelect: (file: File) => void;
}) {
  const isAvailable = file.status === FileStatus.Available
  const onClick = () => isAvailable && onSelect(file);
  return (
    <tr
      className={styles.row}
      onClick={onClick}
      aria-selected={selected}
      aria-disabled={!isAvailable}
    >
      <td>
        <Checkbox checked={selected} disabled={!isAvailable} readOnly />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td><div className={isAvailable ? styles.availableIndicator : ""} /></td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
