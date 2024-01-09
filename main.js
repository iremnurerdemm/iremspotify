const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//index sarkı için
let index

//dongu
let loop= true

//karıstırıcı acık mı

let isShuffleActive=false

//sarkı listesi
const songList=[
    {
        name:"bosnom behar probeharao",
        link:"assets/audio1.mp3",
        artist:"Dino Merlin",
        image:"assets/music-player1.jpeg"
    },
    {
        name:"ZIVOT MOJ",
        link:"assets/audio2.mp3",
        artist:"DANIEL DJOKIC & DRAGANA MIRKOVIC ",
        image:"assets/music-player3.jpeg"
    },
    {
        name:"Jugoslovenka",
        link:"assets/audio3.mp3",
        artist:"Lepa Brena",
        image:"assets/musicplayer-4.jpeg"
    },
]
//zaman formatı ayarlama

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

//sarkiyi calma
const playAudio = () => {
    console.log("playAudio")
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}
//sarkı atama
const setSong=(arrayIndex) =>{
    if(loop==true && isShuffleActive ==true){
        arrayIndex=Math.floor(Math.random()*100%5)
        console.log(arrayIndex  + isShuffleActive)

    }
    let {name,link,artist,image}=songList[arrayIndex]
    audio.src=link
    songName.innerHTML= name
    songArtist.innerHTML= artist
    songImage.src=image

    audio.onloadedmetadata= ()=>{
        maxDuration.innerText=timeFormatter(audio.duration)
    }

    playListContainer.classList.add("hide")
    playAudio()
}

//sıradakini çal
const nextSong = () => {
    if (loop) {
        if (index == (songList.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
    }
}
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',() =>{
    playListContainer.classList.add('hide')
})
const pauseAudio=()=>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
    //
}, 1000);

progressBar.addEventListener('click',(e)=>{
    let coordStart=progressBar.getBoundingClientRect().left

    let coordEnd = e.clientX
    let progress =(coordEnd-coordStart)/ progressBar.offsetWidth
    currentProgress.style.width=progressBar*100+ "%"
    audio.currentTime=progress*audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton
    playButton.classList.add('hide')

})

const previousSong= () =>{
    console.log(index)
if(index>0){
    index-=1
}else{
    index=songList.length-1
}

setSong(index)

}

repeatButton.addEventListener('click',() =>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active') 
        audio.loop=false
        console.log('tekrar kapatıldı')
    }else{
        repeatButton.classList.add('active')
        audio.loop=true
        console.log('tekrar acıldı')
    }
})
shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        isShuffleActive = false
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('karistirici kapatildi')
    } else {
        isShuffleActive = true
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('karistirici acildi')
    }
})

const initializePlaylist = () => {
    for (let i in songList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container"> 
          <img src="${songList[i].image}"/>
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">
            ${songList[i].name}
          </span>
          <span id="playlist-song-artist-album">
            ${songList[i].artist}
          </span>
        </div>
        </li>`
    }
}

//tıklama yakalama
nextButton.addEventListener('click',nextSong)
pauseButton.addEventListener('click',pauseAudio)
playButton.addEventListener('click',playAudio)
prevButton.addEventListener('click',previousSong)


//sarkı bitişini yakala
audio.onended=()=>{
    nextSong()
}

audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText=timeFormatter(audio.currentTime)
})
//ekran yüklendildiğinde
window.onload=()=>{
   index=0
    setSong(index)

    //durdur ve sarkı listesini oluştur
    pauseAudio()
    initializePlaylist()
}
