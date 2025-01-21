import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { activities } from "../data/mockData";
import PageTitle from "../components/text/PageTitle";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 80px 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled(Link)`
  text-decoration: none;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) => (props.isAtCapacity ? "#e74c3c" : "#2ecc71")};
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-family: "Ubuntu", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  flex: 1;
`;

const ParticipantCount = styled.div.attrs((props) => ({
  "data-at-capacity": props.isAtCapacity,
}))`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${(props) => (props.$isAtCapacity ? "#e74c3c" : "#2ecc71")};
  color: #ffffff;
  opacity: 0.95;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #5e2e53;
  font-weight: 500;

  &::before {
    content: "⏰";
  }
`;

const AgeRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;

  &::before {
    content: "👤";
  }
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  color: #444;
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ParticipantList = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: #666;

  ul {
    margin: 0.5rem 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &::before {
      content: "•";
      color: #5e2e53;
    }
  }
`;

export default function InstructorCalendar() {
  const weekdayOrder = {
    Mandag: 1,
    Tirsdag: 2,
    Onsdag: 3,
    Torsdag: 4,
    Fredag: 5,
    Lørdag: 6,
    Søndag: 7,
  };

  const sortedActivities = [...activities].sort((a, b) => {
    return weekdayOrder[a.weekday] - weekdayOrder[b.weekday];
  });

  return (
    <Container>
      <PageTitle icon="📅">Min Kalender</PageTitle>
      <CalendarGrid>
        {sortedActivities.map((activity) => {
          const participantCount = activity.participants.length;
          const isAtCapacity = participantCount >= activity.maxParticipants;

          return (
            <Card
              key={activity.id}
              to={`/aktivitet/${activity.id}`}
              isAtCapacity={isAtCapacity}
            >
              <CardContent>
                <CardHeader>
                  <Title>{activity.name}</Title>
                  <ParticipantCount $isAtCapacity={isAtCapacity}>
                    {participantCount}/{activity.maxParticipants}
                  </ParticipantCount>
                </CardHeader>
                <Details>
                  <TimeInfo>
                    {activity.weekday} - {activity.time}
                  </TimeInfo>
                  <AgeRange>
                    {activity.maxAge === 100
                      ? `${activity.minAge}+ år`
                      : `${activity.minAge}-${activity.maxAge} år`}
                  </AgeRange>
                  <Description>{activity.description}</Description>
                </Details>
                <ParticipantList>
                  Deltagere:
                  <ul>
                    {activity.participants.map((participant) => (
                      <li key={participant.id}>{participant.name}</li>
                    ))}
                  </ul>
                </ParticipantList>
              </CardContent>
            </Card>
          );
        })}
      </CalendarGrid>
    </Container>
  );
}
