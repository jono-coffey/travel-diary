import { gql } from '../../__generated__/gql'

export const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`)

export const REGISTER_MUTATION = gql(`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`)
