import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface Campaign{
    id: string | undefined;
    name: string;
    startDate: string;
    endDate: string;
    clicks: number;
    cost: number;
    revenue: number;
}


interface CampaignStore{
    campaigns: Campaign[];
    addCampaign: (campaign: Campaign)=>void;
    removeCampaign: (id: string)=>void;


}
export const useCampaignStore = create<CampaignStore>()(
    persist(
        (set,get) => ({
            campaigns: [],
            addCampaign: (campaign: Campaign) => set((state)=>({campaigns: [...state.campaigns, {...campaign, id: campaign.id || crypto.randomUUID()}] as Campaign[]})),
            removeCampaign: (id: string) => set((state)=>({campaigns: state.campaigns.filter((campaign)=>campaign.id !== id)})),
            
        }),
        {
            name: "campaigns",
            storage: createJSONStorage(() => localStorage),
            partialize: (state: CampaignStore) => ({
                campaigns: state.campaigns,
            }),
            onRehydrateStorage: () => (state: CampaignStore | undefined) => {
                if (state) {
                    console.log("Campaigns rehydrated", state);
                }
            },
        }),
);