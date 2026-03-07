import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Calculator } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import LatexDisplay from "@/components/LatexDisplay";

const konversiCategories = [
  {
    category: "PANJANG",
    units: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
    base: "m"
  },
  {
    category: "BERAT",
    units: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
    base: "g"
  },
  {
    category: "LUAS",
    units: ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"],
    base: "m²"
  },
  {
    category: "VOLUME",
    units: ["kl", "hl", "dal", "l", "dl", "cl", "ml"],
    base: "l"
  },
  {
    category: "WAKTU",
    units: ["abad", "dekade", "tahun", "bulan", "minggu", "hari", "jam", "menit", "detik"],
    base: "detik"
  },
  {
    category: "JUMLAH",
    units: ["lusin", "gross", "kodi", "pcs"],
    base: "pcs"
  },
];

const KonversiSatuanPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || !fromUnit || !toUnit) {
      setResult("");
      return;
    }

    const category = konversiCategories[selectedCategory];
    const fromIdx = category.units.indexOf(fromUnit);
    const toIdx = category.units.indexOf(toUnit);
    
    const formatNumber = (num: number) => {
      return parseFloat(num.toFixed(8)).toString();
    };

    // Hitung konversi berdasarkan posisi
    // Setiap turun 1 level = bagi 10, naik 1 level = kali 10
    // Untuk luas = bagi/kali 100
    let multiplier = 1;
    
    // Untuk konversi kompleks seperti waktu, gunakan tabel khusus
    if (category.category === "WAKTU") {
      const timeValues: { [key: string]: number } = {
        abad: 31536000000,
        dekade: 3153600000,
        tahun: 315360000,
        bulan: 259200000,
        minggu: 604800000,
        hari: 86400000,
        jam: 3600000,
        menit: 60000,
        detik: 1000
      };
      const baseValue = val * timeValues[fromUnit];
      setResult(formatNumber(baseValue / timeValues[toUnit]));
      return;
    }

    // Untuk jumlah
    if (category.category === "JUMLAH") {
      const countValues: { [key: string]: number } = {
        gross: 144,
        lusin: 12,
        kodi: 20,
        pcs: 1
      };
      const baseValue = val * countValues[fromUnit];
      setResult(formatNumber(baseValue / countValues[toUnit]));
      return;
    }

    // Untuk satuan panjang, berat, luas, volume
    const diff = fromIdx - toIdx;
    if (category.category === "LUAS") {
      multiplier = Math.pow(100, diff);
    } else {
      multiplier = Math.pow(10, diff);
    }

    setResult(formatNumber(val * multiplier));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/menu" nextPath="/chat-ai" />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2 text-center">
          KONVERSI SATUAN
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 font-body">
          Konversi berbagai satuan matematika
        </p>

        {/* Category Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {konversiCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => { playPopSound(); setSelectedCategory(idx); setFromUnit(""); setToUnit(""); setResult(""); }}
              className={`font-display text-xs px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                selectedCategory === idx
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card/80 text-white/70 border-border hover:border-accent/40"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Converter */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="font-body text-xs text-muted-foreground mb-1 block">Dari</label>
              <select
                value={fromUnit}
                onChange={(e) => { playPopSound(); setFromUnit(e.target.value); }}
                className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-white font-body text-sm"
              >
                <option value="">Pilih satuan</option>
                {konversiCategories[selectedCategory].units.map((unit, i) => (
                  <option key={i} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 w-full">
              <label className="font-body text-xs text-muted-foreground mb-1 block">Ke</label>
              <select
                value={toUnit}
                onChange={(e) => { playPopSound(); setToUnit(e.target.value); }}
                className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-white font-body text-sm"
              >
                <option value="">Pilih satuan</option>
                {konversiCategories[selectedCategory].units.map((unit, i) => (
                  <option key={i} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="font-body text-xs text-muted-foreground mb-1 block">Nilai</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Masukkan nilai"
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-white font-body text-sm"
            />
          </div>

          <button
            onClick={() => { playPopSound(); convert(); }}
            className="w-full mt-4 font-display text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            KONVERSI
          </button>

          {result && (
            <div className="mt-4 bg-muted/50 rounded-lg p-4 text-center">
              <p className="font-body text-sm text-muted-foreground">Hasil:</p>
              <div className="font-display text-2xl text-accent text-glow-accent flex justify-center items-center gap-2">
                <LatexDisplay expression={`${result} ${toUnit}`} className="text-xl" />
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
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

export default KonversiSatuanPage;
