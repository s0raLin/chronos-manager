import { StatsRes } from "@/src/types";
import axios from "axios";

export async function getStats() {
  const { data } = await axios.get<StatsRes>("/api/site-stats.json");

  return data;
}


export async function getDrafts(type?: 'posts' | 'diary') {
  const {data} = await axios.get(`/api/drafts.json?type=${type}`);
  
}