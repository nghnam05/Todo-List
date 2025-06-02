import React, { useState, useRef } from "react";
import { DeleteFilled, DeleteOutlined, DeleteTwoTone, FileAddOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@mui/material";

const TodoList = () => {
  const [ListTasks, setListTasks] = useState([]);
  const [task, setTask] = useState("");
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState([]);
  const inputRef = useRef(null);
  // const loadingToast = toast.loading("Đang thêm công việc !");

  const AddToDo = () => {
    if (task.trim() === "") {
      toast.error("Vui lòng nhập công việc!");
      return;
    }
    setListTasks([...ListTasks, task]);
    setTask("");
    setClicked(false);
    setTimeout(() => setClicked(false), 300);
    toast.success("Đã thêm công việc mới 🎉🎉🎉");
    inputRef.current.focus();
  };

  const DeleteTodo = (indexTodo) => {
    const newTodo = ListTasks.filter((_, index) => index !== indexTodo);
    setListTasks(newTodo);
    toast.error("Đã xoá công việc ! 🎉🎉🎉");
  };

  const toggleComplete = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  return (
    <div className="mt-12 w-[92%] sm:w-[80%] md:w-[600px] lg:w-[720px]  bg-white rounded-xl shadow-xl p-6 mx-auto border-[3px] border-[gray]">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">
        My To Do List
      </h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập công việc..."
          className="flex-1 px-4 py-3 text-base rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={AddToDo}
          className={`flex items-center justify-center gap-1 px-4 py-2 rounded-md text-white font-medium text-base transition-all duration-200 hover:cursor-pointer ${
            clicked ? "bg-gray-800" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <span>Add</span>
          <FileAddOutlined />
        </button>
      </div>

      <div className="mt-3 text-base text-gray-600">
        Total Character:{" "}
        <span className="text-lg font-semibold text-blue-600">
          {task.length}
        </span>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <hr className="my-6 border-t border-gray-300" />

      <div className="min-h-[200px] md:min-h-[400px] max-h-[400px] overflow-y-auto custom-scroll">
        {ListTasks.length === 0 ? (
          <div className="text-center flex items-center justify-center text-gray-500 text-xl py-10">
            <p>Không có công việc nào trong danh sách</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ListTasks.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                  completed.includes(index) ? "bg-gray-300" : "bg-gray-100"
                } hover:shadow-md transition-all`}
              >
                <div
                  className="flex items-center gap-2 flex-1 cursor-pointer"
                  onClick={() => toggleComplete(index)}
                >
                  <Checkbox
                    checked={completed.includes(index)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                  />
                  <p
                    className={`text-lg truncate ${
                      completed.includes(index)
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item}
                  </p>
                </div>
                <DeleteOutlined 
                  style={{ fontSize: "  24px", color: "#E50046" }}
                  className="cursor-pointer"
                  onClick={() => DeleteTodo(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
