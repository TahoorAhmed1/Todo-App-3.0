"use client";

import { userContactStore } from "@/store/userContactStore";
import axios from "axios";
import { useState } from "react";

function AddTask() {
  const [contract, account] = userContactStore((state) => [
    state.contract,
    state.account,
  ]);
  console.log("contarcter", contract.methods);
  const [_taskName, setTitle] = useState("");
  const [_taskDate, setDate] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if (!_taskName) return;
    if (!_taskDate) return;
    try {
      if (contract && contract.methods) {
        await contract.methods
          .createTask(_taskName, _taskDate)
          .send({ from: account });
        setTitle("");
        _taskDate("");
        alert("taskAdded");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center mt-24 mb-10 bg-slate-800/20 px-4 py-6 rounded-md">
        <form className=" space-y-3" onSubmit={addTask}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="p-2.5 rounded md:w-96 w-72 mr-2 outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="Task Name"
          />
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="p-2.5 rounded  md:w-72 w-56  md:mx-1 mx-0 outline-none focus:ring-2 focus:ring-blue-700"
          />

          <button
            className="flex mt-4 bg-blue-700 py-2 px-4  focus:ring-2 focus:ring-blue-700 text-white text-base rounded "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
