import React, { useState, useEffect } from "react";
import { makeStyles} from "@material-ui/core/styles";
import { Typography, Grid, FormControl, Select, MenuItem } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import IconButton from "@material-ui/core/IconButton";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";

const useStyles = makeStyles(() => ({
  papier: {
    justify: "center",
    margin: "15px 5px 0px",
  },
  picker: {
    marginLeft: "50%",
    position:'relative',
    '&:after': {
      content: '"min"',
      fontSize: '1.5rem',
      opacity: '0.2',
      // height: '30px',
      // width: '0px',
      bottom:'10px',
      left:'-45px',
      position: 'absolute',
      color: "#0099FF",
      zIndex:'-1',
    },
  },
  tytul: {
    textTransform: "uppercase",
    fontSize: "2rem",
    "@media (min-width:300px)": {
      fontSize: "2.5rem",
    },
    "@media (min-width:350px)": {
      fontSize: "3rem",
    },
  },
  numb: {
    fontSize: "2rem",
    "@media (min-width:300px)": {
      fontSize: "2.5rem",
    },
    "@media (min-width:350px)": {
      fontSize: "3rem",
    },
  },
}));

export default function Timebar({ onTimeChange, section, isTicking, resetChange, playStatus, sound, defaultMins }) {

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
      <Grid item className={classes.papier}>
      <IconButton style={{marginLeft: 'clamp(5%, 15%, 30%)'}}
            aria-label="play"
            onClick={() => (sound.paused ? sound.play() : sound.load())}
          >
            {!playStatus ? <VolumeUpIcon fontSize="small" /> : <VolumeMuteIcon fontSize="small" />}
        </IconButton>
        <Typography display="inline" className={classes.tytul} color="primary" variant="h4">
          {section}
        </Typography>
        <FormControl className={classes.picker}>
          <Select
            className={classes.numb}
            disabled={isTicking}
            labelId="demo-simple-select-label"
            id={`${section}`}
            type="number"
            value={pickedTime}
            defaultValue={defaultMins}
            onChange={passTime}
          >
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
  );
}
