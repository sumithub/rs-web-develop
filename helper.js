export const getError = (e) => {
    if (!e)
        return `Something went wrong`
    if (typeof e == "string")
        return e
    return e?.response?.data?.err || e?.response?.data?.error || e.response?.data?.message || e.message
}