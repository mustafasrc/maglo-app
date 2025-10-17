const BASE_URL = "https://case.nodelabs.dev/api/";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const json = await res.json();

  if ("success" in json && !json.success) {
    throw new Error(json.message || "API returned an error");
  }

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return json;
}
