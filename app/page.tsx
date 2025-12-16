"use client"
import CampaignTable from "@/components/CampaignTable";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { useCampaignStore } from "@/lib/store/campaigns";
import Image from "next/image";

export default function Home() {
  const { addCampaign } = useCampaignStore();
  return (
    <div className="">
      <main className="">
        <CampaignTable />
        </main>
    </div>
  );
}
