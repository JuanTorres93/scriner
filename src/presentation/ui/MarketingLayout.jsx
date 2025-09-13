import styled from "styled-components";
import LandingNavigation from "../features/landing/LandingNavigation";

const StyledMarketingLayout = styled.div`
  position: relative;
  max-height: 100dvh;
  overflow: hidden;
  overflow-y: scroll;

  background-color: var(--color-grey-t3);
`;

const StyledMain = styled.main`
  overflow: hidden;
  max-width: 250rem;
  margin: 0 auto;
`;

function MarketingLayout({ children }) {
  return (
    <StyledMarketingLayout>
      <LandingNavigation />
      <StyledMain>{children}</StyledMain>
    </StyledMarketingLayout>
  );
}

export default MarketingLayout;
