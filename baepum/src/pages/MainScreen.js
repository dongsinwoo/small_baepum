import React, {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { BiRefresh } from 'react-icons/bi';
import { Bookmark } from 'lucide-react';
import { adviceSet } from '../api/adviceSet';
import { auth } from '../firebase';
import { saveQuote, checkQuoteExists, unsaveQuote } from '../api/quoteService';

const fadeInRotate = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) rotate(-3deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
`;

const QuoteContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInRotate} 0.5s ease-out forwards;
`;

const QuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  z-index: 100;
`;

const BaseButton = styled.button`
  background-color: #d4a373;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #c49363;
  }
`;

const RefreshButton = styled(BaseButton)`
  &.rotating {
    animation: ${rotateAnimation} 0.5s ease-out;
  }
`;

const SaveButton = styled(BaseButton)`
  background-color: ${props => props.isSaved ? '#433422' : '#d4a373'};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isSaved ? '#2a2116' : '#c49363'};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fff5e6;
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

const AuthorProfile = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0 15px 0;
  font-style: italic;
  text-align: center;
`;

function MainScreen() {
  const [currentQuote, setCurrentQuote] = useState(adviceSet[0]);
  const [key, setKey] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 현재 명언이 저장되어 있는지 확인하는 함수
  const checkCurrentQuoteSaved = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const exists = await checkQuoteExists(user.uid, currentQuote.message);
        setIsSaved(exists);
      }
    } catch (error) {
      console.error('명언 상태 확인 중 오류:', error);
    }
  };

  // 컴포넌트 마운트 시와 currentQuote 변경 시 저장 상태 확인
  useEffect(() => {
    checkCurrentQuoteSaved();
  }, [currentQuote]);

  const getRandomQuote = () => {
    setIsRotating(true);
    setKey(prev => prev + 1);
    
    const randomIndex = Math.floor(Math.random() * adviceSet.length);
    setCurrentQuote(adviceSet[randomIndex]);
    
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      if (isSaved) {
        // 이미 저장된 상태라면 저장 취소
        await unsaveQuote(user.uid, currentQuote.message);
        setIsSaved(false);
        alert('명언 저장이 취소되었습니다.');
        return;
      }

      // 이미 저장된 명언인지 확인
      const exists = await checkQuoteExists(user.uid, currentQuote.message);
      if (exists) {
        alert('이미 저장된 명언입니다.');
        setIsSaved(true);
        return;
      }

      // 새로운 명언 저장
      await saveQuote(user.uid, currentQuote);
      setIsSaved(true);
      alert('명언이 저장되었습니다.');
    } catch (error) {
      console.error('명언 저장 중 오류:', error);
      alert('명언 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <QuoteCard>
        <AuthorImage src={`${process.env.PUBLIC_URL}/assets/작은배품-logo.png`} alt={"작은배품-logo"} />
        <QuoteContent key={key}>
          <AuthorProfile>{currentQuote.authorProfile}</AuthorProfile>
          <AuthorName>- {currentQuote.author} -</AuthorName>
          <QuoteText>"{currentQuote.message}"</QuoteText>
        </QuoteContent>
      </QuoteCard>
      <ButtonContainer>
        <RefreshButton 
          onClick={getRandomQuote}
          className={isRotating ? 'rotating' : ''}
        >
          <BiRefresh size={32} color="white" />
        </RefreshButton>
        <SaveButton 
          onClick={handleSave}
          isSaved={isSaved}
        >
          <Bookmark size={24} color="white" fill={isSaved ? "white" : "none"} />
        </SaveButton>
      </ButtonContainer>
    </Container>
  );
}

export default MainScreen;