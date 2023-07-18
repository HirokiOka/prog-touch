import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userName = 'John';
    const clickedTime = '2023-07-18 15:44:55';
    const choice = '円を描く';
    try {
      await sql`INSERT INTO clicks (userName, clickedTime, choice) VALUES (${userName}, ${clickedTime}, ${choice})`;
      res.status(200).json({ status: 'success', userName, clickedTime, choice });
    } catch (e) {
      res.status(500).json({ status: 'error', error: e });
    }
  } else {
    res.status(400).json({ status: 'error', error: 'Invalid HTTP method' });
  }

}
