import React, { useState } from "react";
import { TextField, CircularProgress, Box } from "@mui/material";
import styles from './Dashboard.module.css';
import { createCategory } from "../api/api";
import Sidebar from "../Sidebar/sidebar";

function Dashboard() {

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImage: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
        console.log("FIleName", file);
    };


    const validation = (data) => {
        if (data.firstname === '') {
            console.log('Category is a required field');
            return false;
        } else {
            return true;
        }
    };

    const handleForm = async () => {
        if (!validation(formData)) {
            return false;
        }
        setIsLoading(true);

        const formSendData = new FormData();
        formSendData.append('categoryName', formData.categoryName);
        formSendData.append('categoryImage', formData.categoryImage);
        console.log("FormData:", formSendData);

        try {
            const response = await createCategory(formSendData);
            setIsLoading(false);
            if (response) {

                setFormData({
                    categoryName: '',
                    categoryImage: '',
                });
                console.log(response.message);
            } else {
                console.log('Failed to create category');
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: " + error.message || "An error occurred");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className={styles.main_div}>
                <h1>Dashboard</h1>
                <TextField
                    className={styles.input}
                    id="categoryName"
                    label="Category Name"
                    variant="outlined"
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                />

                <input type="file" accept="image/*" onChange={handleImageChange} />

                {formData.categoryImage && (
                    <div>
                        <h3>Selected Image:</h3>
                        <img
                            src={URL.createObjectURL(formData.categoryImage)}
                            alt="Selected"
                            style={{ width: '100px', height: '80px', margin: '5px', borderRadius: '5px' }}
                        />
                    </div>
                )}

                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <CircularProgress size={20} style={{ color: '#6feeb7', marginTop: '10px' }} />
                    </Box>
                ) : (
                    <button onClick={handleForm}>Submit</button>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
