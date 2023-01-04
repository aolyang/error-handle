export interface IReportData {
  lineno: number
  colno: number
  type: string
  message?: string
  stack?: string
}

const cache = new Map()

export const reportError = (data: IReportData) => {
  const key = `${data.lineno}-${data.colno}`
  if (cache.has(key)) return

  cache.set(key, data)

  fetch("http://127.0.0.1:4004/error", {
    headers: new Headers([["Content-Type", "application/json"]]),
    body: JSON.stringify(data),
    method: "POST"
  }).then(() => {
    cache.delete(key)
  })
}
