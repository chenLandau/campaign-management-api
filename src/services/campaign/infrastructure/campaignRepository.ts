import { campaignSchema } from "./campaignSchema";
import mongoose, { Schema, Model } from "mongoose";
import { ObjectSchema } from "joi";

export interface Campaign {
  id: string;
  name: string;
  publisherId: string;
  status: "active" | "paused" | "ended";
  startDate: string;
  createdAt: string;
}

export class CampaignRepository {
  private model: Model<any>;
  private readonly collectionName = "campaigns";
  private readonly scheme: ObjectSchema = campaignSchema;
  private readonly indexes = ["id", "publisherId"];

  constructor() {
    const mongooseSchema = new Schema(
      {
        id: { type: String, required: true },
        publisherId: { type: String, required: true },
        name: { type: String, required: true },
      },
      { strict: false },
    );

    this.indexes.forEach((field) => {
      mongooseSchema.index({ [field]: 1 });
    });

    this.model =
      mongoose.models[this.collectionName] ||
      mongoose.model(this.collectionName, mongooseSchema);
  }

  private validate(data: any): Campaign {
    const { error, value } = this.scheme.validate(data, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(
        `Validation Error: ${error.details.map((d) => d.message).join(", ")}`,
      );
    }

    return value as Campaign;
  }

  async create(data: any): Promise<Campaign> {
    const validatedData = this.validate(data);
    const doc = await this.model.create(validatedData);
    return doc.toObject();
  }

  async find(query: Record<string, any> = {}): Promise<Campaign[]> {
    return this.model.find(query).lean();
  }

  async findById(id: string): Promise<Campaign | null> {
    return this.model.findOne({ id }).lean();
  }

  async update(id: string, data: any): Promise<Campaign | null> {
    const existingCampaign = await this.model.findOne({ id }).lean();

    if (!existingCampaign) {
      return null;
    }

    const updatedData = {
      ...existingCampaign,
      ...data,
    };

    const { error, value } = this.scheme.validate(updatedData, {
      stripUnknown: true,
    });

    if (error) {
      throw new Error(
        `Validation Error: ${error.details.map((d) => d.message).join(", ")}`,
      );
    }

    return this.model
      .findOneAndUpdate({ id }, { $set: value }, { new: true })
      .lean();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findOneAndDelete({ id });
    return result !== null;
  }
}
