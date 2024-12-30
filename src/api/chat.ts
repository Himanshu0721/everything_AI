import { APIError } from './errors';

export async function sendMessage(question: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('question', question);

    const response = await fetch('/ask', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    if (!data || typeof data.answer !== 'string') {
      throw new APIError('Invalid response format from server');
    }

    return data.answer;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error('API Error:', error);
    throw new APIError('Failed to connect to the AI service. Please try again.');
  }
}