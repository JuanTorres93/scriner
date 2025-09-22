import styled, { css } from 'styled-components';
import Section from './Section';
import SplitRow from '../../ui/SplitRow';
import React from 'react';
import { breakpoints } from '../../styles/breakpoints';

// NOTE: Bullet points generated with ChatGPT from original text below
// TODO: Check before deployment and adjust if needed
const items = [
  {
    title: 'El peso invisible del tiempo',
    description:
      'Cada minuto perdido frente a un proyecto que no avanza no solo retrasa tu canal, también erosiona tu confianza. Lo que empezó como ilusión se convierte en frustración acumulada que llevas como una mochila cada vez más pesada.',
    image: '/amplify/amplify1.jpg',
  },
  {
    title: 'El sueño que se apaga',
    description:
      'Lo que imaginaste como un canal vibrante y lleno de vida empieza a apagarse en silencio. Esa chispa creativa que te movía al principio ahora se siente como un recuerdo lejano, casi inalcanzable.',
    image: '/amplify/amplify2.jpg',
  },
  {
    title: 'La trampa de la improductividad',
    description:
      'Cuanto más tiempo pasas sin resultados, más dudas te invaden. Te convences de que no eres lo suficientemente bueno, cuando en realidad el problema no eres tú, sino el sistema en el que trabajas.',
    image: '/amplify/amplify3.jpg',
  },
  {
    title: 'El coste emocional oculto',
    description:
      'No se trata solo de vídeos que no avanzan: es el desánimo de ver cómo tus metas personales se alejan. Esa sensación de cargar con horas muertas mina tu motivación y te roba la energía incluso fuera de YouTube.',
    image: '/amplify/amplify4.jpg',
  },
];

const AmplifyDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 6rem 0;
  font-size: var(--font-size-b1);
  color: var(--color-grey-s2);
  line-height: 1.4;

  ${(props) =>
    props.$isTextLeft
      ? css`
          text-align: left;
        `
      : css`
          text-align: right;
        `}

  @media (max-width: ${breakpoints.amplify4}) {
    text-align: center;
    align-items: center;
    padding-bottom: 0;
  }

  h4 {
    font-weight: 500;
    font-size: var(--font-size-b2);
    color: var(--color-primary-s2);
  }

  p {
    max-width: 50ch;
    font-size: var(--font-size-base-b1);
    color: var(--color-grey-s1);
  }
`;

const RowSpacing = styled.div`
  height: 8rem;

  @media (max-width: ${breakpoints.amplify}) {
    height: 4rem;
  }

  @media (max-width: ${breakpoints.amplify2}) {
    height: 0rem;
  }
`;

const AmplifySection = styled(Section)`
  background-color: var(--color-grey-t2);

  .split-row {
    @media (max-width: ${breakpoints.amplify2}) {
      gap: 8rem;
    }

    @media (max-width: ${breakpoints.amplify3}) {
      gap: 4rem;
    }

    @media (max-width: ${breakpoints.amplify4}) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, min-content);

      img {
        justify-self: center;
      }

      .order-image {
        grid-row: 2;
      }

      .order-text {
        grid-row: 1;
      }

      // first AmplifyDescription item
      &.index-0 div {
        padding-top: 0;
      }
    }
  }
`;

function Amplify() {
  return (
    <AmplifySection id="amplify" sectionName="¿Qué pierdes si no cambias nada?">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <React.Fragment key={item.title}>
            <SplitRow
              className={`split-row index-${index}`}
              spacing="12rem"
              imageMaxWidth="32rem"
            >
              {item.image && isEven && (
                <img className="order-image" src={item.image} alt="" />
              )}

              <AmplifyDescription className="order-text" $isTextLeft={isEven}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </AmplifyDescription>

              {item.image && !isEven && (
                <img className="order-image" src={item.image} alt="" />
              )}
            </SplitRow>
            <RowSpacing />
          </React.Fragment>
        );
      })}
    </AmplifySection>
  );
}

export default Amplify;

/*
ORIGINAL TEXT
Los minutos se convierten en horas y tu vídeo sigue igual que cuando te
sentaste a trabajar en él. Así va a ser difícil hacer crecer tu canal. Ese
sueño de ser alguien influyente y poder dejar tu huella en el mundo se
aleja con cada paso de la manecilla del reloj. Sientes que no eres
creativo y terminas dejando el proyecto. Tantas horas muertas sin avanzar
con tus vídeos se hacen demasiado pesadas en tus hombros.
*/
