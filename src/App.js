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
  wraper: {
    marginTop: '5vh',
    flexDirection: "column",
    fontSize: "3rem",
    "@media (min-width:600px)": {
      fontSize: "3.5rem",
    },
  },
  head: {
    margin: "5vh",
    fontFamily: "Barlow, sans-serif",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    ailgnItems: "center",
    marginBottom: '7vh',
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
  console.log(`${allSeconds} and ${signalSeconds}`);
  useEffect(() => {
    if (allSeconds === alarmSeconds) {
      signalSound.play();
    }
    if (!allSeconds) {
      alarmSound.play();
      setIsTicking((prev) => !prev);
    }
  }, [allSeconds]);
  
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
      <Container maxWidth="sm" style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>        
        <LinearProgress variant="determinate" value={normalise(allSeconds)} />
        <Typography className={classes.head} align="center" variant="h1">
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
            section="Signal"
            isTicking={isTicking}
          />
          <Timebar
            onTimeChange={handleChange}
            resetChange={resetStatus}
            playStatus={alarmSound.paused}
            section="Alarm"
            isTicking={isTicking}
          />
        </Grid>
        <div className={classes.buttons}>
          {isTicking ? (
            <Fab
              color="secondary"
              className={classes.margin}
              onClick={() => setIsTicking(false)}
            >
              <PauseIcon />
            </Fab>
          ) : (
            <Fab
              color="primary"
              className={classes.margin}
              onClick={() => setIsTicking(true)}
            >
              <PlayArrowIcon />
            </Fab>
          )}
          <Fab
            color="secondary"
            className={classes.margin}
            onClick={() => handleReset()}
          >
            <StopIcon />
          </Fab>
          
        </div>
        {/* </div> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;