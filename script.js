$(document).ready(function () {
    console.log("hello");
    var video = document.getElementById("Video1");
    console.log(Math.floor(video.duration + 1));

    $('#time-total').text(" 0:" + video.duration.toFixed(0));
    $('#time-current').text("0:0" + video.currentTime.toFixed(0));

    function updateTime() {
        $('#time-current').text("0:0" + video.currentTime.toFixed(0));
        if (video.currentTime.toFixed(0) >= 10) {
            $('#time-current').text("0:" + video.currentTime.toFixed(0));
        }
    }


    video.ontimeupdate = function () {
        updateTime()
    };

    document.getElementById("pause-play").addEventListener("click", vidplay, false);

    function vidplay() {
        if (video.paused) {
            video.play();
            document.getElementById("pause-play").classList.add('play');
            document.getElementById("pause-play").classList.remove('pause');
        } else {
            video.pause();
            document.getElementById("pause-play").classList.add('pause');
            document.getElementById("pause-play").classList.remove('play');
        }
    }

    document.getElementById("volume-on-off").addEventListener("click", vidmute, false);

    function vidmute() {
        var video = document.getElementById("Video1");
        if (video.muted == true) {
            video.muted = false;
            document.getElementById("volume-on-off").classList.add('volume-on');
            document.getElementById("volume-on-off").classList.remove('volume-off');
        } else {
            video.muted = true;
            document.getElementById("volume-on-off").classList.add('volume-off');
            document.getElementById("volume-on-off").classList.remove('volume-on');
        }
    }

    document.getElementById("progress-bar").addEventListener("click", getClickPosition, false);

    function getClickPosition(e) {

        var posProgBar = document.getElementById("progress-bar").offsetLeft;
        var posButtonBar = document.getElementById("buttonbar").offsetLeft;
        var posClick = e.pageX;
        var posOffset = posClick - posButtonBar - posProgBar;
        var barWidth = document.getElementById("progress-bar").offsetWidth;
        var barPercentage = Math.floor((posOffset / barWidth) * 100);
        if (barPercentage > 98) {
            barPercentage = 100;
        }
        console.log('XPosProgBar: ' + posProgBar + ' posOffset: ' + posOffset + ' barPercent: ' + barPercentage + ' barWidth: ' + barWidth);
        document.getElementById('play-progress').style.width = barPercentage + '%';





        var updatePlayProgress=function(){ 
		    playProgressBar.style.width = ( (video.currentTime / video.duration) * (progressHolder.offsetWidth) ) + "px"; 
	    }


        //$('#progress-bar').click()

        updateProgressBar(barPercentage);

    }

     Video1.addEventListener('timeupdate', updateProgressBar, false);

    function updateProgressBar(barPercentage) {
        var progressBar = $('#progress-bar');
        var percentage = barPercentage;
        progressBar.value = percentage;

        var time = video.currentTime / video.duration * 100;
        console.log(time);

        document.getElementById('play-progress').style.width = time + '%';


        //DESTRUCTIVE
        $('#script > p').removeClass('current');

        //CONSTRUCTIVE
        if (percentage >= 0 && percentage < 5) {
            $('#line-1').addClass('current');
        } else if (percentage >= 5 && percentage <= 12) {
            $('#line-2').addClass('current');
        } else if (percentage > 12 && percentage <= 19) {
            $('#line-3').addClass('current');
        } else if (percentage >= 19 && percentage <= 23) {
            $('#line-4').addClass('current');
        } else if (percentage > 23 && percentage <= 29) {
            $('#line-5').addClass('current');
        } else if (percentage > 29 && percentage <= 37) {
            $('#line-6').addClass('current');
        } else if (percentage >= 37 && percentage < 45) {
            $('#line-7').addClass('current');
        } else if (percentage >= 45 && percentage <= 52) {
            $('#line-8').addClass('current');
        } else if (percentage > 52 && percentage < 58) {
            $('#line-9').addClass('current');
        } else if (percentage >= 58 && percentage <= 65) {
            $('#line-10').addClass('current');
        } else if (percentage > 65 && percentage <= 69) {
            $('#line-11').addClass('current');
        } else if (percentage >= 69 && percentage <= 77) {
            $('#line-12').addClass('current');
        } else if (percentage >= 77 && percentage <= 81) {
            $('#line-13').addClass('current');
        } else if (percentage >= 81 && percentage <= 89) {
            $('#line-14').addClass('current');
        } else if (percentage >= 89 && percentage <= 96) {
            $('#line-15').addClass('current');
        } else if (percentage >= 96 && percentage <= 100) {
            $('#line-16').addClass('current');
        } else if (percentage == 0 || percentage > 100) {
            $('#line-16').removeClass('current');
            $('#line-1').removeClass('current');
        }

        //console.log(percentage);
    }



    document.getElementById("full-screen").addEventListener("click", toggleFullScreen, false);

    function toggleFullScreen() {
        if (Video1.requestFullScreen) {
            Video1.requestFullScreen();
        } else if (Video1.webkitRequestFullScreen) {
            Video1.webkitRequestFullScreen();
        } else if (Video1.mozRequestFullScreen) {
            Video1.mozRequestFullScreen();
        }
    }


});