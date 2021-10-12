import type { NextApiRequest, NextApiResponse } from "next";
import {
  EMAIL_OCTOPUS_API_KEY,
  EMAIL_OCTOPUS_LIST_ID,
} from "../../../constants";

type EmailOcotopusSuccessResponse = {
  created_at: string;
  email_address: string;
  fields: Record<string, string>;
  id: string;
  status: "SUBSCRIBED" | "UNSUBSCRIBED" | "PENDING";
};

type EmailOcotopusErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

type HandlerResponse = {
  success: boolean;
  result?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const email = req.body.email;

  const payload = {
    api_key: EMAIL_OCTOPUS_API_KEY,
    email_address: email,
  };

  const url = `https://emailoctopus.com/api/1.5/lists/${EMAIL_OCTOPUS_LIST_ID}/contacts`;

  try {
    const r = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (r.ok) {
      const { status }: EmailOcotopusSuccessResponse = await r.json();

      return res.status(200).json({
        success: true,
        result: status,
      });
    }

    const { error }: EmailOcotopusErrorResponse = await r.json();

    if (error.code === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
      return res.status(200).json({
        success: true,
        result: "ALREADY_SUBSCRIBED",
      });
    }

    throw new Error(error.code + " " + error.message);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
}
