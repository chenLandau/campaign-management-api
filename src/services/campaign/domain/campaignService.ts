import {
  CampaignRepository,
  Campaign,
} from "../infrastructure/campaignRepository";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../../common/logger/logger";

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
    try {
      const createdAt = new Date().toISOString();
      const id = uuidv4();
      const campaign = { ...data, id, createdAt };
      const result = await this.repo.create(campaign);
      logger.info("Campaign created successfully", { campaignId: id });
      return result;
    } catch (error) {
      logger.error("Failed to create campaign", error);
      throw error;
    }
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    try {
      const result = await this.repo.findById(id);
      if (!result) {
        logger.warn("Campaign not found", { campaignId: id });
      }
      return result;
    } catch (error) {
      logger.error("Failed to get campaign by ID", { campaignId: id, error });
      throw error;
    }
  }

  async listCampaigns(publisherId?: string): Promise<Campaign[]> {
    try {
      const result = publisherId
        ? await this.repo.find({ publisherId })
        : await this.repo.find();
      logger.info("Campaigns listed successfully", {
        count: result.length,
        publisherId,
      });
      return result;
    } catch (error) {
      logger.error("Failed to list campaigns", { publisherId, error });
      throw error;
    }
  }

  async updateCampaign(
    id: string,
    data: UpdateCampaignInput,
  ): Promise<Campaign | null> {
    try {
      const result = await this.repo.update(id, data);
      if (!result) {
        logger.warn("Campaign not found for update", { campaignId: id });
      } else {
        logger.info("Campaign updated successfully", { campaignId: id });
      }
      return result;
    } catch (error) {
      logger.error("Failed to update campaign", { campaignId: id, error });
      throw error;
    }
  }

  async patchCampaignStatus(
    id: string,
    status: Campaign["status"],
  ): Promise<Campaign | null> {
    try {
      const result = await this.repo.update(id, { status });
      if (!result) {
        logger.warn("Campaign not found for patch", { campaignId: id });
      } else {
        logger.info("Campaign status patched successfully", {
          campaignId: id,
          status,
        });
      }
      return result;
    } catch (error) {
      logger.error("Failed to patch campaign status", {
        campaignId: id,
        status,
        error,
      });
      throw error;
    }
  }

  async deleteCampaign(id: string): Promise<boolean> {
    try {
      const result = await this.repo.delete(id);
      if (result) {
        logger.info("Campaign deleted successfully", { campaignId: id });
      } else {
        logger.warn("Campaign not found for deletion", { campaignId: id });
      }
      return result;
    } catch (error) {
      logger.error("Failed to delete campaign", { campaignId: id, error });
      throw error;
    }
  }
}
