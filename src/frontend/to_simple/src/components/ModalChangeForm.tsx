import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useUpdateTodoMutation } from "../store/todo_api/todo_api";

const initialState = {
  title: null,
  description: null,
};

function ModalChangeForm({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  id,
  title,
  description,
}: {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (flag: boolean) => void;
  id: number;
  title: string;
  description: string;
}) {
  const [inputFields, setInputFields] = useState<{
    title: string | null;
    description: string | null;
  }>(initialState);

  useEffect(() => {
    setInputFields({ title: title, description: description });
  }, [title, description]);

  const [updateSubmitForm] = useUpdateTodoMutation();

  const handleOk = () => {
    if (inputFields.description && inputFields.title) {
      updateSubmitForm([
        id,
        {
          title: inputFields.title,
          description: inputFields.description,
        },
      ]);
    }
    setIsModalUpdateOpen(false);
  };

  const handleCancel = () => {
    setInputFields(initialState);
    setIsModalUpdateOpen(false);
  };

  return (
    <>
      <Modal
        title="Create ToDo"
        open={isModalUpdateOpen}
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
            value={inputFields.title ? inputFields.title : ""}
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
            value={inputFields.description ? inputFields.description : ""}
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

export default ModalChangeForm;
