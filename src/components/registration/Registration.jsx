import React, { useState } from "react";
import styles from './Registration.module.css';
import { register } from '../api/api';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    TextField,
    CircularProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from "@mui/material";

function Registration() {

    const [formdata, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        gender: 'female',
        password: ''
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validation = (data) => {
        if (data.name === '') {
            toast.warn('Name is a required field');
            return false;
        } else if (data.email === '') {
            toast.warn('Email is a required field');
            return false;
        } else if (!validator.isEmail(data.email)) {
            toast.warn('Please enter a valid email address');
            return false;
        } else if (data.number === '') {
            toast.warn('Number is a required field');
            return false;
        } else if (data.number.length < 10) {
            toast.warn('Please enter valid number');
            return false;
        } else if (data.address === '') {
            toast.warn('Address is a required field');
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
            name: formdata.name,
            email: formdata.email,
            number: formdata.number,
            address: formdata.address,
            password: formdata.password,
            gender: formdata.gender
        }
        console.log('formSendData', formSendData)
        try {
            const response = await register(formSendData);
            if (response) {
                setIsLoading(false);
                setFormData({
                    name: '',
                    email: '',
                    number: '',
                    gender: '',
                    address: '',
                    password: ''
                });
                toast.success(response.message);
                navigate('/');
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
                        <p className={styles.title}>Registration</p>

                        <TextField
                            className={styles.input}
                            id="Name"
                            label="Name"
                            variant="outlined"
                            value={formdata.name}
                            onChange={(e) => setFormData({ ...formdata, name: e.target.value })} />

                        <TextField
                            className={styles.input}
                            id="Email"
                            label="Email"
                            variant="outlined"
                            value={formdata.email}
                            onChange={(e) => setFormData({ ...formdata, email: e.target.value })} />

                        <TextField
                            className={styles.input}
                            id="Number"
                            label="Number"
                            variant="outlined"
                            type="number"
                            max='10'
                            value={formdata.number}
                            onChange={(e) => setFormData({ ...formdata, number: e.target.value })} />

                        <FormControl >

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className={styles.form_control_vertical}
                                defaultValue="female"
                                value={formdata.gender}
                                onChange={(e) => setFormData({ ...formdata, gender: e.target.value })} >

                                <FormLabel id="demo-row-radio-buttons-group-label" style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>Gender</FormLabel>
                                <FormControlLabel className={styles.form_label} value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />

                            </RadioGroup>
                        </FormControl>
                        <TextField
                            className={styles.input}
                            id="Address"
                            label="Address"
                            variant="outlined"
                            value={formdata.address}
                            onChange={(e) => setFormData({ ...formdata, address: e.target.value })} />

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
                                    onClick={handleSubmit}>Registration</button>

                            )

                        }

                        <p>Don't have an account? <span style={{ color: '#6feeb7', cursor: 'pointer' }}><Link to="/">SignUp</Link></span></p>
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

export default Registration;