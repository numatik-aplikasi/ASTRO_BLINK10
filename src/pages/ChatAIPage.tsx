import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import ChatInterface from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";

const ChatAIPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex flex-col gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />

      {/* Main chat area - fills remaining height */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0 max-w-4xl mx-auto w-full px-4 pb-4 gap-3">
        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10"
          style={{
            background: "rgba(20, 20, 40, 0.7)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 40px rgba(0, 200, 255, 0.08), inset 0 0 40px rgba(0, 0, 0, 0.2)",
          }}
        >
          <ChatInterface embedded={true} className="h-full" />
        </div>

        <button
          onClick={() => navigate("/menu")}
          className="shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body text-center"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default ChatAIPage;
