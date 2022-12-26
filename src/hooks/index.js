import { useCalculatorContext } from '../context';

const useCalculatorOperations = () => {
  const {
    displayValue,
    setDisplayValue,
    value,
    setValue,
    operator,
    setOperator,
    waitingForOperand,
    setWaitingForOperand,
  } = useCalculatorContext();

  const calculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const clearAll = () => {
    setDisplayValue('0');
    setValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const inputDigit = (digit, wfOperand) => {
    if (waitingForOperand || wfOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : `${displayValue}` + digit);
    }
  };

  const clearType = (clearDisplayText) => {
    clearDisplayText ? clearDisplay() : clearAll();
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculatorOperations[operator](currentValue, inputValue);
      setValue(newValue);
      setDisplayValue(String(newValue));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const plusMinus = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };

  const percentage = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  };

  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  };

  const functionCollections = {
    digit: inputDigit,
    ac: clearType,
    dot: inputDot,
    operator: performOperation,
    plusMinus: plusMinus,
    percentage: percentage,
    clearLastChar: clearLastChar,
    clearDisplay: clearDisplay,
    clearAll: clearAll,
  };

  return { functionCollections, calculatorOperations };
};

export default useCalculatorOperations;
