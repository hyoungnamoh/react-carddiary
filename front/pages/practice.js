import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function AutoGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container style={{textAlign: "center"}}>
                <Grid item xs>
                    <div>ddd</div>
                </Grid>
                <Grid item xs>
                    <div>ddd</div>
                </Grid>
                <Grid item xs>
                    <div>ddd</div>
                </Grid>
            </Grid>
            <Grid container style={{textAlign: "center"}}>
                <Grid item xs>
                    <div>ddd</div>
                </Grid>
                <Grid item xs={6}>
                    <div>ddd</div>
                </Grid>
                <Grid item xs>
                    <div>ddd</div>
                </Grid>
            </Grid>
        </div>
    );
}