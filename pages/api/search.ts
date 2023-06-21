import type { NextApiRequest, NextApiResponse } from "next";
import { assertError } from "ts-extras";
import { getSearchData } from "../../lib/contentful/pages/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query as typeof req.query & {
      query: string;
    };

    const { data } = await getSearchData(query);

    res
      .setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59")
      .json(data);
  } catch (error) {
    assertError(error);

    res.status(400).json({
      message: error.message,
    });
  }
}
