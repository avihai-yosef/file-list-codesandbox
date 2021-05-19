import React from "react";
import { File } from ".types";
import styles from "./FileList.module.css";

type Props = {
  files: File[];
};

const FileList = ({ files }: Props) => {
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const toggleFileSelection = (file: File) => {
    setSelected((prev) => {
      if (prev.has(file.id)) {
        prev.delete(file.id);
      } else {
        prev.add(file.id);
      }
      return new Set(prev);
    });
  };

  return (
    <section>
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
              isSelected={selected.has(file.id)}
              onSelect={toggleFileSelection}
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
      data-testid="row"
      onClick={onClick}
      aria-selected={isSelected}
    >
      <td>
        {/* hack for getting getByRole to work on tests */}
        <input role="checkbox" type="checkbox" checked={isSelected} />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
