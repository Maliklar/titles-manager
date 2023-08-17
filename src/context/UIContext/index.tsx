"use client";

import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import ItemModal from "@/components/Modal/ItemModal";
import { ItemInfo, ModalsEnum } from "@/types";
import { createContext, useState } from "react";
import { FaPlus } from "react-icons/fa";

// When the context is called it is impossible to be null (work around TypeScript)
export const Context = createContext<ContextType>(
  null as unknown as ContextType
);

type ContextType = {
  openModal: (type: ModalsEnum, titleInfo?: ItemInfo) => void;
};

type Props = {
  children: React.ReactNode;
};

const initialItem = {
  id: 0,
  title: "",
  isActive: false,
};
// UIContext is to manage the UI components (FAB and Modals) on the home page (/)
const UIContext = ({ children }: Props) => {
  const [modal, setModal] = useState<ModalsEnum>();
  const [itemInfo, setItemInfo] = useState<ItemInfo>(initialItem);

  const openModal = (type: ModalsEnum, info?: ItemInfo) => {
    if (info) setItemInfo(info);
    else setItemInfo(initialItem);
    setModal(type);
  };

  const closeModal = () => setModal(undefined);
  const addItemClickHandler = () => openModal(ModalsEnum.AddItem);

  return (
    <Context.Provider
      value={{
        openModal,
      }}
    >
      {children}

      {/* Floating action button */}
      <button
        type="button"
        title="Add Items"
        onClick={addItemClickHandler}
        className="fixed bottom-8 right-8 z-50 bg-sky-500 h-16 w-16 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-xl hover:bg-sky-400 transition-all"
      >
        <FaPlus />
      </button>

      {/* Modals */}
      <ItemModal
        open={modal === ModalsEnum.EditItem || modal === ModalsEnum.AddItem}
        onClose={closeModal}
        type={modal}
        itemInfo={itemInfo}
      />
      <ConfirmationModal
        open={modal === ModalsEnum.ConfirmDelete}
        onClose={closeModal}
        titleInfo={titleInfo}
      />
    </Context.Provider>
  );
};
export default UIContext;
