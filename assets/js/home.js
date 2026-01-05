const audio = document.getElementById("bgMusic");
const btnMute = document.getElementById("btnMute");
const btnPlay = document.getElementById("btnPlay");
const toast = document.getElementById("toast");

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove("show"), 2200);
}

function updateButtons(){
  const muted = audio.muted || audio.volume === 0;
  btnMute.setAttribute("aria-pressed", muted ? "true" : "false");
  btnMute.textContent = muted ? "Unmute 🔊" : "Mute 🔇";
  btnPlay.textContent = audio.paused ? "Play 🎵" : "Pause ⏸️";
}

btnMute?.addEventListener("click", ()=>{
  audio.muted = !audio.muted;
  if(!audio.muted && audio.paused) audio.play().catch(()=>{});
  updateButtons();
  showToast(audio.muted ? "Muted" : "Sound on");
});

btnPlay?.addEventListener("click", ()=>{
  if(audio.paused){
    audio.play().then(()=>{
      updateButtons();
      showToast("Music playing");
    }).catch(()=>{
      showToast("Tap Play again (browser blocked autoplay)");
    });
  } else {
    audio.pause();
    updateButtons();
    showToast("Paused");
  }
});

// Start muted to avoid autoplay blocks.
audio.muted = true;
updateButtons();
