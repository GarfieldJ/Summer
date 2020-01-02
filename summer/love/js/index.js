$(function () {
    var playerTrack = $("#player-track"),
        bgArtwork = $('#bg-artwork'),
        albumName = $('#album-name'),
        trackName = $('#track-name'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        currIndex = 0,
        musicPath = "love/images/",
        musicImage = "musicImage",
        musicJson = [
            {
                "name" : "Summer(菊次郎的夏天)",
                "singer" : "久石让",
                "url" : musicPath + "Summer.mp3",
                "image": musicPath + "Summer.jpg"
            },
            {
                "name" : "时代を超える想い",
                "singer" : "和田薫",
                "url" : musicPath + "时代を超える想い.mp3",
                "image": musicPath + "穿越时空的思念.jpg"
            },
            {
                "name" : "月灯りふんわり落ちてくる夜",
                "singer" : "やなぎなぎ",
                "url" : musicPath + "月灯りふんわり落ちてくる夜.mp3",
                "image": musicPath + "月色真美.jpg"
            },
            {
                "name" : "Heartbeats",
                "singer" : "Amy Deasismont",
                "url" : musicPath + "Heartbeats.mp3",
                "image": musicPath + "Heartbeats.jpg"
            },
            {
                "name" : "茜さす",
                "singer" : "Aimer",
                "url" : musicPath + "茜さす.mp3",
                "image": musicPath + "夏目.jpg"
            },
            {
                "name" : "遠い空へ",
                "singer" : "Bruno Wen-li",
                "url" : musicPath + "远空.mp3",
                "image": musicPath + "远空.jpg"
            },
            {
                "name" : "Take me hand",
                "singer" : "DAISHI DANCE,Cecile Corbel",
                "url" : musicPath + "Take me hand.mp3",
                "image": musicPath + "TakeMeHand.jpg"
            },
            {
                "name" : "眉间雪",
                "singer" : "HITA",
                "url" : musicPath + "眉间雪.mp3",
                "image": musicPath + "眉间雪.jpg"
            },
            {
                "name" : "The Saltwater Room",
                "singer" : "Owl City,Breanne Düren",
                "url" : musicPath + "The Saltwater Room.mp3",
                "image": musicPath + "TheSaltwaterRoom.jpg"
            },
            {
                "name" : "心拍数",
                "singer" : "papiyon,初音ミク",
                "url" : musicPath + "心拍数.mp3",
                "image": musicPath + "心拍数.jpg"
            },
            {
                "name" : "My Love",
                "singer" : "Westlife",
                "url" : musicPath + "My Love.mp3",
                "image": musicPath + "MyLove.jpg"
            },
            {
                "name" : "忆似故人曲",
                "singer" : "兔裹煎蛋卷",
                "url" : musicPath + "忆似故人曲.mp3",
                "image": musicPath + "忆似故人曲.jpg"
            },
            {
                "name" : "千年泪",
                "singer" : "Tank",
                "url" : musicPath + "千年泪.mp3",
                "image": musicPath + "千年泪.jpg"
            },
            {
                "name" : "夜的钢琴曲五",
                "singer" : "石进",
                "url" : musicPath + "夜的钢琴曲五.mp3",
                "image": musicPath + "夜的钢琴曲五.jpg"
            },
            {
                "name" : "Lemon",
                "singer" : "米津玄师",
                "url" : musicPath + "Lemon.mp3",
                "image": musicPath + "Lemon.jpg"
            },
            {
                "name" : "石楠小札",
                "singer" : "二婶",
                "url" : musicPath + "石楠小札.mp3",
                "image": musicPath + "石楠小札.jpg"
            },
            {
                "name" : "Dear・・・",
                "singer" : "西野カナ",
                "url" : musicPath + "Dear・・・.mp3",
                "image": musicPath + "Dear.jpg"
            },
            {
                "name" : "少年锦时",
                "singer" : "赵雷",
                "url" : musicPath + "少年锦时.mp3",
                "image": musicPath + "少年锦时.jpg"
            },
            {
                "name" : "云烟成雨",
                "singer" : "房东的猫",
                "url" : musicPath + "云烟成雨.mp3",
                "image": musicPath + "云烟成雨.jpg"
            },
            {
                "name" : "黯然销魂",
                "singer" : "玄觞",
                "url" : musicPath + "黯然销魂.mp3",
                "image": musicPath + "黯然销魂.jpg"
            },
            {
                "name" : "往后余生",
                "singer" : "王贰浪",
                "url" : musicPath + "往后余生.mp3",
                "image": musicPath + "往后余生.jpg"
            },
            {
                "name" : "追光者",
                "singer" : "岑宁儿",
                "url" : musicPath + "追光者.mp3",
                "image": musicPath + "追光者.jpg"
            }
        ];

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            } else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({
            'left': seekT,
            'margin-left': '-21px'
        }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({
            'left': '0px',
            'margin-left': '0px'
        }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag, init) {
        currIndex = (currIndex + flag + musicJson.length) % musicJson.length;
        musicConf = musicJson[currIndex];
        if (init === 0)
            i.attr('class', 'fa fa-play');
        else {
            albumArt.removeClass('buffering');
            i.attr('class', 'fa fa-pause');
        }

        seekBar.width(0);
        trackTime.removeClass('active');
        tProgress.text('00:00');
        tTime.text('00:00');

        audio.src = musicConf['url'];

        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        if (init !== 0) {
            audio.play();
            // 音频加载成功
            playerTrack.addClass('active');
            albumArt.addClass('active');
            clearInterval(buffInterval);
            checkBuffering();
        }

        albumName.text(musicConf['name']);
        trackName.text(musicConf['singer']);
        document.getElementById(musicImage).src = musicConf['image'];  /* 重置旋转图片 */

        /* 重置背景图片 */
        bgArtwork.css({
            'background-image': 'url(' + musicConf['image'] + ')'
        });
    }

    function initPlayer() {
        // audio = new Audio();
        selectTrack(Math.round(Math.random() * musicJson.length), 0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () {
            selectTrack(-1);
        });
        playNextTrackButton.on('click', function () {
            selectTrack(1);
        });

        // 自动切换下一首
        audio.addEventListener('ended',function(){
            selectTrack(1)
        },false);
    }

    function initGarden() {

        var together = new Date();
        together.setFullYear(2019, 7, 21);
        together.setHours(0);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);

        setTimeout(function () {
            startHeartAnimation();
        },2000);

        timeElapse(together);
        setInterval(function () {
            timeElapse(together);
        }, 500);

        adjustCodePosition();
        $("#code").typewriter();
    }

    function initBackground() {
        if (Math.random() < 0.6) {
            initSnow();
        } else {
            /* 去除背景图 */
            $('#bg-artwork').remove();
            $('#bg-layer').remove();
            $('#words').css({'color':'#f44'});
            $('#copyright').css({'color': '#f66'});

            /* 初始樱花 */
            initSakura();
        }
    }

    initBackground();
    initGarden();
    initPlayer();

});