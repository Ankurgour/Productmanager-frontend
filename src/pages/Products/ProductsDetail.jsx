import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import './productDetails.css';
import 'react-image-crop/dist/ReactCrop.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: '', price: '', images: [], description: '', department: '' });
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const userRole = JSON.parse(localStorage.getItem('user')).role;
    const [product_id,setProduct_id]  = useState('');
    const [changes, setChanges] = useState({
        image:'',
        name:'',
        price:'',
        description:'',
        department:'',
    });

    console.log(changes)
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct_id(data._id)
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleChange = (e) => {
        setChanges({...changes,[e.target.name]:e.target.value});
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    images: [reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // if (!croppedImageUrl) {
        //     console.log("No image to submit");
        //     return;
        // }

        try {
            let endpoint;
            if (userRole === 'admin') {
                endpoint = 'http://localhost:5000/api/change';
            } else if (userRole === 'team member') {
                console.log('reached endpoint')
                console.log(product_id);
                endpoint = `http://localhost:5000/api/review/submitRequest/${product_id}`;
            }

            const res = await fetch(croppedImageUrl);
            const blob = await res.blob();
            const croppedImageFile = new File([blob], `${product.name.replace(/\s+/g, '_').toLowerCase()}.jpg`, { type: 'image/jpeg' });
            
            const formData = new FormData();
            formData.append("image", croppedImageFile);
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("department", product.department);
    
            const response = await fetch(`http://localhost:5000/api/review/submitRequest/${product_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({userId:JSON.parse(localStorage.getItem('user'))._id,changes:product}),
                
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit product');
            }
    
            const result = await response.json();
            console.log("Submission successful", result);
            alert("Product submitted successfully!");
            navigate('/dashboard');
    
        } catch (error) {
            console.error('Error submitting product:', error);
            alert("Error submitting product.");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                </label>
                <label>Description:
                    <textarea name="description" value={product.description} onChange={handleChange} />
                </label>
                <label>Department:
                    <input type="text" name='department' value={product.department} onChange={handleChange} />
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`product-${index}`} style={{ maxWidth: '150px' }} />
                ))}
                <button type="submit">{userRole === 'admin' ? 'Change' : 'Submit for Approval'}</button>
            </form>
        </div>
    );
}

export default ProductDetail;
