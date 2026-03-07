import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const soal = [
  "Tinggi Gedung A adalah 120 meter dan tinggi Gedung B adalah 150 meter. Tentukan rasio tinggi Gedung B terhadap Gedung A dalam bentuk paling sederhana!",
  "Dalam sebuah keranjang buah terdapat 24 buah apel merah dan 16 buah apel hijau. Berapakah perbandingan antara jumlah apel merah terhadap total keseluruhan apel di dalam keranjang tersebut (sajikan dalam bentuk yang paling sederhana)?",
  "Umur Ayah saat ini adalah 45 tahun, sedangkan umur Budi adalah 15 tahun. Tentukan perbandingan umur Ayah dan Budi pada 5 tahun yang lalu!",
  "Jarak rumah Ali ke sekolah adalah 2,5 km, sedangkan jarak rumah Cici ke sekolah hanya 500 meter. Berapakah perbandingan jarak rumah Ali dan rumah Cici ke sekolah dalam bentuk paling sederhana?",
  "Waktu yang dihabiskan Dika untuk belajar di malam hari adalah 2 jam, sedangkan waktu untuk bermain game adalah 45 menit. Tentukan rasio waktu belajar Dika terhadap waktu bermainnya!",
  "Sebuah botol minum besar berisi 1,5 liter air. Air tersebut dituangkan ke dalam sebuah gelas yang memiliki kapasitas 300 ml. Berapa rasio volume air di botol besar terhadap gelas tersebut?",
  "Sebuah peternakan ayam petelur memiliki lahan seluas 2,5 hektar yang menampung 75.000 ekor ayam. Tentukan rasio kepadatan ayam terhadap luas lahan peternakan tersebut dalam satuan ekor/m². (Catatan: 1 hektar = 10.000 m²)",
  "Perbandingan panjang, lebar, dan tinggi sebuah balok adalah 4 : 3 : 2. Jika volume balok itu adalah 192 cm³, tentukan luas permukaan balok tersebut.",
  "Perbandingan panjang, lebar, dan tinggi sebuah wadah penyimpanan air berbentuk balok adalah 6 : 4 : 3. Jika luas seluruh permukaan wadah tersebut adalah 4.320 cm², berapakah liter volume air maksimal yang dapat ditampung dalam wadah tersebut? (Catatan: 1 liter = 1.000 cm³)",
  "Hasil panen buah mangga, jeruk, dan apel di sebuah perkebunan memiliki perbandingan 4 : 5 : 7. Jika diketahui selisih berat panen buah apel dan buah mangga adalah 450 kg, tentukanlah total keseluruhan berat hasil panen ketiga buah tersebut!",
  "Uang tabungan Siska berbanding uang tabungan Tari adalah 2 : 3. Sedangkan perbandingan uang tabungan Tari dan Uci adalah 4 : 5. Jika jumlah seluruh uang tabungan mereka bertiga jika digabungkan adalah Rp700.000,00, berapakah besar uang tabungan mereka masing-masing?",
  "Dalam sebuah kemitraan bisnis, perbandingan modal investasi antara Pak Rendi dan Pak Surya adalah 3 : 4. Sementara itu, perbandingan modal Pak Surya dan Pak Tono adalah 6 : 5. Jika total modal yang terkumpul dari ketiganya adalah Rp186.000.000,00, berapakah besar modal yang disetorkan oleh Pak Tono?",
  "Perbandingan uang saku mingguan Bima dan Candra adalah 3 : 4. Sementara itu, perbandingan uang saku Candra dan Dika adalah 2 : 5. Jika diketahui selisih uang saku antara Dika dan Bima adalah Rp35.000,00, tentukanlah jumlah uang saku yang dimiliki oleh Bima, Candra, dan Dika masing-masing!",
  "Sebuah taman berbentuk persegi panjang memiliki perbandingan panjang dan lebar 5 : 3. Jika luas taman tersebut adalah 1.350 m², berapakah total biaya yang dibutuhkan untuk memasang lampu hias di sekeliling taman, jika setiap 2 meter dipasang satu lampu dengan harga Rp150.000,00 per lampu?",
  "Perbandingan uang Ali dan Budi adalah 2 : 3, sedangkan perbandingan uang Budi dan Citra adalah 4 : 5. Jika uang Ali Rp. 30.000,00, maka uang Citra adalah",
];

const PerbandinganLatihanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          Perbandingan Umum, Satuan Pembanding dan Rasio
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
                <p className="font-body text-sm text-white/90 leading-relaxed flex-1">
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

export default PerbandinganLatihanPage;
