import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import getServer from "../../server/getServer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

// create server only once
const serverPromise = getServer();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

  const server = await serverPromise;

  await server.createHandler({
    path: "/api",
  })(req, res);
};

export default handler;
