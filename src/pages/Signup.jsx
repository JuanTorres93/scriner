import LoginSignupLayout from "./LoginSignupLayout";
import SignupForm from "../features/authentication/SignupForm";
import SplitBox from "../ui/SplitBox";

function Login() {
  return (
    <LoginSignupLayout>
      <SplitBox
        child1={<SignupForm />}
        child2={<img src="register-image.png" alt="Login image" />}
      />
    </LoginSignupLayout>
  );
}

export default Login;
