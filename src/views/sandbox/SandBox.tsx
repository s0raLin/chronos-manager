import MainContent from "@/src/components/MainContent";
import { Sidebar } from "@/src/components/Sidebar";
import React from "react";

export default function SandBox() {
  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <MainContent />
      </main>
    </div>
  );
}
