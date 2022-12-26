import React, { useEffect, useRef, useMemo } from 'react';
import { Button, AutoScale } from '../../components';
import { buttonText } from '../../constants/buttonText';
import useKeyDownHooks from '../../hooks/useKeyDownHooks';
import useCalculatorOperations from '../../hooks';
import { useCalculatorContext } from '../../context';
import { languageFormat } from '../../utils/languageFormat';
import './calculator.css';

const CalculatorDisplay = ({ numValue }) => {
  const calculatorRef = useRef(null);

  const DisplayMemo = useMemo(() => {
    return (
      <div ref={calculatorRef} id='display-screen' className='display-screen'>
        <AutoScale parentRef={calculatorRef}>{languageFormat(numValue)}</AutoScale>
      </div>
    );
  }, [languageFormat(numValue), numValue]);

  return DisplayMemo;
};

const CalculatorButtons = ({ numValue }) => {
  const clearDisplayText = numValue !== '0';
  const clearText = clearDisplayText ? 'C' : 'AC';
  const { functionCollections } = useCalculatorOperations();
  const { digit, operator } = functionCollections;

  const onHandleButtonClick = (btnType) => {
    if (btnType.type === 'digit') {
      digit(Number(btnType.label));
    } else if (btnType.function === 'operator') {
      operator(btnType.optSymbol);
    } else {
      functionCollections[btnType.key](clearDisplayText);
    }
  };

  return (
    <>
      {buttonText.map((btn) => {
        return (
          <Button
            onHandleClick={() => onHandleButtonClick(btn)}
            key={btn.key}
            buttonStyles={
              btn?.key === 'zero'
                ? { gridColumnStart: 1, gridColumnEnd: 3, width: 'unset' }
                : btn?.function === 'operator'
                ? { background: '#fc765b', color: 'white' }
                : btn?.function === 'semi-operator'
                ? { background: 'lightgray' }
                : {}
            }>
            {btn.label === 'AC' ? clearText : btn.label}
          </Button>
        );
      })}
    </>
  );
};

const Calculator = () => {
  const { displayValue } = useCalculatorContext();
  const { eventKey, performOperation } = useKeyDownHooks(displayValue);

  useEffect(() => {
    if (eventKey?.length > 0) {
      performOperation(eventKey);
    }
  }, [eventKey]);

  return (
    <div className='calculator-wrapper'>
      <div className='calculator-container'>
        <CalculatorDisplay numValue={displayValue} />
        <CalculatorButtons numValue={displayValue} />
      </div>
    </div>
  );
};

export default Calculator;
