'use client'

import Error from "../../components/common/Error"
import AuthLayout from "../../components/common/AuthLayout"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function ResetPasswordError_() {
    return (<Suspense>
        <ResetPasswordError />
    </Suspense>)
}

const ResetPasswordError = () => {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <AuthLayout>
            <Error error={error} />
        </AuthLayout>
    )
}
