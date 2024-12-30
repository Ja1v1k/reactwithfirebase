import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useFirebase } from "../context/Firebase"

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase,navigate])


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('signing in user');
        const result = await firebase.signinUserWithEmailAndPass(email, password)
        console.log('successfully signed in', result);
    }

    return (<div className="container mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <h1 className="mt-5 mb-5">OR</h1>
        <Button onClick={firebase.signinWithGoogle} variant="danger">Signin with Google</Button>
    </div>)
}

export default LoginPage