import SEO from '../../seo/SEO';
import Hero from '../features/landing/Hero';
import Problem from '../features/landing/Problem';
import Amplify from '../features/landing/Amplify';
import Story from '../features/landing/Story';
import Testimonial from '../features/landing/Testimonial';
import Offer from '../features/landing/Offer';
import Response from '../features/landing/Response';

function Landing() {
  return (
    <>
      <SEO
        title="EditorMind — Planifica vídeos sin caos"
        description="Crea y organiza tus guiones con claridad. Reduce el tiempo de edición y aumenta la calidad."
        canonical="https://www.editormind.com/"
        url="https://www.editormind.com/"
        image="https://www.editormind.com/og-image.jpg"
      />
      <Hero />
      <Problem />
      <Amplify />
      <Story />
      <Testimonial />
      <Offer />
      <Response />
    </>
  );
}

export default Landing;
