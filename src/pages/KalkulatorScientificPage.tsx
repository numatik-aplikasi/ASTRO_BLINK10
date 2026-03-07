import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, History, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, RotateCcw, Trash2, Camera, Settings, Grid, MoreHorizontal, Terminal } from "lucide-react";
import { create, all } from "mathjs";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import MathDisplayEditor from "@/components/MathDisplayEditor";
import { MathEditor } from "@/components/LatexDisplay";
import { playPopSound } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

const math = create(all);

type AngleMode = "DEG" | "RAD";

const KalkulatorScientificPage = () => {
  const navigate = useNavigate();
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [history, setHistory] = useState<{ exp: string; res: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastResult, setLastResult] = useState("0");

  // Handle input with visual symbol conversion
  const handleInput = useCallback((val: string) => {
    playPopSound();
    
    // Convert to display symbol (e.g., sqrt( -> √(), ^2 -> ²)
    const displayVal = MathEditor.formatButtonInput(val);
    
    // Auto-clear error or previous result if starting fresh with a number
    if (result === "Error" || (result && !isNaN(Number(val)) && !expression)) {
      setResult("");
      setExpression(displayVal);
    } else {
      setExpression((prev) => prev + displayVal);
    }
    
    setIsShift(false);
    setIsAlpha(false);
  }, [result]);

  const clear = () => {
    playPopSound();
    setExpression("");
    setResult("");
    setIsShift(false);
    setIsAlpha(false);
  };

  const backspace = () => {
    playPopSound();
    setExpression((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    playPopSound();
    if (!expression) return;
    try {
      // Create a scope for trig functions to respect angleMode
      const scope = {
        sin: (x: number) => angleMode === "DEG" ? math.sin(math.unit(x, 'deg')) : math.sin(x),
        cos: (x: number) => angleMode === "DEG" ? math.cos(math.unit(x, 'deg')) : math.cos(x),
        tan: (x: number) => angleMode === "DEG" ? math.tan(math.unit(x, 'deg')) : math.tan(x),
        asin: (x: number) => angleMode === "DEG" ? math.asin(x).toNumber('deg') : math.asin(x),
        acos: (x: number) => angleMode === "DEG" ? math.acos(x).toNumber('deg') : math.acos(x),
        atan: (x: number) => angleMode === "DEG" ? math.atan(x).toNumber('deg') : math.atan(x),
        sinh: (x: number) => math.sinh(x),
        cosh: (x: number) => math.cosh(x),
        tanh: (x: number) => math.tanh(x),
        asinh: (x: number) => math.asinh(x),
        acosh: (x: number) => math.acosh(x),
        atanh: (x: number) => math.atanh(x),
        log: (x: number) => math.log10(x),
        ln: (x: number) => math.log(x),
        pi: math.pi,
        e: math.e,
        abs: (x: number) => math.abs(x),
        sqrt: (x: number) => math.sqrt(x),
        cbrt: (x: number) => math.cbrt(x),
        fact: (x: number) => math.factorial(x),
        Ans: lastResult
      };

      let processedExpr = MathEditor.toEval(expression)
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "pi")
        .replace(/√\(/g, "sqrt(")
        .replace(/∛\(/g, "cbrt(")
        .replace(/!/g, "fact(") // Simplified factorial handling
        .replace(/log\(/g, "log(")
        .replace(/ln\(/g, "ln(");

      // Simple balancing of parentheses
      const openParens = (processedExpr.match(/\(/g) || []).length;
      const closeParens = (processedExpr.match(/\)/g) || []).length;
      if (openParens > closeParens) {
        processedExpr += ")".repeat(openParens - closeParens);
      }
      
      const res = math.evaluate(processedExpr, scope);
      const formattedRes = typeof res === 'number' ? 
        parseFloat(res.toPrecision(10)).toString() : 
        res.toString();
      
      setResult(formattedRes);
      setLastResult(formattedRes);
      setHistory((prev) => [{ exp: expression, res: formattedRes }, ...prev].slice(0, 10));
      setExpression(""); // Clear expression after successful calculation like a real calculator
    } catch (error) {
      setResult("Error");
    }
  };

  const Button = ({ 
    label, 
    subLabel, 
    onClick, 
    className, 
    variant = "default",
    shiftLabel,
    alphaLabel
  }: { 
    label: React.ReactNode; 
    subLabel?: string; 
    onClick: () => void; 
    className?: string;
    variant?: "default" | "scientific" | "numeric" | "special" | "action" | "shift" | "alpha" | "equal";
    shiftLabel?: string;
    alphaLabel?: string;
  }) => {
    const variants = {
      default: "bg-[#2A2D32] text-white/90 border-white/5",
      scientific: "bg-[#1E2124] text-white/80 border-white/5 text-[10px] md:text-xs font-medium",
      numeric: "bg-[#33373D] text-white font-semibold text-lg md:text-xl border-white/5",
      special: "bg-[#E67E22] text-white border-none", // AC, DEL
      action: "bg-[#2A2D32] text-white/90 border-white/5",
      shift: cn("text-black border-none font-bold", isShift ? "bg-[#F1C40F]" : "bg-[#F1C40F]/80"),
      alpha: cn("text-white border-none font-bold", isAlpha ? "bg-[#9B59B6]" : "bg-[#9B59B6]/80"),
      equal: "bg-[#4A4E54] text-white font-bold text-xl border-none shadow-inner",
    };

    return (
      <button
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border py-2 md:py-3 transition-all active:scale-95 active:opacity-80 shadow-md",
          variants[variant],
          className
        )}
      >
        {shiftLabel && (
          <span className="absolute -top-3 text-[8px] md:text-[9px] font-bold uppercase tracking-tighter text-[#F1C40F]">
            {shiftLabel}
          </span>
        )}
        {alphaLabel && (
          <span className="absolute -top-4 text-[8px] md:text-[9px] font-bold uppercase tracking-tighter text-[#9B59B6]">
            {alphaLabel}
          </span>
        )}
        <span className="leading-tight">{label}</span>
      </button>
    );
  };

  // Helper for shifted functions
  const handleShiftedInput = (normal: string, shifted: string, alpha?: string) => {
    if (isShift) {
      handleInput(shifted);
    } else if (isAlpha && alpha) {
      handleInput(alpha);
    } else {
      handleInput(normal);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden font-sans">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 w-full max-w-[400px] h-full flex flex-col p-4 md:p-6 gap-4">
        {/* Header Indicators */}
        <div className="flex justify-between items-center text-[10px] font-mono text-white/40 px-2">
          <div className="flex gap-2">
            <span className={cn(angleMode === "DEG" ? "text-primary" : "")}>DEG</span>
            <span className="text-white/20">MATH</span>
            <span className="text-white/20">FRAC</span>
          </div>
          <div className="flex gap-2 items-center">
            {isShift && <span className="text-[#F1C40F] font-bold">SHIFT</span>}
            {isAlpha && <span className="text-[#9B59B6] font-bold">ALPHA</span>}
            <Settings className="w-3 h-3 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Display Area */}
        <div className="bg-[#B4C6B8] rounded-xl p-4 shadow-inner border-4 border-[#2A2D32] min-h-[160px] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start text-black/60 font-mono text-sm">
            <MoreHorizontal className="w-4 h-4" />
            <div className="flex flex-col items-end">
              <span className="text-xs">NORM1</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center h-full overflow-x-auto">
            <MathDisplayEditor 
              value={expression}
              onChange={setExpression}
              onEnter={calculate}
              result={result}
              className="w-full"
            />
          </div>
        </div>

        {/* Main Keypad */}
        <div className="flex flex-col gap-3">
          {/* Row 1: Modifier Keys */}
          <div className="grid grid-cols-6 gap-2">
            <Button label="SHIFT" onClick={() => setIsShift(!isShift)} variant="shift" className="text-[10px]" />
            <Button label="ALPHA" onClick={() => setIsAlpha(!isAlpha)} variant="alpha" className="text-[10px]" />
            <div className="col-span-2 grid grid-cols-2 gap-1 bg-[#1E2124] rounded-lg p-1">
              <button onClick={() => {}} className="flex items-center justify-center text-white/40 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => {}} className="flex items-center justify-center text-white/40 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <Button label="MODE" onClick={() => {}} variant="scientific" />
            <Button label="ON" onClick={clear} variant="scientific" className="text-red-400" />
          </div>

          {/* Row 2: Scientific Funcs 1 */}
          <div className="grid grid-cols-6 gap-2">
            <Button label="abs" shiftLabel="CALC" onClick={() => handleShiftedInput("abs(", "CALC")} variant="scientific" />
            <Button label="∫dx" shiftLabel="d/dx" onClick={() => handleShiftedInput("integral(", "derivative(")} variant="scientific" />
            <Button label={<ChevronUp className="w-4 h-4" />} onClick={() => {}} variant="scientific" className="bg-[#1E2124]" />
            <Button label={<ChevronDown className="w-4 h-4" />} onClick={() => {}} variant="scientific" className="bg-[#1E2124]" />
            <Button label="x⁻¹" shiftLabel="x!" onClick={() => handleShiftedInput("^-1", "!")} variant="scientific" />
            <Button label="log" shiftLabel="logₐb" onClick={() => handleShiftedInput("log(", "log(")} variant="scientific" />
          </div>

          {/* Row 3: Scientific Funcs 2 */}
          <div className="grid grid-cols-6 gap-2">
            <Button label="x/y" shiftLabel="y/x" onClick={() => handleShiftedInput("/", "/")} variant="scientific" />
            <Button label="√" shiftLabel="∛" onClick={() => handleShiftedInput("sqrt(", "cbrt(")} variant="scientific" />
            <Button label="x²" shiftLabel="x³" onClick={() => handleShiftedInput("^2", "^3")} variant="scientific" />
            <Button label="xʸ" shiftLabel="ⁿ√" onClick={() => handleShiftedInput("^", "^(1/")} variant="scientific" />
            <Button label="log" shiftLabel="10ˣ" onClick={() => handleShiftedInput("log(", "10^")} variant="scientific" />
            <Button label="ln" shiftLabel="eˣ" onClick={() => handleShiftedInput("ln(", "e^")} variant="scientific" />
          </div>

          {/* Row 4: Scientific Funcs 3 */}
          <div className="grid grid-cols-6 gap-2">
            <Button label="(-)" shiftLabel="sto" onClick={() => handleInput("-")} variant="scientific" />
            <Button label="°'\" shiftLabel="clrv" onClick={() => handleInput("")} variant="scientific" />
            <Button label="hyp" onClick={() => handleInput("sinh(")} variant="scientific" />
            <Button label="sin" shiftLabel="sin⁻¹" onClick={() => handleShiftedInput("sin(", "asin(")} variant="scientific" />
            <Button label="cos" shiftLabel="cos⁻¹" onClick={() => handleShiftedInput("cos(", "acos(")} variant="scientific" />
            <Button label="tan" shiftLabel="tan⁻¹" onClick={() => handleShiftedInput("tan(", "atan(")} variant="scientific" />
          </div>

          {/* Numeric Pad Section */}
          <div className="grid grid-cols-5 gap-3 mt-2">
            {/* Left 3 columns: Numbers */}
            <div className="col-span-3 grid grid-cols-3 gap-2">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                <Button key={num} label={num.toString()} onClick={() => handleInput(num.toString())} variant="numeric" />
              ))}
              <Button label="0" onClick={() => handleInput("0")} variant="numeric" />
              <Button label="." onClick={() => handleInput(".")} variant="numeric" />
              <Button label="EXP" onClick={() => handleInput("e")} variant="numeric" className="text-sm" />
            </div>

            {/* Right 2 columns: Operators & Actions */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <Button label="DEL" onClick={backspace} variant="special" className="bg-[#D35400]" />
              <Button label="AC" onClick={clear} variant="special" className="bg-[#D35400]" />
              <Button label="×" onClick={() => handleInput("×")} variant="action" className="text-xl" />
              <Button label="÷" onClick={() => handleInput("÷")} variant="action" className="text-xl" />
              <Button label="+" onClick={() => handleInput("+")} variant="action" className="text-xl" />
              <Button label="-" onClick={() => handleInput("-")} variant="action" className="text-xl" />
              <Button label="Ans" onClick={() => handleInput("Ans")} variant="action" className="text-sm" />
              <Button label="=" onClick={calculate} variant="equal" className="bg-[#5D6D7E]" />
            </div>
          </div>
        </div>

        {/* History Toggle */}
        <div className="flex justify-center mt-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-white/40 hover:text-primary text-xs transition-colors"
          >
            <History className="w-4 h-4" />
            {showHistory ? "Sembunyikan Riwayat" : "Lihat Riwayat"}
          </button>
        </div>

        {showHistory && (
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 max-h-[150px] overflow-y-auto">
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
                    <span className="text-white/60 truncate max-w-[150px]">{item.exp}</span>
                    <span className="text-primary font-mono font-bold">= {item.res}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-xs text-center">Belum ada riwayat</p>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/menu")}
          className="mt-2 text-white/40 hover:text-white text-xs transition-colors text-center"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default KalkulatorScientificPage;
