import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Favorite from '@material-ui/icons/Favorite';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();

        fetch('https://user-auth-backend-server.herokuapp.com/users/login', {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })  .then(res => res.json())
            .then((res) => {
                if (res.status === 200) {
                    return router.push({
                        pathname: "../",
                        query: {
                            token: res.token
                        },
                    });
                } else {
                    let error = new Error('Error ' + res.status + ': ' + res.statusText);
                    error.res = res;
                    alert("User does not exist");
                }
            }).catch(error => {
            console.log(error);
            if (error.status === 401)
                alert("User does not exist");
        });
    }


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcumbs}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Login</Typography>
            </Breadcrumbs>
            <div className={classes.paper}>
                <Avatar className={classes.avatar} bgcolor="primary.main">
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}
                      onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid item align="center">
                        <Link href="/signup" variant="body2">
                            <a>
                                Don't have an account? Sign Up
                            </a>
                        </Link>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
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
    breadcumbs: {
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));





