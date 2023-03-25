import { NextApiRequest, NextApiResponse } from "next";
import { getRadioPageSingle } from "../../lib/contentful/pages/radio";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, slug } = req.query;

  if (secret !== process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const { show } = await getRadioPageSingle(slug as string, true);

    res.setPreviewData({});
    res.writeHead(307, { Location: `/radio/${show.slug}` });
    res.end();
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: "Invalid slug" });
  }
}
