import React, { useState, useEffect } from 'react';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Typography, Grid, FormControl, Select, MenuItem } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const fnt = 'Barlow, sans-serif';

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
    marginLeft: "20%",
    fontFamily: fnt,
  },
  numb: {
    fontFamily: fnt,
    fontSize: "2.5rem",
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
  }
}));

export default function Timebar({onTimeChange, section, isTicking, resetChange, playStatus}) {
    const classes = useStyles();
    const [pickedTime, setPickedTime] = useState(section==="Signal"? 20 : 10)
    const passTime = (e) => {
      onTimeChange(e.target.value, section);
      setPickedTime(e.target.value);
    }
    useEffect(()=>{
      setPickedTime(section==="Signal"? 20 : 10);
    },[resetChange, section])

    return (
      <ThemeProvider theme={theme}>
      <Grid item className={classes.papier}>
        <Typography className={classes.tytul} variant="h4"><IconButton aria-label="play">{!playStatus?<VolumeUpIcon fontSize='small'/>:<VolumeMuteIcon fontSize='small'/>}</IconButton>{section}</Typography>
        <FormControl className={classes.picker} >
          <Select
            className={classes.numb}
            disabled={isTicking}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type="number"
            value={pickedTime}
            defaultValue={section==="Signal"? 20 : 10}
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
