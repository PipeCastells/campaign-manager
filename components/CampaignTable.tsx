"use client"
import { useCampaignStore } from "@/lib/store/campaigns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Trash } from "lucide-react";

const CampaignTable = () => {

    const { campaigns, addCampaign, removeCampaign } = useCampaignStore();
    const [open, setOpen] = useState(false);


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
    return (
        <div className="flex flex-col gap-4">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Campaigns</h1>
                <Button className="cursor-pointer" onClick={() => setOpen(true)}>+ New Campaign</Button>
            </div>

            <Table>
                <TableHeader>   
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaigns.map((campaign) => (
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
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Campaign</DialogTitle>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label>Name</Label>
                            <Input name="name" type="text" />
                        </div>
                        <div>
                            <Label>Start Date</Label>
                            <Input name="startDate" type="date" />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input name="endDate" type="date" />
                        </div>
                        <div>
                            <Label>Clicks</Label>
                            <Input name="clicks" type="number" />
                        </div>
                        <div>
                            <Label>Cost</Label>
                            <Input name="cost" type="number" />
                        </div>
                        <div>
                            <Label>Revenue</Label>
                            <Input name="revenue" type="number" />
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