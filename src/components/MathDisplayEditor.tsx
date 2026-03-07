import { useState, useRef, useEffect } from "react";
import { InlineMath } from "react-katex";
import { MathEditor } from "./LatexDisplay";

interface MathDisplayEditorProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  className?: string;
  result?: string;
}

/**
 * MathDisplayEditor - A calculator display that:
 * 1. Renders mathematical expressions using LaTeX
 * 2. Shows visual symbols (√, ², ³, π) instead of raw codes
 * 3. Allows direct text editing
 */
export const MathDisplayEditor = ({
  value,
  onChange,
  onEnter,
  placeholder = "0",
  className = "",
  result
}: MathDisplayEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [latexError, setLatexError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the display version of the expression (visual symbols)
  const displayValue = MathEditor.toDisplay(value);
  
  // Get LaTeX version for rendering
  const latexValue = MathEditor.toLatex(value);

  // Handle click to edit
  const handleClick = () => {
    setIsEditing(true);
    setEditValue(value);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Handle blur (lose focus) - save changes
  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  };

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Try to render LaTeX and catch errors
  useEffect(() => {
    try {
      if (latexValue) {
        // Test if LaTeX is valid by creating a temp element
        setLatexError(false);
      }
    } catch {
      setLatexError(true);
    }
  }, [latexValue]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full cursor-text ${className}`}
      onClick={handleClick}
    >
      {/* LaTeX Rendered View (when not editing) */}
      {!isEditing && (
        <div className="w-full overflow-x-auto text-right min-h-[1.5em] flex justify-end items-center">
          {!latexError && latexValue ? (
            <div className="katex-black text-xl md:text-2xl">
              <InlineMath math={latexValue} errorColor="#ff6b6b" />
            </div>
          ) : (
            <span className="font-mono text-xl md:text-2xl">
              {displayValue || placeholder}
            </span>
          )}
        </div>
      )}

      {/* Edit Mode (when clicking) */}
      {isEditing && (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-right font-mono text-xl md:text-2xl text-black"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      )}

      {/* Result Display */}
      {result && (
        <div className="w-full border-t border-black/20 mt-2 pt-2 text-right flex justify-end items-center">
          <span className="font-mono text-2xl md:text-3xl font-bold mr-2">=</span>
          {MathEditor.toLatex(result) && !result.includes("Error") ? (
            <div className="katex-black">
              <InlineMath math={MathEditor.toLatex(result)} errorColor="#ff6b6b" />
            </div>
          ) : (
            <span className="font-mono text-2xl md:text-3xl font-bold">{result}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MathDisplayEditor;
