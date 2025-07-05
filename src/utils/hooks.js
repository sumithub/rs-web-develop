import { useEffect, useState } from "react";

export function useRole() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('role');
            setIsAdmin(role === 'ADMIN');
        }
        setIsLoading(false);
    }, []);

    return { isAdmin, isLoading };
}