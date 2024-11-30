import React, {useState} from 'react';
import styled from 'styled-components';
import { BiRefresh } from 'react-icons/bi';
import { adviceSet } from '../api/adviceSet';


function MainScreen() {
  const [currentQuote, setCurrentQuote] = useState(adviceSet[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * adviceSet.length);
    setCurrentQuote(adviceSet[randomIndex]);
  };

  return (
    <Container>
      <QuoteCard>
        <AuthorImage src={`${process.env.PUBLIC_URL}/assets/작은배품-logo.png`} alt={"작은배품-logo"} />
        <AuthorProfile>{ currentQuote.authorProfile }</AuthorProfile>
        <AuthorName>- {currentQuote.author} -</AuthorName>
        <QuoteText>"{currentQuote.message}"</QuoteText>
        <RefreshButton onClick={getRandomQuote}>
          <BiRefresh size={32} color="white" />
        </RefreshButton>
      </QuoteCard>  
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fff5e6;
`;

const QuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 60px;
`;

const AuthorImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const AuthorName = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const QuoteText = styled.p`
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0;
  color: #666;
`;

const RefreshButton = styled.button`
  background-color: #d4a373;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;  // 추가
  bottom: 30%;   // NavBar 위에 위치하도록 조정
  left: 50%;       // 중앙 정렬
  transform: translateX(-50%);  // 정확한 중앙 정렬
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  // 그림자 효과 추가
  z-index: 100;    // NavBar보다 위에 표시
  
  &:hover {
    background-color: #c49363;
  }
`;


const AuthorProfile = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0 15px 0;
  font-style: italic;
  text-align: center;
`;

export default MainScreen;