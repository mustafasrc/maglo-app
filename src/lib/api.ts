import { toast } from "react-toastify";
import Cookies from "js-cookie";

const BASE_URL = "https://case.nodelabs.dev/api/";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token = Cookies.get('auth-token');

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    });

    const json = await res.json();

    if ("success" in json && !json.success) {
      throw new Error(json.message || "Bir hata oluştu");
    }

    if (!res.ok) {
      toast.error(json.message)
      throw new Error(json.message || "Sunucu hatası");
    }

    return json;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message || "Beklenmeyen bir hata oluştu");
      throw error;
    } else {
      toast.error("Beklenmeyen bir hata oluştu");
      throw new Error("Beklenmeyen bir hata oluştu");
    }
  }
}