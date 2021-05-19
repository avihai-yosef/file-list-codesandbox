import React, { useEffect, useRef } from "react";

const Checkbox = (props: HTMLInputElement) => {
  const { indeterminate, ...otherProps } = props;
  const checkRef = useRef();

  useEffect(() => {
    checkRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    // hack for getting getByRole to work on tests
    <input type="checkbox" role="checkbox" ref={checkRef} {...otherProps} />
  );
};

export default Checkbox;
