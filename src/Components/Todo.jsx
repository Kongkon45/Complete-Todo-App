import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "roll") {
      setRoll(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { name, email, roll };
      const response = await axios.post("http://localhost:5000/todo", newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setName("");
      setEmail("");
      setRoll("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleUpdate = async (id) => {};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center text-4xl font-bold my-3">Todo App</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 p-2 rounded-lg my-1"
          onChange={handleChangeText}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name..."
        />
        <input
          className="border-2 p-2 rounded-lg my-1"
          onChange={handleChangeText}
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
        />
        <input
          className="border-2 p-2 rounded-lg my-1"
          onChange={handleChangeText}
          value={roll}
          type="number"
          name="roll"
          id="roll"
          placeholder="Enter your roll..."
        />
        <button
          className={`bg-green-400 text-white py-2 px-4 rounded-lg mt-2`}
          type="submit"
        >
          Add Todo
        </button>
      </form>

      <table className="border-2 w-2/3">
        <thead>
          <tr className="border-2">
            <th className="border-r-2">Id</th>
            <th className="border-r-2">Name</th>
            <th className="border-r-2">Email</th>
            <th className="border-r-2">Roll</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((item, index) => (
            <tr key={index} className="border-2">
              <td className="border-r-2">{item._id}</td>
              <td className="border-r-2">{item.name}</td>
              <td className="border-r-2">{item.email}</td>
              <td className="border-r-2">{item.roll}</td>
              <td className="flex justify-around">
                <Link to={`/edit/${item?._id}`}>
                  <button className="bg-green-400 p-2 text-white rounded-xl">
                    <FaRegEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-400 p-2 text-white rounded-xl"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
