import axios from "axios";

export enum ChatGpt3Engine {
  Davinci = 'davinci',
  Curie = 'curie',
  Babbage = 'babbage',
  Ada = 'ada',
}

export enum ChatGpt3MaxTokens {
  'davinci' = 4096,
  'curie' = 4096,
  'babbage' = 4096,
  'ada' = 2048,
}

export enum ChatGpt3RandomnessIndex {
  'low' = 0,
  'low-medium' = 0.25,
  'medium' = 0.5,
  'medium-high' = 0.75,
  'high' = 1,
}

export type ChatGptErrorCode = 'TOO_MANY_CHARACTERS'|'UNKNOWN';

export type ChatGptQuestion = string;

export type ChatGptRandomness = 'low'|'low-medium'|'medium'|'medium-high'|'high';

export class ChatGptError extends Error {
  code: ChatGptErrorCode;

  constructor(code: ChatGptErrorCode) {
    super(code);
    this.code = code;
  }
}

export interface ChatGptProps {
  apiKey: string,
  version: 'v1',
}

export interface ChatGptType {
  chooseEngine: (question: ChatGptQuestion) => ChatGpt3Engine;
  ask: (question: ChatGptQuestion, randomness: ChatGptRandomness) => Promise<string>;
}

const ChatGpt = (props: ChatGptProps): ChatGptType => {
  const { apiKey, version } = props;

  const client = axios.create({
    baseURL: `https://api.openai.com/${version}`,
    headers: {
      Authorization: 'Bearer ' + apiKey,
    },
  });

  const chooseEngine = (question: ChatGptQuestion): ChatGpt3Engine => {
    const questionTokens = question.split(' ').length;
    if (questionTokens > 4096) {
      throw new ChatGptError('TOO_MANY_CHARACTERS');
    }

    const complexKeywords = ['explain', 'describe', 'why', 'how', 'synthesize', 'create', 'imagine', 'predict'];
    let complexityScore = 0;
    for (let keyword of complexKeywords) {
      if (question.toLowerCase().includes(keyword)) {
        complexityScore++;
      }
    }

    if (questionTokens <= 10 && complexityScore === 0) {
      return ChatGpt3Engine.Ada;
    } else if (questionTokens > 10 && questionTokens <= 20 && complexityScore <= 1) {
      return ChatGpt3Engine.Babbage;
    } else if ((questionTokens > 20 && questionTokens <= 50) || complexityScore > 1) {
      return ChatGpt3Engine.Curie;
    } else {
      return ChatGpt3Engine.Davinci;
    }
  };

  const ask = async (question: ChatGptQuestion, randomness: ChatGptRandomness = 'medium'): Promise<string> => {
    const engine = chooseEngine(question);

    try {
      const response = await client.post(`/engines/${engine}/completions`, {
        prompt: question,
        max_tokens: ChatGpt3MaxTokens[engine],
        temperature: ChatGpt3RandomnessIndex[randomness],
      });

      return response.data.choices[0].text;
    }
    catch (e) {
      // TODO Implement logic for understanding the error
      throw new ChatGptError('UNKNOWN');
    }
  };

  return {
    chooseEngine,
    ask,
  };
};

export default ChatGpt;
