import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { activities } from "../../data/mockData";

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const InputField = styled.input`
  width: 100%;
  height: 52px;
  margin-bottom: 2rem;
  padding: 0 24px;
  background: #ffffff;
  border: none;
  border-radius: 26px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &::placeholder {
    color: #999;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;

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
  gap: 1rem;
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

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #eaeaea;
  font-size: 1.125rem;
`;

export default function Searchbox() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activities.filter((activity) =>
    searchTerm === ""
      ? true // Show all activities when search is empty
      : activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchContainer>
      <InputField
        type="text"
        placeholder="Søg på aktiviteter eller beskrivelser..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredActivities.length === 0 ? (
        <NoResults>Ingen aktiviteter matcher din søgning</NoResults>
      ) : (
        <Grid>
          {filteredActivities.map((activity) => (
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
                </CardDetails>
              </CardOverlay>
            </Card>
          ))}
        </Grid>
      )}
    </SearchContainer>
  );
}
