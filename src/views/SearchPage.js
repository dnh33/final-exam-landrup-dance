import React from "react";
import Searchbox from "../components/search/Searchbox";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: #5e2e53;
`;

const PageTitle = styled.h1`
  margin: 0 0 2rem 0;
  font-family: "Ubuntu", sans-serif;
  font-size: 2.25rem;
  font-weight: 500;
  color: #eaeaea;
  text-transform: capitalize;
`;

export default function SearchPage() {
  return (
    <Container>
      <PageTitle>Søg</PageTitle>
      <Searchbox />
    </Container>
  );
}
