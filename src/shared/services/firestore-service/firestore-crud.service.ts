import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/firebase/firebase.config.ts'
import { getFirebaseErrorMessage } from '@/shared/utils/firebase-error.util.ts'

/** Any entity whose `id` is the Firestore document id. */
export interface WithId {
  id: string
}

/**
 * Document payload without `id` — the id is the document key in Firestore,
 * not a stored field.
 */
export type EntityData<T extends WithId> = Omit<T, 'id'>

/**
 * Generic CRUD service over a single Firestore collection.
 *
 * Centralizes the Firestore SDK calls and error handling in one place so that
 * per-entity services (rooms, bookings, …) only need to extend it and, when
 * required, add their own domain-specific methods.
 *
 * Every method wraps its Firestore call in try/catch and re-throws a plain
 * `Error` with a human-readable message (see {@link getFirebaseErrorMessage}),
 * keeping the original error available via the `cause` option.
 *
 * @typeParam T - Entity shape, including its `id` field.
 *
 * @example
 * ```ts
 * class RoomsService extends FirestoreCrudService<RoomI> {
 *   constructor() {
 *     super('rooms')
 *   }
 * }
 *
 * export const roomsService = new RoomsService()
 * ```
 */
export class FirestoreCrudService<T extends WithId> {
  protected readonly collectionRef: CollectionReference

  /**
   * @param collectionName - Name of the Firestore collection this service
   * operates on (e.g. `'rooms'`).
   */
  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName)
  }

  /** Builds a document reference for the given id within this collection. */
  protected docRef(id: string): DocumentReference {
    return doc(this.collectionRef, id)
  }

  /** Merges a document id with its raw data into a typed entity. */
  protected toEntity(id: string, data: DocumentData): T {
    return { id, ...data } as T
  }

  /**
   * Fetches all documents in the collection.
   *
   * @param constraints - Optional Firestore query constraints such as
   * `where(...)`, `orderBy(...)`, or `limit(...)`.
   * @returns The matching entities, each with its `id` populated.
   * @throws {Error} If the read fails.
   */
  async getAll(...constraints: QueryConstraint[]): Promise<T[]> {
    try {
      const snapshot = await getDocs(query(this.collectionRef, ...constraints))
      return snapshot.docs.map(snap => this.toEntity(snap.id, snap.data()))
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  /**
   * Fetches a single document by id.
   *
   * @param id - Document id.
   * @returns The entity, or `null` if no document with that id exists.
   * @throws {Error} If the read fails.
   */
  async getById(id: string): Promise<T | null> {
    try {
      const snapshot = await getDoc(this.docRef(id))
      return snapshot.exists()
        ? this.toEntity(snapshot.id, snapshot.data())
        : null
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  /**
   * Creates a document with an auto-generated id.
   *
   * @param payload - Entity data without `id`.
   * @returns The created entity, including the generated `id`.
   * @throws {Error} If the write fails.
   */
  async create(payload: EntityData<T>): Promise<T> {
    try {
      const ref = await addDoc(this.collectionRef, payload as DocumentData)
      return this.toEntity(ref.id, payload as DocumentData)
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  /**
   * Partially updates a document by id.
   *
   * @param id - Document id.
   * @param payload - Subset of entity fields to update.
   * @throws {Error} If the update fails (e.g. the document does not exist).
   */
  async update(id: string, payload: Partial<EntityData<T>>): Promise<void> {
    try {
      await updateDoc(this.docRef(id), payload as DocumentData)
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }

  /**
   * Deletes a document by id.
   *
   * @param id - Document id.
   * @throws {Error} If the deletion fails.
   */
  async remove(id: string): Promise<void> {
    try {
      await deleteDoc(this.docRef(id))
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }
}
