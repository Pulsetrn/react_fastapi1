import { TodoResponse } from "../models/models";
import { Modal } from "antd";

interface IModalProps extends TodoResponse {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
}

function ModalTodoCard({
  title,
  description,
  isModalOpen,
  setIsModalOpen,
}: IModalProps) {

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>description: {description}</p>
      </Modal>
    </>
  );
}

export default ModalTodoCard;
