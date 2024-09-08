import { Modal } from "antd";
import { useState } from "react";
import { useCreateTodoMutation } from "../store/todo_api/todo_api";

const initialState = { title: null, description: null };

function ModalForm({
  isModalFormOpen,
  setIsModalFormOpen,
}: {
  isModalFormOpen: boolean;
  setIsModalFormOpen: (flag: boolean) => void;
}) {
  const [inputFields, setInputFields] = useState<{
    title: string | null;
    description: string | null;
  }>(initialState);
  const [submitForm] = useCreateTodoMutation();

  const handleOk = () => {
    if (inputFields.description && inputFields.title) {
      submitForm({
        title: inputFields.title,
        description: inputFields.description,
      });
    }
    setIsModalFormOpen(false);
  };

  const handleCancel = () => {
    setInputFields(initialState);
    setIsModalFormOpen(false);
  };

  return (
    <>
      <Modal
        title="Create ToDo"
        open={isModalFormOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-2 max-w-[300px]">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="title"
            onChange={(event) =>
              setInputFields((cur) => ({ ...cur, title: event.target.value }))
            }
          />
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="description"
            onChange={(event) =>
              setInputFields((cur) => ({
                ...cur,
                description: event.target.value,
              }))
            }
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalForm;
