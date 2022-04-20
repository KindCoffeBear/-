/* eslint-disable no-unused-expressions */
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actionTypes/userTypes'

const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
})

export const signInQuery = ({ email, password, cb }) => async (dispatch) => {
  const response = await fetch('https://api.react-learning.ru/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const user = await response.json()

  localStorage.setItem('token', user.token)

  dispatch(
    signIn({
      ...user.data,
      token: user.token,
    }),
  )

  typeof cb === 'function' && cb()
}

const signUp = (user) => ({
  type: SIGN_UP,
  payload: user,
})

export const signUpQuery = ({ email, password }) => async (dispatch) => {
  const response = await fetch('https://api.react-learning.ru/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const user = await response.json()

  dispatch(
    signUp(user),
  )
}

const signOut = () => ({
  type: SIGN_OUT,
  payload: {},
})

export const signOutQuery = () => async (dispatch) => {
  localStorage.clear()
  dispatch(signOut())
}
