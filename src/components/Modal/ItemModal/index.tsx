"use client";
import { FeedBack, ItemModalProps, ModalsEnum } from "@/types";
import { add, edit } from "@/utils/itemsApi";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { FaCheck, FaMinus } from "react-icons/fa";
import Modal from "..";

/**
 * Because the add and edit items are similar
 * I decided to make it as a single component that receive a type that tell us what action it should do
 */
const ItemModal = ({ itemInfo, type, open, onClose }: ItemModalProps) => {
  const [title, setTitle] = useState(itemInfo.title);
  const [active, setActive] = useState(itemInfo.isActive);
  const [feedback, setFeedBack] = useState<FeedBack>();
  const [modalTitle, setModalTitle] = useState<string>();

  useEffect(() => {
    // Update the states if the component rerenders
    setTitle(itemInfo.title);
    setActive(itemInfo.isActive);
    if (type === undefined) return;
    setModalTitle(type === ModalsEnum.AddItem ? "Add New Item" : "Edit Item");
  }, [itemInfo, type]);

  const titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  const activeChangeHandler: ChangeEventHandler = () => setActive((i) => !i);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setFeedBack({
        error: true,
        message: "This field is required",
      });
      return;
    }
    if (type === ModalsEnum.AddItem) {
      const result = await add(title, active);
      if (result)
        setFeedBack({
          error: false,
          message: "Item added successfully",
        });
      else
        setFeedBack({
          error: true,
          message: "Error Adding Item",
        });
    } else if (type === ModalsEnum.EditItem) {
      const result = await edit(itemInfo.id, title, active);
      if (result)
        setFeedBack({
          error: false,
          message: "Item Updated successfully",
        });
      else
        setFeedBack({
          error: true,
          message: "Error editing Item",
        });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={modalTitle}>
      <form
        className="flex space-y-3 flex-grow py-1 w-full flex-col divide-y"
        onSubmit={handleSubmit}
      >
        <div className="w-full  ">
          <label
            htmlFor="title_name"
            className="block mb-2 text-sm font-medium "
          >
            Item Title
          </label>
          <div className="flex gap-3 bg-gray-950 border border-gray-300 text-white text-sm overflow-hidden rounded-xl  focus:ring-blue-500 focus:border-blue-500  w-full pl-3 outline-none">
            <input
              type="text"
              id="title_name"
              className="bg-none outline-none border-none w-full bg-transparent focus:border-blue-500"
              placeholder="Item Title"
              onChange={titleChangeHandler}
              value={title}
              required
            />
            <input
              type="checkbox"
              id="title_state"
              className="hidden peer"
              onChange={activeChangeHandler}
              checked={active}
            />
            <label
              htmlFor="title_state"
              title={active ? "Active" : "Inactive"}
              className="flex justify-center uppercase peer-checked:bg-green-500  text-white self-stretch items-center p-3 bg-red-500 gap-3 transition-all  cursor-pointer "
            >
              {active ? (
                <>
                  <FaCheck />
                </>
              ) : (
                <>
                  <FaMinus />
                </>
              )}
            </label>
          </div>
          {feedback &&
            (feedback.error ? (
              <p className="mt-1 text-red-500"> {feedback.message} </p>
            ) : (
              <p className="mt-1 text-green-500"> {feedback.message} </p>
            ))}
        </div>

        <div className="flex justify-end items-center gap-3 pt-3">
          <button
            type="button"
            className="text-blue-500  text-sm p-1 px-3 rounded-md uppercase hover:bg-gray-950  transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-blue-500 text-sm p-1 px-3 rounded-md uppercase hover:bg-gray-950  transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default ItemModal;
