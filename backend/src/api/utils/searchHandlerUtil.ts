import { Request, Response } from "express";
import { searchDrive } from "./driveUtils";
import { summaryPrompt } from "../../ai/summaryPrompt";

export async function searchHandler(req: Request, res: Response) {
  const { query } = req.params;
  
  try {
    console.log("search query: ", query);
    const files = await searchDrive(query);

    console.log(files);

    const topDocuments: { title: string; url: string }[] = files.map((file: { name: string; webViewLink: string }) => ({
      title: file.name,
      url: file.webViewLink,
    }));

    const Summary = await summaryPrompt(query, topDocuments);

    res.json({
      summary: Summary,
      topDocuments: topDocuments
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
}