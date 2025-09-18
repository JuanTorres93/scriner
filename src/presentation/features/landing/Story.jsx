import styled from 'styled-components';
import Section from './Section';

const StorySection = styled(Section)`
  .lists-wrapper {
    display: flex;
    justify-content: space-around;
    gap: 4rem;
    margin-top: 2rem;

    .list-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6rem;
      background-color: var(--color-white);
      padding: 1rem 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      .list {
        list-style: none;
        padding: 0;
        margin: 0;

        /* All but last child */
        li:not(:last-child) {
          margin-bottom: 2rem;
        }
      }

      .wrong-list {
        li::before {
          content: '❌ ';
          margin-right: 0.5rem;
        }
      }

      .right-list {
        li::before {
          content: '✅ ';
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

function Story() {
  return (
    // TODO CHANGE SECTION NAME
    <StorySection
      id="story"
      sectionName="La historia detrás de la creatividad"
      subtitle={'No te falta creatividad, te falta el medio adecuado'}
    >
      <div className="lists-wrapper">
        <div className="list-container">
          <h4>
            🌀 Editar sobre el <em>timeline</em>
          </h4>
          <ul className="list wrong-list">
            <li>Caótico y lento</li>
            <li>Solo ves lo inmediato</li>
            <li>Pierdes claridad sobre la visión global</li>
          </ul>
        </div>

        <div className="list-container">
          <h4>
            🌟 Diseñar sobre el <em>guion</em>
          </h4>
          <ul className="list right-list">
            <li>Todo el proyecto de un vistazo</li>
            <li>Decides emociones en cada parte</li>
            <li>Avanzas rápido y con claridad</li>
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
