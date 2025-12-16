"use client"
import { useCampaignStore } from "@/lib/store/campaigns";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";


const CampaignTable = () => {

    const { campaigns, addCampaign, removeCampaign } = useCampaignStore();
    const [open, setOpen] = useState(false);


    const [sortBy,setSortBy] = useState("name");
    const [sortOrder,setSortOrder] = useState("asc");

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const clicks = formData.get("clicks") as string;
        const cost = formData.get("cost") as string;
        const revenue = formData.get("revenue") as string;
        addCampaign({
            name,
            startDate: new Date(startDate).toLocaleDateString(),
            endDate: new Date(endDate).toLocaleDateString(),
            clicks: parseInt(clicks),
            cost: parseFloat(cost),
            revenue: parseFloat(revenue),
            id: undefined,
        });
        setOpen(false);
    };

    const TableHeadComponent = ({ name, displayName }: { name: string; displayName: string }) => {
        return <TableHead onClick={() => {if(sortBy === name) toggleSortOrder(); else setSortBy(name); }} className="cursor-pointer">
            <div className="flex flex-row items-center gap-2">{displayName} <span className="text-xs text-gray-500">{sortBy === name ? (sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />) : null}</span></div>
        </TableHead>
    }
    return (
        <div className="flex flex-col gap-4">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Campaigns</h1>
                <Button className="cursor-pointer" onClick={() => setOpen(true)}>+ New Campaign</Button>
            </div>

            <Table>
                <TableHeader>   
                    <TableRow>
                        <TableHeadComponent name="name" displayName="Name" />
                        <TableHeadComponent name="startDate" displayName="Start Date" />
                        <TableHeadComponent name="endDate" displayName="End Date" />
                        <TableHeadComponent name="clicks" displayName="Clicks" />
                        <TableHeadComponent name="cost" displayName="Cost" />
                        <TableHeadComponent name="revenue" displayName="Revenue" />
                        <TableHeadComponent name="profit" displayName="Profit" />
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaigns.sort((a:any,b:any)=>{
                        

                        if(sortBy === 'profit'){
                            return sortOrder === "asc" ? (a.revenue - a.cost) - (b.revenue - b.cost) : (b.revenue - b.cost) - (a.revenue - a.cost);
                        }
                        let aValue = a[sortBy];
                        let bValue = b[sortBy];
                        if(typeof aValue === "string" && typeof bValue === "string") {
                            return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                        }
                        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;

                    }).map((campaign) => (
                        <TableRow key={campaign.id}>
                            <TableCell>{campaign.name}</TableCell>
                            <TableCell>{campaign.startDate.toString()   }</TableCell>
                            <TableCell>{campaign.endDate.toString()}</TableCell>
                            <TableCell>{campaign.clicks}</TableCell>
                            <TableCell>{campaign.cost.toFixed(2)}</TableCell>
                            <TableCell>{campaign.revenue.toFixed(2)}</TableCell>
                            <TableCell>{(campaign.revenue - campaign.cost).toFixed(2)}</TableCell>
                            <TableCell><Button onClick={() => removeCampaign(campaign.id || "")} className="bg-transparent text-slate-900 hover:text-destructive hover:bg-transparent cursor-pointer" ><Trash size={16} /></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
        <TableRow>
                            <TableCell colSpan={3} className="font-bold">Totals</TableCell>
                  <TableCell className="font-bold" >{campaigns.reduce((acc, campaign) => acc + campaign.clicks, 0).toFixed(2)} </TableCell>
                  <TableCell className="font-bold" >{campaigns.reduce((acc, campaign) => acc + campaign.cost, 0).toFixed(2)}</TableCell>
          
          <TableCell className="font-bold" >{(campaigns.reduce((acc, campaign) => acc + campaign.revenue, 0)).toFixed(2)}</TableCell>
          <TableCell className="font-bold" >{(campaigns.reduce((acc, campaign) => acc + (campaign.revenue-campaign.cost), 0)).toFixed(2)}</TableCell>
          <TableCell colSpan={1}></TableCell>
        
        </TableRow>
      </TableFooter>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Campaign</DialogTitle>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label>Name</Label>
                            <Input required name="name" type="text" />
                        </div>
                        <div>
                            <Label>Start Date</Label>
                            <Input required name="startDate" type="date" />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input required name="endDate" type="date" />
                        </div>
                        <div>
                            <Label>Clicks</Label>
                            <Input required name="clicks" type="number" />
                        </div>
                        <div>
                            <Label>Cost</Label>
                            <Input required name="cost" type="number" />
                        </div>
                        <div>
                            <Label>Revenue</Label>
                            <Input required name="revenue" type="number" />
                        </div>
                        <Button type="submit">Add Campaign</Button>
                    </form>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CampaignTable;