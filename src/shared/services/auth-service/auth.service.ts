import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Unsubscribe,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase.config.ts'
import type { AuthUserI } from '@/shared/models/user/auth-user.model.ts'
import { getFirebaseErrorMessage } from '@/shared/utils/firebase-error.util.ts'
import type {
  LoginPayloadI,
  RegisterPayloadI,
} from '@/shared/services/auth-service/auth-payload.models.ts'



function mapFirebaseUser(user: User): AuthUserI {
  return {
    uid: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? user.email?.split('@')[0] ?? '',
  }
}

export class AuthService {
  async register({
    name,
    email,
    password,
  }: RegisterPayloadI): Promise<AuthUserI> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Пользователь уже создан. Если updateProfile упадёт — не проваливаем
      // регистрацию (иначе на повторе будет "email already in use"),
      // а имя всё равно возвращаем из payload.
      try {
        await updateProfile(user, { displayName: name })
      } catch (profileError) {
        console.error(getFirebaseErrorMessage(profileError))
      }

      return { ...mapFirebaseUser(user), name }
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  async login({ email, password }: LoginPayloadI): Promise<AuthUserI> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return mapFirebaseUser(user)
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  subscribe(listener: (user: AuthUserI | null) => void): Unsubscribe {
    return onAuthStateChanged(auth, user => {
      listener(user ? mapFirebaseUser(user) : null)
    })
  }
}

export const authService = new AuthService()
