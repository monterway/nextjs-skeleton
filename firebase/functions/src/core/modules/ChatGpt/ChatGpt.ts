import axios, {AxiosError} from "axios";

export enum ChatGpt3RandomnessIndex {
  "low" = 0,
  "low-medium" = 0.25,
  "medium" = 0.5,
  "medium-high" = 0.75,
  "high" = 1,
}

export type ChatGptErrorCode =
  | "INVALID_REQUEST"
  | "TOO_MANY_CHARACTERS"
  | "UNKNOWN";

export type ChatGptQuestion = string;

export type ChatGptRandomness =
  | "low"
  | "low-medium"
  | "medium"
  | "medium-high"
  | "high";

export class ChatGptError extends Error {
  code: ChatGptErrorCode;
  data: any;

  constructor(code: ChatGptErrorCode, data: any = null) {
    super(code);
    this.code = code;
    this.data = data;
  }
}

export interface ChatGptProps {
  apiKey: string;
  version: "v1";
}

export interface ChatGptType {
  ask: (
    question: ChatGptQuestion,
    systemContext: ChatGptQuestion,
    randomness: ChatGptRandomness
  ) => Promise<string>;
}

const ChatGpt = (props: ChatGptProps): ChatGptType => {
  const {apiKey, version} = props;

  const client = axios.create({
    baseURL: `https://api.openai.com/${version}`,
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  });

  const ask = async (
    question: ChatGptQuestion,
    systemContext: ChatGptQuestion,
    randomness: ChatGptRandomness = "medium"
  ): Promise<string> => {
    try {
      const response = await client.post("/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemContext,
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: ChatGpt3RandomnessIndex[randomness],
      });

      return response.data.choices[0].message.content;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response) {
          const data = e.response.data.error;
          // If not existing code is returned by ChatGPT
          // add it to the ChatGptErrorCode type
          const code = data.type
            .replace("_error", "")
            .toUpperCase() as ChatGptErrorCode;
          throw new ChatGptError(code, data);
        } else {
          throw new ChatGptError("UNKNOWN");
        }
      } else {
        throw new ChatGptError("UNKNOWN");
      }
    }
  };

  return {
    ask,
  };
};

export default ChatGpt;
