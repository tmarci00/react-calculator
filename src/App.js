import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE: 'delete',
  CHOOSE_OPERATION: 'choose-operation',
  EQUALS: 'equals'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          currentOperand: `${payload.digit}`,
          overwrite: false,
        }
      }


      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }



      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,

      };
    case ACTIONS.CLEAR:
      return {
        currentOperand: '0',
        overwrite: true,
      };
    case ACTIONS.CHOOSE_OPERATION:

      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {

        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,

        }

      }
      if (state.currentOperand == null && ((state.operation === '÷' || state.operation === '*') && payload.operation === '-')) {
        return {
          ...state,
          minus: -1,
        }
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      return {
        ...state,
        previousOperand: equals(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.EQUALS:
      
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }

      return {
        currentOperand: equals(state),
        previousOperand: null,
        operation: null,
        overwrite: true,
      };
    case ACTIONS.DELETE:
      debugger;
      if(state.currentOperand === '0' || (state.previousOperand != null && state.currentOperand === null)){
        return state;
      }
      if (state.currentOperand.length === 1){
        return{
          ...state,
          currentOperand: '0',
          overwrite:true
        }
      }
    
      return {
        ...state,
        currentOperand: `${state.currentOperand.slice(0, -1)}`
      }
  }
}

function equals({ currentOperand, previousOperand, operation, minus }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }

  let result = "";

  switch (operation) {
    case "+":
      result = prev + curr;
      break
    case '-':
      result = prev - curr;
      break
    case '*':
      result = prev * curr;
      break
    case '÷':
      result = prev / curr;
      break
  }
  if ((operation === '*' || operation === '÷') && minus !== undefined) { result = result * minus; }
  return result.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: '0', overwrite: true, minus: 1 })

  return (
    <div className="App">
      <div id='calculator'>
        <div id='display'>
          <div id='previousOperand'>{previousOperand} {operation}</div>
          <div id='currentOperand'>{currentOperand}</div>
        </div>

        <button id='clear' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button id='delete' onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
        <OperationButton id='divide' operation='÷' dispatch={dispatch} />
        <DigitButton id="one" digit="1" dispatch={dispatch} />
        <DigitButton id="two" digit="2" dispatch={dispatch} />
        <DigitButton id="three" digit="3" dispatch={dispatch} />
        <OperationButton id='multiply' operation='*' dispatch={dispatch} />
        <DigitButton id="four" digit="4" dispatch={dispatch} />
        <DigitButton id="five" digit="5" dispatch={dispatch} />
        <DigitButton id="six" digit="6" dispatch={dispatch} />
        <OperationButton id='add' operation='+' dispatch={dispatch} />
        <DigitButton id="seven" digit="7" dispatch={dispatch} />
        <DigitButton id="eight" digit="8" dispatch={dispatch} />
        <DigitButton id="nine" digit="9" dispatch={dispatch} />
        <OperationButton id='subtract' operation='-' dispatch={dispatch} />
        <DigitButton id='decimal' digit='.' dispatch={dispatch} />
        <DigitButton id="zero" digit="0" dispatch={dispatch} />
        <button id='equals' onClick={() => dispatch({ type: ACTIONS.EQUALS })}>=</button>
      </div>
    </div>
  );
}

export default App;
