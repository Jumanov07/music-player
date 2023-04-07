import React, { useRef, useState } from "react";
import "./App.css";
import { Photo, Audio } from "./assets";
import { musicAPI, vidArray } from "./music";

function App() {
  const [audioProgress, setAudioProgress] = useState(0);

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Alisher",
    songArtist: "Bakr",
    songSrc: Audio,
    songAvatar: Photo,
  });

  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [musicIndex, setMusicIndex] = useState(0);

  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");

  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");

  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  let avatarClass = ["objectFitCover", "objectFitContain", "none"];

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);

    const progressCount =
      (e.target.value * currentAudio.current.duration) / 100;

    currentAudio.current.currentTime = progressCount;
  };

  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];

    currentAudio.current.src = musicObject.songSrc;

    currentAudio.current.play();

    setCurrentMusicDetails({
      ...musicObject,
    });

    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : minutes
    }`;

    setMusicTotalLength(musicTotalLength0);

    let min = Math.floor(currentAudio.current.currentTime / 60);
    let sec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentTime0 = `${min < 10 ? `0${min}` : min} : ${
      sec < 10 ? `0${sec}` : sec
    }`;

    setMusicCurrentTime(musicCurrentTime0);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );

    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  return (
    <>
      <div className="container">
        <audio
          src={Audio}
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>

        <video
          src={vidArray[videoIndex]}
          autoPlay
          muted
          loop
          className="backgroundVideo"
        ></video>

        <div className="blackScreen"></div>

        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>

          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id={isAudioPlaying ? "songAvatar" : "songAvatarDefault"}
          />

          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLength">{musicTotalLength}</p>
          </div>

          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />

          <div className="musicControlers">
            <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}
            ></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>

        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
    </>
  );
}

export default App;
