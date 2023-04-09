addEventListener('click', function (e){
    if (e.target.closest('.play-pause')){
        let playPause = e.target.closest('.play-pause'),
            v = playPause.closest('.video-wrapper').querySelector('video');
        if (v.paused){
            v.play();
            playPause.style.opacity = '0';
            playPause.style.transition = '0.3s'
        }else{
            v.pause();
            playPause.style.opacity = '1';
            playPause.style.transition = '0.3s'
        }
    }
    if (e.target.closest('.video')){
        let v = e.target.closest('.video');
        if (!v.paused){
            v.pause();
            let playPause = v.closest('.video-wrapper').querySelector('.play-pause');
            playPause.style.opacity = '1';
            playPause.style.transition = '0.3s'
        }
    }
})