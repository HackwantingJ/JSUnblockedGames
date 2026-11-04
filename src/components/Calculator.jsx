import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, History, Delete } from 'lucide-react';

export const Calculator = ({ onUnlock }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Secret passcode to unlock the unblocked games vault
  const PASSCODE = '1865';

  // Handle number input
  const handleDigit = (digit) => {
    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') {
        return digit;
      }
      return prev + digit;
    });
  };

  // Handle operators (+, -, *, /)
  const handleOperator = (op) => {
    if (display === 'Error') return;
    setEquation(`${display} ${op}`);
    setDisplay('0');
  };

  // Clear entry
  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  // Backspace
  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  // Decimal point
  const handleDecimal = () => {
    setDisplay((prev) => {
      if (prev.includes('.')) return prev;
      return prev + '.';
    });
  };

  // Plus / Minus negation
  const handleToggleSign = () => {
    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') return prev;
      if (prev.startsWith('-')) return prev.slice(1);
      return '-' + prev;
    });
  };

  // Square root
  const handleSqrt = () => {
    try {
      const val = parseFloat(display);
      if (val < 0) {
        setDisplay('Error');
        return;
      }
      const res = Math.sqrt(val);
      setDisplay(String(Number(res.toFixed(8))));
      setEquation(`√(${val})`);
    } catch {
      setDisplay('Error');
    }
  };

  // Percentage
  const handlePercent = () => {
    try {
      const val = parseFloat(display);
      setDisplay(String(val / 100));
    } catch {
      setDisplay('Error');
    }
  };

  // Execute Calculation / Check Secret Code
  const handleEquals = () => {
    const trimmedInput = display.trim();

    // Check if user entered the secret passcode 1865
    if (trimmedInput === PASSCODE) {
      onUnlock();
      return;
    }

    if (!equation) return;

    try {
      const parts = equation.split(' ');
      const prevVal = parseFloat(parts[0]);
      const op = parts[1];
      const currentVal = parseFloat(display);

      if (isNaN(prevVal) || isNaN(currentVal)) return;

      let result = 0;
      switch (op) {
        case '+':
          result = prevVal + currentVal;
          break;
        case '-':
          result = prevVal - currentVal;
          break;
        case '×':
        case '*':
          result = prevVal * currentVal;
          break;
        case '÷':
        case '/':
          if (currentVal === 0) {
            setDisplay('Error');
            return;
          }
          result = prevVal / currentVal;
          break;
        default:
          return;
      }

      // Round to 8 decimal places if needed
      const formattedResult = String(Number(result.toFixed(8)));
      const historyItem = `${equation} ${display} = ${formattedResult}`;
      setHistory((h) => [historyItem, ...h.slice(0, 9)]);
      setDisplay(formattedResult);
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, equation]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-between font-sans selection:bg-slate-300">
      
      {/* Top Academic Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <CalcIcon className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">
              Standard &amp; Scientific Calculator
            </h1>
            <p className="text-[11px] text-slate-500 font-mono">Academic Utilities · v2.4</p>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          title="Toggle Calculation History"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">History</span>
        </button>
      </header>

      {/* Main Calculator Center Body */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-5 flex flex-col">
          
          {/* LCD Display */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-right flex flex-col justify-end min-h-[96px] shadow-inner">
            <div className="text-xs text-slate-400 font-mono h-5 overflow-hidden">
              {equation || '\u00A0'}
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-900 tracking-tight overflow-x-auto whitespace-nowrap">
              {display}
            </div>
          </div>

          {/* Calculator Keypad */}
          <div className="grid grid-cols-4 gap-2.5 select-none">
            
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="py-3.5 bg-slate-100 hover:bg-slate-200 text-rose-600 font-bold text-sm rounded-xl transition-colors active:scale-95"
            >
              C
            </button>
            <button
              onClick={handleSqrt}
              className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors active:scale-95"
            >
              √
            </button>
            <button
              onClick={handlePercent}
              className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors active:scale-95"
            >
              %
            </button>
            <button
              onClick={() => handleOperator('÷')}
              className="py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-base rounded-xl transition-colors active:scale-95"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleDigit('7')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('×')}
              className="py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-base rounded-xl transition-colors active:scale-95"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleDigit('4')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('-')}
              className="py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-base rounded-xl transition-colors active:scale-95"
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleDigit('1')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-base rounded-xl transition-colors active:scale-95"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={handleToggleSign}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors shadow-xs active:scale-95"
            >
              ±
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg rounded-xl transition-colors shadow-xs active:scale-95"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg rounded-xl transition-colors shadow-sm active:scale-95"
            >
              =
            </button>
          </div>

          {/* Discreet auxiliary controls: Backspace */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
            <span>Keyboard inputs enabled</span>
            <button
              onClick={handleBackspace}
              title="Backspace"
              className="p-1 hover:text-slate-700 rounded transition-colors flex items-center gap-1 font-mono"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>DEL</span>
            </button>
          </div>

        </div>

        {/* Slide-out history panel */}
        {showHistory && (
          <div className="ml-4 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 hidden md:flex flex-col h-[400px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase">Calculation Log</span>
              <button
                onClick={() => setHistory([])}
                className="text-[11px] text-rose-500 hover:underline"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 text-slate-700">
                    {item}
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-center py-8 text-xs font-sans">
                  No calculations yet.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Discreet footer */}
      <footer className="py-3 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        Standard Precision Computing Engine · Ready
      </footer>

    </div>
  );
};
