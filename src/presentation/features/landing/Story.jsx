import styled from 'styled-components';
import { FaXmark, FaCheck } from 'react-icons/fa6';
import Section from './Section';
import ListItemIcon from '../../ui/ListItemIcon';

const Paragraph = styled.p`
  max-width: 70ch;
  font-size: var(--font-size-b1);
  line-height: 1.75;
  color: var(--color-text);
  margin: 0 0 1.25rem 0;

  strong {
    color: var(--color-primary-s1);
    font-weight: 600;
  }
`;
const StorySection = styled(Section)`
  .lists-wrapper {
    display: flex;
    justify-content: space-around;
    gap: 6rem;
    margin-top: 8rem;

    .list-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6rem;
      background-color: var(--color-white);
      padding: 1rem 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      h4 {
        font-size: var(--font-size-b2);
        font-weight: 500;
        color: var(--color-text);
        margin: 0;
      }

      .list {
        display: flex;
        flex-direction: column;
        align-items: start;
        list-style: none;
        padding: 0;
        margin: 0;

        /* All but last child */
        li:not(:last-child) {
          margin-bottom: 2rem;
        }
      }

      .wrong-list {
        svg {
          fill: var(--color-error);
          font-size: 1.2em;
          flex-shrink: 0;
        }
      }

      .right-list {
        svg {
          fill: var(--color-success-s1);
          font-size: 1.2em;
          flex-shrink: 0;
        }
      }
    }
  }
`;

function Story() {
  return (
    <StorySection
      id="story"
      sectionName="No te falta creatividad, te falta el medio adecuado"
    >
      <Paragraph>
        Muchos piensan que les falta creatividad, pero en realidad lo que suele
        faltar es el <strong>medio adecuado</strong>. Cuando editas únicamente
        sobre el <em>timeline</em>, es como caminar perdido en una ciudad nueva
        buscando una pastelería: terminas llegando… pero tras giros confusos y
        mucho tiempo invertido.
      </Paragraph>

      <Paragraph>
        En cambio, diseñar sobre el <em>guion</em> es como usar un GPS: ves el
        mapa completo, sabes dónde estás y hacia dónde vas. Así decides qué
        emociones transmitir en cada parte y avanzas con claridad y rapidez.
      </Paragraph>

      <div className="lists-wrapper">
        <div className="list-container">
          <h4>
            Editar sobre el <em>timeline</em>
          </h4>
          <ul className="list wrong-list">
            <ListItemIcon icon={<FaXmark />}>Caótico y lento</ListItemIcon>
            <ListItemIcon icon={<FaXmark />}>
              Solo ves lo inmediato
            </ListItemIcon>
            <ListItemIcon icon={<FaXmark />}>
              Pierdes claridad sobre la visión global
            </ListItemIcon>
          </ul>
        </div>

        <div className="list-container">
          <h4>
            Diseñar sobre el <em>guion</em>
          </h4>
          <ul className="list right-list">
            <ListItemIcon icon={<FaCheck />}>
              Todo el proyecto de un vistazo
            </ListItemIcon>
            <ListItemIcon icon={<FaCheck />}>
              Decides emociones en cada parte
            </ListItemIcon>
            <ListItemIcon icon={<FaCheck />}>
              Avanzas rápido y con claridad
            </ListItemIcon>
          </ul>
        </div>
      </div>
    </StorySection>
  );
}

export default Story;

/*
TEXTO ORIGINAL:

  Pero, ¿y si te dijera que el problema no es que no seas creativo? No
  existe tal cosa como una persona sin creatividad. En tu caso, lo que
  pasa es que no estás canalizando tu creatividad{" "}
  <strong>por el medio adecuado</strong>. Al ver tu vídeo una y otra vez
  estás cercando tu capacidad de análisis a un espacio muy estrecho: sólo
  lo que estás viendo en el momento. La solución está en dar un paso
  atrás. En alejarte de tu <em>timeline</em> y en volver al guion. Ver tu
  timeline es como ir por la calle en una ciudad nueva e intentar llegar a
  una pastelería. Puedes ir mirando carteles, señales, publicidad y
  preguntar a la gente. Vas a terminar llegando, pero te va a llevar mucho
  tiempo. En cambio, ver tu guion es como sacar un GPS y seleccionar tu
  destino. Cuando sales a la calle sabes exactamente en qué esquinas girar
  y dónde está tu destino. Ser creativo sobre el guion es mucho más
  sencillo que serlo sobre el propio vídeo. Tienes a un golpe de vista
  cada parte de la pieza final. Puedes decidir qué emociones quieres
  transmitir en cada momento y ajustar los elementos de cada sección en
  consecuencia.
*/
