import SEO from '../../seo/SEO';
import LoginSignupLayout from './LoginSignupLayout';
import SignupForm from '../features/authentication/SignupForm';
import SplitBox from '../ui/SplitBox';

function Login() {
  return (
    <>
      <SEO
        title="Crear cuenta — EditorMind"
        description="Regístrate para empezar a planificar tus vídeos."
        robots="noindex,nofollow"
      />

      <LoginSignupLayout>
        <SplitBox
          className="auth-split-box"
          child1={<SignupForm />}
          child2={<img src="register-image.jpg" alt="Login image" />}
        />
      </LoginSignupLayout>
    </>
  );
}

export default Login;
