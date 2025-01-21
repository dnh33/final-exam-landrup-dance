import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Store from "../Store";
import PageTitle from "../components/text/PageTitle";
import { activities } from "../data/mockData";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 80px 1rem;
`;

const Card = styled(Link)`
  text-decoration: none;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 1.5rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-family: "Ubuntu", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
`;

const TimeInfo = styled.div`
  color: #5e2e53;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⏰";
  }
`;

export default function UserCalendar() {
  const { token } = useContext(Store);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!token) return;
    // Use mock data instead of API call
    const userActivities = activities.slice(0, 2); // Simulate user's enrolled activities
    setContent(userActivities);
  }, [token]);

  return (
    <Container>
      <PageTitle icon="📅">Min Kalender</PageTitle>
      <CalendarGrid>
        {content?.map((activity) => (
          <Card key={activity.id} to={`/aktivitet/${activity.id}`}>
            <Title>{activity.name}</Title>
            <TimeInfo>
              {activity.weekday} {activity.time}
            </TimeInfo>
          </Card>
        ))}
      </CalendarGrid>
    </Container>
  );
}
