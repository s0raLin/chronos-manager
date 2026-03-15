import { DraftsRes, StatsRes } from "@/src/types";
import axios from "axios";

export async function getStats() {
  const { data } = await axios.get<StatsRes>("/api/site-stats.json");

  return data;
}


export async function getDrafts() {
  const { data } = await axios.get<DraftsRes>(`/api/drafts.json`);
  return data;
}