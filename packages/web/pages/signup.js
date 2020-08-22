import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Favorite from "@material-ui/icons/Favorite";
import {useRouter} from "next/router";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";



export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();

        fetch('https://user-auth-backend-server.herokuapp.com/users/signup', {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        }).then((res) => {
            if (res.status === 201) {
                alert("User was signed up");
                return router.push('../signin');
            } else if(res.status === 409) {
                alert("User already exists");
            } else
                alert("Error");
        }).catch(error => {
            console.log(error);
            if (error.status === 500)
                alert("Error");
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcumbs}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Sign Up</Typography>
            </Breadcrumbs>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Your Name"
                                autoFocus
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                <a>
                                Already have an account? Sign in
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Made with <Favorite className={classes.heart}/> {'by '}
                    <Link color="inherit" href="https://github.com/lucassartor">
                        {'Lucas Sartor'}
                    </Link>{' '}
                </Typography>
            </Box>
        </Container>
    );

}



const useStyles = makeStyles((theme) => ({
    breadcumbs:{
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heart: {
        color: theme.palette.secondary.main,
        height: 18,
        paddingTop: 5
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));