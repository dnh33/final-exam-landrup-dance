import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { activities } from "../data/mockData";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 2rem;
  font-family: "Ubuntu", sans-serif;
  font-size: 2.25rem;
  font-weight: 500;
  color: #eaeaea;
`;

const Content = styled.div`
  padding: 0 2rem 6rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ParticipantList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ParticipantCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "👤";
  }
`;

export default function TeamDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const activity = activities.find((a) => a.id === parseInt(id));
    setData(activity);
  }, [id]);

  if (!data) return null;

  return (
    <Container>
      <PageTitle>Holdoversigt - {data.name}</PageTitle>
      <Content>
        <ParticipantList>
          {data.participants.map((participant) => (
            <ParticipantCard key={participant.id}>
              {participant.name}
            </ParticipantCard>
          ))}
        </ParticipantList>
      </Content>
    </Container>
  );
}
