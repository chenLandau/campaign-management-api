import {
  CampaignRepository,
  Campaign,
} from "../infrastructure/campaignRepository";

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
    return this.repo.create(data);
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
