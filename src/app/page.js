import Signup from "../components/Signup";
import AuthLayout from "../components/common/AuthLayout";
import VerificationEmail from "../components/VerificationEmail";
import VerificationError from "../components/VerificationError";
import Error from "../components/common/Error";
import Success from "../components/common/Success"
export default function Home() {
  return (<>
    <AuthLayout>
      {/* <VerificationEmail /> */}
      {/* <VerificationError /> */}
      {/* <Error /> */}
      <Success />
    </AuthLayout>
  </>)
}