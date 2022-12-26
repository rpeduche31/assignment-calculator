import './App.css';
import Calculator from './modules/Calculator';
import CalculatorProvider from './context/index';

function App() {
  return (
    <div className='App'>
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </div>
  );
}

export default App;
