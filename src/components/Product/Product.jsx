import React, { useState, useRef } from "react";
import { TextField, CircularProgress, Box } from "@mui/material";
import styles from './Product.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createProduct } from '../api/api';
import ProSidebar from "../Sidebar/pro_sidebar";

function Product() {

    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        productName: '',
        brand: '',
        rating: '',
        image: '',
        productPrice: '',
        percentage: '',
        productDescription: '',
        productColor: '',
        category: '',

    });
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const validation = (data) => {
        if (data.productName === '') {
            toast.warn('Product name is a required field');
            return false;
        } if (data.brand === '') {
            toast.warn('Brand name is a required field');
            return false;
        } if (data.rating === '') {
            toast.warn('Ratting is a required field');
            return false;
        } if (isNaN(data.rating) || data.rating < 1 || data.rating > 5) {
            toast.warn('Rating must be a number between 1 and 5');
            return false;
        } else if (!data.image) {
            toast.warn('Image is a required field');
            return false;
        } if (data.productPrice === '') {
            toast.warn('Product price is a required field');
            return false;
        } if (data.percentage === '') {
            toast.warn('Percentage is a required field');
            return false;
        } if (data.productDescription === '') {
            toast.warn('Product description is a required field');
            return false;
        } if (data.productColor === '') {
            toast.warn('Product color is a required field');
            return false;
        } if (data.category === '') {
            toast.warn('Category is a required field');
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
        formSendData.append('productName', formData.productName);
        formSendData.append('brand', formData.brand);
        formSendData.append('rating', formData.rating);
        formSendData.append('image', formData.image);
        formSendData.append('productPrice', formData.productPrice);
        formSendData.append('percentage', formData.percentage);
        formSendData.append('productDescription', formData.productDescription);
        formSendData.append('productColor', formData.productColor);
        formSendData.append('category', formData.category);

        try {
            const response = await createProduct(formSendData);
            setIsLoading(false);

            console.log("API Response:", response); // Add this line to log the response

            if (response) {
                setFormData({
                    productName: '',
                    brand: '',
                    rating: '',
                    image: '',
                    productPrice: '',
                    percentage: '',
                    productDescription: '',
                    productColor: '',
                    category: '',
                });

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                toast.success(response.data.message);
            } else {
                toast.error('Failed to create product');
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
            <div className={styles.product_div}>
                <p>Add Category Product</p>

                <TextField
                    className={styles.input}
                    id="productName"
                    label="Product Name"
                    variant="outlined"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="brand"
                    label="Brand"
                    variant="outlined"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="rating"
                    label="Rating"
                    variant="outlined"
                    value={formData.rating}
                    type="number"
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="productPrice"
                    label="Product Price"
                    variant="outlined"
                    type="number"
                    value={formData.productPrice}
                    onChange={(e) => setFormData({ ...formData, productPrice: e.target.value })}
                />

                {/* <TextField
                    className={styles.input}
                    id="discount"
                    label="Discount"
                    variant="outlined"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                /> */}

                <TextField
                    className={styles.input}
                    id="percentage"
                    label="Percentage"
                    variant="outlined"
                    type="number"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="productDescription"
                    label="Product Description"
                    variant="outlined"
                    value={formData.productDescription}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="productColor"
                    label="Product Color"
                    variant="outlined"
                    value={formData.productColor}
                    onChange={(e) => setFormData({ ...formData, productColor: e.target.value })}
                />

                <TextField
                    className={styles.input}
                    id="category"
                    label="Category"
                    variant="outlined"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />

                <div className={styles.img_div}>
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ color: '#6feeb7', fontWeight: '700' }} />

                    {formData.image && (
                        <div>
                            <img
                                src={URL.createObjectURL(formData.image)}
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

export default Product;