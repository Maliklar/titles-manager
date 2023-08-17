import { FeedBack, ItemInfo, ModalProps } from "@/types";
import { remove } from "@/utils/itemsApi";
import { FormEventHandler, useState } from "react";
import Modal from "..";
type Props = Omit<ModalProps, "children" | "title"> & { itemInfo: ItemInfo };
const ConfirmationModal = ({ itemInfo, open, onClose }: Props) => {
  const [feedback, setFeedback] = useState<FeedBack>();
  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    const result = await remove(itemInfo.id);

    if (result) {
      setFeedback({
        message: "Item deleted successfully",
        error: false,
      });
      return;
    }
    setFeedback({
      message: "Couldn't delete the item",
      error: false,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete Item">
      <form
        className="flex-col space-y-3 flex-grow divide-y-2 py-1 w-full"
        onSubmit={submitHandler}
      >
        <div className="w-full">Are you sure you want to delete this item?</div>
        {feedback &&
          (feedback.error ? (
            <p className="mt-1 text-red-500"> {feedback.message} </p>
          ) : (
            <p className="mt-1 text-green-500"> {feedback.message} </p>
          ))}
        <div className="flex justify-end items-center  gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="text-sky-500  text-sm p-1 px-3 rounded-md uppercase hover:bg-gray-100  font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" text-red-500 text-sm p-1 px-3 rounded-md uppercase hover:bg-gray-100 font-bold transition-colors"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default ConfirmationModal;
