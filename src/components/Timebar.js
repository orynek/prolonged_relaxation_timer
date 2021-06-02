import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import IconButton from "@material-ui/core/IconButton";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const fnt = "Barlow, sans-serif";

const useStyles = makeStyles((theme) => ({
  papier: {
    justify: "center",
    margin: "15px 5px 0px",
  },
  picker: {
    marginLeft: "50%",
  },
  tytul: {
    textTransform: "uppercase",
    fontFamily: fnt,
  },
  numb: {
    fontFamily: fnt,
    fontSize: "2.5rem",
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
  },
}));

export default function Timebar({
  onTimeChange,
  section,
  isTicking,
  resetChange,
  playStatus,
  sound,
  defaultMins,
}) {
  const classes = useStyles();
  const [pickedTime, setPickedTime] = useState(defaultMins);
  const passTime = (e) => {
    onTimeChange(e.target.value, section);
    setPickedTime(e.target.value);
  };
  useEffect(() => {
    setPickedTime(defaultMins);
  }, [resetChange, defaultMins]);

  return (
    <ThemeProvider theme={theme}>
      <Grid item className={classes.papier}>
      <IconButton style={{marginLeft: '20%'}}
            aria-label="play"
            onClick={() => (sound.paused ? sound.play() : sound.load())}
          >
            {!playStatus ? <VolumeUpIcon fontSize="small" /> : <VolumeMuteIcon fontSize="small" />}
        </IconButton>
        <Typography display="inline" className={classes.tytul} variant="h4">
          {section}
        </Typography>
        <FormControl className={classes.picker}>
          <Select
            className={classes.numb}
            disabled={isTicking}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type="number"
            value={pickedTime}
            defaultValue={defaultMins}
            onChange={passTime}
          >
            <MenuItem value={0.05}>0.05</MenuItem>
            <MenuItem value={0.1}>0.1</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={35}>35</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </ThemeProvider>
  );
}
