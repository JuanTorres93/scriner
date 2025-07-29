import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  max-height: 100dvh;
  overflow: hidden;
  gap: 2rem;

  padding: 2rem;
  background-color: var(--color-grey-t2);
`;

const StyledMain = styled.main`
  overflow-x: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <aside>
        <h2>Script Editor</h2>
      </aside>

      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
