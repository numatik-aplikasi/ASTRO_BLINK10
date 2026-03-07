import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import LatexDisplay from "@/components/LatexDisplay";

const rumusData = [
  {
    category: "BILANGAN DAN OPERASI",
    items: [
      { title: "Penjumlahan", rumus: "a + b = c" },
      { title: "Pengurangan", rumus: "a - b = c" },
      { title: "Perkalian", rumus: "a × b = c" },
      { title: "Pembagian", rumus: "a ÷ b = c" },
      { title: "Pangkat", rumus: "aⁿ = a × a × ... × a (n kali)" },
      { title: "Akar", rumus: "√a = b, jika b² = a" },
    ]
  },
  {
    category: "ALJABAR",
    items: [
      { title: "Persamaan Linear", rumus: "ax + b = c" },
      { title: "Pertidaksamaan", rumus: "ax + b > c" },
      { title: "Rumus ABC", rumus: "x = (-b ± √(b²-4ac)) / 2a" },
      { title: "Fungsi Linear", rumus: "f(x) = mx + c" },
      { title: "Barisan Aritmetika", rumus: "Un = a + (n-1)d" },
      { title: "Barisan Geometri", rumus: "Un = arⁿ⁻¹" },
    ]
  },
  {
    category: "GEOMETRI",
    items: [
      { title: "Luas Persegi", rumus: "L = s²" },
      { title: "Luas Persegi Panjang", rumus: "L = p × l" },
      { title: "Luas Segitiga", rumus: "L = ½ × a × t" },
      { title: "Luas Lingkaran", rumus: "L = πr²" },
      { title: "Keliling Lingkaran", rumus: "K = 2πr" },
      { title: "Teorema Pythagoras", rumus: "a² + b² = c²" },
    ]
  },
  {
    category: "BANGUN RUANG",
    items: [
      { title: "Volume Kubus", rumus: "V = s³" },
      { title: "Volume Balok", rumus: "V = p × l × t" },
      { title: "Volume Tabung", rumus: "V = πr²t" },
      { title: "Volume Kerucut", rumus: "V = ⅓πr²t" },
      { title: "Volume Bola", rumus: "V = ⅔πr³" },
      { title: "Luas Permukaan Kubus", rumus: "L = 6s²" },
    ]
  },
  {
    category: "STATISTIKA",
    items: [
      { title: "Rata-rata (Mean)", rumus: "x̄ = Σx / n" },
      { title: "Median", rumus: "Nilai tengah data" },
      { title: "Modus", rumus: "Nilai paling sering muncul" },
      { title: "Jangkauan", rumus: "R = Nilai max - Nilai min" },
      { title: "Simpangan Baku", rumus: "s = √(Σ(xi-x̄)²/(n-1))" },
    ]
  },
  {
    category: "TRIGONOMETRI",
    items: [
      { title: "Sinus", rumus: "sin θ = sisi depan / sisi miring" },
      { title: "Cosinus", rumus: "cos θ = sisi samping / sisi miring" },
      { title: "Tangen", rumus: "tan θ = sisi depan / sisi samping" },
      { title: "Identitas Pythagoras", rumus: "sin²θ + cos²θ = 1" },
    ]
  },
];

const KumpulanRumusPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/menu" nextPath="/konversi-satuan" />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2 text-center">
          KUMPULAN RUMUS MATEMATIKA
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 font-body">
          Kumpulan lengkap rumus matematika SMP
        </p>

        <div className="space-y-3 animate-slide-up">
          {rumusData.map((section, idx) => (
            <div key={idx} className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
              >
                <span className="font-display text-sm text-accent font-bold">{section.category}</span>
                {expandedSections.includes(idx) ? (
                  <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                )}
              </button>
              {expandedSections.includes(idx) && (
                <div className="px-5 pb-4 grid gap-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg px-4 py-3 flex justify-between items-center">
                      <span className="font-body text-sm text-white">{item.title}</span>
                      <div className="font-display text-sm text-accent min-w-[80px] text-right">
                        <LatexDisplay expression={item.rumus} className="text-xs" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default KumpulanRumusPage;
