import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LoginMutation, SignUpMutation } from '../__generated__/graphql'
import { getApolloClient } from '../graphql/setup'
import { User } from '../models/users.model'

interface AuthSlice {
  accessToken: string
  user: User
}

const initialState: AuthSlice = {
  accessToken: '',
  user: {} as User
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginMutation>) => {
      state.user.id = action.payload.login.user.id
      state.accessToken = action.payload.login.token
    },
    setRegister: (state, action: PayloadAction<SignUpMutation>) => {
      state.user.id = action.payload.signUp.user.id
      state.accessToken = action.payload.signUp.token
    },
    logout: (state) => {
      state.user = {} as User
      state.accessToken = ''
      getApolloClient('').resetStore()
    }
  }
})

// Action creators are generated for each case reducer function
export const { setRegister, setLogin, logout } = authSlice.actions

export default authSlice.reducer
