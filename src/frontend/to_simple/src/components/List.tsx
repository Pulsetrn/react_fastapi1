import { useEffect, useState } from "react";
import { TodoResponse } from "../models/models";
import { useGetTodosQuery } from "../store/todo_api/todo_api";
import TodoCard from "./TodoCard";

function List() {
  const { data: todos, isError, isLoading } = useGetTodosQuery(null);
  const [data, setData] = useState<TodoResponse[]>([]);

  useEffect(() => {
    if (todos) setData(todos);
  }, [todos]);

  return (
    <>
      {isError && (
        <h1 className="text-red-600 text-[40px] font-bold">
          Error was occurred
        </h1>
      )}
      {isLoading && <div className="font-bold text-[25px]">Loading...</div>}
      {!isError && !isLoading && (
        <ul className="list-none max-h-[300px] overflow-y-scroll shadow-md bg-white overflow-hidden flex flex-col gap-3 p-2">
          {data.map((item: TodoResponse) => {
            return (
              <li key={item.id}>
                <TodoCard
                  title={item.title}
                  id={item.id}
                  description={item.description}
                ></TodoCard>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default List;
