import { Request, Response } from "express";
import { getDriveClient, initializeDriveClient } from "./driveUtils";

export function authStatusHandler(req: Request, res: Response) {
  res.json({ authenticated: !!getDriveClient() });
}

export async function authRefreshHandler(req: Request, res: Response) {
  try {
    await initializeDriveClient();
    res.json({ success: true, message: "Authentication refreshed" });
  } catch (error) {
    console.error("Error refreshing authentication:", error);
    res.status(500).json({ error: "Failed to refresh authentication" });
  }
}