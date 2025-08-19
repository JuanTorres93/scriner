import LoginSignupLayout from "./LoginSignupLayout";
import SignupForm from "../features/authentication/SignupForm";

function Login() {
  return (
    <LoginSignupLayout>
      <SignupForm />
    </LoginSignupLayout>
  );
}

export default Login;
