# test-obs — React + TypeScript + Vite (Ringkasan & Panduan)

Repository ini adalah aplikasi CRUD pengguna sederhana berbasis React + TypeScript + Vite, menggunakan Material-UI, Redux Toolkit + redux-persist, dan beberapa utilitas seperti axios & sweetalert2.

Ringkasan cepat:
- Router disediakan di [src/App.tsx](src/App.tsx).
- State global dikelola oleh [`store`](src/store/index.ts) dengan reducer pengguna di [`userSlice`](src/store/userSlice.ts) (fungsi penting: [`fetchUsers`](src/store/userSlice.ts), [`addUserAsync`](src/store/userSlice.ts), [`editUser`](src/store/userSlice.ts), [`deleteUser`](src/store/userSlice.ts)).
- Hook helper: [`useFetchUsers`](src/hooks/useFetchUsers.ts).
- Komponen utama: layout di [src/components/layout/MainLayout.tsx](src/components/layout/MainLayout.tsx) dan [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx).
- Komponen UI umum: [`UserModal`](src/components/common/UserModal.tsx), [`TextInput`](src/components/common/TextInput.tsx), [`Search`](src/components/common/Search.tsx), [`Button`](src/components/common/Button.tsx), [`Loading`](src/components/common/Loading.tsx).

Persyaratan
- Node.js 18+ direkomendasikan.
- Paket dikelola melalui package.json — lihat [package.json](package.json).

Instalasi
1. Install dependensi:
   npm install

Perintah umum (dari package.json)
- npm run dev — jalankan dev server (Vite)
- npm run build — compile & build produksi (tsc -b lalu vite build)
- npm run preview — preview build
- npm run lint — jalankan ESLint
- npm run test — jalankan Vitest (unit test)
- npm run test:run — jalankan test sekali
- npm run test:coverage — jalankan test dengan coverage

Konfigurasi & file penting
- Vite konfigurasi: [vite.config.ts](vite.config.ts)
- TypeScript configs: [tsconfig.app.json](tsconfig.app.json), [tsconfig.node.json](tsconfig.node.json), [tsconfig.json](tsconfig.json)
- Test setup: [src/setupTest.js](src/setupTest.js)

Arsitektur & alur penggunaan
- Routing:
  - "/" → [src/pages/UserList.tsx](src/pages/UserList.tsx)
  - "/create" → [src/pages/UserCreate.tsx](src/pages/UserCreate.tsx)
  - "/edit/:id" → [src/pages/UserEdit.tsx](src/pages/UserEdit.tsx)

- Mengambil data:
  - Otomatis melalui [`fetchUsers`](src/store/userSlice.ts) yang memanggil API https://jsonplaceholder.typicode.com/users. Anda juga bisa memanggilnya langsung lewat dispatch:
    dispatch([`fetchUsers`](src/store/userSlice.ts)())
  - Atau gunakan hook [`useFetchUsers`](src/hooks/useFetchUsers.ts) untuk komponen fungsional.

- Menambah/menyimpan pengguna:
  - Asynchronous: dispatch([`addUserAsync`](src/store/userSlice.ts)(userData)). Fungsi ini mem-post ke API lalu menambahkan ke state lokal.
  - Synchronous lokal: dispatch([`addUser`](src/store/userSlice.ts)(payload)).

- Edit / delete:
  - Edit lokal via dispatch([`editUser`](src/store/userSlice.ts)(userObject))
  - Hapus via dispatch([`deleteUser`](src/store/userSlice.ts)(id))

State & tipenya
- Lihat helper type di [`store`](src/store/index.ts): [`RootState`](src/store/index.ts) dan [`AppDispatch`](src/store/index.ts), serta hook helper [`useAppDispatch`](src/store/index.ts).

Testing
- Test unit ada di folder komponen (contoh: [src/components/common/Button.test.jsx](src/components/common/Button.test.jsx), [src/components/common/UserModal.test.jsx](src/components/common/UserModal.test.jsx), dll).
- Setup test: [src/setupTest.js](src/setupTest.js)
- Jalankan: npm run test atau npm run test:run

Catatan tambahan
- redux-persist menyimpan state di localStorage (konfigurasi di [`store`](src/store/index.ts)).
- Gambar user dibuat dari `https://picsum.photos/seed/{id}/200` pada [`userSlice`](src/store/userSlice.ts).
- UI berbasis Material-UI v7 — lihat komponen yang menggunakan MUI di folder [src/components](src/components).

Kontribusi & pengembangan
- Tambahkan fitur atau perbaiki bug, lalu jalankan test dan lint.
- Untuk strict linting type-aware, lihat saran di [eslint.config.js](eslint.config.js) dan README internal di file itu.

Jika butuh contoh pemakaian dispatch atau integrasi komponen tertentu sebutkan file/komponen yang ingin di-demonstrasi (mis. [`UserList`](src/pages/UserList.tsx) atau [`useFetchUsers`](src/hooks/useFetchUsers.ts)).