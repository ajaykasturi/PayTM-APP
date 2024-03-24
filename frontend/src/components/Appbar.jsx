import React from "react";

const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 font-black">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 font-medium">
          Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-3">
          <div className="flex flex-col justify-center h-full text-xl">
            {localStorage.getItem("firstName")?.toUpperCase().charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appbar;
