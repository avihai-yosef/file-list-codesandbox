import React from "react";
import { File } from ".types";
import styles from "./FileList.module.css";

type Props = {
  files: File[];
};

const FileList = ({ files }: Props) => {
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
            <Row key={file.id} file={file} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

function Row({ file }: { file: File }) {
  return (
    <tr data-testid="row">
      <td>
        <input type="checkbox" />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td className={styles.status}>{file.status}</td>
    </tr>
  );
}

export default FileList;
