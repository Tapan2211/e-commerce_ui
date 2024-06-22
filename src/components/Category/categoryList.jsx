import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import styles from './category.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCategoryList } from "../api/api";

function CategotyList() {

    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const result = await getCategoryList();
                setCategory(result);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error("Fetching error category", error);
            }
        };
        fetchCategoryList();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            {isLoading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    flexDirection="column"
                >
                    <CircularProgress style={{ color: '#6feeb7' }} />
                </Box>
            ) : (
                category.map(categoryList => (
                    <div key={categoryList.id} style={{ margin: '10px' }}>
                        <p>{categoryList.categoryName}</p>
                        <img src={categoryList.categoryImage} alt={categoryList.categoryName} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                    </div>
                ))
            )}

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
    )
}

export default CategotyList;