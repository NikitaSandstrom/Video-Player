(function (window, document) {
    console.log("hello");
    var video = document.getElementsByTagName('video')[0],
		videoControls = document.getElementById('videoControls'),
		play = document.getElementById('play'),

		playProgressInterval,

		progressContainer = document.getElementById("progress"),
		progressHolder = document.getElementById("progress_box"),
		playProgressBar = document.getElementById("play_progress"),



		ie = (function () {
		    // borrowed from Padolsey
		    var undef,
		        v = 3,
		        div = document.createElement('div'),
		        all = div.getElementsByTagName('i');

		    while (
		        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
		        all[0]
		    );

		    return v > 4 ? v : undef;

		} ());

    var video = document.getElementsByTagName('video')[0];
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

    document.getElementById("buttonbar").addEventListener('mouseover', showBar, false);

    function showBar() {
        $("#video_container div#buttonbar #play").css("display", "inline-block");
        $("#video_container div#buttonbar div.time").css("display", "inline-block");
        $("#video_container div#buttonbar button#volumeButton").css("display", "inline-block");
        $("#video_container div#buttonbar button#fullScreen").css("display", "inline-block");
        $("#video_container div#buttonbar div#progress").css("top", "-20px");
    }

    document.getElementById("buttonbar").addEventListener('mouseout', hideBar, false);

    function hideBar() {
        $("#video_container div#buttonbar #play").css("display", "none");
        $("#video_container div#buttonbar div.time").css("display", "none");
        $("#video_container div#buttonbar button#volumeButton").css("display", "none");
        $("#video_container div#buttonbar button#fullScreen").css("display", "none");
        $("#video_container div#buttonbar div#progress").css("top", "5px");
    }

    document.getElementById("volumeButton").addEventListener("click", vidmute, false);

    function vidmute() {
        if (video.muted == true) {
            video.muted = false;
            $("#volumeButton").addClass('volume-on');
            $("#volumeButton").removeClass('volume-off');
        } else {
            video.muted = true;
            $("#volumeButton").addClass('volume-off');
            $("#volumeButton").removeClass('volume-on');
        }
    }

    document.getElementById("fullScreen").addEventListener('click', toggleFullScreen, false);

    function toggleFullScreen() {
        if (Video1.requestFullScreen) {
            Video1.requestFullScreen();
        } else if (Video1.webkitRequestFullScreen) {
            Video1.webkitRequestFullScreen();
        } else if (Video1.mozRequestFullScreen) {
            Video1.mozRequestFullScreen();
        }
    }




    var videoPlayer = {

        init: function () {
            // If IE 8 or less, get outta here. 
            if (ie < 9) return;

            // this is equal to the videoPlayer object.
            var that = this;

            // Helpful CSS trigger for JS. 
            document.documentElement.className = 'js';

            // Get rid of the default controls, because we'll use our own.
            video.removeAttribute('controls');

            // When meta data is ready, show the controls
            video.addEventListener('loadeddata', this.initializeControls, false);

            // When play, pause buttons are pressed.
            this.handleButtonPresses();

            this.videoScrubbing();
        },

        handleButtonPresses: function () {
            // When the video or play button is clicked, play/pause the video.
            video.addEventListener('click', this.playPause, false);
            play.addEventListener('click', this.playPause, false);

            // When the play button is pressed, 
            // switch to the "Pause" symbol.
            video.addEventListener('play', function () {
                play.title = 'Pause';
                $('#play').addClass('play');
                $('#play').removeClass('pause');
                videoPlayer.trackPlayProgress();
            }, false);


            // When the pause button is pressed, 
            // switch to the "Play" symbol.
            video.addEventListener('pause', function () {
                play.title = 'Play';
                $('#play').addClass('pause');
                $('#play').removeClass('play');
                videoPlayer.stopTrackingPlayProgress();
            }, false);


            // When the video has concluded, pause it.
            video.addEventListener('ended', function () {
                this.currentTime = 0;
                this.pause();
            }, false);
        },


        playPause: function () {
            if (video.paused || video.ended) {
                if (video.ended) { video.currentTime = 0; }
                video.play();
            }
            else { video.pause(); }
        },


        // Every 50 milliseconds, update the play progress. 
        trackPlayProgress: function () {
            (function progressTrack() {
                videoPlayer.updatePlayProgress();
                playProgressInterval = setTimeout(progressTrack, 50);
            })();
        },


        updatePlayProgress: function () {
            playProgressBar.style.width = ((video.currentTime / video.duration) * (progressHolder.offsetWidth)) + "px";
        },


        // Video was stopped, so stop updating progress.
        stopTrackingPlayProgress: function () {
            clearTimeout(playProgressInterval);
        },


        videoScrubbing: function () {
            progressHolder.addEventListener("mousedown", function () {
                videoPlayer.stopTrackingPlayProgress();

                videoPlayer.playPause();

                document.onmousemove = function (e) {
                    videoPlayer.setPlayProgress(e.pageX);
                }

                progressHolder.onmouseup = function (e) {
                    document.onmouseup = null;
                    document.onmousemove = null;

                    video.play();
                    videoPlayer.setPlayProgress(e.pageX);
                    videoPlayer.trackPlayProgress();
                }
            }, true);
        },

        setPlayProgress: function (clickX) {
            var newPercent = Math.max(0, Math.min(1, (clickX - this.findPosX(progressHolder)) / progressHolder.offsetWidth));
            video.currentTime = newPercent * video.duration;
            playProgressBar.style.width = newPercent * (progressHolder.offsetWidth) + "px";
        },

        findPosX: function (progressHolder) {
            var curleft = progressHolder.offsetLeft;
            while (progressHolder == progressHolder.offsetParent) {
                curleft += progressHolder.offsetLeft;
            }
            return curleft;
        }

    };

    Video1.addEventListener('timeupdate', updateProgressBar, false);

    function updateProgressBar() {
        var video = document.getElementsByTagName('video')[0];
        var percentage = video.currentTime / video.duration * 100;

        console.log(percentage);

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

    videoPlayer.init();

})(this, document);