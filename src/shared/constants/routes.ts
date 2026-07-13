export const AppRoute = {
  Home: '/',
  Login: '/login',
  Register: '/register',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]
