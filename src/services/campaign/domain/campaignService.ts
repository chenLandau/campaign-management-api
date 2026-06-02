import {
  CampaignRepository,
  Campaign,
} from "../infrastructure/campaignRepository";
import { v4 as uuidv4 } from "uuid";

export interface CreateCampaignInput {
  name: string;
  publisherId: string;
  status: Campaign["status"];
  startDate: string;
}

export interface UpdateCampaignInput {
  name?: string;
  status?: Campaign["status"];
  startDate?: string;
}

export class CampaignService {
  private repo = new CampaignRepository();

  async createCampaign(data: CreateCampaignInput): Promise<Campaign> {
    const createdAt = new Date().toISOString();
    const id = uuidv4();
    const campaign = { ...data, id, createdAt };
    return this.repo.create(campaign);
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    return this.repo.findById(id);
  }

  async listCampaigns(publisherId?: string): Promise<Campaign[]> {
    if (publisherId) {
      return this.repo.find({ publisherId });
    }

    return this.repo.find();
  }

  async updateCampaign(
    id: string,
    data: UpdateCampaignInput,
  ): Promise<Campaign | null> {
    return this.repo.update(id, data);
  }

  async patchCampaignStatus(
    id: string,
    status: Campaign["status"],
  ): Promise<Campaign | null> {
    return this.repo.update(id, { status });
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
