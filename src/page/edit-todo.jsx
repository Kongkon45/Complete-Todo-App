import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditTodos = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: "",
    email: "",
    roll: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/todos/${id}`)
      .then((data) => setTodo(data.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(todo);
    const res = await axios.put(`http://localhost:5000/todos/${id}`, todo);
    // console.log(res);
    const result = res.data;
    alert(result.message);
    const data = setTodo(result.data);
    if (result.message) {
        axios
        .get(`http://localhost:5000/todos/${id}`)
        .then((data) => setTodo(data.data));
    }

    setTodo(data);
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-2/5 mx-auto">
      <form onSubmit={handleUpdate}>
        <input
          value={todo?.name}
          onChange={handleChange}
          type="text"
          name="name"
          className="p-2 border rounded-sm w-full my-2"
          placeholder="Your full name"
        />
        <input
          value={todo?.email}
          onChange={handleChange}
          className="p-2 border rounded-sm w-full my-2"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
        />
        <input
          value={todo?.roll}
          onChange={handleChange}
          className="p-2 border rounded-sm w-full my-2"
          type="number"
          name="roll"
          id="roll"
          placeholder="Enter your roll..."
        />
        <button
          className="bg-green-400 text-white p-2 rounded-lg text-xl font-bold ml-48"
          type="submit"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default EditTodos;
