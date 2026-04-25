import { HttpResponse, HttpRequest } from './HttpRequest.js'

export type Controller<T = HttpResponse> = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => Promise<T>
