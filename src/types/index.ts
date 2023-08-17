import { ReactNode } from "react";

// Types
export type ItemInfo = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt?: Date;
  isDeleted?: boolean | null;
};

// Components types
export type ModalProps = {
  title?: string;
  onClose: VoidFunction;
  open: boolean;
  children: ReactNode;
};

export type ItemModalProps = {
  itemInfo: ItemInfo;
  open: boolean;
  onClose: VoidFunction;
  type?: ModalsEnum;
};

// Enums
export enum ModalsEnum {
  EditItem,
  AddItem,
  ConfirmDelete,
}

// Others
export type FeedBack = {
  error: boolean;
  message: string;
};
