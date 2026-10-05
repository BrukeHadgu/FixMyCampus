export const APP_CONSTANTS = {
  authTokenStorageKey: 'fixMyCampus.authToken',
  currentUserStorageKey: 'fixMyCampus.currentUser',
  defaultRoute: '/',
  loginRoute: '/login'
} as const;

export const USER_ROLES = {
  student: 'Student',
  technician: 'Technician',
  admin: 'Admin'
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];