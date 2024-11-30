import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bookmark, ChevronRight } from 'lucide-react';

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



export default function MyScreen() {
  const [savedQuotes] = useState([
    {
      id: 1,
      text: "사람은 행복하려고 마음먹은 만큼 행복해질 수 있다.",
      author: "아브라함 링컨"
    },
    {
      id: 2,
      text: "진정으로 웃으려면 고통을 참아야하며, 나아가 고통을 즐길 줄 알아야 해.",
      author: "찰리 채플린"
    },
  ]);

  return (
    <PageContainer>
      <MainContent>
        <ProfileSection>
          <ProfileInfo>
            <Avatar>
              <User size={30} color="#433422" />
            </Avatar>
            <div>
              <UserName>사용자님</UserName>
              <UserEmail>user@example.com</UserEmail>
            </div>
          </ProfileInfo>
        </ProfileSection>

        <QuotesSection>
          <h3>저장된 명언</h3>
          {savedQuotes.map((quote) => (
            <QuoteCard key={quote.id}>
              <QuoteText>{quote.text}</QuoteText>
              <QuoteAuthor>- {quote.author}</QuoteAuthor>
              <QuoteActions>
                <ActionButton>
                  <Bookmark size={16} />
                  저장됨
                </ActionButton>
                <ActionButton>
                  공유 <ChevronRight size={16} />
                </ActionButton>
              </QuoteActions>
            </QuoteCard>
          ))}
        </QuotesSection>
      </MainContent>
    </PageContainer>
  );
}