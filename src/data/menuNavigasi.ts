/**
 * Data navigasi terpisah untuk setiap menu utama.
 * MATERI, QUIZ GAMEZ, dan LATIHAN MANDIRI masing-masing
 * punya daftar topik dan route SENDIRI, sehingga perubahan
 * di satu menu tidak memengaruhi menu lainnya.
 */

// =============================================
// MATERI — daftar topik dan route untuk /materi
// =============================================
export const materiTopics: Record<string, { label: string; route: string }[]> = {
  "KELAS 7": [
    { label: "BILANGAN BULAT", route: "/materi/bilangan-bulat" },
    { label: "BILANGAN RASIONAL", route: "/materi/bilangan-rasional" },
    { label: "ALJABAR", route: "/materi/aljabar-menu" },
    { label: "PERSAMAAN DAN PERTIDAKSAMAAN SATU VARIABEL", route: "/materi/persamaan-menu" },
    { label: "PERBANDINGAN", route: "/materi/perbandingan" },
    { label: "ARITMETIKA SOSIAL", route: "/materi/aritmetika-sosial" },
    { label: "GARIS DAN SUDUT", route: "/materi/garis-dan-sudut" },
    { label: "SEGITIGA DAN SEGIEMPAT", route: "/materi/segitiga-dan-segiempat" },
    { label: "HIMPUNAN", route: "/materi/himpunan" },
  ],
  "KELAS 8": [
    { label: "POLA BILANGAN", route: "/materi/pola-bilangan" },
    { label: "KOORDINAT CARTECIUS", route: "/materi/koordinat-cartesius" },
    { label: "SISTEM PERSAMAAN LINEAR DUA VARIABEL (SPLDV)", route: "/materi/spldv" },
    { label: "RELASI DAN FUNGSI", route: "/materi/relasi-dan-fungsi" },
    { label: "TEOREMA PYTHAGORAS", route: "/materi/teorema-pythagoras" },
    { label: "LINGKARAN", route: "/materi/lingkaran" },
    { label: "PERSAMAAN GARIS LURUS", route: "/materi/persamaan-garis-lurus" },
    { label: "BANGUN RUANG SISI DATAR", route: "/materi/bangun-ruang-sisi-datar" },
  ],
  "KELAS 9": [
    { label: "BILANGAN BERPANGKAT", route: "/materi/bilangan-berpangkat" },
    { label: "KESEBANGUNAN DAN KEKONGRUENAN", route: "/materi/kesebangunan-dan-kekongruen" },
    { label: "TRANSFORMASI GEOMETRI", route: "/materi/transformasi-geometri" },
    { label: "BANGUN RUANG SISI LENGKUNG", route: "/materi/bangun-ruang-sisi-lengkung" },
    { label: "STATISTIKA", route: "/materi/statistika" },
    { label: "PELUANG", route: "/materi/peluang" },
  ],
};

// =============================================
// QUIZ GAMEZ — daftar topik dan route untuk /quiz-gamez
// =============================================
export const quizGamezTopics: Record<string, { label: string; route: string }[]> = {
  "KELAS 7": [
    { label: "BILANGAN BULAT", route: "/materi/bilangan-bulat" },
    { label: "BILANGAN RASIONAL", route: "/materi/bilangan-rasional" },
    { label: "ALJABAR", route: "/materi/aljabar-menu" },
    { label: "PERSAMAAN DAN PERTIDAKSAMAAN SATU VARIABEL", route: "/materi/persamaan-menu" },
    { label: "PERBANDINGAN", route: "/materi/perbandingan" },
    { label: "ARITMETIKA SOSIAL", route: "/materi/aritmetika-sosial" },
    { label: "GARIS DAN SUDUT", route: "/materi/garis-dan-sudut" },
    { label: "SEGITIGA DAN SEGIEMPAT", route: "/materi/segitiga-dan-segiempat" },
    { label: "HIMPUNAN", route: "/materi/himpunan" },
  ],
  "KELAS 8": [
    { label: "POLA BILANGAN", route: "/materi/pola-bilangan" },
    { label: "KOORDINAT CARTECIUS", route: "/materi/koordinat-cartesius" },
    { label: "SISTEM PERSAMAAN LINEAR DUA VARIABEL (SPLDV)", route: "/materi/spldv" },
    { label: "RELASI DAN FUNGSI", route: "/materi/relasi-dan-fungsi" },
    { label: "TEOREMA PYTHAGORAS", route: "/materi/teorema-pythagoras" },
    { label: "LINGKARAN", route: "/materi/lingkaran" },
    { label: "PERSAMAAN GARIS LURUS", route: "/materi/persamaan-garis-lurus" },
    { label: "BANGUN RUANG SISI DATAR", route: "/quiz-gamez/bangun-ruang-sisi-datar" },
  ],
  "KELAS 9": [
    { label: "BILANGAN BERPANGKAT", route: "/materi/bilangan-berpangkat" },
    { label: "KESEBANGUNAN DAN KEKONGRUENAN", route: "/materi/kesebangunan-dan-kekongruen" },
    { label: "TRANSFORMASI GEOMETRI", route: "/materi/transformasi-geometri" },
    { label: "BANGUN RUANG SISI LENGKUNG", route: "/materi/bangun-ruang-sisi-lengkung" },
    { label: "STATISTIKA", route: "/materi/statistika" },
    { label: "PELUANG", route: "/materi/peluang" },
  ],
};

// =============================================
// LATIHAN MANDIRI — daftar topik dan route untuk /tugas-mandiri
// =============================================
export const latihanMandiriTopics: Record<string, { label: string; route: string }[]> = {
  "KELAS 7": [
    { label: "BILANGAN BULAT", route: "/materi/bilangan-bulat" },
    { label: "BILANGAN RASIONAL", route: "/materi/bilangan-rasional" },
    { label: "ALJABAR", route: "/materi/aljabar-menu" },
    { label: "PERSAMAAN DAN PERTIDAKSAMAAN SATU VARIABEL", route: "/materi/persamaan-menu" },
    { label: "PERBANDINGAN", route: "/materi/perbandingan" },
    { label: "ARITMETIKA SOSIAL", route: "/materi/aritmetika-sosial" },
    { label: "GARIS DAN SUDUT", route: "/materi/garis-dan-sudut" },
    { label: "SEGITIGA DAN SEGIEMPAT", route: "/materi/segitiga-dan-segiempat" },
    { label: "HIMPUNAN", route: "/materi/himpunan" },
  ],
  "KELAS 8": [
    { label: "POLA BILANGAN", route: "/materi/pola-bilangan" },
    { label: "KOORDINAT CARTECIUS", route: "/materi/koordinat-cartesius" },
    { label: "SISTEM PERSAMAAN LINEAR DUA VARIABEL (SPLDV)", route: "/materi/spldv" },
    { label: "RELASI DAN FUNGSI", route: "/materi/relasi-dan-fungsi" },
    { label: "TEOREMA PYTHAGORAS", route: "/materi/teorema-pythagoras" },
    { label: "LINGKARAN", route: "/materi/lingkaran" },
    { label: "PERSAMAAN GARIS LURUS", route: "/materi/persamaan-garis-lurus" },
    { label: "BANGUN RUANG SISI DATAR", route: "/materi/bangun-ruang-sisi-datar" },
  ],
  "KELAS 9": [
    { label: "BILANGAN BERPANGKAT", route: "/materi/bilangan-berpangkat" },
    { label: "KESEBANGUNAN DAN KEKONGRUENAN", route: "/materi/kesebangunan-dan-kekongruen" },
    { label: "TRANSFORMASI GEOMETRI", route: "/materi/transformasi-geometri" },
    { label: "BANGUN RUANG SISI LENGKUNG", route: "/materi/bangun-ruang-sisi-lengkung" },
    { label: "STATISTIKA", route: "/materi/statistika" },
    { label: "PELUANG", route: "/materi/peluang" },
  ],
};

// =============================================
// LATIHAN — daftar topik dan route untuk /latihan
// =============================================
export const latihanTopics: Record<string, { label: string; route: string }[]> = {
  "KELAS 7": [
    { label: "BILANGAN BULAT", route: "/materi/bilangan-bulat" },
    { label: "BILANGAN RASIONAL", route: "/materi/bilangan-rasional" },
    { label: "ALJABAR", route: "/materi/aljabar-menu" },
    { label: "PERSAMAAN DAN PERTIDAKSAMAAN SATU VARIABEL", route: "/materi/persamaan-menu" },
    { label: "PERBANDINGAN", route: "/materi/perbandingan" },
    { label: "ARITMETIKA SOSIAL", route: "/materi/aritmetika-sosial" },
    { label: "GARIS DAN SUDUT", route: "/materi/garis-dan-sudut" },
    { label: "SEGITIGA DAN SEGIEMPAT", route: "/materi/segitiga-dan-segiempat" },
    { label: "HIMPUNAN", route: "/materi/himpunan" },
  ],
  "KELAS 8": [
    { label: "POLA BILANGAN", route: "/materi/pola-bilangan" },
    { label: "KOORDINAT CARTECIUS", route: "/materi/koordinat-cartesius" },
    { label: "SISTEM PERSAMAAN LINEAR DUA VARIABEL (SPLDV)", route: "/materi/spldv" },
    { label: "RELASI DAN FUNGSI", route: "/materi/relasi-dan-fungsi" },
    { label: "TEOREMA PYTHAGORAS", route: "/materi/teorema-pythagoras" },
    { label: "LINGKARAN", route: "/materi/lingkaran" },
    { label: "PERSAMAAN GARIS LURUS", route: "/materi/persamaan-garis-lurus" },
    { label: "BANGUN RUANG SISI DATAR", route: "/materi/bangun-ruang-sisi-datar" },
  ],
  "KELAS 9": [
    { label: "BILANGAN BERPANGKAT", route: "/materi/bilangan-berpangkat" },
    { label: "KESEBANGUNAN DAN KEKONGRUENAN", route: "/materi/kesebangunan-dan-kekongruen" },
    { label: "TRANSFORMASI GEOMETRI", route: "/materi/transformasi-geometri" },
    { label: "BANGUN RUANG SISI LENGKUNG", route: "/materi/bangun-ruang-sisi-lengkung" },
    { label: "STATISTIKA", route: "/materi/statistika" },
    { label: "PELUANG", route: "/materi/peluang" },
  ],
};
