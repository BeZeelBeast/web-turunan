/* =========================================================
   TURUNAN — desmos-helper.js
   Helper untuk membuat grafik Desmos dengan cepat & konsisten.

   PERSYARATAN:
   Tambahkan script Desmos API di <head> sebelum file ini:
   <script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

   CARA PAKAI DASAR:
     const calc = initDesmosCalculator("calculator-1");
     calc.setExpression({ id: "fn1", latex: "f(x)=x^2" });

   CARA PAKAI DENGAN SLIDER (lihat contoh di materi.html):
     const calc = initDesmosCalculator("calculator-1");
     setupSliderBinding(calc, "x", "slider-x", "label-x", { min: -5, max: 5, step: 0.1 });
   ========================================================= */

/**
 * Inisialisasi kalkulator Desmos di dalam elemen dengan id tertentu.
 * @param {string} elementId - id dari <div> tempat kalkulator dirender
 * @param {object} options - opsi tambahan Desmos (opsional)
 * @returns {object|null} instance kalkulator Desmos, atau null jika gagal
 */
function initDesmosCalculator(elementId, options = {}) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.warn(`desmos-helper.js: elemen #${elementId} tidak ditemukan.`);
    return null;
  }

  if (typeof Desmos === "undefined") {
    console.error(
      "desmos-helper.js: Desmos API belum dimuat. Pastikan <script src='https://www.desmos.com/api/v1.11/calculator.js?...'> ada di <head>."
    );
    container.innerHTML =
      '<p style="padding:16px;color:#64748b;font-size:13px;">Desmos belum termuat (cek koneksi internet / API key).</p>';
    return null;
  }

  const defaultOptions = {
    expressionsCollapsed: true,
    settingsMenu: false,
    zoomButtons: true,
    lockViewport: false,
    border: false,
  };

  return Desmos.GraphingCalculator(container, { ...defaultOptions, ...options });
}

/**
 * Menghubungkan <input type="range"> dengan sebuah variabel di Desmos,
 * sekaligus update label angka di sebelahnya.
 *
 * @param {object} calc - instance Desmos dari initDesmosCalculator()
 * @param {string} varName - nama variabel di Desmos, misal "x" atau "h"
 * @param {string} sliderId - id elemen <input type="range">
 * @param {string} labelId - id elemen yang menampilkan nilai slider (opsional)
 * @param {object} cfg - { min, max, step, decimals }
 */
function setupSliderBinding(calc, varName, sliderId, labelId, cfg = {}) {
  const slider = document.getElementById(sliderId);
  if (!slider || !calc) return;

  const { min = -10, max = 10, step = 0.1, decimals = 2 } = cfg;
  slider.min = min;
  slider.max = max;
  slider.step = step;

  const update = (val) => {
    calc.setExpression({ id: `var-${varName}`, latex: `${varName}=${val}` });
    if (labelId) {
      const labelEl = document.getElementById(labelId);
      if (labelEl) labelEl.textContent = Number(val).toFixed(decimals);
    }
  };

  slider.addEventListener("input", (e) => update(e.target.value));
  update(slider.value);
}
