import React from "react";

const UserAccount = (props) => {
  return (
    <React.Fragment>
      <div
        className="p-4 flex justify-center items-center border border-gray-400 h-[100px] w-[300px] bg-white cursor-pointer transition duration-300 hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)]"
        onClick={props.click}
      >
        <img src={props.img} alt="icon" className="h-[50px] w-auto" />
        <div className="ml-4 text-left">
          <p className="text-lg font-medium text-black">{props.head}</p>
          <p className="text-xs font-normal text-gray-500">{props.summary}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserAccount;
