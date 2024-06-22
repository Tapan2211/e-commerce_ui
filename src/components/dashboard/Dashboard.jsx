import React, { useState } from "react";
import { TextField, CircularProgress, Box } from "@mui/material";
import styles from './Dashboard.module.css';

import { createCategory } from "../api/api";
import ProSidebar from '../Sidebar/pro_sidebar';
import Category from "../Category/category";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
    // const fileInputRef = useRef(null);
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
        console.log("FileName", file);
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
                // if (fileInputRef.current) {
                //     fileInputRef.current.value = '';
                // }
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ProSidebar />
        </div>
    );
}

export default Dashboard;
