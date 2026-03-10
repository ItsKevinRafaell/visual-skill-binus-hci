    // Ambil elemen
    const modal = document.getElementById("tncModal");
    const closeBtn = document.querySelector(".close-btn");
    const agreeBtn = document.getElementById("btnAgree");
    
    // Ambil semua link yang mengarah ke T&C (bisa di footer atau di form register)
    // Pastikan link T&C kamu punya class="tnc-trigger" atau id="openTnc"
    const triggers = document.querySelectorAll('.tnc-trigger'); 

    // Fungsi Buka Modal
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link pindah halaman
            modal.style.display = "block";
        });
    });

    // Fungsi Tutup Modal (Klik X)
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Fungsi Tutup Modal (Klik Tombol Saya Mengerti)
    agreeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Fungsi Tutup Modal (Klik di luar kotak)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }