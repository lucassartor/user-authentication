import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import {useRouter} from 'next/router'
import jwt from 'jsonwebtoken';



async function verifyToken() {
    const router = useRouter();

     await fetch('https://user-auth-backend-server.herokuapp.com/index', {
        method: "POST",
        body: JSON.stringify({
            token: router.query.token
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "same-origin"
    }).then((res) => {
        console.log(res);
        return res.status === 200;
    }).catch(error => {
        console.log(error);
        return false;
    });
}

export default function Index() {

    const signedUp = verifyToken();
    const router = useRouter();

    if (!signedUp) {
        return (
            <Container maxWidth="sm" key="notLogged">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        You are not signed in! <br/> Please
                        <Link href="/signin" color="secondary"> Login </Link> or
                        <Link href="/signup" color="secondary"> Create a user </Link>
                    </Typography>
                </Box>
            </Container>
        )
    } else if (signedUp) {
        try {
            return (
                <Container maxWidth="sm" key="logged">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            You are signed in! <br/>
                            Your email is: {jwt.decode(router.query.token).email}
                        </Typography>
                    </Box>
                </Container>
            )
        }
        catch (e) {
            return (
                <Container maxWidth="sm" key="notLogged">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            You are not signed in! <br/> Please
                            <Link href="/signin" color="secondary"> Login </Link> or
                            <Link href="/signup" color="secondary"> Create a user </Link>
                        </Typography>
                    </Box>
                </Container>
            )
        }
    }

}