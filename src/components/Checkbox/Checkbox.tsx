import React, { useEffect, useRef, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "ref"> & {
  indeterminate?: boolean;
}

const Checkbox = (props: Props) => {
  const { indeterminate, ...otherProps } = props;
  const checkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkRef!.current!.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <input type="checkbox" ref={checkRef} {...otherProps} />
  );
};

export default Checkbox;
