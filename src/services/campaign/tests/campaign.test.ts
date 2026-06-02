import request from "supertest";
import { app } from "../../../app";
import { initPackages } from "../../../common/init";
import mongoose from "mongoose";

describe("Campaign Management API Tests", () => {
  let createdCampaignId: string;

  beforeAll(async () => {
    await initPackages();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /campaigns - should create a new campaign", async () => {
    const res = await request(app).post("/campaigns").send({
      name: "campaign_123",
      publisherId: "pub_999",
      status: "active",
      startDate: "2026-06-02",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("campaign_123");

    createdCampaignId = res.body.id;
  });

  it("POST /campaigns - should return 400 for missing required fields", async () => {
    const res = await request(app).post("/campaigns").send({
      status: "active",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /campaigns/:id - should fetch campaign by id", async () => {
    const res = await request(app).get(`/campaigns/${createdCampaignId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(createdCampaignId);
  });
});
