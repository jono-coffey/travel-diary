import { gql } from '../../__generated__/gql'

export const CREATE_ENTRY_MUTATION = gql(`
  mutation NewEntry($description: String, $destination: String!, $tripId: Int, $latitude: Float!, $longitude: Float!){
    newEntry(description: $description, destination: $destination, tripId: $tripId, latitude: $latitude, longitude:$longitude) {
        id
      }
    }
`)
