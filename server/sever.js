const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const QUOTES_FILE = path.join(__dirname, 'data', 'quotes.json');

app.use(cors());
app.use(express.json());

// 데이터 파일 초기화 함수
async function initializeDataFile() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    try {
      await fs.access(QUOTES_FILE);
    } catch {
      await fs.writeFile(QUOTES_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('데이터 파일 초기화 중 오류:', error);
  }
}

// 명언 저장
app.post('/api/quotes', async (req, res) => {
  try {
    const { userId, text, author, authorProfile } = req.body;
    const quotes = JSON.parse(await fs.readFile(QUOTES_FILE, 'utf8'));
    
    const newQuote = {
      id: Date.now().toString(), // 간단한 유니크 ID 생성
      userId,
      text,
      author,
      authorProfile,
      createdAt: new Date().toISOString()
    };
    
    quotes.push(newQuote);
    await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2));
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 사용자별 저장된 명언 조회
app.get('/api/quotes/:userId', async (req, res) => {
  try {
    const quotes = JSON.parse(await fs.readFile(QUOTES_FILE, 'utf8'));
    const userQuotes = quotes.filter(quote => quote.userId === req.params.userId);
    res.json(userQuotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 명언 삭제
app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const quotes = JSON.parse(await fs.readFile(QUOTES_FILE, 'utf8'));
    const filteredQuotes = quotes.filter(quote => quote.id !== req.params.id);
    await fs.writeFile(QUOTES_FILE, JSON.stringify(filteredQuotes, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 서버 시작
const PORT = process.env.PORT || 5010;
initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
  });
});
