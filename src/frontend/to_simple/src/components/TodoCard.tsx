import { useState } from "react";
import ModalTodoCard from "./ModalTodoCard";
import { TodoResponse } from "../models/models";
import { useDeleteTodoMutation } from "../store/todo_api/todo_api";
import ModalChangeForm from "./ModalChangeForm";

function TodoCard({ title, description, id }: TodoResponse) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [deleteTodoById] = useDeleteTodoMutation();
  return (
    <>
      <div
        className="flex min-w-[500px] min-h-[80px] bg-gray-200 p-3 box-border rounded-[10px] hover:bg-gray-300 transition-all cursor-pointer justify-between"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="font-bold text-[20px]">{title}</div>
        <div className="flex gap-3 items-center">
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteTodoById(id);
            }}
            className="border-0 bg-red-600 p-2 rounded-[20px] text-white font-bold hover:bg-red-800 transition-all cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              setIsModalUpdateOpen(true);
            }}
            className="border-0 bg-blue-400 p-2 rounded-[20px] text-white font-bold hover:bg-blue-500 transition-all cursor-pointer"
          >
            Change
          </button>
        </div>
      </div>
      <ModalTodoCard
        description={description}
        title={title}
        id={id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ModalChangeForm
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        id={id}
        title={title}
        description={description}
      />
    </>
  );
}

export default TodoCard;
