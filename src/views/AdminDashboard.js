import React, { useMemo } from "react";
import styled from "styled-components";
import { activities } from "../data/mockData";
import { Pie } from "react-chartjs-2";
import PageTitle from "../components/text/PageTitle";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "${(props) => props.icon}";
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #5e2e53;
  margin-bottom: 0.5rem;
`;

const StatDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin: 0;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
`;

export default function AdminDashboard() {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalParticipants = activities.reduce(
      (sum, activity) => sum + activity.participants.length,
      0
    );

    const totalCapacity = activities.reduce(
      (sum, activity) => sum + activity.maxParticipants,
      0
    );

    const occupancyRate = Math.round((totalParticipants / totalCapacity) * 100);

    // Age group distribution
    const ageGroups = {
      "Børn (4-7 år)": 0,
      "Juniorer (8-12 år)": 0,
      "Unge (13-16 år)": 0,
      "Voksne (17+ år)": 0,
    };

    activities.forEach((activity) => {
      const count = activity.participants.length;
      if (activity.maxAge <= 7) {
        ageGroups["Børn (4-7 år)"] += count;
      } else if (activity.maxAge <= 12) {
        ageGroups["Juniorer (8-12 år)"] += count;
      } else if (activity.maxAge <= 16) {
        ageGroups["Unge (13-16 år)"] += count;
      } else {
        ageGroups["Voksne (17+ år)"] += count;
      }
    });

    // Most popular class
    const mostPopular = activities.reduce((prev, current) =>
      current.participants.length > prev.participants.length ? current : prev
    );

    return {
      totalParticipants,
      occupancyRate,
      ageGroups,
      mostPopular,
    };
  }, []);

  // Chart data
  const chartData = {
    labels: Object.keys(stats.ageGroups),
    datasets: [
      {
        data: Object.values(stats.ageGroups),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
    },
  };

  return (
    <Container>
      <PageTitle icon="📊">Dashboard</PageTitle>
      <Grid>
        <Card>
          <StatTitle icon="👥">Samlet antal medlemmer</StatTitle>
          <StatValue>{stats.totalParticipants}</StatValue>
          <StatDescription>
            Fordelt over {activities.length} forskellige hold
          </StatDescription>
        </Card>

        <Card>
          <StatTitle icon="📊">Belægningsgrad</StatTitle>
          <StatValue>{stats.occupancyRate}%</StatValue>
          <StatDescription>
            Gennemsnitlig udnyttelse af holdenes kapacitet
          </StatDescription>
        </Card>

        <Card>
          <StatTitle icon="🌟">Mest populære hold</StatTitle>
          <StatValue>{stats.mostPopular.name}</StatValue>
          <StatDescription>
            {stats.mostPopular.participants.length} deltagere ud af{" "}
            {stats.mostPopular.maxParticipants} pladser
          </StatDescription>
        </Card>

        <Card>
          <StatTitle icon="📈">Aldersfordeling</StatTitle>
          <ChartContainer>
            <Pie data={chartData} options={chartOptions} />
          </ChartContainer>
        </Card>
      </Grid>
    </Container>
  );
}
