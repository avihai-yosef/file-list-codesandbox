import React from "react";
import { File } from ".types";
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
    selectionState
  } = useFileSelection(files);

  return (
    <section>
      <div>
        <Checkbox
          checked={selectionState.all}
          indeterminate={selectionState.partial}
          onChange={toggleAllHandler}
          aria-label="all-selector"
          className={styles.allSelector}
        />
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
