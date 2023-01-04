import { reportError } from "../utils/reporter";

export const startListener = () => {
  window.onerror = (message = "", _, lineno = -1, colno = -1, error) => {
    // console.log("onerror", error)
    reportError({
      type: "onerror",
      lineno,
      colno,
      message: message as string,
      stack: (error as any)?.stack || ""
    })
  }
  window.addEventListener("error", (event) => {
    const { lineno, colno, message } = event
    // console.log("addEventListener", event)
    reportError({
      type: "addEventListener",
      lineno,
      colno,
      message,
      stack: event.error?.stack || ""
    })
  })
  window.addEventListener("unhandledrejection", (e) => {
    // console.log("unhandledrejection", e)
    reportError({
      type: "unhandledrejection",
      lineno: -1,
      colno: -1,
      message: e.reason?.message || "",
      stack: e.reason?.stack || ""
    })
  })
}
