export const getError = (e) => {
    if (!e)
        return `Something went wrong`
    if (typeof e == "string")
        return e
    return e?.response?.data?.err || e?.response?.data?.error || e.response?.data?.message || e.message
}

export const validEmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const validPasswordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/;