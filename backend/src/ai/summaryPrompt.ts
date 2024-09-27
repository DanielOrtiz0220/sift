import { modelOutput } from "./claudeRequest";

export async function summaryPrompt(query: string, files: any[]) {
  const fileDescriptions = files.map(file => `- ${file.title}: ${file.url}`).join('\n');


/* TODO: Prompt improvements:
- Add a prompt to the model to cite the documents using their URLs when referencing specific information.
- Add symbol seperators such as XML to improve LLM performnance
- Add all the documents full text to the prompt instead of just the titles (this will increase token usage, and need much more store, time and compute)
*/ 

const prompt = `You are an AI assistant tasked with summarizing multiple documents and their possible content based on their titles. The user's query is: "${query}"

Here are the documents:
${fileDescriptions}

Please provide a summary of these documents and their potential content, focusing on how they might relate to the user's query. In your summary:

1. Briefly describe what each document might contain based on its title.
2. Explain how the documents might be relevant to the user's query.
3. Suggest potential connections or themes across the documents.
4. Cite the documents using their URLs when referencing specific information.

Your summary should be concise yet informative, helping the user understand the potential relevance of these documents to their query.

Here's an example of what the summary should look like:

Based on the document titles provided, you have information covering a range of topics related to data analysis, AI implementation, and business intelligence.
You have documents on project proposals for AI-driven data analysis, which likely outline objectives and methodologies for leveraging AI in data processing.
There's also financial reporting information, specifically a quarterly report that probably contains key financial metrics and performance indicators. 
Your collection includes resources on machine learning, such as algorithm comparisons, which could be useful for understanding different AI techniques. 
Additionally, you have access to best practices for data visualization, which is crucial for effectively communicating insights. 
There's also a customer segmentation analysis, suggesting a focus on understanding and categorizing your user base. 

These documents collectively indicate a strong emphasis on data-driven decision making, AI applications in business contexts, and the importance of translating complex data into actionable insights.
This diverse set of resources could provide a comprehensive overview of how AI and data analysis are being integrated into business strategies and operations.

`;

const summary = await modelOutput(prompt)
return summary
}