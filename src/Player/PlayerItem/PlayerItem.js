import React, {useState, useEffect, useRef} from 'react';
import { MdCloudDownload } from "react-icons/md";
import {
    styled, Typography, Slider,
    Paper, Stack, Box
} from '@mui/material';
import {} from './PlayerItem.css'

import playerImg from './../../assets/cassete.png'


// #region ------------ ICONS ---------
// import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// #endregion ------------ ICONS ---------

// #region ------- Tracts -------------------------------------------------------
// import fade from '../../music/As You Fade Away - NEFFEX.mp3'
// import enough from '../../music/Enough - NEFFEX.mp3'
// import immortal from '../../music/Immortal - NEFFEX.mp3';
// import playDead from '../../music/Play Dead - NEFFEX.mp3';
// import winning from '../../music/Winning - NEFFEX.mp3';
// #endregion ---------------------------------------------------------------


const CustomPaper = styled(Paper)(({theme}) => ({
    backgroundColor: '#4c4c4c',
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    padding: theme.spacing(2)
}))

const PSlider = styled(Slider)(({theme, ...props}) => ({
    color: '#748D1C',
    height: 5,
    '&:hover': {
        cursor: 'auto',
    },
    '& .MuiSlider-thumb': {
        width: '13px',
        height: '13px',
        display: props.thumbless ? 'none' : 'block',
    }
}))
// #endregion ---------------------------------------------------------------


// const playlist = [fade, enough, immortal, playDead, winning];


export default function PlayerItem({audio}) {
    const audioPlayer = useRef()
    
    const [index, setIndex] = useState(0);
    
    const [downloaded,setDownloaded]= useState(false);
    console.log('ok', downloaded);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [mute, setMute] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    
    useEffect(() => {
        if(audioPlayer){
            audioPlayer.current.volume = volume / 100;
        }
        if(isPlaying){
            setInterval(() => {
                const _duration = Math.floor(audioPlayer?.current?.duration);
                const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

                setDuration(_duration);
                setElapsed(_elapsed);
            }, 100);
        }

    }, [
        volume, isPlaying
    ]);
    function formatTime(time) {
        if(time && !isNaN(time)){
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }
        return '00:00';
    }

    const togglePlay = () => {
        if(!isPlaying) {
            audioPlayer.current.play()
        }else {
            audioPlayer.current.pause()
        }
        setIsPlaying(prev => !prev)
    }

    const toggleForward = () => {
        audioPlayer.current.currentTime += 10;
    }

    const toggleBackward = () => {
        audioPlayer.current.currentTime -= 10;
    }
    
    // function VolumeBtns(){
    //     return mute
    //         ? <VolumeOffIcon className='' onClick={() => setMute(!mute)} />
    //         : volume <= 20 ? <VolumeMuteIcon className='' onClick={() => setMute(!mute)} />
    //         : volume <= 75 ? <VolumeDownIcon className='' onClick={() => setMute(!mute)} />
    //         : <VolumeUpIcon className='' onClick={() => setMute(!mute)} />
    // }

    return (
        <div className='player-item'>
            {
                isPlaying ? <div className='player-item-img rotate'><img src={playerImg} alt=''/></div> : <div className='player-item-img'><img src={playerImg} alt=''/></div>
            }
            <div className='player-item-content'>
                {/* <CustomPaper> */}
                <audio src={audio.src} ref={audioPlayer} muted={mute} />
                <h3 className='truncate'>{audio.title}</h3>
                <div className='track'>
                    <PSlider className='tracker' thumbless value={elapsed} max={duration} />
                    <div className='time'>
                        <div>{formatTime(elapsed)}</div>
                        <div style={{marginLeft: "2px", marginRight: "2px"}}>|</div>
                        <div>{formatTime(duration)}</div>
                    </div>
                </div>
                <div>
                        {/* volume Button */}
                        {/* <div>
                            <VolumeBtns  />
                            <PSlider min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)}/>
                        </div> */}

                    <div className='play-seek-btn-container'>
                        <FastRewindIcon className="play-seek-btn" onClick={toggleBackward}/>

                        {!isPlaying
                            ?   <PlayArrowIcon fontSize={'large'} className="play-seek-btn" onClick={togglePlay}/>
                            :   <PauseIcon fontSize={'large'} className="play-seek-btn" onClick={togglePlay}/>
                        }
                        <FastForwardIcon className="play-seek-btn" onClick={toggleForward} />
                        <a href={audio.src} target="_blank" className="download" onClick={() => setDownloaded(true)}>
                            { downloaded? <MdCloudDownload className="download-btn downloaded"/> :
                                <MdCloudDownload className="download-btn"/>

                            }
                            </a>
                    </div>
                </div>
            {/* </CustomPaper> */}
</div>
            </div>
    )
}
