import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--color-grey-t3);
  padding: 2rem;
`;

const Card = styled.section`
  width: min(70rem, 100%);
  background-color: var(--color-grey-t2);
  border: 1px solid var(--color-grey);
  border-radius: var(--border-radius-l1);
  padding: 2.4rem;
  box-shadow: var(--box-shadow-split-box);
  display: grid;
  gap: 1.6rem;
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  h1 {
    font-size: var(--font-size-b2);
    margin: 0;
    color: var(--color-text);
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  height: 3rem;
  padding: 0 1.2rem;
  border-radius: var(--border-radius);
  background-color: var(--color-error);
  color: var(--color-grey-t2);
  font-weight: var(--font-weight-bold);
`;

const Message = styled.p`
  margin: 0.4rem 0 0;
  color: var(--color-grey-s1);
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;

  a {
    text-decoration: none;
  }
`;

function getTitleAndMessage(error) {
  // 1) React Router Errors (404/500, loaders/actions)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        title: "Página no encontrada",
        message:
          "La ruta que intentas abrir no existe o ya no está disponible.",
      };
    }
    if (error.status === 401 || error.status === 403) {
      return {
        title: "Acceso no autorizado",
        message:
          "No tienes permisos para ver este contenido. Inicia sesión o cambia de cuenta.",
      };
    }
    return {
      title: `Error ${error.status}`,
      message: error.statusText || "Ha ocurrido un error inesperado.",
    };
  }

  // 2) Ordinary JS Errors
  const title = "Algo fue mal";

  const message = "Ha ocurrido un error inesperado.";

  return { title, message };
}

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  const { title, message } = getTitleAndMessage(error);

  return (
    <Wrapper>
      <Card>
        <Logo />

        <Head>
          <Badge>ERROR</Badge>
          <h1>{title}</h1>
        </Head>

        <Message>{message}</Message>

        <Actions>
          <Button type="primary" onClick={() => navigate(-1)}>
            ← Volver
          </Button>
        </Actions>
      </Card>
    </Wrapper>
  );
}
