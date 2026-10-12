// Tandai bahwa JavaScript aktif. Animasi reveal di style.css hanya berlaku
// setelah class ini ada, jadi kalau file ini gagal dimuat, konten tetap terlihat.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tanpa animasi: langsung tampilkan semuanya
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // animasi cukup sekali per elemen
          }
        });
      },
      // threshold 0 supaya elemen yang lebih tinggi dari layar tetap terpicu;
      // rootMargin membuat animasi mulai sedikit setelah elemen masuk layar
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  // Beri nomor urut ke anak [data-stagger] supaya CSS bisa menunda tiap anak
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
  });

  // Tahun di footer selalu terkini
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
