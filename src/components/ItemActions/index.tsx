"use client";

import { FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";
import useUIContext from "@/context/UIContext/useUIContext";
import { ItemInfo, ModalsEnum } from "@/types";

const TitleActions = (itemInfo: ItemInfo) => {
  const { openModal } = useUIContext();

  const editHandler = () => openModal(ModalsEnum.EditItem, itemInfo);
  const deleteHandler = () => openModal(ModalsEnum.ConfirmDelete, itemInfo);

  return (
    <>
      <button
        type="button"
        title="Edit Item"
        onClick={editHandler}
        className="text-sky-500 flex items-center gap-1 text-xs font-bold  transition-all"
      >
        <FaPen />
        <span className="hidden md:inline">Edit</span>
      </button>

      <button
        type="button"
        title="Delete Item"
        onClick={deleteHandler}
        className="text-red-500 flex items-center gap-1 text-xs font-bold  transition-all"
      >
        <FaTrash />
        <span className="hidden md:inline">Delete</span>
      </button>
    </>
  );
};
export default TitleActions;
