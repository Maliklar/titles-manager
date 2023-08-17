"use client";

// The reason this is a stand a long component is that I want to make use of the server components
// It contains a state
import useUIContext from "@/context/UIContext/useUIContext";
import { ModalsEnum } from "@/types";
import { FaPlus } from "react-icons/fa";

const AddItemButton = () => {
  const { openModal } = useUIContext();
  const addItemClickHandler = () => openModal(ModalsEnum.AddItem);

  return (
    <button
      type="button"
      onClick={addItemClickHandler}
      className="bg-sky-500 flex items-center gap-1 rounded text-white py-1 px-2 text-sm hover:bg-sky-400 hover:shadow-md shadow-sm transition-all"
    >
      <FaPlus /> Add Item
    </button>
  );
};
export default AddItemButton;
