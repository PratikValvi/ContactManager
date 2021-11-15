export const initialErrorMessages = {
  nameError: '',
  numberError: ''
}

export const errorReducer = (state = initialErrorMessages, action) => {
  switch (action.type) {
    case 'SET_NAME_ERROR':
      return {
        ...state,
        nameError: action.payload
      }
    case 'SET_NUMBER_ERROR':
      return {
        ...state,
        numberError: action.payload
      }
    default:
      return state
  }
}