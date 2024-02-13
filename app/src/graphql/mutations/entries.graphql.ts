import { gql } from '../../__generated__/gql'

export const CREATE_ENTRY_MUTATION = gql(`
  mutation NewEntry($description: String, $destination: String!, $tripId: Int){
    newEntry(description: $description, destination: $destination, tripId: $tripId) {
        id
      }
    }
`)
