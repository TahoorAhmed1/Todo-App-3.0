"use client";
import { useEffect, useState } from "react";
import { updateModal } from "@/store/updateModal";
import { userContactStore } from "@/store/userContactStore";

function ViewAllTask() {
  const [taskList, setAllTask] = useState();
  const [togel, setTogel] = useState();
  const [_taskName, setTitle] = useState("");
  const [_date, setDate] = useState("");
  const [_taskId, setTaskId] = useState("");

  const [openUpdateModal, setUpdateModal, deleteModal, setDeleteModal] =
    updateModal((state) => [
      state.openUpdateModal,
      state.setUpdateModal,
      state.deleteModal,
      state.setDeleteModal,
    ]);
  const [contract, account] = userContactStore((state) => [
    state.contract,
    state.account,
  ]);
  const getAllTask = async () => {
    let url = `http://localhost:80/api/ethereum/viewAllTask`;
    let res = await fetch(url);
    const data = await res.json();
    console.log(data);
    let FilterData = filterData(data);

    setAllTask(FilterData);
  };
  useEffect(() => {
    getAllTask();
  }, []);

  const getPreviousValue = (value) => {
    setTitle(value.name);
    setDate(value.data);
    setTaskId(value.TaskId);
    setUpdateModal(!openUpdateModal);
  };
  const getPreviousValueDelete = (value) => {
    setTaskId(value.TaskId);
    setDeleteModal(!deleteModal);
  };
  const updateTask = async (e) => {
    e.preventDefault();
    console.log(_taskId, _date, _taskName);

    if (!_taskName) return;
    if (!_date) return;
    if (!_taskId) return;
    try {
      if (contract && contract.methods) {
        await contract.methods
          .updateTak(_taskId, _taskName, _date)
          .send({ from: account });
        alert("Task Updated sucessFully");
        setUpdateModal(!openUpdateModal);
        getAllTask();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (e) => {
    e.preventDefault();

    if (!_taskId) return;
    try {
      if (contract && contract.methods) {
        await contract.methods.deleteTask(_taskId).send({ from: account });
        alert("Task Deleted sucessFully");
        setDeleteModal(!deleteModal);
        getAllTask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center   mt-8">
      {taskList &&
        taskList.map((key, index) => (
          <div
            key={index}
            onClick={() => {
              setTogel(index);
            }}
            className={`flex flex-wrap items-center w-full mt-4 py-4 px-5 rounded-md bg-white ${
              togel == index && "ring-4 ring-blue-900 "
            }  `}
          >
            <div className=" flex flex-1 text-slate-900">
              <p>{key.name}</p>
            </div>
            <div className="space-x-3 flex items-center">
              <p className="text-slate-500">{key.data}</p>
              <button
                onClick={() => getPreviousValueDelete(key)}
                className="bg-red-600 p-1.5 px-2.5 text-sm rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={() => getPreviousValue(key)}
                className="bg-yellow-600 p-1.5 px-2.5 text-sm rounded text-white"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      {openUpdateModal && (
        <div>
          <div class="fixed top-0 left-0 right-0 z-50    backdrop-blur-sm  filter bg-blend-color-burn  w-full p-6  overflow-hidden  md:inset-0 ">
            <div class="relative w-full max-w-2xl  mx-auto    justify-center  ">
              <div className="flex w-full justify-center mx-auto min-h-screen    md:items-center items-start  ">
                <div className=" relative mx-auto bg-white flex p-6 rounded-xl shadow-2xl shadow-current w-4/5 ">
                  <form
                    className=" mx-auto w-96 space-y-3"
                    onSubmit={updateTask}
                  >
                    <input
                      type="text"
                      value={_taskName}
                      onChange={(e) => setTitle(e.target.value)}
                      className="p-2.5 rounded md:w-96 w-72 mr-2 outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Task Name"
                    />
                    <input
                      type="date"
                      value={_date}
                      onChange={(e) => setDate(e.target.value)}
                      className="p-2.5 rounded  md:w-72 w-56  md:mx-1 mx-0 outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <button
                      className="flex mt-4 bg-yellow-700 py-2 px-4  focus:ring-2 focus:ring-yellow-700 text-white text-base rounded "
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                  <button
                    onClick={() => setUpdateModal(!openUpdateModal)}
                    className=" mt-4 bg-red-700 py-2 px-4  focus:ring-2 focus:ring-red-700 text-white text-base rounded "
                    type="submit"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div>
          <div class="fixed top-0 left-0 right-0 z-50    backdrop-blur-sm  filter bg-blend-color-burn  w-full p-6  overflow-hidden  md:inset-0 ">
            <div class="relative w-full max-w-2xl  mx-auto    justify-center  ">
              <div className="flex w-full justify-center mx-auto min-h-screen    md:items-center items-start  ">
                <div className=" relative mx-auto bg-white flex justify-center p-6 rounded-xl shadow-2xl shadow-current w-4/5 ">
                  <div className="flex justify-between space-x-2 ">
                    <button
                      onClick={deleteTask}
                      className="mt-4 bg-green-700 py-2 px-4  focus:ring-2 focus:ring-red-700 text-white text-base rounded "
                      type="submit"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setDeleteModal(!deleteModal)}
                      className=" mt-4 bg-red-700 py-2 px-4  focus:ring-2 focus:ring-red-700 text-white text-base rounded "
                      type="submit"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const filterData = (data) => {
  let newData = data.data.filter((key) => {
    return key.name !== "";
  });
  return newData;
};

export default ViewAllTask;
