import React from 'react'
import { ACTIONS } from './App'

function OperationButton({dispatch, operation, id}) {
  return (
    <button id = {id} onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
    {operation}
    </button>
  )
}

export default OperationButton