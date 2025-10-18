import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth";
import { apiFetch } from "@/lib/api";
import { User } from '@/types'

async function fetchUserProfile(): Promise<any> {
    const res = await apiFetch<User>("/users/profile",);
    return res;
}

export async function validateAuth(): Promise<void> {
    const { user, accessToken, setAuth, logout } = useAuthStore.getState();

    let token = accessToken;
    if (!token) {
        token = Cookies.get("auth-token") as string
    }

    if (token && !user) {
        try {
            const userData = await fetchUserProfile();
            setAuth(userData.data, token);
        } catch (error) {
            logout();
            window.location.href = "/login";
        }
        return;
    }

    if (user && !token) {
        logout();
        window.location.href = "/login";
    }
}
