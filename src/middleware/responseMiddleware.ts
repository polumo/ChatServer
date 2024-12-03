// src/middleware/responseMiddleware.ts
import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'

export interface ApiResponse<T = null> {
  code?: StatusCode
  data?: T
  message?: string
}

export const responseMiddleware = (ctx: Context, next: () => Promise<void>) => {
  ctx.set('successResponse', ({ data, message = '操作成功', code = 200 }: ApiResponse<any>) => {
    ctx.status(code)
    return ctx.json({
      code,
      data,
      message,
    })
  })

  ctx.set('errorResponse', (res?: ApiResponse<null>) => {
    const code = res?.code || 500
    const message = res?.message || '未知错误，请稍后重试'
    ctx.status(code)
    return ctx.json({
      code,
      data: null,
      message,
    })
  })

  return next()
}
