import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import SEO from '../../seo/SEO';
import ScriptsSidebar from '../features/script/ScriptsSidebar';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 23rem 1fr;
  max-height: 100dvh;
  overflow: hidden;
  gap: 2rem;

  background-color: var(--color-grey-t2);
`;

const StyledMain = styled.main`
  overflow-x: scroll;
`;

function AppLayout() {
  return (
    <>
      <SEO
        title="Editor — EditorMind"
        description="Edita tus guiones."
        robots="noindex,nofollow"
      />

      <StyledAppLayout>
        <ScriptsSidebar />

        <StyledMain>
          <Outlet />
        </StyledMain>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
