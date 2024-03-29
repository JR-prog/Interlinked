import { Post } from '../types/Post';
import { User, Company, Admin } from '../types/User';
import { firestore } from './firebase';
import { collection } from 'firebase/firestore';
import type {
  QueryDocumentSnapshot,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { ChatRoom } from '@/types/Message';
import { JobKeyword } from '@/types/JobKeyword';

// Visit this article for a description of the approach to get types in Firestore: https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945

// Enforce retrieved data is of generic type
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// Converts collection path to typed collection
const dataPoint = <T>(collectionPath: string) =>
  collection(firestore, collectionPath).withConverter(converter<T>());

// Converts collection reference to typed collection
export const typeCollection = <T>(
  collection: CollectionReference<DocumentData>
) => collection.withConverter(converter<T>());

// List of supported collections exported as 'db'
export const db = {
  genericUser: dataPoint<User | Company | Admin>('users'),
  users: dataPoint<User>('users'),
  companies: dataPoint<Company>('users'),
  admin: dataPoint<Admin>('users'),
  posts: dataPoint<Post>('posts'),
  chatrooms: dataPoint<ChatRoom>('chatrooms'),
  jobKeywords: dataPoint<JobKeyword>('jobkeywords'),
};
