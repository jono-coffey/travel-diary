import { gql } from '../../__generated__/gql'

export const CREATE_TRIP_MUTATION = gql(`
  mutation NewTrip($name: String!, $startDate: Float!, $endDate: Float!){
     newTrip(name: $name, startDate: $startDate, endDate: $endDate)  {
        id
        name
        startDate
        endDate
      }
    }
`)
