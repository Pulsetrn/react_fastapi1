import { useState } from "react";
import List from "./components/List";
import ModalForm from "./components/ModalCreateForm";

function App() {
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center mt-10">
        <List></List>
        <button
          className="border-0 p-2 bg-teal-500 rounded-[15px] text-white font-bold text-[20px] hover:cursor-pointer hover:bg-teal-600 transition-all"
          onClick={() => setIsModalFormOpen(true)}
        >
          Add todo
        </button>
      </div>
      <ModalForm
        isModalFormOpen={isModalFormOpen}
        setIsModalFormOpen={setIsModalFormOpen}
      />
    </>
  );
}

export default App;
