import { DraftItem, DraftsRes, StatsRes } from "@/src/types";
import axios from "axios";

export async function getStats() {
  const { data } = await axios.get<StatsRes>("/api/site-stats.json");

  return data;
}

export async function getDrafts() {
  const { data } = await axios.get<DraftsRes>(`/api/drafts.json`);
  return data;
}

export async function updateDraft(data: DraftItem) {
  await axios.put("/api/drafts.json", data);
}

export async function delDraft(type: string, id: string) {
  await axios.delete(`/api/drafts.json?type=${type}&id=${id}`);
}

export async function publish(type: string, id: string) {
  await axios.post("/api/publish.json", { type, id });
}
