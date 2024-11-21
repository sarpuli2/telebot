const socket = io("http://127.0.0.1:5000");

const adButton = document.getElementById('adButton');
const vastVideo = document.getElementById('vastVideo');
const adSource = document.getElementById('vastSource');
const countdownSpan = document.createElement('span');
adButton.appendChild(countdownSpan);

const videoUrls = [
  "./adsvideos/video1.mp4",
  "./adsvideos/video2.mp4",
  "./adsvideos/video3.mp4",
  "./adsvideos/video4.mp4",
  "./adsvideos/video5.mp4",
  "./adsvideos/video6.mp4",
  "./adsvideos/video7.mp4",
  "./adsvideos/video8.mp4",
  "./adsvideos/video9.mp4",
  "./adsvideos/video10.mp4",
  "./adsvideos/video11.mp4",
  "./adsvideos/video12.mp4",
  "./adsvideos/video13.mp4",
  "./adsvideos/video14.mp4",
  "./adsvideos/video16.mp4",
  "./adsvideos/video17.mp4",
  "./adsvideos/video18.mp4"

];

// Reklam Gösterimi
function ShowAd() {
  if (adButton.disabled) return;
  adButton.style.display = "none";

  adSource.src = videoUrls[Math.floor(Math.random() * videoUrls.length)];
  vastVideo.style.display = "block";
  vastVideo.load();
  vastVideo.play();

  vastVideo.addEventListener('ended', onVideoEnd);
}

// Video Bittiğinde Yapılacaklar
function onVideoEnd() {
  const telegramId = Telegram.WebApp.initDataUnsafe.user.id;
  console.log(`Telegram ID: ${telegramId}`);

  if (!telegramId) {
    console.error("Telegram ID alınamadı.");
    return;
  }

  socket.emit('video-ended', { user_id: telegramId });
}

// WebSocket Yanıtları
socket.on('balance-updated', (data) => {
  console.log("Balance updated:", data);
  Telegram.WebApp.close();
});

socket.on('error', (error) => {
  console.error("WebSocket Error:", error);
});

adButton.addEventListener('click', ShowAd);
window.addEventListener('load', startCountdown);

// Geri Sayım Fonksiyonları
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

function updateCountdownText(seconds) {
  countdownSpan.innerHTML = `<br>${seconds} seconds`;
}

function enableAdButton() {
  countdownSpan.innerHTML = "";
  adButton.disabled = false;
  adButton.classList.add("enabled");
  adButton.textContent = "Watch The Ad (CLICK)";
}
