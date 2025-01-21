import React from "react";
import Searchbox from "../components/search/Searchbox";
import PageTitle from "../components/text/PageTitle";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #5e2e53 0%, #482640 100%);
`;

export default function SearchPage() {
  return (
    <Container>
      <PageTitle icon="🔍">Søg</PageTitle>
      <Searchbox />
    </Container>
  );
}
