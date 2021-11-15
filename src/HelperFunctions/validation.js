import { EMPTY_MESSAGE, INVALID_MESSAGE } from "../Constants/ErrorMessages";

export const validateName = (name,setError) => {
  const nameRegex = new RegExp('^[A-Z]{1}[a-z]{2,}$');
  let errorMessage;
  if (!name) {
    errorMessage = 'Name ' + EMPTY_MESSAGE;
  } else if (!nameRegex.test(name)) {
    errorMessage = 'Name ' + INVALID_MESSAGE;
  } else {
    errorMessage = '';
  }
  setError({
    type: 'SET_NAME_ERROR',
    payload: errorMessage
  })
}

export const validateNumber = (number,setError) => {
  const numberRegex = new RegExp('^[0-9]{10}$');
  let errorMessage;
  if (!number) {
    errorMessage = 'Number ' + EMPTY_MESSAGE;
  } else if (!numberRegex.test(number)) {
    errorMessage = 'Number ' + INVALID_MESSAGE;
  } else {
    errorMessage = '';
  }
  setError({
    type: 'SET_NUMBER_ERROR',
    payload: errorMessage
  })
}