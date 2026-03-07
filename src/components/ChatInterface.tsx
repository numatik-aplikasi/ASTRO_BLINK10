import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, Sparkles, Loader2, Trash2, ChevronDown } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { sendChatMessage, isApiConfigured, ChatMessage } from "@/lib/chatApi";
import { playPopSound } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  embedded?: boolean;
}

/**
 * ChatInterface - A glassmorphism chat component for math AI assistant
 * Can be used as overlay/modal or embedded in a page
 */
export const ChatInterface = ({
  isOpen = true,
  onClose,
  className = "",
  embedded = false,
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Saya asisten matematika Anda. Ada yang bisa saya bantu tentang matematika SMP? Anda bisa bertanya tentang:\n\n• **Aljabar** - Persamaan, pertidaksamaan, fungsi\n• **Geometri** - Bangun datar, bangun ruang, teorema Pythagoras\n• **Aritmetika** - Bilangan, pecahan, persen\n• **Statistika** - Mean, median, modus\n\nTulis pertanyaan Anda di bawah ini!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    if (isOpen && !embedded) {
      inputRef.current?.focus();
    }
  }, [isOpen, embedded]);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    playPopSound();

    try {
      const response = await sendChatMessage(userMessage.content, messages);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat
  const handleClear = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Obrolan telah dihapus. Ada yang bisa saya bantu lagi?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
    playPopSound();
  };

  // Check API configuration
  if (!isApiConfigured()) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center",
          className
        )}
      >
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 max-w-md">
          <Sparkles className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white font-bold mb-2">API Key Required</h3>
          <p className="text-white/60 text-sm">
            Tambahkan <code className="bg-black/30 px-2 py-1 rounded">VITE_GEMINI_API_KEY</code> di file{" "}
            <code className="bg-black/30 px-2 py-1 rounded">.env.local</code> untuk menggunakan fitur chat AI.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col h-full w-full",
        embedded
          ? "rounded-xl overflow-hidden"
          : "fixed inset-0 z-50",
        className
      )}
      style={{
        background: embedded
          ? "transparent"
          : "rgba(10, 10, 20, 0.85)",
      }}
    >
      {/* Glassmorphism overlay background */}
      {!embedded && (
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 30, 50, 0.9) 0%, rgba(10, 10, 20, 0.95) 100%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 border-b",
            embedded ? "bg-card/80 backdrop-blur" : "bg-white/5 backdrop-blur-lg"
          )}
          style={{ borderColor: "hsl(230 40% 22% / 0.5)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(190 100% 50%), hsl(280 100% 65%))",
                }}
              >
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm">
                Asistent Matematika AI
              </h3>
              <p className="text-white/50 text-xs">Online • Siap membantu</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Hapus obrolan"
            >
              <Trash2 className="w-4 h-4 text-white/60" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{
            background: embedded
              ? "transparent"
              : "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
          }}
        >
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div
                className="max-w-[80%] rounded-2xl px-4 py-3 flex items-center gap-2"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-white/60 text-sm">Mengetik...</span>
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className="p-4 border-t"
          style={{
            borderColor: "hsl(230 40% 22% / 0.5)",
            background: embedded
              ? "rgba(30, 30, 50, 0.5)"
              : "rgba(10, 10, 20, 0.8)",
          }}
        >
          <div
            className="flex items-end gap-2 rounded-xl p-2"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tulis pertanyaan matematika..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm resize-none max-h-32 min-h-[40px] py-2"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200",
                input.trim() && !isLoading
                  ? "text-black"
                  : "text-white/30 cursor-not-allowed"
              )}
              style={{
                background:
                  input.trim() && !isLoading
                    ? "linear-gradient(135deg, hsl(190 100% 50%), hsl(180 100% 45%))"
                    : "rgba(255, 255, 255, 0.1)",
              }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Tips */}
          <p className="text-white/30 text-xs mt-2 text-center">
            Tekan Enter untuk mengirim • Gunakan LaTeX untuk rumus
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Chat message bubble with LaTeX rendering
 */
const ChatMessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "rounded-br-md"
            : "rounded-bl-md"
        )}
        style={{
          background: isUser
            ? "linear-gradient(135deg, hsl(190 100% 50%), hsl(180 100% 45%))"
            : "rgba(255, 255, 255, 0.08)",
          border: isUser
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {isUser ? (
          <p className="text-black text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <MessageContent content={message.content} />
        )}
      </div>
    </div>
  );
};

/**
 * Render message content with LaTeX support
 */
const MessageContent = ({ content }: { content: string }) => {
  // Parse content for LaTeX blocks
  const parseContent = (text: string) => {
    const parts: Array<{ type: "text" | "latex-inline" | "latex-display"; content: string }> = [];

    // Regex for LaTeX: $...$ for inline, $$...$$ for display
    const inlineRegex = /\$([^\$]+)\$/g;
    const displayRegex = /\$\$([^\$]+)\$\$/g;

    let lastIndex = 0;
    let match;

    // Combined regex to find both types
    const combinedRegex = /(\$\$[\s\S]*?\$\$|\$[^\$]+\$)/g;
    let combinedMatch;

    while ((combinedMatch = combinedRegex.exec(text)) !== null) {
      // Add text before the match
      if (combinedMatch.index > lastIndex) {
        const textPart = text.slice(lastIndex, combinedMatch.index);
        if (textPart.trim()) {
          parts.push({ type: "text", content: textPart });
        }
      }

      const matchText = combinedMatch[0];
      // Check if it's display or inline
      if (matchText.startsWith("$$")) {
        parts.push({
          type: "latex-display",
          content: matchText.slice(2, -2).trim(),
        });
      } else {
        parts.push({
          type: "latex-inline",
          content: matchText.slice(1, -1).trim(),
        });
      }

      lastIndex = combinedMatch.index + matchText.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remaining = text.slice(lastIndex);
      if (remaining.trim()) {
        parts.push({ type: "text", content: remaining });
      }
    }

    return parts;
  };

  const parts = parseContent(content);

  return (
    <div className="text-white text-sm space-y-2">
      {parts.map((part, index) => {
        if (part.type === "latex-inline") {
          try {
            return (
              <span key={index} className="inline mx-1">
                <InlineMath math={part.content} errorColor="#ff6b6b" />
              </span>
            );
          } catch {
            return <span key={index}>{part.content}</span>;
          }
        }

        if (part.type === "latex-display") {
          return (
            <div key={index} className="my-2 py-2 bg-black/20 rounded-lg px-2 overflow-x-auto">
              <InlineMath math={part.content} errorColor="#ff6b6b" />
            </div>
          );
        }

        // Regular text - parse markdown-like formatting
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part.content.split("\n").map((line, i) => {
              // Handle bold text
              const lines = line.split(/(\*\*[^*]+\*\*)/g);
              return (
                <span key={i}>
                  {lines.map((segment, j) => {
                    if (segment.startsWith("**") && segment.endsWith("**")) {
                      return (
                        <span key={j} className="font-bold text-primary">
                          {segment.slice(2, -2)}
                        </span>
                      );
                    }
                    return segment;
                  })}
                  {i < part.content.split("\n").length - 1 && <br />}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChatInterface;
