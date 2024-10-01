import { OAuth2Client } from 'google-auth-library';
import { writeFile, readFile } from 'fs/promises';
import { createServer } from 'http';
import { parse as parseUrl } from 'url';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = 'token.json';

class GoogleDriveAuth {
  private oAuth2Client: OAuth2Client;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
  }

  async getAuthUrl(): Promise<string> {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    return authUrl;
  }

  async getToken(code: string): Promise<void> {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);
    await this.saveToken(tokens);
  }

  private async saveToken(token: any): Promise<void> {
    await writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to', TOKEN_PATH);
  }

  async loadSavedToken(): Promise<boolean> {
    try {
      const token = await readFile(TOKEN_PATH, 'utf-8');
      this.oAuth2Client.setCredentials(JSON.parse(token));
      return true;
    } catch (err) {
      return false;
    }
  }

  getAuth(): OAuth2Client {
    return this.oAuth2Client;
  }
}

export async function authorize(): Promise<OAuth2Client> {
  const auth = new GoogleDriveAuth(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URL!
  );

  if (await auth.loadSavedToken()) {
    return auth.getAuth();
  }

  const authUrl = await auth.getAuthUrl();
  console.log('Authorize this app by visiting this url:', authUrl);

  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      if (!req.url) return;
      const url = parseUrl(req.url, true);
      if (url.pathname === '/oauth2callback') {
        const code = url.query.code as string;
        res.end('Authentication successful! You can close this window.');
        server.close();

        await auth.getToken(code);
        resolve(auth.getAuth());
      }
    }).listen(3000, () => {
      console.log(`Listening on 3000`);
    });
  });
}