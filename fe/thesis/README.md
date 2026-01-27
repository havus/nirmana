# Nirmana Thesis Demo - 2D to 3D Conversion

## Deskripsi

Folder ini berisi demonstrasi konversi data struktur 2D ke visualisasi 3D menggunakan Three.js untuk keperluan penelitian skripsi. File-file dalam folder ini adalah standalone dan tidak memerlukan npm atau build tools.

## File Structure

```
thesis/
├── index.html      # File HTML utama dengan struktur halaman
├── styles.css      # Styling untuk tampilan halaman
├── script.js       # Logic konversi 2D ke 3D menggunakan Three.js
└── README.md       # Dokumentasi ini
```

## Cara Menggunakan

### 1. Membuka Demonstrasi

Karena menggunakan ES6 modules, Anda perlu menjalankan file melalui web server. Ada beberapa cara:

#### Opsi A: Menggunakan Python (Recommended)
```bash
# Dari root project, masuk ke folder thesis
cd thesis

# Python 3
python -m http.server 8000

# Atau Python 2
python -m SimpleHTTPServer 8000
```

Kemudian buka browser dan akses: `http://localhost:8000`

#### Opsi B: Menggunakan Node.js
```bash
# Install http-server globally (sekali saja)
npm install -g http-server

# Jalankan dari folder thesis
cd thesis
http-server -p 8000
```

#### Opsi C: Menggunakan VS Code Live Server Extension
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### 2. Menggunakan Aplikasi

1. **Panel Kiri - Data Structure 2D**: Berisi data JSON yang dapat diedit
   - Format data sesuai dengan struktur project Nirmana
   - Edit langsung di textarea untuk mengubah data
   
2. **Panel Kanan - Visualisasi 3D**: Menampilkan hasil konversi
   - Kamera awal fokus pada koordinat (1,1)
   - Gunakan mouse untuk interaksi:
     - **Klik kiri + drag**: Rotasi kamera
     - **Scroll**: Zoom in/out (7x faster speed)
     - **Klik kanan + drag**: Pan
   
3. **Tombol Update**: Klik untuk memperbarui visualisasi 3D berdasarkan data JSON
   - Shortcut: `Ctrl/Cmd + Enter` saat fokus di textarea

## Struktur Data 2D

Format data JSON yang digunakan:

```javascript
{
  "version": "1.0.0",
  "gridWidth": 20,          // Jumlah kolom grid
  "gridHeight": 20,         // Jumlah baris grid
  "marginBetweenNails": 10, // Jarak antar paku (mm)
  "paddingBoard": 10,       // Padding board (mm)
  "nails": {
    "x,y": {                // Key format: "kolom,baris"
      "height": 30,         // Tinggi paku (mm)
      "body_width": 2,      // Lebar badan (1=thin, 2=medium, 3=thick)
      "head_width": 2       // Lebar kepala (1=small, 2=medium, 3=large)
    }
  }
}
```

### Contoh Pattern: Diamond dengan Pyramid Heights

Demo ini menggunakan dua pattern sebagai contoh:
1. **Circular Pattern** di koordinat (1,1) hingga (3,3) - tinggi seragam 30mm
2. **Diamond Pattern** dengan efek pyramid di area (9-13, 8-12):

```
       X: 9   10   11   12   13
    Y:  ─────────────────────────
    8:            30              ← Top point
    9:       30   50   30         ← Upper layer
   10:  30   50   70   50   30    ← Middle (PEAK 70mm)
   11:       30   50   30         ← Lower layer
   12:            30              ← Bottom point
```

Pyramid heights progression: **30mm → 50mm → 70mm** (edges to center)

## Algoritma Konversi 2D ke 3D

### 1. Parsing Data Structure
- Data JSON diparsing untuk ekstraksi informasi paku
- Setiap paku memiliki koordinat (x,y), height, body_width, head_width

### 2. Konversi Koordinat
Koordinat grid 2D dikonversi ke koordinat 3D Three.js menggunakan **reversed coordinate system**:
```javascript
// Reversed coordinates (starts from positive values)
posX = -((x - (gridWidth - 1) / 2) × marginBetweenNails)
posZ = -((y - (gridHeight - 1) / 2) × marginBetweenNails)
```

Mengapa reversed?
- Grid dimulai dari koordinat positif
- Memudahkan visualisasi yang sesuai dengan grid 2D
- Camera initial focus pada koordinat (1,1)

### 3. Instancing Geometry
Menggunakan `THREE.InstancedMesh` untuk performa optimal:
- **Nail Shaft**: CylinderGeometry dengan tinggi dinamis
- **Nail Head**: CylinderGeometry dengan radius lebih besar

### 4. Transformasi Matrix
Setiap instance ditransformasi menggunakan `Matrix4`:
- **Scale Y**: Tinggi paku (height)
- **Scale X & Z**: Lebar paku (body_width)
- **Position**: Lokasi berdasarkan konversi koordinat

## Teknologi yang Digunakan

- **Three.js v0.160.0**: Library 3D graphics (loaded via CDN)
  - Core Three.js untuk rendering
  - OrbitControls untuk interaksi kamera (zoomSpeed: 7x)
- **Vanilla JavaScript**: ES6 modules dengan extensive documentation
- **CSS3**: Modern styling dengan gradients dan animations
- **InstancedMesh**: Optimized rendering untuk banyak objek
- **Matrix4**: Transformasi geometri yang efisien

## Keuntungan Implementasi

1. **Performance**: InstancedMesh memungkinkan render ribuan objek efisien
2. **Scalability**: Mudah menambah jumlah paku tanpa performa issue
3. **Flexibility**: Data structure JSON mudah diedit dan dimanipulasi
4. **Real-time**: Update visualisasi secara real-time
5. **Educational**: Code dengan dokumentasi lengkap menjelaskan setiap konsep Three.js
6. **No Gap Design**: Nail head langsung menempel pada body (no visual gap)

## Untuk Keperluan Skripsi

File-file ini dapat digunakan untuk:

1. **Demonstrasi Konsep**: Menunjukkan cara kerja konversi 2D ke 3D
2. **Analisis Algoritma**: Code sangat terdokumentasi untuk analisis
3. **Screenshot/Video**: Capture visualisasi untuk dokumentasi skripsi
4. **Testing**: Eksperimen dengan berbagai konfigurasi data

## Modifikasi untuk Kebutuhan Khusus

### Mengubah Warna Board
Edit di `script.js`:
```javascript
this.settings = {
  boardColor: 0xa4846a, // Ubah hex color
  // ...
}
```

### Mengubah Detail Geometry
Edit di `script.js`:
```javascript
this.settings = {
  nailDetail: 'high', // 'low', 'medium', atau 'high'
  // ...
}
```

### Menambah Lighting
Edit method `setupLighting()` di `script.js`

### Mengubah Zoom Speed
Edit di `script.js`:
```javascript
this.controls.zoomSpeed = 7; // Default: 1, Current: 7 (700% faster)
```

### Mengubah Camera Focus
Edit di `script.js` untuk fokus ke koordinat berbeda:
```javascript
// Fokus ke koordinat (x, y)
this.camera.lookAt(posX, 0, posZ);
this.controls.target.set(posX, 0, posZ);
```

## Troubleshooting

### CORS Error
Jika muncul CORS error, pastikan menjalankan melalui web server, bukan langsung membuka file HTML.

### Three.js Not Loading
Pastikan koneksi internet aktif karena Three.js diload dari CDN.

### JSON Parse Error
Validasi JSON menggunakan JSON validator online atau tools seperti JSONLint.

## Referensi

- Three.js Documentation: https://threejs.org/docs/
- InstancedMesh: https://threejs.org/docs/#api/en/objects/InstancedMesh
- Matrix4: https://threejs.org/docs/#api/en/math/Matrix4

## Lisensi

File demonstrasi ini dibuat untuk keperluan penelitian akademik/skripsi.
