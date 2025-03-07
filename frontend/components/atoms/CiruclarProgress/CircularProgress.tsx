import React, { FunctionComponent, HtmlHTMLAttributes } from "react";

const CircularProgress: FunctionComponent<
  HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => {
  return (
    <div
      className={
        className +
        " inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "
      }
      {...rest}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default CircularProgress;
