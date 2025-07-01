import { format } from 'date-fns';

export const getError = (e) => {
    if (!e)
        return `Something went wrong`
    if (typeof e == "string")
        return e
    return e?.response?.data?.err || e?.response?.data?.error || e.response?.data?.message || e.message
}

export const validEmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const validPasswordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/;

export function formatDate(date, f) {
    if (!date)
        return ""
    try {
        let d = date
        if (typeof date === "string")
            d = new Date(date);

        return format(d, f || 'MMM dd, yyyy');
    } catch (e) {
        return "xx"
    }
}

export function formatDateTime(date) {
    if (!date)
        return ""
    try {
        let d = date
        if (typeof date === "string")
            d = new Date(date);

        return format(d, 'dd MMM | hh:mm a');
    } catch (e) {
        return "xx"
    }
}


export const phoneStyles = {
    "--react-international-phone-border-radius": '8px',
    "--react-international-phone-border-color": "#0396FF1A",
    "--react-international-phone-background-color": "#ffffff",
    "--react-international-phone-text-color": "#242424",
    "--react-international-phone-selected-dropdown-item-background-color": "#ffffff",
    "--react-international-phone-country-selector-background-color-hover": "#ffffff",
    "--react-international-phone-dropdown-item-background-color": "#ffffff",
    "--react-international-phone-height": "44px",
}