# Health E-Commerce: React Catalog (Completed)

Frontend aplikasi Health E-Commerce yang dibuat menggunakan React 18, Vite, dan TailwindCSS. Project ini telah menyelesaikan seluruh instruksi TODO pada starter project dan terintegrasi dengan backend API.

### Technical Stack

- UI Framework: React 18

- Build Tool: Vite

- Styling: TailwindCSS

- HTTP Client: Axios

- Backend Target: Node.js / Express API (http://localhost:3000/api)

### Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx      # Menampilkan kartu produk & event handler
│   ├── CategoryFilter.jsx   # Tombol filter kategori produk
│   ├── SearchBar.jsx        # Input pencarian produk berbasis query
│   ├── LoadingSpinner.jsx   # Indicator status memuat data
│   ├── ErrorMessage.jsx     # Tampilan pesan kesalahan
│   └── Header.jsx           # Header & navigasi utama
├── services/
│   └── api.js              # Axios instance & fungsi pemanggilan API
├── App.jsx                  # Integrasi state, filter, pencarian, & fetch data
├── main.jsx                 # Entry point React
└── index.css                # Konfigurasi TailwindCSS
```

### Finished TODO Implementation

TODO pada starter project telah selesai diimplementasikan:

- [x] services/api.js: Inisialisasi Axios client dengan baseURL: 'http://localhost:3000/api'.

- [x] components/ProductCard.jsx: Pembuatan komponen kartu produk modular yang menerima props produk (gambar, nama, harga, deskripsi, tag kategori) beserta efek hover.

- [x] components/CategoryFilter.jsx: Komponen filter kategori interaktif dengan penanda status aktif (active state styling).

- [x] components/SearchBar.jsx: Komponen form pencarian real-time / on-submit untuk menyaring data produk.

- [x] App.jsx: Penggabungan seluruh komponen, manajemen state (products, loading, error, selectedCategory, searchQuery), dan side-effect useEffect untuk pengambilan data otomatis.