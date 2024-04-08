import React, { useEffect, useState } from "react";
import UserContainer from "../Components/UserContainer.tsx";
import { CiSearch } from "react-icons/ci";

import axios from "axios";
import FilterContainer from "../Components/FilterContainer.tsx";
import Navbar from "../Components/Navbar.tsx";
import { toast } from "react-toastify";
import { axiosC } from "../utils/connection.ts";
interface UserInfo {
  first_name: String;
  last_name: String;
  email?: String;
  gender?: String;
  avatar: String;
  domain?: String;
  available?: Boolean;
}
interface FilterOption {
  gender?: String;
  available?: String;
  domain?: String;
  page: number;
  name: String;
}
export default function HomePage() {
  const [user, setUser] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [teamStatus, setTeamStatus] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMember, setTeamMember] = useState(() => new Set());

  function addItem(item) {
    console.log("add member", item);
    setTeamMember((pre) => new Set(pre).add(item));
  }

  function removeItem(item) {
    setTeamMember((prev) => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  }

  function hasItem(item) {
    return teamMember.has(item);
  }

  async function creatTeam() {
    const finalMember: string[] = [];
    teamMember.forEach(function (item) {
      finalMember.push(item as string);
    });
    if (teamName === "") {
      toast.error("enter team name");
      return;
    }
    if (finalMember.length === 0) {
      toast.error("select the member");
      return;
    }
    const result = await axiosC.post("/team", {
      name: teamName,
      member: finalMember,
    });
    if (result.status === 500) {
      toast.error(result.data);
    }
    if (result.status === 200) {
      toast.success(result.data);
    }
    if (result.status === 404) {
      toast.error(result.data);
    }
    setTeamStatus(false);
  }

  const [loading, setLoading] = useState(false);
  const [limit, setlimit] = useState(20);
  const [filter, setFilter] = useState<FilterOption>({ page: 1, name: "" });

  async function callFirstTime() {
    setLoading(true);
    const result = await axiosC.get("/users", {
      params: {
        limit: limit,
        ...filter,
      },
    });
    if (result.status === 500) {
      toast.error("internal server error");
    }
    if (result.status === 200) {
      setUser(result?.data?.data);
      var totalP = result?.data?.total;
      setStartPage((filter.page - 1) * limit + 1);
      setTotalPages(totalP);
      setNumPages(Math.floor(totalP / 10) + (totalP % 20 !== 0 ? 1 : 0));
      // toast.success(result.data.message);
    }
    if (result.status === 404) {
      toast.error(result.data);
    }
    setLoading(false);
  }

  function filterChange(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value, page: 1 });
  }
  useEffect(() => {
    callFirstTime();
  }, [filter]);
  return (
    <>
      <div className="h-screen relative">
        <Navbar setTeamStatus={setTeamStatus} />
        {teamStatus === true ? (
          <div className="px-4 my-2 block sm:hidden  ">
            <div className="flex  justify-center  flex-row">
              <span className="font-bold text-[20px] text-red-500">
                CREATE TEAM
              </span>
            </div>
            <div className="flex flex-row my-2 mb-4 gap-4  items-center justify-evenly">
              <input
                className="focus:outline-none py-1 px-2 mt-1 rounded-lg border-2 border-solid border-gray-700"
                type="text"
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
                value={teamName}
                placeholder="enter team name"
              />
              <button
                className="cursor-pointer py-2 px-3 bg-red-500 text-white font-bold text-[14px] text-center rounded-lg"
                onClick={creatTeam}
              >
                Create Team
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex h-[80%] mr-2   flex-row ">
          <FilterContainer filter={filter} filterChange={filterChange} />
          <div className="flex flex-col  w-full ">
            <div className="flex border-2 border-solid p-1 items-center border-black flex-initial flex-row ">
              <input
                type="text"
                className="flex-1 focus:outline-none  m-2"
                placeholder="enter user name"
                name="name"
                value={filter.name as string}
                onChange={filterChange}
              />
              <CiSearch className="w-[30px] h-[30px] mx-2" />
            </div>
            {loading ? (
              <div className="flex-auto flex items-center justify-center">
                loading
              </div>
            ) : (
              <div className="flex-auto overflow-y-scroll hideScrollBar">
                {user.map((item: UserInfo, key) => {
                  return (
                    <UserContainer
                      teamStatus={teamStatus}
                      key={key}
                      data={item}
                      setTeamMember={setTeamMember}
                      teamMember={teamMember}
                      addItem={addItem}
                      removeItem={removeItem}
                      hasItem={hasItem}
                    ></UserContainer>
                  );
                })}
              </div>
            )}
            <div className="flex flex-row justify-between items-center my-2 flex-initial sticky">
              <span>
                Showing {startPage} to{" "}
                {startPage + limit - 1 < totalPages
                  ? startPage + limit - 1
                  : totalPages}{" "}
                of {totalPages} results
              </span>
              <span className="flex flex-row gap-3">
                <span
                  onClick={() => {
                    if (filter.page - 1 > 0) {
                      setFilter({ ...filter, page: filter.page - 1 });
                    }
                  }}
                  className="p-1 cursor-pointer rounded-lg border-[1.5px] px-2 border-solid font-bold  border-gray-400 bg-white"
                >
                  Previous
                </span>
                <span
                  onClick={() => {
                    if (
                      filter.page + 1 <=
                      Math.floor(totalPages / limit) +
                        (totalPages % limit !== 0 ? 1 : 0)
                    ) {
                      setFilter({
                        ...filter,
                        page: (filter.page as number) + 1,
                      });
                    }
                  }}
                  className="p-1 cursor-pointer rounded-lg border-[1.5px] px-2 border-solid font-bold  border-gray-400 bg-white"
                >
                  Next
                </span>
              </span>
            </div>
          </div>
          {teamStatus === true ? (
            <div className="px-10 hidden sm:block ">
              <div className="flex  justify-center  flex-row">
                <span className="font-bold text-[25px] text-red-500">
                  CREATE TEAM
                </span>
              </div>
              <div className="mt-2 ">
                <div>
                  <label className="text-black font-bold text-[18px]">
                    Team Name
                  </label>
                  <input
                    className="focus:outline-none p-2 mt-2 rounded-lg border-2 border-solid border-gray-700"
                    type="text"
                    onChange={(e) => {
                      setTeamName(e.target.value);
                    }}
                    value={teamName}
                    placeholder="enter team name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="cursor-pointer p-2 bg-red-500 text-white font-bold text-center rounded-lg"
                  onClick={creatTeam}
                >
                  Create Team
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
