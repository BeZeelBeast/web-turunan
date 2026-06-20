/* =========================================================
   TURUNAN — navbar.js
   Render navbar atas secara otomatis di semua halaman.

   CARA PAKAI (untuk semua anggota tim):
   1. Tambahkan <div id="navbar"></div> di paling atas <body>.
   2. Include file ini: <script src="../js/navbar.js"></script>
      (atau "js/navbar.js" kalau file HTML kamu di folder root)
   3. Panggil renderNavbar("KUNCI_HALAMAN") di akhir body, contoh:
        <script>renderNavbar("materi");</script>

   KUNCI_HALAMAN yang valid (harus persis salah satu ini):
   "home" | "materi" | "aturan" | "visualisasi" | "soal" | "quiz" | "referensi"
   ========================================================= */

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/index.html" },
  { key: "materi", label: "Materi", href: "/pages/materi.html" },
  { key: "aturan", label: "Aturan Turunan", href: "/pages/aturan-turunan.html" },
  { key: "visualisasi", label: "Visualisasi", href: "/pages/visualisasi.html" },
  { key: "soal", label: "Contoh Soal", href: "/pages/contoh-soal.html" },
  { key: "quiz", label: "Quiz", href: "/pages/quiz.html" },
  { key: "referensi", label: "Referensi", href: "/pages/referensi.html" },
];

function renderNavbar(activeKey) {
  const mount = document.getElementById("navbar");
  if (!mount) {
    console.warn('navbar.js: elemen <div id="navbar"> tidak ditemukan di halaman ini.');
    return;
  }

  const linksHtml = NAV_ITEMS.map((item) => {
    const activeClass = item.key === activeKey ? " active" : "";
    return `<a href="${item.href}" class="${activeClass.trim()}">${item.label}</a>`;
  }).join("\n");

  mount.outerHTML = `
    <header class="navbar" id="navbar">
      <a href="/index.html" class="navbar-brand">
        <span class="logo-icon">∫</span>
        Turunan
      </a>
      <nav class="navbar-links">
        ${linksHtml}
      </nav>
      <button class="navbar-settings" aria-label="Pengaturan">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    </header>
  `;
}

/* =========================================================
   Helper kecil untuk badge nomor halaman (pojok bawah,
   sesuai mockup, opsional dipakai saat development saja)
   ========================================================= */
function renderPageBadge(text) {
  const el = document.createElement("div");
  el.className = "page-badge";
  el.textContent = text;
  document.body.appendChild(el);
}
