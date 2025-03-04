const surgtips = {
  async render() {
    return `
        <section class="w-full flex justify-center bg-[#1E1F22]">
      <div class="w-full max-w-[1400px] h-40 flex flex-col gap-6 items-center justify-end text-center px-2">
        <h1 class="text-4xl font-bold text-white">Panduan Surgery untuk pemula di Growtopia</h1>
        <p class="text-xl text-white ">(Panduan dibuat berdasarkan pengalaman penulis)</p>
      </div>
    </section>
    <section
      class="w-full flex justify-center h-auto bg-[url(../../public/wavy-top.svg)] bg-contain bg-top bg-no-repeat bg-[#2B2D31]/60">
      <div class="w-full max-w-[1400px] flex flex-col gap-2 mt-32 px-6">
        <h2 class="text-2xl font-extrabold text-white drop-shadow-xl max-[535px]:text-lg">Ketahui Kondisi Pasien Sebelum
          Operasi</h2>
        <span class="text-slate-100 font-semibold text-base max-[535px]:text-xs">Hal pertama yang harus kamu lakukan
          sebelum melakukan pembedahan adalah mengetahui masalah utama pada pasien. Yaitu dengan melakukan diagnosa
          dasar seperti berikut.</span>
        <ul class="space-y-1 text-white/80 list-disc list-inside">
          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika suhu pasien meningkat, <span class="text-yellow-300">Surgical Lab Kit</span> harus digunakan untuk membuka
              <span class="text-yellow-300">Surgical Antibiotics</span> yang kemudian dapat diberikan kepada pasien.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika denyut nadi pasien lemah, <span class="text-yellow-300">Surgical Transfusion</span> dapat diberikan kepada
              pasien.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika jantung pasien berhenti, <span class="text-yellow-300">Surgical Defibrillator</span> harus diberikan kepada
              pasien.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika pasien memiliki tulang yang patah, <span class="text-yellow-300">Surgical Splint</span> dapat diberikan
              kepada pasien untuk memperbaikinya.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika pasien kehilangan darah saat ada sayatan, <span class="text-yellow-300">Surgical Stitches</span> atau <span
                class="text-yellow-300">Surgical Clamp</span> dapat digunakan. Jika kehilangan darah tanpa ada sayatan, hanya
              <span class="text-yellow-300">Surgical Stitches</span> yang dapat digunakan.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika pasien kehilangan darah dan area operasi tidak higienis, demam akan terjadi karena infeksi dan <span
                class="text-yellow-300">Surgical Antibiotics</span> harus digunakan.
            </div>
          </li>

          <li class="flex flex-row gap-1 w-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-paperclip">
              <path d="M13.234 20.252 21 12.3" />
              <path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
            <div>
              Jika pasien terbangun sebelum semua sayatan ditutup, mereka akan berteriak dan bergerak, menyebabkan
              kehilangan darah parah. Gunakan <span class="text-yellow-300">Surgical Anesthetic</span> lebih awal untuk
              mencegah ini.
            </div>
          </li>

        </ul>
      </div>
    </section>

    <section class="relative w-full flex justify-center min-h-screen bg-[#1E1F22] px-6 mt-[200px]">
      <!-- SVG Background -->
      <div
        class="absolute top-[-200px] left-0 w-full min-w-full flex justify-center h-[200px] bg-[url(../../public/wavy-bottom.svg)] bg-bottom bg-no-repeat bg-[#2B2D31]/60">
      </div>

      <!-- Konten -->
      <div class="relative w-full max-w-[1400px] flex flex-col gap-2">
        <h2 class="text-2xl font-extrabold text-white drop-shadow-xl max-[535px]:text-lg">
          Daftar Penyakit ketika Surgery
        </h2>
        <span class="text-slate-100 font-semibold text-base max-[535px]:text-xs">
          Berikut adalah daftar semua penyakit di Growtopia beserta cara mengatasinya.
        </span>
        <ul class="space-y-1 text-white/80 list-disc list-inside">
          <malady-list></malady-list>
        </ul>
        
      </div>
    </section>
    <foot-tab class="bg-[#1E1F22]/100"></foot-tab>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default surgtips;