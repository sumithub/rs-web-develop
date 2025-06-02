import Error from "../../components/common/Error"
import AuthLayout from "../../components/common/AuthLayout";

export default function ResetPasswordError({ error }) {

    return <AuthLayout>
        <Error error={error} />
    </AuthLayout>
}