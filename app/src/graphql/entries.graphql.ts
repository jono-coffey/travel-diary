import { gql } from '../../src/__generated__/gql'

export const CREATE_ENTRY_MUTATION = gql(`
  mutation NewEntry($description: String, $destination: String!, $startDate: Float!,  $endDate: Float!){
    newEntry(description: $description, destination: $destination, startDate: $startDate, endDate: $endDate) {
        id
      }
    }
`)
