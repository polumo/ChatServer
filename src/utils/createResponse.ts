import type { StatusCode } from 'hono/utils/http-status'

interface ApiResponse<T> {
  code: StatusCode
  data?: T | null
  message?: string
}

export const createResponse = <T>({ code, data = null, message = '操作成功' }: ApiResponse<T>): ApiResponse<T> => {
  return {
    code: code as StatusCode,
    data,
    message,
  }
}
export const createErrorResponse = (): ApiResponse<null> => {
  return {
    code: 500,
    data: null,
    message: 'Internal server error',
  }
}
