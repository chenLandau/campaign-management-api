import { Router, Request, Response } from "express";
import { CampaignService } from "./campaignService";
import { HttpStatus } from "../../../common/statuses/networkStatuses";
const router = Router();

export async function createCampaign(req: Request, res: Response) {
  try {
    const campaignService = new CampaignService();
    const campaign = await campaignService.createCampaign(req.body);
    return res.status(HttpStatus.CREATED).json(campaign);
  } catch (error: any) {
    if (error.message.includes("Validation Error")) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

async function getCampaignById(req: Request, res: Response) {
  const id = req.params.id as string;
  const campaignService = new CampaignService();
  const campaign = await campaignService.getCampaignById(id);

  if (!campaign) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: "Campaign not found" });
  }

  res.status(HttpStatus.OK).json(campaign);
}

async function getCampaignsList(req: Request, res: Response) {
  const publisherId = (req.query.publisherId as string) || undefined;
  const campaignService = new CampaignService();
  const campaigns = await campaignService.getCampaigns(publisherId);

  res.status(HttpStatus.OK).json(campaigns);
}

async function updateCampaign(req: Request, res: Response) {
  const id = req.params.id as string;
  const campaignService = new CampaignService();
  const campaign = await campaignService.updateCampaign(id, req.body);

  if (!campaign) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: "Campaign not found" });
  }

  res.status(HttpStatus.OK).json(campaign);
}

async function deleteCampaign(req: Request, res: Response) {
  const id = req.params.id as string;
  const campaignService = new CampaignService();
  const deleted = await campaignService.deleteCampaign(id);

  if (!deleted) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: "Campaign not found" });
  }

  res.status(HttpStatus.NO_CONTENT).send();
}

router.post("/", createCampaign);
router.get("/:id", getCampaignById);
router.get("/", getCampaignsList);
router.patch("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;
