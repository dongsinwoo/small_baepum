import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, Trash2 } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getSavedQuotes, deleteQuote } from '../api/quoteService';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px); // NavBar 높이만큼 빼줌
  background-color: #FDF6E3;
  color: #433422;
  padding-bottom: 70px; // NavBar 높이만큼 패딩 추가
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const ProfileSection = styled.section`
  position: relative;
  background-color: #F5E6D3;
  border-radius: 16px;
  padding: 24px;
  color: #433422;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(67, 52, 34, 0.08);
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(67, 52, 34, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #433422;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: rgba(67, 52, 34, 0.8);
  margin: 4px 0 0;
`;

const QuotesSection = styled.section`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #433422;
  }
`;

const QuoteCard = styled.div`
  background-color: #F5E6D3;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(67, 52, 34, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(67, 52, 34, 0.1);
  }
`;

const QuoteText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #433422;
`;

const QuoteAuthor = styled.p`
  font-size: 0.9rem;
  color: rgba(67, 52, 34, 0.8);
  text-align: right;
  font-style: italic;
`;

const QuoteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #A67C52;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(166, 124, 82, 0.1);
  }

  svg {
    margin-right: 4px;
  }
`;

const LogoutText = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #433422;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #433422;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export default function MyScreen() {
  const user = auth.currentUser;
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    if (user) {
      loadSavedQuotes();
    }
  }, [user]);

  const loadSavedQuotes = async () => {
    try {
      const quotes = await getSavedQuotes(user.uid);
      setSavedQuotes(quotes);
    } catch (error) {
      console.error('명언 불러오기 실패:', error);
    }
  };

  const handleDelete = async (quoteId) => {
    try {
      await deleteQuote(quoteId);
      setSavedQuotes(savedQuotes.filter(quote => quote.id !== quoteId));
      alert('명언이 삭제되었습니다.');
    } catch (error) {
      console.error('명언 삭제 실패:', error);
      alert('명언 삭제에 실패했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  };

  return (
    <PageContainer>
      <MainContent>
         <ProfileSection>
          <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
          <ProfileInfo>
            <Avatar>
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="프로필" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} 
                />
              ) : (
                <User size={30} color="#433422" />
              )}
            </Avatar>
            <div>
              <UserName>{user?.displayName || '사용자'}</UserName>
              <UserEmail>{user?.email || ''}</UserEmail>
            </div>
          </ProfileInfo>
        </ProfileSection>

        <QuotesSection>
          <h3>저장된 명언</h3>
          {savedQuotes.length === 0 ? (
            <p>저장된 명언이 없습니다.</p>
          ) : (
            savedQuotes.map((quote) => (
              <QuoteCard key={quote.id}>
                <QuoteText>{quote.text}</QuoteText>
                <QuoteAuthor>- {quote.author}</QuoteAuthor>
                <QuoteActions>
                  <DeleteButton onClick={() => handleDelete(quote.id)}>
                    <Trash2 size={16} />
                  </DeleteButton>
                </QuoteActions>
              </QuoteCard>
            ))
          )}
        </QuotesSection>
      </MainContent>
    </PageContainer>
  );
}