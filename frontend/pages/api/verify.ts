import { OAuth2Client } from 'google-auth-library';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authClient = new OAuth2Client(
    '185496584407-89i5ueqb54cdd3172fp9pfca3up8mdn9.apps.googleusercontent.com'
  );
  console.log('verification');
  res.status(200).json({ data: 'Verification' });
}
