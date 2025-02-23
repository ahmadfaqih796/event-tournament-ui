import type { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || "Terjadi kesalahan!";
  }
  return "Terjadi kesalahan!";
}
