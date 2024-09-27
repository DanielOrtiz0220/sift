import { Request, Response } from "express";
import { searchDrive } from "./driveUtils";
import { generateSummary } from "../../ai/summaryPrompt";

export async function searchHandler(req: Request, res: Response) {
  const { query } = req.params;
  
  try {
    const files = await searchDrive(query);
    
    // TODO: Implement your RAG logic here
    // This is where you'd typically:
    // 1. Process the content of the found files
    // 2. Generate an AI summary
    // 3. Rank the documents

    console.log(files);

    const mockSummary = await generateSummary(query, files);
    const topDocuments = files.map((file: { name: string; webViewLink: string }) => ({
      title: file.name,
      url: file.webViewLink,
    }));

    res.json({
      summary: mockSummary,
      topDocuments: topDocuments
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
}