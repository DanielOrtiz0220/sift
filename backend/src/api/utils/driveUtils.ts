import { google } from "googleapis";
import { authorize } from "../../authentications/driveAuth";

let driveClient: any;

export async function initializeDriveClient() {
  const auth = await authorize();
  driveClient = google.drive({ version: "v3", auth });
}

export function getDriveClient() {
  return driveClient;
}

export async function searchDrive(query: string) {
  if (!driveClient) {
    await initializeDriveClient();
  }

  // temp query for testing
  const testquery = "programmer";
  const searchResponse = await driveClient.files.list({
    q: `fullText contains '${testquery}'`,
    fields: "files(id, name, webViewLink)",
    pageSize: 10,
  });

  return searchResponse.data.files;
}