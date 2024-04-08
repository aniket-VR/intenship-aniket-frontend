import React from "react";

export default function UserContainer(props) {
  function oninput(e) {
    if (e.target.checked) {
      props.addItem(e.target.value);
    } else {
      props.removeItem(e.target.value);
    }
  }
  return (
    <div className="flex flex-row my-2 p-2 bg-gray-500 items-center rounded-xl ">
      <input
        type="checkbox"
        className={`${
          props.teamStatus === true ? "block" : "hidden"
        } h-[22px] w-[22px] mr-2`}
        value={props.data._id}
        onChange={oninput}
        checked={props.hasItem(props.data._id) ? true : false}
      />
      <img
        src={props.data.avatar as string}
        alt="user profile"
        className="rounded-full w-[40px] h-[40px] bg-white mr-4 "
      />
      <div>
        <div>
          <span className="flex flex-row gap-2 font-bold text-[15px] text-white">
            <span className="">{props.data.first_name}</span>
            <span className="">{props.data.last_name}</span>
          </span>
        </div>
        <div>
          <span className="text-[14px]">
            <span>{props.data.first_name}</span>
            <span>{props.data.last_name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
