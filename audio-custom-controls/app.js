const player = document.querySelector('.player')
const audio = document.querySelector('.player__audio')
const progress = document.querySelector('.player__progress')
const progressBar = document.querySelector('.player__progress--bar')
const progressBarAfter = document.querySelector('.player__progress--bar::after')
const volume = document.querySelector('.player__volume')

const playerControlsPlay = document.querySelector('.player__controls--btn__play')
const playerControlsPause = document.querySelector('.player__controls--btn__pause')
const playerControlsNext = document.querySelector('.player__controls--btn__next')
const playerControlsPrev = document.querySelector('.player__controls--btn__prev')

let progressWidth = progress.clientWidth

let isClick = false
let isMove = false
let isCanTransform = true

let isPlay = false

let duration = 0
let currentTime = 0
let currentTimeChange = 0

audio.addEventListener('loadedmetadata', () => {
    duration = audio.duration
    console.log('Трек принят')
})

setInterval(() => {
    currentTime = audio.currentTime
    console.log(currentTime)
    
    if (isCanTransform) {
        changeBarWidth(currentTime)
    }
}, 50)

volume.addEventListener('change', () => {
    audio.volume = (+volume.value / 100)
})

window.addEventListener('mousemove', Event => {
    moveAudio(Event.clientX)
})

window.addEventListener('mousedown', Event => {
    if (Event.target === progress || Event.target === progressBar || Event.target === progressBarAfter) {
        isClick = true
        moveAudio(Event.clientX)
    }
})

window.addEventListener('mouseup', Event => {
    if(isClick) {
        audio.currentTime = currentTimeChange
        isClick = false
        isCanTransform = true
    }
})

// Controls

playerControlsPlay.addEventListener('click', play)

// Functions

function changeBarWidth(a) {
    progressBar.setAttribute('style', `width: ${convertIntoPercents(a, duration, progressWidth)}px`)
}

function convertIntoPercents(a, max, b) {
    return (b * a) / max
}

function moveAudio(e) {
    if (isClick) {
        let pointerPos = e - progress.offsetLeft

        isCanTransform = false

        if (pointerPos <= 0) {
            currentTimeChange = 0
        } else if (pointerPos >= progressWidth) {
            currentTimeChange = duration
        } else {
            currentTimeChange = convertIntoPercents(pointerPos, progressWidth, duration)
        }

        changeBarWidth(currentTimeChange)
    }
}

function play() {
    if (isPlay) {
        isPlay = false
        audio.pause()
        playerControlsPlay.classList.remove('played')
    } else {
        isPlay = true
        audio.play()
        playerControlsPlay.classList.add('played')
    }
}