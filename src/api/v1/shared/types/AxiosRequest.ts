export type AxiosRequest = {
  method: string
  url: string
  timeout: number
  headers: {
    [key: string]: string
  }
  data?: object
}
