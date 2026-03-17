import { PostRes } from "@/src/types";
import axios from "axios";

export async function getPosts() {
  const { data } = await axios.get<PostRes>("/api/posts.json");
  return data;
}
