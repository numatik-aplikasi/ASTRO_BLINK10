import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";

// Convert calculator expression to LaTeX format
const convertToLatex = (expr: string): string => {
  if (!expr) return "";
  
  let latex = expr
    // Multiplication - must be before other replacements
    .replace(/×/g, "\\times ")
    // Division - use frac for proper rendering
    .replace(/\/([0-9])/g, "/{$1}")  // Handle simple fractions
    // Square root - multiple patterns
    .replace(/√\(/g, "\\sqrt{")
    .replace(/∛\(/g, "\\sqrt[3]{")
    .replace(/ⁿ√\(/g, "\\sqrt[")
    // sqrt function
    .replace(/sqrt\(/g, "\\sqrt{")
    .replace(/cbrt\(/g, "\\sqrt[3]{")
    // Powers - superscript
    .replace(/\^(\d+)/g, "^{$1}")
    .replace(/\^/g, "^{}")
    // Negative numbers
    .replace(/-\(/g, "-(")
    // Subscript
    .replace(/_(\d+)/g, "_{$1}")
    // Pi
    .replace(/π/g, "\\pi ")
    // Infinity
    .replace(/∞/g, "\\infty ")
    // Degree
    .replace(/°/g, "^\\circ ")
    // Percent
    .replace(/%/g, "\\%")
    // Not equal
    .replace(/≠/g, "\\neq ")
    // Less than or equal
    .replace(/≤/g, "\\leq ")
    // Greater than or equal
    .replace(/≥/g, "\\geq ")
    // Plus minus
    .replace(/±/g, "\\pm ")
    // Arrow
    .replace(/→/g, "\\rightarrow ")
    // Clear incomplete brackets that were added for powers
    .replace(/\{\}$/g, "")
    .replace(/\{\s*\}$/g, "")
    // Clean up
    .replace(/\{\}/g, "")
    .trim();

  return latex;
};

interface LatexDisplayProps {
  expression: string;
  result?: string;
  className?: string;
}

export const LatexDisplay = ({ expression, result, className = "" }: LatexDisplayProps) => {
  const [latexExpr, setLatexExpr] = useState("");
  const [latexResult, setLatexResult] = useState("");
  const [exprError, setExprError] = useState(false);
  const [resultError, setResultError] = useState(false);

  useEffect(() => {
    try {
      const converted = convertToLatex(expression);
      setLatexExpr(converted);
      setExprError(false);
    } catch {
      setExprError(true);
    }
  }, [expression]);

  useEffect(() => {
    if (!result) {
      setLatexResult("");
      return;
    }
    try {
      const converted = convertToLatex(result.replace(/^=\s*/, ""));
      setLatexResult(converted);
      setResultError(false);
    } catch {
      setResultError(true);
    }
  }, [result]);

  return (
    <div className={`flex flex-col items-end justify-end w-full text-black ${className}`}>
      {/* Expression Display */}
      <div className="w-full overflow-x-auto text-right min-h-[1.5em] flex justify-end">
        {!exprError && latexExpr ? (
          <div className="katex-black">
            <InlineMath math={latexExpr} errorColor="#ff6b6b" />
          </div>
        ) : (
          <span className="font-mono text-xl">{expression || "0"}</span>
        )}
      </div>
      
      {/* Result Display */}
      {result && (
        <div className="w-full border-t border-black/10 mt-2 pt-2 text-right flex justify-end">
          {!resultError && latexResult ? (
            <div className="katex-black">
              <span className="font-mono text-3xl font-bold mr-2">=</span>
              <InlineMath math={latexResult} errorColor="#ff6b6b" />
            </div>
          ) : (
            <span className="font-mono text-3xl font-bold">= {result}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Simple inline LaTeX renderer for other uses
export const LatexInline = ({ math }: { math: string }) => {
  const [latex, setLatex] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setLatex(convertToLatex(math));
      setError(false);
    } catch {
      setError(true);
    }
  }, [math]);

  if (error) {
    return <span>{math}</span>;
  }

  return <InlineMath math={latex} errorColor="#ff6b6b" />;
};

// MathEditor - converts user input to renderable LaTeX
export const MathEditor = {
  // Convert display symbols to LaTeX for rendering
  toLatex: (input: string): string => {
    return convertToLatex(input);
  },
  
  // Convert button press to display symbol
  formatButtonInput: (value: string): string => {
    const symbolMap: Record<string, string> = {
      // Operations
      '*': '×',
      '/': '÷',
      // Functions
      'sqrt(': '√(',
      'cbrt(': '∛(',
      'sin(': 'sin(',
      'cos(': 'cos(',
      'tan(': 'tan(',
      'asin(': 'sin⁻¹(',
      'acos(': 'cos⁻¹(',
      'atan(': 'tan⁻¹(',
      'sinh(': 'sinh(',
      'cosh(': 'cosh(',
      'tanh(': 'tanh(',
      'log(': 'log(',
      'ln(': 'ln(',
      'abs(': 'abs(',
      'pi': 'π',
      '^': 'ʸ',
      '^2': '²',
      '^3': '³',
      '^-1': '⁻¹',
    };
    
    // Check for exact matches first
    if (symbolMap[value]) {
      return symbolMap[value];
    }
    
    // Check for partial matches
    for (const [key, val] of Object.entries(symbolMap)) {
      if (value.includes(key)) {
        return value.replace(key, val);
      }
    }
    
    return value;
  },
  
  // Get display version of expression
  toDisplay: (input: string): string => {
    let display = input;
    
    // Replace all LaTeX-style commands with display symbols
    display = display.replace(/sqrt\(/g, '√(');
    display = display.replace(/cbrt\(/g, '∛(');
    display = display.replace(/\^(\d+)/g, (_, n) => {
      const superscripts: Record<string, string> = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
      };
      return n.split('').map(d => superscripts[d] || `^${d}`).join('');
    });
    display = display.replace(/\^/g, 'ˣ');
    display = display.replace(/\^-1/g, '⁻¹');
    display = display.replace(/\^2/g, '²');
    display = display.replace(/\^3/g, '³');
    display = display.replace(/pi/g, 'π');
    display = display.replace(/\*/g, '×');
    display = display.replace(/\//g, '÷');
    
    return display;
  },
  
  // Convert display back to evaluable expression
  toEval: (display: string): string => {
    let evalExpr = display;
    
    // Convert display symbols back to eval-able format
    evalExpr = evalExpr.replace(/×/g, '*');
    evalExpr = evalExpr.replace(/÷/g, '/');
    evalExpr = evalExpr.replace(/√\(/g, 'sqrt(');
    evalExpr = evalExpr.replace(/∛\(/g, 'cbrt(');
    evalExpr = evalExpr.replace(/π/g, 'pi');
    evalExpr = evalExpr.replace(/²/g, '^2');
    evalExpr = evalExpr.replace(/³/g, '^3');
    evalExpr = evalExpr.replace(/⁻¹/g, '^-1');
    
    // Handle superscripts
    const superscriptMap: Record<string, string> = {
      '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
      '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
      'ˣ': '^', 'ʸ': '^'
    };
    for (const [sup, digit] of Object.entries(superscriptMap)) {
      evalExpr = evalExpr.replace(new RegExp(sup, 'g'), digit);
    }
    
    return evalExpr;
  }
};

export default LatexDisplay;