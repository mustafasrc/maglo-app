
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { refreshToken } from "@/lib/validateAuth";

const BASE_URL = "https://case.nodelabs.dev/api/";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
  retry = true
): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    });

    if (res.status === 401 && retry) {
      try {
        await refreshToken();
        return await apiFetch(endpoint, options, false);
      } catch (e) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        throw e;
      }
    }

    const json = await res.json();

    if ("success" in json && !json.success) {
      throw new Error(json.message || "Bir hata oluştu");
    }

    if (!res.ok) {
      throw new Error(json.message || "Sunucu hatası");
    }

    return json;
  } catch (error: any) {
    toast.error(error.message || "Beklenmeyen bir hata oluştu");
    throw error;
  }
}
