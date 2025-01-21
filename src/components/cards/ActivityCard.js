import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { activities } from "../../data/mockData";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  text-decoration: none;
  background: rgba(94, 46, 83, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background: rgba(94, 46, 83, 1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 0.6;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(
    to top,
    rgba(94, 46, 83, 0.95),
    rgba(94, 46, 83, 0.8) 50%,
    rgba(94, 46, 83, 0.4)
  );
  color: white;
`;

const CardTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-family: "Ubuntu", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const CardDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "${(props) => props.icon}";
  }
`;

export default function ActivityCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use mock data instead of API call
    setData(activities);
  }, []);

  if (!data) return null;

  return (
    <CardGrid>
      {data.map((activity) => (
        <Card key={activity.id} to={`/aktivitet/${activity.id}`}>
          <CardImage
            src={activity.asset.url}
            alt={activity.name}
            loading="lazy"
          />
          <CardOverlay>
            <CardTitle>{activity.name}</CardTitle>
            <CardDetails>
              <Badge icon="👥">
                {activity.maxAge === 100
                  ? `${activity.minAge}+ år`
                  : `${activity.minAge}-${activity.maxAge} år`}
              </Badge>
              <Badge icon="📅">{activity.weekday}</Badge>
              <Badge icon="⏰">{activity.time}</Badge>
            </CardDetails>
          </CardOverlay>
        </Card>
      ))}
    </CardGrid>
  );
}
