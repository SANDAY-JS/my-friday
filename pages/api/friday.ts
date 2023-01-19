import { ChatGPTAPIBrowser } from "chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function fridayResponse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const { conversationId, messageId, msg } = req.body;

  try {
    const email = process.env.OPENAI_EMAIL;
    const password = process.env.OPENAI_PASSWORD;

    if (!email || !password) {
      res.status(500).send("環境変数を設定してください");
      return;
    }

    const api = new ChatGPTAPIBrowser({ email, password });
    await api.initSession();

    // send a message and wait for the response
    if (conversationId && messageId) {
      let gpt = await api.sendMessage(msg, {
        conversationId: conversationId,
        parentMessageId: messageId,
      });
      res.json(gpt);
      return;
    }

    let gpt = await api.sendMessage(msg);
    res.json(gpt);

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
