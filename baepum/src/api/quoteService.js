const API_URL = 'http://localhost:5010/api';

export const saveQuote = async (userId, quote) => {
  try {
    const response = await fetch(`${API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        text: quote.message,
        author: quote.author,
        authorProfile: quote.authorProfile
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('명언 저장 중 오류 발생:', error);
    throw error;
  }
};

export const getSavedQuotes = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/quotes/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('명언 조회 중 오류 발생:', error);
    throw error;
  }
};

export const deleteQuote = async (quoteId) => {
  try {
    const response = await fetch(`${API_URL}/quotes/${quoteId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('명언 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const checkQuoteExists = async (userId, quoteText) => {
  try {
    const quotes = await getSavedQuotes(userId);
    return quotes.some(quote => quote.text === quoteText);
  } catch (error) {
    console.error('명언 확인 중 오류 발생:', error);
    throw error;
  }
};

export const unsaveQuote = async (userId, quoteText) => {
  try {
    const quotes = await getSavedQuotes(userId);
    const quoteToDelete = quotes.find(quote => quote.text === quoteText);
    if (quoteToDelete) {
      await deleteQuote(quoteToDelete.id);
      return true;
    }
    return false;
  } catch (error) {
    console.error('명언 저장 취소 중 오류 발생:', error);
    throw error;
  }
};
