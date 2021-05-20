import {useMemo, useState } from "react";
import {File, FileStatus} from "../../types";

// TODO: rename to useListSelection (this is a generic logic)
// TODO: optimize performance using useCallback and useMemo
export const useFileSelection = (files: File[]) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const availableFiles = useMemo(() => files.filter(f => f.status === FileStatus.Available), [files])
  const toggleRowHandler = (file: File) => {
    setSelected((prev) => {
      if (prev.has(file.id)) {
        prev.delete(file.id);
      } else {
        prev.add(file.id);
      }
      return new Set(prev);
    });
  };

  const selectedCount = selected.size;

  const selectionState = {
    none: selectedCount === 0,
    partial: selectedCount > 0 && selectedCount < availableFiles.length,
    all: selectedCount === availableFiles.length
  };

  const toggleAllHandler = () => {
    if (selectionState.all) {
      setSelected(new Set());
    } else {
      setSelected(new Set(availableFiles.map((f) => f.id)));
    }
  };

  return {
    isSelected: (file: File) => selected.has(file.id),
    toggleAllHandler,
    toggleRowHandler,
    selectionState,
    selectedCount
  };
};
