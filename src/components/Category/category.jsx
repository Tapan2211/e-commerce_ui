import React, { useState, useRef, useEffect } from "react";
import { TextField, CircularProgress, Box } from "@mui/material";
import styles from './category.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createCategory } from '../api/api';
import ProSidebar from "../Sidebar/pro_sidebar";
import CategoryList from "./categoryList";

function Category() {

    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImage: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, categoryImage: file });
        }
    };

    const validation = (data) => {
        if (data.categoryName === '') {
            toast.warn('CategoryName is a required field');
            return false;
        } else if (!data.categoryImage) {
            toast.warn('CategoryImage is a required field');
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

        try {
            const response = await createCategory(formSendData);
            setIsLoading(false);
            if (response) {

                setFormData({
                    categoryName: '',
                    categoryImage: '',
                });
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                toast.success(response.message);
            } else {
                toast.error('Failed to create category');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Error: " + error.message || "An error occurred");

        }
    };

    return (
        <div className={styles.main_div}>
            <div>
                <ProSidebar />
            </div>
            <div className={styles.category_div}>
                <p>Add Category</p>
                <TextField
                    className={styles.input}
                    id="categoryName"
                    label="Category Name"
                    variant="outlined"
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                />

                <div className={styles.img_div}>
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ color: '#6feeb7', fontWeight: '700' }} />

                    {formData.categoryImage && (
                        <div>
                            <img
                                src={URL.createObjectURL(formData.categoryImage)}
                                alt="Selected"
                                className={styles.selected_img}
                            />
                        </div>
                    )}
                </div>

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
                    <button onClick={handleForm} className={styles.btn}>Submit</button>
                )}

                {/* <CategoryList /> */}

                <ToastContainer position='bottom-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light' />
            </div>
        </div>
    )
}

export default Category;