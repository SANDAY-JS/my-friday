type SubmitData = {
  conversationId?: string;
  messageId?: string;
  msg: string;
};

type ResponseData = {
  conversationId: string;
  messageId: string;
  response: string;
  inputText: string;
};
