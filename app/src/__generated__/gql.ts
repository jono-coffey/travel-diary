/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetTrips{\n    trips {\n        id\n        name\n      }\n    }\n": types.GetTripsDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation NewEntry($description: String, $destination: String!, $tripId: Int, $latitude: Float!, $longitude: Float!){\n    newEntry(description: $description, destination: $destination, tripId: $tripId, latitude: $latitude, longitude:$longitude) {\n        id\n      }\n    }\n": types.NewEntryDocument,
    "\n  mutation NewTrip($name: String!, $startDate: Float!, $endDate: Float!){\n     newTrip(name: $name, startDate: $startDate, endDate: $endDate)  {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n": types.NewTripDocument,
    "\n  query GetEntries {\n    entries {\n      id\n      longitude\n      latitude\n      destination\n    }\n  }\n": types.GetEntriesDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      trips {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTrips{\n    trips {\n        id\n        name\n      }\n    }\n"): (typeof documents)["\n  query GetTrips{\n    trips {\n        id\n        name\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation NewEntry($description: String, $destination: String!, $tripId: Int, $latitude: Float!, $longitude: Float!){\n    newEntry(description: $description, destination: $destination, tripId: $tripId, latitude: $latitude, longitude:$longitude) {\n        id\n      }\n    }\n"): (typeof documents)["\n  mutation NewEntry($description: String, $destination: String!, $tripId: Int, $latitude: Float!, $longitude: Float!){\n    newEntry(description: $description, destination: $destination, tripId: $tripId, latitude: $latitude, longitude:$longitude) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation NewTrip($name: String!, $startDate: Float!, $endDate: Float!){\n     newTrip(name: $name, startDate: $startDate, endDate: $endDate)  {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n"): (typeof documents)["\n  mutation NewTrip($name: String!, $startDate: Float!, $endDate: Float!){\n     newTrip(name: $name, startDate: $startDate, endDate: $endDate)  {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEntries {\n    entries {\n      id\n      longitude\n      latitude\n      destination\n    }\n  }\n"): (typeof documents)["\n  query GetEntries {\n    entries {\n      id\n      longitude\n      latitude\n      destination\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      trips {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      trips {\n        id\n        name\n        startDate\n        endDate\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;