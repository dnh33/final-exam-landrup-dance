import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { activities } from "../data/mockData";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
  display: flex;
  flex-direction: column;
`;

const ImageHeader = styled.div`
  position: relative;
  height: 50vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(94, 46, 83, 0.95)
    ),
    url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  background: transparent;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Ubuntu", sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;

  &::before {
    content: "${(props) => props.icon}";
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 24px 0;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 16px 0;
  }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  margin: 24px 0;
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "${(props) => props.icon}";
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;

  &::before {
    content: "${(props) => props.icon}";
  }
`;

const ParticipantList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const ParticipantCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "👤";
  }
`;

const ActionButton = styled.button`
  background: #ffffff;
  color: #5e2e53;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: #f8f8f8;
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "✨";
  }
`;

const ParticipantCount = styled(Badge)`
  background: ${(props) =>
    props.isAtCapacity ? "rgba(231, 76, 60, 0.2)" : "rgba(46, 204, 113, 0.2)"};
  color: ${(props) => (props.isAtCapacity ? "#e74c3c" : "#2ecc71")};
`;

export default function ClassDetails() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["bf-token"]);
  const { id } = useParams();

  useEffect(() => {
    const activity = activities.find((a) => a.id === parseInt(id));
    setData(activity);
  }, [id]);

  if (!data) return null;

  const isAdmin = cookies["bf-token"]?.role === "instructor";
  const participantCount = data.participants.length;
  const isAtCapacity = participantCount >= data.maxParticipants;

  return (
    <Container>
      <ImageHeader background={data.asset.url}>
        <Title>{data.name}</Title>
        <MetaInfo>
          <Badge icon="👥">
            {data.maxAge === 100
              ? `${data.minAge}+ år`
              : `${data.minAge}-${data.maxAge} år`}
          </Badge>
          <Badge icon="📅">{data.weekday}</Badge>
          <Badge icon="⏰">{data.time}</Badge>
          {isAdmin && (
            <ParticipantCount icon="👥" isAtCapacity={isAtCapacity}>
              {participantCount}/{data.maxParticipants} deltagere
            </ParticipantCount>
          )}
        </MetaInfo>
      </ImageHeader>

      <Content>
        <Description>{data.description}</Description>

        <Section>
          <SectionTitle icon="📋">Holddetaljer</SectionTitle>
          <DetailGrid>
            <DetailItem icon="📅">{data.weekday}</DetailItem>
            <DetailItem icon="⏰">{data.time}</DetailItem>
            <DetailItem icon="👥">
              {data.maxAge === 100
                ? `${data.minAge}+ år`
                : `${data.minAge}-${data.maxAge} år`}
            </DetailItem>
            {isAdmin && (
              <DetailItem icon="🎯">
                {data.maxParticipants} max deltagere
              </DetailItem>
            )}
          </DetailGrid>
        </Section>

        {isAdmin && (
          <Section>
            <SectionTitle icon="👥">Deltagerliste</SectionTitle>
            <ParticipantList>
              {data.participants.map((participant) => (
                <ParticipantCard key={participant.id}>
                  {participant.name}
                </ParticipantCard>
              ))}
            </ParticipantList>
          </Section>
        )}

        {cookies["bf-token"] && !isAdmin && (
          <ActionButton>Tilmeld Hold</ActionButton>
        )}
      </Content>
    </Container>
  );
}
