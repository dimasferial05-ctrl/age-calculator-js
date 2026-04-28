// Mengambil fungsi DateTime dari library Luxon
const DateTime = luxon.DateTime;

// Inisialisasi Flatpickr pada input field
const dateInput = document.getElementById("birthdate");
flatpickr(dateInput, {
  dateFormat: "d/m/Y", // Format sesuai mockup (dd/mm/yyyy)
  maxDate: "today", // Validasi: Tidak bisa memilih tanggal di masa depan
  disableMobile: "true", // Memaksa flatpickr UI di mobile, bukan native HTML picker
});

// Mengambil elemen DOM lainnya
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");
const ageOutput = document.getElementById("age-output");
const errorMsg = document.getElementById("error-msg");

calculateBtn.addEventListener("click", () => {
  const selectedDateStr = dateInput.value;

  // Validasi dasar: Apakah input kosong?
  if (!selectedDateStr) {
    showError("Please select your birth date first.");
    return;
  }

  // Parsing tanggal dari format dd/mm/yyyy menggunakan Luxon
  const birthDate = DateTime.fromFormat(selectedDateStr, "d/M/yyyy");
  const today = DateTime.now();

  // Hitung selisih menggunakan Luxon (tahun dan bulan)
  const diff = today.diff(birthDate, ["years", "months"]).toObject();

  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);

  // Sembunyikan error dan tampilkan hasil
  errorMsg.classList.add("hide");
  resultDiv.classList.remove("hide");

  // Format teks hasil sesuai mockup
  ageOutput.textContent = `${years} years ${months} months`;
});

function showError(message) {
  resultDiv.classList.add("hide");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hide");
}
