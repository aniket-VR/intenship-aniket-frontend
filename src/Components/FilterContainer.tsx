import React from "react";

export default function FilterContainer({ filter, filterChange }) {
  return (
    <div className="w-[25%] px-2 pt-4">
      <h1 className="font-bold text-[30px] ">Filter</h1>
      <div className="mt-4">
        <h2 className="text-[20px] font-bold ">Domain</h2>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter?.domain === "militray" ? true : false}
            value={"militray"}
            name="domain"
            onChange={filterChange}
          />
          <span>Militray</span>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter.domain === undefined ? true : false}
            value={undefined}
            name="domain"
            onChange={filterChange}
          />
          <span>other</span>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-[20px] font-bold">Gender</h2>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter?.gender === "Male" ? true : false}
            value={"Male"}
            name="gender"
            onChange={filterChange}
          />
          <span>Male</span>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter?.gender === "Female" ? true : false}
            value={"Female"}
            name="gender"
            onChange={filterChange}
          />
          <span>Female</span>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter.gender === undefined ? true : false}
            value={undefined}
            name="gender"
            onChange={filterChange}
          />
          <span>other</span>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-[20px] font-bold">Available</h2>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter?.available === "yes" ? true : false}
            value={"yes"}
            name="available"
            onChange={filterChange}
          />
          <span>Yes</span>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter?.available === "no" ? true : false}
            value={"no"}
            name="available"
            onChange={filterChange}
          />
          <span>No</span>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          <input
            type="checkbox"
            checked={filter.available === undefined ? true : false}
            value={undefined}
            name="available"
            onChange={filterChange}
          />
          <span>other</span>
        </div>
      </div>
    </div>
  );
}
