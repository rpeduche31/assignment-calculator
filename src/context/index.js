import React, { useContext, useState, createContext } from 'react';

const CalculatorContext = createContext({});

const CalculatorProvider = ({ children }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculatorValue = {
    displayValue,
    setDisplayValue,
    value,
    setValue,
    operator,
    setOperator,
    waitingForOperand,
    setWaitingForOperand,
  };

  return (
    <CalculatorContext.Provider value={calculatorValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculatorContext must be used within a CalculatorProvider');
  }
  return context;
};

export default CalculatorProvider;
