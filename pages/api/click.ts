import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const reqData = JSON.parse(req.body);
    const user_name = reqData.user_name;
    const clicked_time = reqData.clicked_time;
    const state = reqData.state;
    const action = reqData.action;
    const action_type = reqData.action_type;
    const problem_id = reqData.problem_id;
    try {
      await sql`INSERT INTO user_log (user_name, clicked_time, state, action, action_type, problem_id) VALUES (${user_name}, ${clicked_time}, ${state}, ${action}, ${action_type}, ${problem_id})`;
      res.status(200).json({ status: 'success', user_name, clicked_time, state, action, action_type });
    } catch (e) {
      res.status(500).json({ status: 'error', error: e });
    }
  } else {
    res.status(400).json({ status: 'error', error: 'Invalid HTTP method' });
  }

}
