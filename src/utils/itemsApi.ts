import { ItemInfo } from "@/types";
import axios from "axios";

const ENDPOINT = "titles";
const request = axios.create({
  baseURL: "/api/",
});

async function add(title: string, isActive: boolean) {
  try {
    await request.post(ENDPOINT, {
      title,
      isActive,
    });

    return false;
  } catch (error) {
    return true;
  }
}

async function remove(id: number) {
  try {
    await request.delete(`${ENDPOINT}/${id}`);
    return false;
  } catch (error) {
    return true;
  }
}
async function edit(id: number, title: string, isActive: boolean) {
  try {
    await request.patch(ENDPOINT, { id, title, isActive });
    return false;
  } catch (error) {
    return true;
  }
}

async function get() {
  try {
    const response = await request.get(ENDPOINT);
    return {
      data: response.data as ItemInfo[],
    };
  } catch (error) {
    return false;
  }
}

export { get, remove, edit, add };
