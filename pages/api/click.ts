import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const reqData = JSON.parse(req.body);
    const userName = reqData.userName;
    const clickedTime = reqData.clickedTime;
    const choice = reqData.choice;
    try {
      await sql`INSERT INTO user_log (userName, clickedTime, choice) VALUES (${userName}, ${clickedTime}, ${choice})`;
      res.status(200).json({ status: 'success', userName, clickedTime, choice });
    } catch (e) {
      res.status(500).json({ status: 'error', error: e });
    }
  } else {
    res.status(400).json({ status: 'error', error: 'Invalid HTTP method' });
  }

}
