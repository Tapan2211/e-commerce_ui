import React, { useEffect, useState } from "react";
import styles from './LoginAuth.module.css';
import { userLogin } from '../api/api';
import { setToke, isTokenExpired, removeToken, getToken } from '../../utils/storage';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { useNavigate, Link } from "react-router-dom";
import { Box, Card, CardContent, Button, TextField, CircularProgress } from "@mui/material";

function LoginAuth() {

    const [formdata, setFormData] = useState({
        email: '',
        password: '',
        token: ''
    });
    const navigate = useNavigate();
    const [storedValue, setStoredValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(getToken())
        if (isTokenExpired) {
            // Token is expired, perform logout or token refresh logic
            // For now, just remove the token
            removeToken();
            navigate('/');
        } else {
            // Token is valid, navigate to dashboard
            navigate('/dashboard');
        }
    }, [])

    const validation = (data) => {
        if (data.email === '') {
            toast.warn('Email is a required field');
            return false;
        } else if (!validator.isEmail(data.email)) {
            toast.warn('Please enter a valid email address');
            return false;
        } else if (data.password === '') {
            toast.warn('Password is a required field');
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async () => {
        if (!validation(formdata)) {
            return false;
        }
        setIsLoading(true);

        const formSendData = {
            email: formdata.email,
            password: formdata.password
        }
        try {
            const response = await userLogin(formSendData);
            if (response) {
                setIsLoading(false);
                setFormData({
                    email: '',
                    password: ''
                });
                const generatedToken = response.token;
                console.log("generatedToken", generatedToken);
                setToke(generatedToken);
                toast.success(response.message);
                navigate('/dashboard');
            } else {
                setIsLoading(false);
                toast.error('Failed to login');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Error: " + error.message || "An error occurred");
        }
    }

    return (
        <div className={styles.main_div}>
            <Card sx={{ minWidth: 450, }}>
                <CardContent>

                    <div className={styles.sub_div}>
                        <p className={styles.title}>Login</p>

                        <TextField
                            className={styles.input}
                            id="Email"
                            label="Email"
                            variant="outlined"
                            value={formdata.email}
                            onChange={(e) => setFormData({ ...formdata, email: e.target.value })} />

                        <TextField
                            className={styles.input}
                            id="Password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={formdata.password}
                            onChange={(e) => setFormData({ ...formdata, password: e.target.value })} />

                        <div className={styles.line}></div>
                        {
                            isLoading ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <CircularProgress size={20} style={{ color: '#6feeb7', marginTop: '10px' }} />
                                </Box>
                            ) : (
                                <button
                                    variant="contained"
                                    className={styles.button}
                                    onClick={handleSubmit}>Login</button>

                            )

                        }

                        <p>Don't have an account? <span style={{ color: '#6feeb7', cursor: 'pointer' }}><Link to="/register">SignUp</Link></span></p>
                    </div>

                </CardContent>
            </Card>
            <ToastContainer position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light' />
        </div >
    )
}

export default LoginAuth;