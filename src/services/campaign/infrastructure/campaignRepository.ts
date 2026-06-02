import { campaignSchema } from "./campaignScheme";
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
    const mongooseSchema = new Schema({}, { strict: false, timestamps: true });

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
    const doc = await this.model.create(validatedData as any);
    return doc.toObject();
  }

  async find(query: Record<string, any> = {}): Promise<Campaign[]> {
    return this.model.find(query).lean();
  }

  async findById(id: string): Promise<Campaign | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).lean();
  }

  async update(id: string, data: any): Promise<Campaign | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const { error, value } = this.scheme
      .fork(Object.keys(data), (schema) => schema.required())
      .validate(data, { stripUnknown: true });

    if (error) {
      throw new Error(
        `Validation Error: ${error.details.map((d) => d.message).join(", ")}`,
      );
    }

    return this.model.findByIdAndUpdate(id, value, { new: true }).lean();
  }

  async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
}
