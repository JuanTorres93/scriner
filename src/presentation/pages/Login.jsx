import LoginForm from '../features/authentication/LoginForm';
import SplitBox from '../ui/SplitBox';
import LoginSignupLayout from './LoginSignupLayout';

function Login() {
  return (
    <LoginSignupLayout>
      <SplitBox
        className="auth-split-box"
        child1={<LoginForm />}
        child2={<img src="login-image.png" alt="Login image" />}
      />
    </LoginSignupLayout>
  );
}

export default Login;
