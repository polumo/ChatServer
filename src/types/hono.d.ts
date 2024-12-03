import type { ApiResponse } from '@/middleware/responseMiddleware.ts'

declare module 'hono' {
  interface ContextVariableMap {
    successResponse: <T>(arg: ApiResponse<T>) => any
    errorResponse: (arg?: ApiResponse) => any
    userId: string
  }
}
