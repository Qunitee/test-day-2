import { FirebaseError } from 'firebase/app'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered',
  'auth/invalid-email': 'Invalid email address',
  'auth/invalid-credential': 'Invalid email or password',
  'auth/user-not-found': 'Invalid email or password',
  'auth/wrong-password': 'Invalid email or password',
  'auth/weak-password': 'Password is too weak',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
  'auth/network-request-failed': 'Network error. Check your connection',
  'auth/operation-not-allowed': 'Email/password sign-in is disabled in Firebase',
}

const DEFAULT_MESSAGE = 'Something went wrong. Please try again'

export function getFirebaseErrorMessage(
  error: unknown,
  fallback: string = DEFAULT_MESSAGE
): string {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] ?? fallback
  }
  if (error instanceof Error) return error.message
  return fallback
}
