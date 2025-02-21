import { ref, provide, inject } from "vue";

export interface SnackbarOptions {
  message: string;
  color?: "success" | "error" | "info" | "warning";
  timeout?: number;
}

const SNACKBAR_KEY = Symbol("snackbar");

export function provideSnackbar() {
  const snackbar = ref({
    show: false,
    message: "",
    color: "success",
    timeout: 3000,
  });

  const showSnackbar = ({
    message,
    color = "success",
    timeout = 3000,
  }: SnackbarOptions) => {
    snackbar.value = { show: true, message, color, timeout };
  };

  const hideSnackbar = () => {
    snackbar.value.show = false;
  };

  provide(SNACKBAR_KEY, { snackbar, showSnackbar, hideSnackbar });

  return { snackbar, showSnackbar, hideSnackbar };
}

export function useSnackbar() {
  const snackbarContext = inject(SNACKBAR_KEY) as any;

  if (!snackbarContext) {
    throw new Error("useSnackbar() dipanggil tanpa provider!");
  }

  return snackbarContext;
}
