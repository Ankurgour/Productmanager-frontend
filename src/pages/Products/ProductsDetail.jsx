import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// import { label } from '../../components/ui/label';
import Header from '../../components/shared/Header'

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

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://productmanager-backend.onrender.com/api/products/${id}`);
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
                endpoint = 'https://productmanager-backend.onrender.com/api/change';
            } else if (userRole === 'team member') {
                // console.log('reached endpoint')
                // console.log(product_id);
                endpoint = `https://productmanager-backend.onrender.com/api/review/submitRequest/${product_id}`;
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
    
            const response = await fetch(`https://productmanager-backend.onrender.com/api/review/submitRequest/${product_id}`, {
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
        <>
        <Header/>
        <div className="flex justify-center items-center p-6 bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <label className="block mb-4">
                <span className="text-gray-700">Name:</span>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Price:</span>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Description:</span>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Department:</span>
                <input
                    type="text"
                    name="department"
                    value={product.department}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                />
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-red-500 hover:file:bg-blue-100"
            />
            {product.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`product-${index}`}
                    className="mt-4 max-w-xs rounded-md shadow-md"
                />
            ))}
            <button
                type="submit"
                className="mt-6 w-full py-2 px-4  text-red-500 rounded-md shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-300"
            >
                {userRole === 'admin' ? 'Change' : 'Submit for Approval'}
            </button>
        </form>
    </div>
    </>
);
}

export default ProductDetail;


// "use client";

// import { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/shared/productDetails";
// import { Input } from "../../components/ui/Input";
// import { Textarea } from "../../components/ui/Textarea";
// import { Button } from "../../components/ui/Button";

// export default function Component() {
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Card className="w-full max-w-lg mx-auto p-4">
//       <CardHeader>
//         <CardTitle>New Product</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="name" className="block text-sm font-medium">
//               Name:
//             </label>
//             <Input id="name" placeholder="New Product" defaultValue="New Product" />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="price" className="block text-sm font-medium">
//               Price:
//             </label>
//             <Input id="price" placeholder="800" defaultValue="800" />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-sm font-medium">
//               Description:
//             </label>
//             <Textarea
//               id="description"
//               placeholder="Description"
//               defaultValue="The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the goodness of 100% Natural..."
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="department" className="block text-sm font-medium">
//               Department:
//             </label>
//             <Input id="department" placeholder="Music" defaultValue="Music" />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="image" className="block text-sm font-medium">
//               Upload Image:
//             </label>
//             <input type="file" id="image" onChange={handleImageChange} className="form-input w-full p-2 border border-gray-300 rounded" />
//             {image && (
//               <div className="relative mt-2">
//                 <img
//                   className="w-full h-auto max-h-64 object-contain cursor-move resize"
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     const file = e.dataTransfer.files[0];
//                     const reader = new FileReader();
//                     reader.onloadend = () => {
//                       setImage(reader.result);
//                     };
//                     reader.readAsDataURL(file);
//                   }}
//                   src={image}
//                   alt="Product"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full bg-blue-600 text-white">Submit for Approval</Button>
//       </CardFooter>
//     </Card>
//   );
// }

