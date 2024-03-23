import React, { useEffect, useState } from 'react';
import './products.css';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
// import PendingRequestsPage from '../pendingRequest.jsx/requests';

function ProductsDisplay() {
    const [products, setProducts] = useState([]);
        const navigate = useNavigate();
        const userRole = JSON.parse(localStorage.getItem('user')).role;
        console.log(userRole);

        
        const handleLogout = () => {
          localStorage.clear();
        //   console.log("use");
          
          navigate('/login');
        }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    

    return (
        <>
            <div className="top-bar"> 
                <div className="top-right-links">
                    {userRole === 'admin' && <Link to='/pending-requests'>Pending Requests</Link>}
                    {userRole === 'team member' && <Link to='/profile/mysubmission'>My Submissions</Link>}
                    <Link to='/profile'>My Profile</Link>
                    <Link to='/login' onClick={handleLogout}>Logout</Link>
                </div>
            </div>
            <h1>Products </h1>
            <div className="product-container">
            
                {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="product">
                            <h2>{product.name}</h2>
                            {product.images.map((image, index) => (
                                <img key={index} src={image} alt={product.name} className="product-image" />
                            ))}
                            <p><strong>$ </strong>{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ProductsDisplay;
