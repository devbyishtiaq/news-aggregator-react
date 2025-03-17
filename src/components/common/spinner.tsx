import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Spinner;
