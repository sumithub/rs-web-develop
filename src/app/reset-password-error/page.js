'use client'

import Error from "../../components/common/Error"
import AuthLayout from "../../components/common/AuthLayout"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <AuthLayout>
            <Error error={error} />
        </AuthLayout>
    )
}
