// DOM Elemanlarını Seç
const container = document.getElementById('unity-container');
const adButton = document.getElementById('adButton');
const vastVideo = document.getElementById('vastVideo');
const adSource = document.getElementById('vastSource');
const countdownSpan = document.createElement('span');
adButton.appendChild(countdownSpan);

// Reklam Videoları
const videoUrls = [
  "./adsvideos/testvideo.mp4"
];

// Canvas Boyutlandırma
function scaleCanvas() {
  const scale = Math.min(
    window.innerWidth / container.offsetWidth,
    window.innerHeight / container.offsetHeight
  );
  container.style.transform = `scale(${scale})`;
  container.style.transformOrigin = 'center';
}

// Reklam Gösterimi
function ShowAd() {
  if (adButton.disabled) return;
  adButton.style.display = "none";

  // Rastgele video seç ve oynat
  adSource.src = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  vastVideo.style.display = "block";
  vastVideo.load();
  vastVideo.play();

  // Video bittiğinde işlem yap
  vastVideo.addEventListener('ended', onVideoEnd);
}

// Video Bittiğinde Yapılacaklar
function onVideoEnd() {
  try {
    const telegramId = Telegram.WebApp.initDataUnsafe.user.id;
    console.log(`Telegram ID: ${telegramId}`);

    // API'ye istek gönder
    fetch("https://c6641d1f-4f5d-428a-adbc-d7bfc2f297a7-00-7ms21bqpiouo.sisko.replit.dev:3000/video-ended", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: telegramId })  // 'user_id' ile gönderdiğinizden emin olun
    })
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);  // Konsola gelen yanıtı yazdırın
        if (data.success) {
          console.log("Balance updated successfully.");
        } else {
          alert(`Error updating balance: ${data.message}`);
        }
      })
      .catch(error => console.error("API Error:", error));
  } catch (error) {
    console.error("Error retrieving Telegram ID:", error);
  }
  Telegram.WebApp.close();
  socket.close();
  
    
  

}

// Geri Sayım Başlatma
function startCountdown() {
  let countdown = 5;
  updateCountdownText(countdown);

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      updateCountdownText(countdown);
    } else {
      clearInterval(interval);
      enableAdButton();
    }
  }, 1000);
}

// Geri Sayım Metnini Güncelle
function updateCountdownText(seconds) {
  countdownSpan.innerHTML = `<br>${seconds} seconds`;
}

// Reklam Butonunu Etkinleştir
function enableAdButton() {
  countdownSpan.innerHTML = ""; // Geri sayımı temizle
  adButton.disabled = false;
  adButton.classList.add("enabled");
  adButton.textContent = "Watch The Ad (CLICK)";
}

// Popup Reklam Scriptini Ekle
function addPopupScript() {
  const popupScript = document.createElement('script');
  popupScript.src = '//pl25045052.profitablecpmrate.com/e9/18/f8/e918f8320e3ef835ab8c3de219895982.js';
  document.body.appendChild(popupScript);
}

// Sayfa Yüklendiğinde Yapılacaklar
window.addEventListener('load', () => {
  scaleCanvas();
  startCountdown();
  addPopupScript();
  initializeUnity();
  adButton.disabled = false;
  adButton.textContent = "Watch The Ad";
});

// Sayfa Yeniden Boyutlandırıldığında Canvas Ölçekle
window.addEventListener('resize', scaleCanvas);

// Reklam Butonuna Tıklama Olayı
adButton.addEventListener('click', ShowAd);

document.addEventListener("DOMContentLoaded", function () {
  const vastVideo = document.getElementById("vastVideo");

  // Videoya tıklandığında bağlantıyı aç
  vastVideo.addEventListener("click", function () {
    window.open("https://whomeenoaglauns.com/4/8515871", "_blank");
  });
});
