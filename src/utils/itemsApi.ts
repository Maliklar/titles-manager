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

    return true;
  } catch (error) {
    return false;
  }
}

async function remove(id: number) {
  try {
    await request.delete(`${ENDPOINT}/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}
async function edit(id: number, title: string, isActive: boolean) {
  try {
    await request.patch(ENDPOINT, { id, title, isActive });
    return true;
  } catch (error) {
    return false;
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
