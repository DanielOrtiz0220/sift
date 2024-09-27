import { google } from 'googleapis';
import { authorize } from '../authentications/driveAuth';

async function getDriveDocs() {
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth });

    // Use the drive API here
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
    return res.data;
}
export { getDriveDocs };