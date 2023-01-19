// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPIBrowser } from "chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function fridayResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const { email, password, msg } = req.body;

  try {
    const api = new ChatGPTAPIBrowser({ email, password });
    await api.initSession();

    // send a message and wait for the response
    let gpt = await api.sendMessage(msg);
    res.json(gpt.response);

    // send a follow-up
    // res = await api.sendMessage("Can you expand on that?", {
    //   conversationId: res.conversationId,
    //   parentMessageId: res.messageId,
    // });
    // console.log(res.response);

    // // send another follow-up
    // // send a follow-up
    // res = await api.sendMessage("What were we talking about?", {
    //   conversationId: res.conversationId,
    //   parentMessageId: res.messageId,
    // });
  } catch (error) {
    console.error("😨", error);
    // setError("")
  }
}
