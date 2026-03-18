import { Post, PostRes } from "@/src/types";
import axios from "axios";

export async function getPosts() {
  const { data } = await axios.get<PostRes>("/api/posts.json");
  return data;
}

export async function addPost(data: Post) {
  await axios.post("/api/posts.json", data);
}

export async function updatePost(data: Post) {
  await axios.put(`/api/posts.json/`, data);
}


export async function delPost(id: string) {
  await axios.delete(`/api/posts.json?id=${id}`);
}