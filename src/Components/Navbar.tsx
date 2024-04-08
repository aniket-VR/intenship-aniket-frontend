import React from "react";

export default function Navbar({ setTeamStatus }) {
  return (
    <div className="flex flex-row bg-white sticky z-10  top-0 justify-between border-b-2 border-solid border-gray-200">
      <span className="m-4 text-red-700 text-[25px] font-bold ">
        Internship
      </span>
      <span
        className=" cursor-pointer m-4 text-purple-600 text-[25px] font-bold"
        onClick={() => {
          setTeamStatus(true);
        }}
      >
        CreateTeam
      </span>
    </div>
  );
}
