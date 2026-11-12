/* ============================================================
   infly — Website Undangan v3 (gaya Serein)
   Vanilla JS, tanpa library. Semua path relatif.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 0. Loader singkat ---------- */
  // Hilang saat halaman selesai dimuat; pengaman timeout 1,5 detik.
  var loader = document.getElementById("loader");
  var loaderHidden = false;
  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    loader.classList.add("hidden");
    setTimeout(function () { loader.remove(); }, 600);
  }
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1500);

  /* ---------- 1. Nama tamu dari URL (?to=Nama) ---------- */
  // Ambil parameter ?to=, bersihkan dari karakter HTML, batasi 60 karakter.
  // textContent dipakai (bukan innerHTML) supaya aman dari injeksi.
  function getGuestName() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get("to");
    if (!raw) return "Tamu Undangan";
    var clean = raw.replace(/[<>&"']/g, "").trim().replace(/\s+/g, " ");
    if (clean.length === 0) return "Tamu Undangan";
    return clean.slice(0, 60);
  }

  var guestNameEl = document.getElementById("guest-name");
  guestNameEl.textContent = getGuestName();

  /* ---------- 2. Buka undangan (sampul -> isi) ---------- */
  var cover = document.getElementById("cover");
  var content = document.getElementById("content");
  var sidePanel = document.getElementById("side-panel");
  var bottomNav = document.getElementById("bottom-nav");
  var backTop = document.getElementById("back-to-top");
  var musicBtn = document.getElementById("music-toggle");
  var audio = document.getElementById("bg-music");

  document.getElementById("btn-open").addEventListener("click", function () {
    cover.classList.add("hidden");
    content.classList.add("visible");
    document.body.classList.remove("cover-locked");
    document.body.classList.add("opened");
    sidePanel.setAttribute("aria-hidden", "false");
    bottomNav.classList.add("show");
    musicBtn.classList.add("show");
    window.scrollTo(0, 0);
    // Musik mulai di dalam gestur klik ini (syarat autoplay browser).
    playMusic();
    // Hapus sampul dari DOM setelah animasi selesai (hemat memori).
    setTimeout(function () { cover.remove(); }, 700);
    // AOS mengukur posisi setelah konten tampil.
    if (typeof AOS !== "undefined") { setTimeout(function () { AOS.refresh(); }, 100); }
  });
  // Kunci scroll selama sampul tampil.
  document.body.classList.add("cover-locked");

  /* ---------- 3. Hitung mundur ke pesta: Sabtu, 26 Des 2026 19.00 WIB ---------- */
  // WIB = UTC+7 -> 19.00 WIB = 12.00 UTC.
  var target = new Date("2026-12-26T12:00:00Z").getTime();
  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMins = document.getElementById("cd-mins");
  var elSecs = document.getElementById("cd-secs");
  var cdNote = document.getElementById("cd-note");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickCountdown() {
    var diff = target - Date.now();
    if (diff <= 0) {
      elDays.textContent = "0";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      cdNote.textContent = "Acara telah berlangsung — terima kasih atas doa dan kehadiran Anda.";
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff / 3600000) % 24;
    var m = Math.floor(diff / 60000) % 60;
    var s = Math.floor(diff / 1000) % 60;
    elDays.textContent = d;
    elHours.textContent = pad(h);
    elMins.textContent = pad(m);
    elSecs.textContent = pad(s);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- 4. Toast kecil ("Disalin!" dll.) ---------- */
  var toast = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  /* ---------- 5. Salin nomor (amplop digital) ---------- */
  // Clipboard API modern, dengan fallback textarea untuk browser lama.
  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var num = btn.getAttribute("data-copy");
      copyText(num, function (ok) {
        showToast(ok ? "Nomor disalin: " + num : "Gagal menyalin — salin manual: " + num);
      });
    });
  });

  /* ---------- 6. RSVP via WhatsApp (form ada di dalam modal) ---------- */
  // Nomor WhatsApp keluarga: 0812-3456-789 -> format internasional 628123456789.
  var WA_NUMBER = "628123456789";
  var form = document.getElementById("rsvp-form");
  var nameInput = document.getElementById("rsvp-name");
  var errorEl = document.getElementById("rsvp-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nama = nameInput.value.trim();
    if (!nama) {
      errorEl.hidden = false;
      nameInput.focus();
      return;
    }
    errorEl.hidden = true;
    var kehadiran = form.querySelector('input[name="kehadiran"]:checked').value;
    var jumlah = document.getElementById("rsvp-count").value;
    var ucapan = document.getElementById("rsvp-message").value.trim();

    var lines = [
      "Halo, saya " + nama + ".",
      "Konfirmasi kehadiran ulang tahun Alya Putri (26 Desember 2026):",
      "Kehadiran: " + kehadiran,
      "Jumlah tamu: " + jumlah + " orang"
    ];
    if (ucapan) lines.push("Ucapan: " + ucapan);
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank");
  });

  /* ---------- 7. Musik latar ---------- */
  // "Meditation Impromptu 01" — Kevin MacLeod (incompetech.com), CC BY 4.0.
  // Disertakan sebagai assets/music.mp3. Volume 0.5, loop.
  // Kalau file gagal dimuat, tombol menampilkan pemberitahuan (bukan error).
  audio.volume = 0.5;
  var musicReady = false;
  audio.addEventListener("canplay", function () { musicReady = true; });
  audio.addEventListener("error", function () { musicReady = false; });

  function playMusic() {
    var p = audio.play();
    if (p && p.catch) {
      p.then(function () {
        musicBtn.classList.add("playing");
        musicBtn.textContent = "❚❚";
      }).catch(function () {
        showToast("Musik tidak dapat diputar di perangkat ini.");
      });
    }
  }
  function pauseMusic() {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
  }

  musicBtn.addEventListener("click", function () {
    if (audio.paused) { playMusic(); } else { pauseMusic(); }
  });

  /* ---------- 8. Animasi scroll (AOS) + lightbox galeri (GLightbox) ---------- */
  // Keduanya dimuat dari CDN. Kalau CDN gagal, konten TIDAK boleh hilang:
  // hapus atribut data-aos supaya aturan CSS AOS tidak lagi menyembunyikan section.
  if (typeof AOS !== "undefined") {
    AOS.init({ once: true, duration: 800, offset: 60 });
  } else {
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      el.removeAttribute("data-aos");
    });
  }
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  /* ---------- 9. Carousel generik (galeri + kisah cinta) ---------- */
  // Satu slide terlihat; geser dengan transform. Autoplay opsional.
  function initCarousel(root, opts) {
    var track = root.querySelector(".carousel-track");
    var slides = track.children;
    var total = slides.length;
    var index = 0;
    var timer = null;
    var autoplayMs = opts && opts.autoplayMs ? opts.autoplayMs : 0;

    var dotsWrap = root.querySelector(".carousel-dots");
    var dots = [];
    if (dotsWrap) {
      for (var i = 0; i < total; i++) {
        (function (n) {
          var d = document.createElement("button");
          d.type = "button";
          d.className = "carousel-dot";
          d.setAttribute("aria-label", "Ke slide " + (n + 1));
          d.addEventListener("click", function () { goTo(n); restartAutoplay(); });
          dotsWrap.appendChild(d);
          dots.push(d);
        })(i);
      }
    }

    var progressBar = root.querySelector(".story-progress-bar");

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, i) { d.classList.toggle("active", i === index); });
      if (progressBar) progressBar.style.width = ((index + 1) / total * 100) + "%";
      if (opts && opts.onChange) opts.onChange(index);
    }

    function goTo(n) {
      index = ((n % total) + total) % total;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }
    function startAutoplay() {
      if (!autoplayMs) return;
      stopAutoplay();
      timer = setInterval(next, autoplayMs);
    }
    function restartAutoplay() { startAutoplay(); }

    var btnPrev = root.querySelector(".carousel-prev");
    var btnNext = root.querySelector(".carousel-next");
    if (btnPrev) btnPrev.addEventListener("click", function () { prev(); restartAutoplay(); });
    if (btnNext) btnNext.addEventListener("click", function () { next(); restartAutoplay(); });

    // Jeda autoplay saat kursor di atas carousel; lanjut saat kursor pergi.
    root.addEventListener("pointerenter", stopAutoplay);
    root.addEventListener("pointerleave", startAutoplay);

    render();
    startAutoplay();
    return { goTo: goTo, next: next, prev: prev };
  }

  // Galeri: autoplay 5 detik + thumbnail strip.
  var gallery = document.getElementById("gallery-carousel");
  var galleryApi = initCarousel(gallery, {
    autoplayMs: 5000,
    onChange: function (i) {
      document.querySelectorAll(".carousel-thumb").forEach(function (t, n) {
        t.classList.toggle("active", n === i);
      });
    }
  });
  // Bangun thumbnail strip dari gambar tiap slide.
  var thumbsWrap = document.querySelector(".carousel-thumbs");
  gallery.querySelectorAll(".carousel-slide img").forEach(function (img, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "carousel-thumb" + (i === 0 ? " active" : "");
    b.setAttribute("aria-label", "Lihat foto " + (i + 1));
    var t = document.createElement("img");
    t.src = img.getAttribute("src");
    t.alt = "";
    t.className = img.className;
    b.appendChild(t);
    b.addEventListener("click", function () { galleryApi.goTo(i); });
    thumbsWrap.appendChild(b);
  });

  // Kisah cinta: carousel tanpa autoplay, dengan progress bar.
  initCarousel(document.getElementById("story-carousel"), { autoplayMs: 0 });

  /* ---------- 10. Modal (RSVP + Kado) ---------- */
  function openModal(id) {
    var m = document.getElementById(id);
    m.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = m.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(m) {
    m.hidden = true;
    if (!document.querySelector(".modal:not([hidden])")) {
      document.body.style.overflow = "";
    }
  }
  document.getElementById("btn-rsvp-open").addEventListener("click", function () {
    openModal("modal-rsvp");
  });
  document.getElementById("btn-gift-open").addEventListener("click", function () {
    openModal("modal-gift");
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", function () {
      var m = el.closest(".modal");
      if (m) closeModal(m);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var open = document.querySelector(".modal:not([hidden])");
      if (open) closeModal(open);
    }
  });

  /* ---------- 11. Accordion kado ---------- */
  document.querySelectorAll(".accordion-head").forEach(function (head) {
    head.addEventListener("click", function () {
      var item = head.closest(".accordion-item");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item").forEach(function (it) {
        it.classList.remove("open");
        it.querySelector(".accordion-head").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 12. Bottom nav: ikon aktif mengikuti section ---------- */
  var navItems = document.querySelectorAll(".nav-item");
  var navTargets = {};
  navItems.forEach(function (item) {
    var sec = document.getElementById(item.getAttribute("data-target"));
    if (sec) navTargets[item.getAttribute("data-target")] = item;
  });

  function setActiveNav(id) {
    navItems.forEach(function (item) {
      item.classList.toggle("active", item.getAttribute("data-target") === id);
    });
  }
  // Klik nav: lompat halus (CSS scroll-behavior) + tandai aktif langsung.
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      setActiveNav(item.getAttribute("data-target"));
    });
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(navTargets).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  /* ---------- 13. Tombol kembali ke atas ---------- */
  window.addEventListener("scroll", function () {
    backTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
