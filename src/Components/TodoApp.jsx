import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const TodoApp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // get all
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);



  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "roll") {
      setRoll(value);
    }
  };
  const handleDataSubmit = async(e) => {
    e.preventDefault();
    const form= e.target
    const data={
      name:form.name.value,
      email:form.email.value, 
      roll:form.roll.value
    }
    console.log(data)
  const res =await axios.post(`http://localhost:5000/todo`,data)
  setTodos(res)
    // if (editingIndex !== null) {
    //   const updatedTodos = [...todos];
    //   updatedTodos[editingIndex] = { name, email, roll };
    //   setTodos(updatedTodos);
    //   setEditingIndex(null);
    // } else {
    //   const newTodo = { name, email, roll };
    //   setTodos([...todos, newTodo]);
    // }

    // setName("");
    // setEmail("");
    // setRoll("");
    // setFormOpen(false);
  };
  const handleTodoOpen = () => {
    setFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };

 
  const handleDeleteData = async (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Assuming you have some data to send with the delete request
          const data = {
            // ... your data properties
          };
  
          // Use async/await with axios.post
          const res = await axios.delete(`http://localhost:5000/todos/${index}`);
           setTodos(res)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error('Delete Error:', error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting.",
            icon: "error",
          });
        }
      }
    });
  };
  
  // const handleEditData = async (e,id) => {
  //   e.preventDefault();
  //   // const editedTodos = todos[index];
  //   // setName(editedTodos.name);
  //   // setEmail(editedTodos.email);
  //   // setRoll(editedTodos.roll);
  //   // setEditingIndex(index);
  //   setFormOpen(true);
  //   const form= e.target
  //   const data={
  //     name:form.name.value,
  //     email:form.email.value, 
  //     roll:form.roll.value
  //   }
  //   console.log(data)
  // const res =await axios.put(`http://localhost:5000/todos/${id}`, data)
  // console.log(res)

  // };

  const handleEditData = async (id) => {
    try {
      setFormOpen(true);
      const data = {
        name,
        email,
        roll,
      };

      const res = await axios.put(`http://localhost:5000/todos/${id}`, data);
      setTodos(res);


    } catch (error) {
      console.error('Edit Error:', error);

    } 
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-bold mt-2 mb-6 ">Todo App</h2>
      <button
        onClick={handleTodoOpen}
        className="bg-green-400 text-white py-2 px-4 rounded-lg ml-[560px] my-4 font-bold"
      >
        Add Todo
      </button>
      {formOpen && (
        <form
          onSubmit={handleDataSubmit}
          className="w-1/3 mx-auto p-5 rounded-md shadow-lg border-2"
        >
          <div
            onClick={handleClose}
            className="text-2xl font-semibold flex justify-end pb-3 cursor-pointer"
          >
            <RxCrossCircled />
          </div>
          <input
            className="w-full p-2 rounded-lg my-2 border-2"
            type="text"
            onChange={handleTextChange}
            name="name"
            id="name"
            value={name}
            placeholder="Enter your name..."
          />
          <input
            className="w-full p-2 rounded-lg my-2 border-2"
            type="email"
            onChange={handleTextChange}
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email..."
          />
          <input
            className="w-full p-2 rounded-lg my-2 border-2"
            type="number"
            onChange={handleTextChange}
            name="roll"
            id="roll"
            value={roll}
            placeholder="Enter your roll..."
          />
          <button
            className="bg-green-400 text-white py-2 px-4 rounded-lg ml-32 mt-4 font-bold"
            type="submit"
          >
            {editingIndex !== null ? "Updated Todo" : "Add Todo"}
          </button>
        </form>
      )}

      <div className="mt-5">
        <table className="w-2/3 mx-auto text-center">
          <thead className="border-2">
            <tr>
              <th className="border-r-2">Id</th>
              <th className="border-r-2">Name</th>
              <th className="border-r-2">Email</th>
              <th className="border-r-2">Roll</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index} className="border-2">
                <td className="border-r-2">{todo._id}</td>
                <td className="border-r-2">{todo.name}</td>
                <td className="border-r-2">{todo.email}</td>
                <td className="border-r-2">{todo.roll}</td>
                <td className="flex justify-around py-1">
                  <button
                    onClick={() => handleEditData(todo?._id)}
                    className="bg-green-400 p-2 rounded-full text-white"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteData(todo?._id)}
                    className="bg-red-400 p-2 rounded-full text-white"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;
