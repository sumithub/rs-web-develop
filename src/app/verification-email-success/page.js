"use client"
import AuthLayout from "../../components/common/AuthLayout";
import Success from "../../components/common/Success";

function VerificationEmail() {

    return (<AuthLayout>
        <Success message="Your email has been verified successfully! You can now log in."
            buttonTitle="Go to Login" />
    </AuthLayout>)
}

export default VerificationEmail