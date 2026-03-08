import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const soal = [
  "Arti dari skala peta 1 : 500.000 adalah...\nA. 1 cm pada peta mewakili 500.000 cm jarak sebenarnya.\nB. 1 cm pada peta mewakili 500.000 km jarak sebenarnya.\nC. 1 km pada peta mewakili 500.000 cm jarak sebenarnya.\nD. 500.000 cm pada peta mewakili 1 cm jarak sebenarnya.",
  "Peta wilayah X memiliki skala 1 : 50.000. Peta wilayah Y memiliki skala 1 : 250.000. Pernyataan yang benar mengenai kedua peta tersebut adalah...\nA. Peta X menunjukkan wilayah yang lebih luas dengan detail yang lebih sedikit daripada peta Y.\nB. Satu sentimeter pada peta X mewakili jarak yang lebih jauh di lapangan dibandingkan peta Y.\nC. Kedua peta memiliki tingkat kedetailan yang sama.\nD. Peta X lebih detail daripada peta Y untuk ukuran kertas yang sama.",
  "Jarak dua kota pada peta adalah 20 cm. Jika skala peta 1 : 600.000, jarak dua kota sebenarnya adalah...\nA. 1.200 km\nB. 120 km\nC. 30 km\nD. 12 km",
  "Jarak antara kota A dan kota B sebenarnya adalah 120 km. Jika jarak kedua kota tersebut pada peta adalah 6 cm, berapakah skala peta tersebut?\nA. 1 : 2.000.000\nB. 1 : 200.000\nC. 1 : 20.000.000\nD. 1 : 720.000",
  "Sebuah kebun pada denah berukuran 12 cm x 15 cm. Jika ukuran kebun yang sebenarnya 50 m x 40 m, maka skala yang digunakan adalah....\nA. 3 : 100\nB. 3 : 800\nC. 3 : 1.250\nD. 3 : 1.000",
  "Jarak sebenarnya antara dua gedung adalah 4,5 km. Jika gedung tersebut digambar pada denah dengan skala 1 : 15.000, maka jarak pada denah adalah...\nA. 3 cm\nB. 30 cm\nC. 300 cm\nD. 0,3 cm",
  "Perhatikan denah sebuah rumah berikut !\n\nJika skala denah rumah adalah 1 : 200, maka luas bangunan rumah sebenarnya adalah ...\nA. 46 m2\nB. 92 m2\nC. 184 m2\nD. 368 m2",
  "Denah sebuah gedung berskala 1 : 300. Jika luas denah 125 cm2, maka luas gedung sebenarnya adalah ...\nA. 375 m2\nB. 1.125 m2\nC. 3.750 m2\nD. 11.250 m2",
  "Jarak dua kota pada peta berskala 1 : 1.200.000 adalah 5 cm. Andi berangkat dari kota A ke kota B mengendarai motor dengan kecepatan rata-rata 40 km/jam. Jika ia berangkat pukul 07.15 dan beristirahat selama 30 menit di perjalanan, pada pukul berapa ia akan tiba di kota B?\nA. 09.45\nB. 08.45\nC. 09.15\nD. 10.15",
  "Sebuah perusahaan properti membuat maket (model miniatur 3D) apartemen dengan skala 1 : 100. Jika kolam renang pada maket tersebut bervolume 2 liter air saat penuh, berapakah kapasitas air kolam renang tersebut di dunia nyata?\nA. 2.000 liter\nB. 20.000 liter\nC. 200 liter\nD. 2.000.000 liter",
];

const PerbandinganSkalaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          Perbandingan Skala
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

export default PerbandinganSkalaPage;
