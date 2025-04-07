import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

export class TerminalAgent {
  private model: ChatOpenAI;

  constructor(apiKey: string, temperature: number = 0) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      temperature,
      modelName: "gpt-3.5-turbo",
    });
  }

  private createAnalyzerChain() {
    const analyzerPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are an expert Linux terminal analyst and assistant.
        Analyze the terminal commands and their outputs to:
        1. Identify potential security issues or risks
        2. Find optimization opportunities
        3. Provide educational context about the commands being used
        
        Be brief and specific in your analysis.`],
      ["user", `Terminal output: {output}
        Command executed: {command}
        
        Provide your analysis.`],
    ]);

    return RunnableSequence.from([
      analyzerPrompt,
      this.model,
      new StringOutputParser(),
    ]);
  }

  private createSuggestionChain() {
    const suggestionPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a Linux terminal assistant that provides helpful suggestions for next steps.
         Based on the terminal output, suggest 1-3 useful next commands or actions.
         Format each suggestion as a bullet point and explain briefly why it would be helpful.`],
      ["user", `Terminal output: {output}
         Command executed: {command}
         
         What are some useful next steps or commands?`],
    ]);

    return RunnableSequence.from([
      suggestionPrompt,
      this.model,
      new StringOutputParser(),
    ]);
  }

  public async processTerminalOutput(command: string, output: string) {
    try {
      const analyzerChain = this.createAnalyzerChain();
      const suggestionChain = this.createSuggestionChain();

      const analysis = await analyzerChain.invoke({
        command,
        output
      });

      const suggestions = await suggestionChain.invoke({
        command,
        output
      });

      return {
        analysis,
        suggestions,
      };
    } catch (error) {
      console.error("Error in terminal agent processing:", error);
      return {
        analysis: "Error analyzing terminal output.",
        suggestions: "Unable to generate suggestions at this time.",
      };
    }
  }
}

export default TerminalAgent; 