import { useEffect, useState } from 'react';
import useCalculatorOperations from './index';

const useKeyDownHooks = (displayValue) => {
  const { functionCollections, calculatorOperations } = useCalculatorOperations();
  const [eventKey, setEventKey] = useState('');

  const {
    digit,
    dot,
    operator: newOperator,
    percentage,
    clearLastChar,
    clearDisplay,
    clearAll,
  } = functionCollections;

  const handleKeyDown = (event) => {
    if (event.key) {
      event?.preventDefault();
      let newKey = event?.key === 'Enter' ? '=' : event?.key;
      setEventKey(newKey);
    } else {
      setEventKey(event);
    }
  };

  useEffect(() => {
    window.document.addEventListener('keydown', handleKeyDown);
    window.document.addEventListener('keyup', () => handleKeyDown(''));

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', () => handleKeyDown(''));
    };
  }, [displayValue]);

  const performOperation = (key) => {
    if (/\d/.test(key)) {
      digit(parseInt(key, 10));
    } else if (key in calculatorOperations) {
      newOperator(key);
    } else if (key === '.') {
      dot();
    } else if (key === '%') {
      percentage();
    } else if (key === 'Backspace') {
      clearLastChar();
    } else if (key === 'Clear') {
      if (displayValue !== '0') {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  return { eventKey, performOperation };
};

export default useKeyDownHooks;
