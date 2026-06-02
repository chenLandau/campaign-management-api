import { Router, Request, Response } from "express";

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  active: boolean;
}

const campaigns: Campaign[] = [];
const router = Router();
const prefix = "campaigns";

export default router;
export { prefix };
