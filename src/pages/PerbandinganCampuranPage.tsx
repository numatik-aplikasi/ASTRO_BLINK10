import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const soal = [
  "Tujuh ekor kambing menghasilkan rumput seluas 7 kali ukuran lapangan sepak bola dalam waktu 7 hari. Waktu yang diperlukan oleh 3 ekor kambing untuk menghabiskan rumput seluas 3 kali ukuran lapangan sepak bola adalah … hari",
  "Jika 4 orang tukang kayu dapat membuat 12 kursi dalam waktu 3 hari, berapa hari yang dibutuhkan oleh 6 orang tukang kayu untuk membuat 24 kursi?",
  "Sebuah perusahaan konstruksi mengerdeker 12 pekerja untuk menyelesaikan 2 unit rumah dalam waktu 30 hari. Jika perusahaan tersebut ingin menyelesaikan 3 unit rumah serupa dalam waktu 24 hari, berapa banyak pekerja yang harus mereka kererdeker?",
  "Seorang peternak memiliki 40 ekor sapi yang dapat menghabiskan 60 karung pakan dalam waktu 15 hari. Jika peternak tersebut menjual 10 ekor sapinya (tersisa 30 ekor) dan ia hanya memiliki 45 karung pakern, berapa lama (dalam hari) persediaan pakern tersebut akan habis?",
  "Tiga mesin cetak tipe A dapat mencetak 3.000 buku dalam 5 jam. Empat mesin cetak tipe B dapat mencetak 4.800 buku dalam 6 jam. Jika perusahaan menggunakan 2 mesin tipe A dan 3 mesin tipe B secara bersamaan, berapa jam waktu yang dibutuhkan untuk mencetak 8.000 buku?",
  "Sebuah pabrik kain jika memproduksi pesanannya menggunakan 2 mesin tenun modern (kapasitas besar) akan selesai dalam waktu 12 hari, sedangkan jika dikerjakan menggunakan 4 mesin tenun tradisional (kapasitas kecil) selesai dalam waktu 18 hari. Jika pabrik tersebut mengoperasikan 3 mesin tenun modern dan 3 mesin tenun tradisional secara bersamaan, dalam waktu berapa hari pesanan kain tersebut dapat diselesaikan?",
];

const PerbandinganCampuranPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          Perbandingan Campuran
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 font-body">Selesaikan soal-soal berikut.</p>

        <div className="space-y-4 animate-slide-up">
          {soal.map((teks, i) => (
            <div
              key={i}
              className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-display font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="font-body text-sm text-white/90 leading-relaxed flex-1 whitespace-pre-line">
                  {teks}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi/perbandingan"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Perbandingan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerbandinganCampuranPage;
