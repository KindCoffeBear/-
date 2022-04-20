/* eslint-disable default-param-last */
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actionTypes/userTypes'

const userReducer = (store = {}, action) => {
  switch (action.type) {
    // получение всех постов
    case SIGN_UP:
      return action.payload

      // добавление постов
    case SIGN_IN:
      return { ...store, ...action.payload }

      // удаление постов
    case SIGN_OUT:
      return action.payload

    default:
      return store
  }
}

export default userReducer
