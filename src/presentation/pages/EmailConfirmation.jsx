import React from 'react';
import styled from 'styled-components';
import LoginSignupLayout from './LoginSignupLayout';
import SEO from '../../seo/SEO';

const Wrapper = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--color-grey-t3);
  padding: 2rem;
  color: var(--color-grey-t3);
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: min(600px, 100%);
  background-color: var(--color-grey-s1);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.18);
`;

const Title = styled.h1`
  margin: 0 0 1rem 0;
  font-size: var(--font-size-b3, 2rem);
  font-weight: 700;
  color: var(--color-primary, #ff922b);
`;

const Subtitle = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: var(--font-size-base, 1.15rem);
  line-height: 1.6;
`;

const Note = styled.p`
  margin: 0;
  font-size: var(--font-size-s1, 0.95rem);
  line-height: 1.5;
  color: var(--color-grey-t2);
`;

export default function EmailConfirmation() {
  return (
    <>
      <SEO
        title="Confirma tu email — EditorMind"
        description="Revisa tu bandeja de entrada para completar el registro."
        robots="noindex,nofollow"
      />

      <LoginSignupLayout>
        <Wrapper>
          <Card>
            <Title>Confirma tu email</Title>
            <Subtitle>
              Te hemos enviado un correo de verificación. Revisa tu bandeja de
              entrada y haz clic en el enlace para activar tu cuenta.
            </Subtitle>
            <Note>
              Si no lo ves, mira en <em>Spam</em> o <em>Promociones</em>.
            </Note>
          </Card>
        </Wrapper>
      </LoginSignupLayout>
    </>
  );
}
