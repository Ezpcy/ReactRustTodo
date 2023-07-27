import { useState, useEffect, useCallback } from "react";
import { Todo } from "../types";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "../middleware/Controller";
import { updateTodo } from "../middleware/Controller";
import EditIcon from '@mui/icons-material/Edit';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(`http://127.0.0.1:8080/api/todos`);
      const todos = await res.json();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleUpdate = async (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos((Todos) =>
        Todos.map((todo) => (todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo))
    );

    // send the updated todo to the API
    await updateTodo(updatedTodo);
  };

  return (
    <div>
      {todos.length ? (
        todos.slice((page - 1) * 10, page * 10).map((todo) => (
          <ul key={todo.todo_id}>
            <div className="w-full mb-1 mt-1 border border-gray-400 rounded-md">
              <div className="bg-gray-100 flex justify-between">
                <h3 className="text-xl p-1 rounded-md ">{todo.title}</h3>
                <div
                  className="pr-3 cursor-pointer hover:scale-125 transition"
                  onClick={() => handleUpdate(todo)}
                >
                  {todo.completed ? (
                    <CloseIcon className="text-red-600" />
                  ) : (
                    <CheckIcon className="text-green-600" />
                  )}
                </div>
              </div>
              <p className="p-1 text-gray-500 text-sm">{todo.description}</p>
            </div>
          </ul>
        ))
      ) : (
        <div>No todos</div>
      )}
      <div className="pt-20  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(todos.length / 10)}
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Todos;
