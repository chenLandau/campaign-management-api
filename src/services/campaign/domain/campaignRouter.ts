import { Router, Request, Response } from "express";
import { CampaignService } from "./campaignService";

const router = Router();
const prefix = "campaigns";
const campaignService = new CampaignService();

async function createCampaign(req: Request, res: Response) {
  const campaign = await campaignService.createCampaign(req.body);
  res.status(201).json(campaign);
}

async function getCampaignById(req: Request, res: Response) {
  const id = req.params.id as string;
  const campaign = await campaignService.getCampaignById(id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.status(200).json(campaign);
}

async function listCampaigns(req: Request, res: Response) {
  const publisherId = (req.query.publisherId as string) || undefined;
  const campaigns = await campaignService.listCampaigns(publisherId);

  res.status(200).json(campaigns);
}

async function updateCampaign(req: Request, res: Response) {
  const id = req.params.id as string;
  const campaign = await campaignService.updateCampaign(id, req.body);

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.status(200).json(campaign);
}

async function deleteCampaign(req: Request, res: Response) {
  const id = req.params.id as string;
  const deleted = await campaignService.deleteCampaign(id);

  if (!deleted) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.sendStatus(204);
}

router.post("/", createCampaign);
router.get("/:id", getCampaignById);
router.get("/", listCampaigns);
router.patch("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;
