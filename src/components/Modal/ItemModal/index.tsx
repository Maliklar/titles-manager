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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update the states if the component rerenders
    setTitle(itemInfo.title);
    setActive(itemInfo.isActive);
    setFeedBack(undefined);
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
    setLoading(true);
    if (type === ModalsEnum.AddItem) {
      const result = await add(title, active);
      if (result)
        setFeedBack({
          error: false,
          message: "Item added successfully",
        });
      else {
        setFeedBack({
          error: true,
          message: "Error Adding Item",
        });
        setLoading(false);
        return;
      }
    } else if (type === ModalsEnum.EditItem) {
      const result = await edit(itemInfo.id, title, active);
      if (result)
        setFeedBack({
          error: false,
          message: "Item Updated successfully",
        });
      else {
        setFeedBack({
          error: true,
          message: "Error editing Item",
        });
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={modalTitle}>
      {loading ? (
        <div
          role="status"
          className="w-full flex items-center justify-center p-10 "
        >
          <svg
            aria-hidden="true"
            className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
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
      )}
    </Modal>
  );
};
export default ItemModal;
