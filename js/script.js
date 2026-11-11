/* ============================================================
   infly — Website Undangan: logika interaktif
   Vanilla JS, tanpa library. Semua path relatif.
   ============================================================ */

(function () {
  "use strict";

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
  var musicBtn = document.getElementById("music-toggle");
  var audio = document.getElementById("bg-music");

  document.getElementById("btn-open").addEventListener("click", function () {
    cover.classList.add("hidden");
    content.classList.add("visible");
    document.body.classList.remove("cover-locked");
    musicBtn.classList.add("show");
    window.scrollTo(0, 0);
    // Hapus sampul dari DOM setelah animasi selesai (hemat memori).
    setTimeout(function () { cover.remove(); }, 700);
  });
  // Kunci scroll selama sampul tampil.
  document.body.classList.add("cover-locked");

  /* ---------- 3. Hitung mundur ke akad: Minggu, 20 Des 2026 08.00 WIB ---------- */
  // WIB = UTC+7 -> 08.00 WIB = 01.00 UTC.
  var target = new Date("2026-12-20T01:00:00Z").getTime();
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

  /* ---------- 6. RSVP via WhatsApp ---------- */
  // Nomor WhatsApp mempelai: 0812-3456-789 -> format internasional 628123456789.
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
      "Konfirmasi kehadiran pernikahan Raka & Sinta (20 Desember 2026):",
      "Kehadiran: " + kehadiran,
      "Jumlah tamu: " + jumlah + " orang"
    ];
    if (ucapan) lines.push("Ucapan: " + ucapan);
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank");
  });

  /* ---------- 7. Musik latar (opsional) ---------- */
  // File assets/music.mp3 TIDAK disertakan dalam paket.
  // Kalau file belum ada, tombol menampilkan pemberitahuan (bukan error).
  var musicReady = false;
  audio.addEventListener("canplay", function () { musicReady = true; });
  audio.addEventListener("error", function () { musicReady = false; });

  musicBtn.addEventListener("click", function () {
    if (audio.paused) {
      var p = audio.play();
      if (p && p.catch) {
        p.then(function () {
          musicBtn.classList.add("playing");
          musicBtn.textContent = "❚❚";
        }).catch(function () {
          showToast("File musik belum ditambahkan — lihat README.md");
        });
      }
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicBtn.textContent = "♪";
    }
  });
})();
