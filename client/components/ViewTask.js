"use client";

import { useState } from "react";

function ViewTask() {
  const [taskList, setAllTask] = useState();
  const [Id, setId] = useState("");
  const getTask = async (e) => {
    e.preventDefault();
    if (!Id) return;
    let url = `http://localhost:80/api/ethereum/viewTask/${Id}`;
    let res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setAllTask([data.data]);
  };

  return (
    <div className="">
      <div className="flex justify-center mt-24 ">
        <form className="space-x-2" onSubmit={getTask}>
          <input
            type="number"
            onChange={(e) => setId(e.target.value)}
            className="p-3 rounded w-56"
          />
          <button className="bg-blue-600 p-3 rounded " type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col md:flex-row justify-start  ">
        {taskList &&
          taskList.map((key) => (
            <div
              className={`flex  flex-wrap items-center w-72 m-6 p-5 rounded-md bg-white`}
            >
              <div className=" flex flex-1 text-slate-900">
                <p>{key.name}</p>
              </div>
              <p>{key.data}</p>
            </div>
          ))}
      </div>
    </div>
  );
}



export default ViewTask;
