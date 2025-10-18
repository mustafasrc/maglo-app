import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth";
import { apiFetch } from "@/lib/api";
import { ProfileResponse, RefreshTokenResponse } from '@/types'

async function fetchUserProfile(): Promise<ProfileResponse> {
    const res = await apiFetch<ProfileResponse>("/users/profile",);
    return res
}

export async function refreshToken(): Promise<void> {
    const { updateAuthToken } = useAuthStore.getState()
    const res = await apiFetch<RefreshTokenResponse>("/users/refresh-token",);
    updateAuthToken(res.data.accessToken)
}

export async function validateAuth(): Promise<void> {

    const { user, accessToken, setAuth, logout } = useAuthStore.getState();

    let token = accessToken;
    if (!token) {
        token = Cookies.get("auth-token") as string
    }

    if (token && !user) {
        try {
            const userData: ProfileResponse = await fetchUserProfile();
            setAuth(userData.data, token);
        } catch (_error) {
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
