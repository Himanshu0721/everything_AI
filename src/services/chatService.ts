import { API_CONFIG } from '../config/api';
import { ChatServiceError } from '../types/errors';
import { retry } from '../utils/retry';

export async function sendChatMessage(question: string): Promise<string> {
  const makeRequest = async () => {
    const response = await fetch(API_CONFIG.url, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ question })
    });

    if (response.status === 503) {
      throw new ChatServiceError('Service temporarily unavailable. Please try again in a moment.', 503);
    }

    if (!response.ok) {
      throw new ChatServiceError(
        response.status === 429 
          ? 'Rate limit exceeded. Please wait a moment before trying again.'
          : `Server error: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    
    if (!data || typeof data.answer !== 'string') {
      throw new ChatServiceError('Invalid response format from server');
    }

    return data.answer;
  };

  try {
    return await retry(makeRequest);
  } catch (error) {
    if (error instanceof ChatServiceError) {
      throw error;
    }
    
    console.error('Chat service error:', error);
    throw new ChatServiceError(
      'Unable to connect to the AI service. Please check your connection and try again.'
    );
  }
}