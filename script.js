// Get references to elements
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume");
const uploadButton = document.getElementById("upload");

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

let audio = new Audio(); // Create a new audio object
let currentTrackIndex = 0;
let isPlaying = false;
let playlist = [];

// Event listener to play/pause the song
playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "▶";
    } else {
        audio.play();
        playPauseButton.textContent = "❚❚";
    }
    isPlaying = !isPlaying;
});

// Skip to previous song
prevButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = "❚❚";
});

// Skip to next song
nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = "❚❚";
});

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Change track progress when user interacts with progress bar
progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Volume control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value / 100;
});

// Handle song upload
uploadButton.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const metadata = {
            title: file.name,
            artist: "Unknown Artist",
        };
        playlist.push({ url, metadata });
        loadTrack(playlist.length - 1);
    }
});

// Load the selected track into the player
function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.url;
    songTitle.textContent = track.metadata.title;
    songArtist.textContent = track.metadata.artist;
    playPauseButton.textContent = "▶";
    isPlaying = false;
}
