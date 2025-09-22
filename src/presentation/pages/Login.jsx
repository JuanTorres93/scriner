import SEO from '../../seo/SEO';
import LoginForm from '../features/authentication/LoginForm';
import SplitBox from '../ui/SplitBox';
import LoginSignupLayout from './LoginSignupLayout';

function Login() {
  return (
    <>
      <SEO
        title="Iniciar sesión — EditorMind"
        description="Accede a tu cuenta."
        robots="noindex,nofollow"
      />

      <LoginSignupLayout>
        <SplitBox
          className="auth-split-box"
          child1={<LoginForm />}
          child2={<img src="login-image.jpg" alt="Login image" />}
        />
      </LoginSignupLayout>
    </>
  );
}

export default Login;
