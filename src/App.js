import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Fab, LinearProgress } from '@material-ui/core';
import Timebar from './components/Timebar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
let interv;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  root: {
    minHeight: '100vh',
  },
  wraper: {
    margin: 'auto 0',
    flexDirection: "column",
    fontSize: "3rem",
    "@media (min-width:600px)": {
      fontSize: "3.5rem",
    },
  },
  head: {
    margin: "auto 0",
    fontFamily: "Barlow, sans-serif",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    ailgnItems: "center",
    marginBottom: '5vh',
    marginTop: "auto",
  },
  siki: {
    display: "inline-block",
    width: "2ch",
  }
}));

function App() {
  let seconds;
  let minutes;
  let hours;
  const signalSound = document.getElementById('signalSound');
  const alarmSound = document.getElementById('alarmSound');
  const classes = useStyles();
  const [isTicking, setIsTicking] = useState(false);
  const [signalSeconds, setSignalSeconds] = useState(20 * 60);
  const [alarmSeconds, setAlarmSeconds] = useState(10 * 60);
  const [allSeconds, setAllSeconds] = useState(signalSeconds + alarmSeconds);
  const [resetStatus, setResetStatus] = useState(true);
  
  seconds = allSeconds % 60;
  minutes = Math.floor((allSeconds / 60) % 60);
  hours = Math.floor((allSeconds / 60) / 60);
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  hours = hours < 10 ? `0${hours}` : `${hours}`;

  useEffect(() => {
    if (allSeconds === alarmSeconds) {
      signalSound.play();
    }
    if (!allSeconds) {
      alarmSound.loop = true;
      alarmSound.play();
      setIsTicking((prev) => !prev);
    }
  }, [allSeconds,alarmSeconds,alarmSound,signalSound]);
  
  useEffect(() => {
    if (isTicking) {
      interv = setInterval(() => {
        setAllSeconds((prev) => (prev ? prev - 1 : prev));
      }, 1000);
      return () => clearInterval(interv);
    }
    return undefined;
  }, [isTicking]);

  useEffect(() => {
    setAllSeconds(signalSeconds + alarmSeconds);
  }, [signalSeconds, alarmSeconds]);

  const handleChange = (minutes, section) => {
    section === "Signal"
      ? setSignalSeconds(minutes * 60)
      : setAlarmSeconds(minutes * 60);
  };

  const handleReset = () => {
    setIsTicking(false);
    setSignalSeconds(20 * 60);
    setAlarmSeconds(10 * 60);
    setAllSeconds(signalSeconds + alarmSeconds);
    setResetStatus((prev) => !prev);
    alarmSound.pause();
    alarmSound.load();
  };
  
  let MAX = 0;
  let MIN = signalSeconds + alarmSeconds;
  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>        
        <LinearProgress variant="determinate" value={normalise(allSeconds)} />
        <Typography className={classes.head} align="center" variant="h1" style={{marginTop: 'clamp(10vh 20vh 40vh)'}} >
          <div className={classes.siki}>{hours}</div>
          :
          <div className={classes.siki}>{minutes}</div>
          :
          <div className={classes.siki}>{seconds}</div>
        </Typography>
        <Grid container className={classes.wraper}>
          <Timebar
            onTimeChange={handleChange}
            resetChange={resetStatus}
            playStatus={signalSound.paused}
            sound={signalSound}
            defaultMins={20}
            section="Signal"
            isTicking={isTicking}
          />
          <Timebar
            onTimeChange={handleChange}
            resetChange={resetStatus}
            playStatus={alarmSound.paused}
            sound={alarmSound}
            defaultMins={10}
            section="Alarm"
            isTicking={isTicking}
          />
        </Grid>
        <div className={classes.buttons}>
          {isTicking ? (
            <Fab
              aria-label="pause"
              color="secondary"
              className={classes.margin}
              onClick={() => setIsTicking(false)}
            >
              <PauseIcon />
            </Fab>
          ) : (
            <Fab
              aria-label="play"
              color="primary"
              className={classes.margin}
              onClick={() => setIsTicking(true)}
            >
              <PlayArrowIcon />
            </Fab>
          )}
          
          <Fab
            color="secondary"
            aria-label="stop"
            className={classes.margin}
            onClick={() => handleReset()}
          >
            <StopIcon />
          </Fab>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;