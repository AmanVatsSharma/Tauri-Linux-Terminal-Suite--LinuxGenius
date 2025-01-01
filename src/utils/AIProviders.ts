import { ChatOpenAI } from "@langchain/openai";
// import { ChatAnthropic } from "@langchain/anthropic";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

export type AIProvider = 'openai' | 'anthropic' | 'gemini';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
  temperature?: number;
}

export class AIProviderFactory {
  static createProvider(config: AIConfig): BaseChatModel {
    const { provider, apiKey, model, temperature = 0 } = config;

    switch (provider) {
      case 'openai':
        return new ChatOpenAI({
          openAIApiKey: apiKey,
          modelName: model || 'gpt-3.5-turbo',
          temperature,
        });
      
      case 'anthropic':
        throw new Error('Anthropic provider not available in current build. Please install @langchain/anthropic');
        // return new ChatAnthropic({
        //   anthropicApiKey: apiKey,
        //   modelName: model || 'claude-3-haiku-20240307',
        //   temperature,
        // });
      
      case 'gemini':
        throw new Error('Google Gemini provider not available in current build. Please install @langchain/google-genai');
        // return new ChatGoogleGenerativeAI({
        //   apiKey,
        //   modelName: model || 'gemini-pro',
        //   temperature,
        // });
      
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  static getDefaultModel(provider: AIProvider): string {
    switch (provider) {
      case 'openai':
        return 'gpt-3.5-turbo';
      case 'anthropic':
        return 'claude-3-haiku-20240307';
      case 'gemini':
        return 'gemini-pro';
      default:
        return '';
    }
  }

  static getAvailableModels(provider: AIProvider): string[] {
    switch (provider) {
      case 'openai':
        return [
          'gpt-3.5-turbo',
          'gpt-4',
          'gpt-4-turbo'
        ];
      case 'anthropic':
        return [
          'claude-3-haiku-20240307',
          'claude-3-sonnet-20240229',
          'claude-3-opus-20240229'
        ];
      case 'gemini':
        return [
          'gemini-pro',
          'gemini-pro-vision'
        ];
      default:
        return [];
    }
  }
} 