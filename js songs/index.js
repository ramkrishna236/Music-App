const Songs = [
  { id: 0, zonar: 'ALL', songs: ["akasam-ilayaraja", "amav-uditnarayan", "manasantha-rp", "haira-arr", "muqabula-prbhu"] },
  { id: 1, zonar: 'melody', songs: ["akasam-ilayaraja", "amav-uditnarayan"] },
  { id: 2, zonar: 'hiphop', songs: ["muqabula-prbhu"] },
  { id: 3, zonar: 'love', songs: ["manasantha-rp", "haira-arr"] }
];

const playlist = [
  { song: "akasam-ilayaraja", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROltXlCc9S4L8N8W4aIeHto2bx4OhmutSmBw&s", video: "https://www.youtube.com/embed/fmAJibQIvLY?si=q5p-Z6izlR_TzAom" },
  { song: "amav-uditnarayan", image: "https://static.qobuz.com/images/covers/ya/nn/a65o9rqxznnya_600.jpg", video: "https://www.youtube.com/embed/vxxlMxdda94?si=nhoRZ7srsQAcj9tH" },
  { song: "muqabula-prbhu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjAUZxOlT5HJKqYG5Szg0ZyyGt38_M644_w&s", video: "https://www.youtube.com/embed/vaw0k8HiP9A?si=l4wiwws5zvdde9UJ" },
  { song: "manasantha-rp", image: "https://static.toiimg.com/thumb/msid-68321393,width-1280,height-720,resizemode-4/68321393.jpg", video: "https://www.youtube.com/embed/1-LRDEE8d3s?si=haaLio-1duh0RjQO" },
  { song: "haira-arr", image: "https://i0.wp.com/rahmaniac.com/wp-content/uploads/2017/06/AR_Gallery.jpg?resize=800%2C500&ssl=1", video: "https://www.youtube.com/embed/GswYCadOCaM?si=RsOuLzsKrrH_91Dl" }
];


const d = document.querySelector('#song-type');
const h = document.querySelector('#songs');
const c = document.querySelector('#section2');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const playBtn = document.querySelector("#playlist");
const createBtn = document.querySelector("#create");
const input = document.querySelector("input");
const allPlaylists = document.querySelector("#all");
const currPlaylist = document.querySelector("#current");

const userPlaylists = {};
let currentPlaylistName = "";
let currentIndex = -1;



document.addEventListener("DOMContentLoaded", function () {
  populateDropdown(); 
  d.value = "ALL"; 
  displayAllSongs(); 
  playSong(playlist[0].song); 
});


function populateDropdown() {
  d.innerHTML = ''; 

  Songs.forEach(songCategory => {
    const option = document.createElement('option');
    option.value = songCategory.zonar;
    option.textContent = songCategory.zonar;
    d.appendChild(option);
  });
}


function displayAllSongs() {
  h.innerHTML = ''; 

  playlist.forEach(songData => {
    createSongButton(songData.song);
  });
}


function createSongButton(songName) {
  const btn = document.createElement('button');
  btn.textContent = songName;
  btn.value = songName;
  btn.classList.add("patalu");

  h.appendChild(btn);

  btn.addEventListener('click', function () {
    playSong(songName);
  });
}


function playSong(songName) {
  c.innerHTML = ''; 

  const songData = playlist.find(p => p.song === songName);
  if (songData) {
    currentIndex = playlist.indexOf(songData);

    const img = document.createElement('img');
    img.src = songData.image;
    img.classList.add("image");
    c.appendChild(img);

    const video = document.createElement('iframe');
    video.src = songData.video;
    video.classList.add('video');
    video.setAttribute('allow', 'autoplay'); 
    c.appendChild(video);

    playBtn.onclick = () => addToPlaylist(songName);
  }
}


d.addEventListener('change', function () {
  const selectedZonar = d.value;
  h.innerHTML = ''; 

  if (selectedZonar === "ALL") {
    displayAllSongs(); 
  } else {
    const selectedCategory = Songs.find(category => category.zonar === selectedZonar);
    if (selectedCategory) {
      selectedCategory.songs.forEach(songName => createSongButton(songName));
    }
  }
});


next.addEventListener('click', function () {
  if (currentIndex !== -1) {
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[currentIndex].song);
  }
});

prev.addEventListener('click', function () {
  if (currentIndex !== -1) {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[currentIndex].song);
  }
});


function addToPlaylist(songName) {
  if (!currentPlaylistName) {
    alert("Please create a playlist first!");
    return;
  }
  if (!userPlaylists[currentPlaylistName].includes(songName)) {
    userPlaylists[currentPlaylistName].push(songName);
    updateCurrentPlaylistView();
  }
}


createBtn.addEventListener('click', function () {
  const newPlaylistName = input.value.trim();
  if (newPlaylistName !== "" && !userPlaylists[newPlaylistName]) {
    userPlaylists[newPlaylistName] = [];
    currentPlaylistName = newPlaylistName;
    input.value = "";
    updatePlaylistView();
  }
});


function updatePlaylistView() {
  allPlaylists.innerHTML = "";
  Object.keys(userPlaylists).forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.classList.add("lists");
    btn.addEventListener("click", function () {
      currentPlaylistName = name;
      updateCurrentPlaylistView();
    });
    allPlaylists.appendChild(btn);
  });
}


function updateCurrentPlaylistView() {
  currPlaylist.innerHTML = `<h3>Playlist: ${currentPlaylistName}</h3>`;
  if (userPlaylists[currentPlaylistName].length === 0) {
    currPlaylist.innerHTML += "<p>No songs in this playlist yet.</p>";
  }
  userPlaylists[currentPlaylistName].forEach(song => {
    const d = document.createElement("p");
    d.innerHTML = `${song} <button onclick="removeFromPlaylist('${song}')">❌</button>`;
    d.classList.add("plays");
    d.addEventListener("click", function () {
      playSong(song);
    });
    currPlaylist.appendChild(d);
  });
}


function removeFromPlaylist(songName) {
  userPlaylists[currentPlaylistName] = userPlaylists[currentPlaylistName].filter(song => song !== songName);
  updateCurrentPlaylistView();
}

let button = document.getElementById("toggleBtn");
let body = document.querySelector('body');
let h1 = document.querySelector('h1');
  button.addEventListener("click", function () {
    if (button.innerText === "Light") {
      button.innerText = "Dark"
      body.style.backgroundColor = "black";
      h1.style.color = 'white';
    }
     else {
      button.innerText = "Light";
      body.style.backgroundColor = "pink";
      h1.style.color = 'black';
    }
  });