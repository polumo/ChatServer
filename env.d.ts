declare module 'bun' {
  interface Env {
    MONGODB_URI: string
    JWT_SECRET: string
  }
}
