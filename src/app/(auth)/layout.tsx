import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 w-full grid place-content-center">{children}</div>
  );
};

export default layout;
