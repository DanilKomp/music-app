const app = () => {
    //Identify elements
    const playerContainer = document.querySelector('.player-conteiner');
    const soundPicker = document.querySelector('.sound-picker');

    const play = document.querySelector('.player-conteiner .play');
    const video = document.querySelector('.vid-container video');
    var song = document.querySelector('.song');
    const burger_btn_open = document.querySelector('.open-slide-nav');
    const burger_btn_close = document.querySelector('.close-slide-nav');
    const slide_nav = document.querySelector('.slide-nav');
    const outline = document.querySelector('.moving-outline circle');

    const nextSound = document.querySelector('.nextSound');
    const prevSound = document.querySelector('.prevSound');

    var SongName = document.querySelector('.popup span');

    var soundVolumeInput = document.getElementById('vol-control');
    var soundVolumeDisplay = document.getElementById('vol-display');
    soundVolumeDisplay.innerHTML = `${Math.floor(soundVolumeInput.value * 100)}%`;;

    soundVolumeInput.addEventListener('input', () => {
        soundVolumeDisplay.innerHTML = `${Math.floor(soundVolumeInput.value * 100)}%`;
        song.volume = soundVolumeInput.value;
    });


    //All songs
    const LoFiHipHop = [
        {
            SongSrc: '/index/sounds/LoFiHipHop/flowers.mp3',
            SongName: 'flowers'
        },
        {
            SongSrc: '/index/sounds/LoFiHipHop/Grape Choice (from EN KYOTO).mp3',
            SongName: 'Grape Choice (from EN KYOTO)'
        },
        {
            SongSrc: '/index/sounds/LoFiHipHop/outer.rim.mp3',
            SongName: 'outer'
        },
        {
            SongSrc: '/index/sounds/LoFiHipHop/time.mp3',
            SongName: 'time'
        }
    ];
    const ReadingMusic = [
        {
            SongSrc: '/index/sounds/ReadingMusic/music for reading (background Music).mp3',
            SongName: 'background Music'
        },
        {
            SongSrc: '/index/sounds/ReadingMusic/music for reading (Focus and Concentration).mp3',
            SongName: 'Focus and Concentration'
        },
        {
            SongSrc: '/index/sounds/ReadingMusic/music for reading (relaxing music).mp3',
            SongName: 'relaxing music'
        },
        {
            SongSrc: '/index/sounds/ReadingMusic/music for reading (Studying Music).mp3',
            SongName: 'Studying Music'
        }
    ];
    const NatureSounds = [

    ];

    //Souns buttons
    const sounds = document.querySelectorAll('.sound-picker button');
    const musicLists = document.querySelectorAll('.musicList');
    var songDuration = Math.floor(song.duration);

    //Time display
    const time_display = document.querySelector('.time-display');

    //Get the length of the outline 
    const outline_length = outline.getTotalLength();

    outline.style.strokeDasharray = outline_length;
    outline.style.strokeDashoffset = outline_length;

    // Play or Pause song
    play.addEventListener('click', () => {
        checkPlaying(song);
    });


    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            play.src = '/index/svg/pause.svg';
        } else {
            song.pause();
            play.src = '/index/svg/play.svg';
        }
    }

    //Don't touch!
    var songIndex = 0;
    var genre2;
    //Change the genre of music
    sounds.forEach(element => {
        var genre = element.getAttribute('genre');
        element.addEventListener('click', () => {
            playerContainer.classList.add('show-player-conteiner');
            soundPicker.classList.add('slide-sound-picker');
            songIndex = 0;
            genre2 = genre;
            song.src = eval(genre + '[songIndex].SongSrc');
            SongName.textContent = eval(genre + '[songIndex].SongName');
            checkPlaying(song);
        });
    });

    //Display music list under btn
    // sounds.forEach(element => {
    //     element.addEventListener('click', () => {
    //         musicLists.forEach(el => {
    //             el.classList.toggle('showMusicList');
    //             el.classList.toggle('hideMusicList');
    //         });
    //     });
    // });

    // next or prev song
    nextSound.addEventListener('click', () => {
        try {
            songIndex++;
            song.src = eval(genre2 + '[songIndex].SongSrc');
            SongName.textContent = eval(genre2 + '[songIndex].SongName');
            checkPlaying(song);
        } catch (err) {
            songIndex--;
        }
    });

    prevSound.addEventListener('click', () => {
        try {
            songIndex--;
            song.src = eval(genre2 + '[songIndex].SongSrc');
            SongName.textContent = eval(genre2 + '[songIndex].SongName');
            checkPlaying(song);
        } catch (err) {
            songIndex++;
        }
    });

    //Song on time update
    song.ontimeupdate = () => {
        songDuration = Math.floor(song.duration);
        let currentTime = song.currentTime;
        let elapsed = songDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outline_length - (currentTime / songDuration) * outline_length;
        outline.style.strokeDashoffset = progress;

        time_display.textContent = `${minutes}:${seconds}`;

        //Check the end of the song
        if (currentTime >= songDuration) {
            try {
                //Try to go to the next song
                song.currentTime = 0;
                songIndex++;
                song.src = eval(genre2 + '[songIndex].SongSrc');
                SongName.textContent = eval(genre2 + '[songIndex].SongName');
                play.src = '/index/svg/play.svg';
                video.pause();
                checkPlaying(song);
            } catch (err) {
                //If it was the last song, repeat it 
                songIndex--;
                song.src = eval(genre2 + '[songIndex].SongSrc');
                SongName.textContent = eval(genre2 + '[songIndex].SongName');
                checkPlaying(song);
            }
        }
    }


    // Open/Close slide nav
    // Code is shit but I don't care
    burger_btn_open.addEventListener('click', () => {
        slide_nav.style.transform = 'translate(0)';
    })

    burger_btn_close.addEventListener('click', () => {
        slide_nav.style.transform = 'translate(-300px)';
    })



}
app();

