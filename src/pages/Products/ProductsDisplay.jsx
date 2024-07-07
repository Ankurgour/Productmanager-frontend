import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import Loader from "../../components/shared/Loader";
import {
  CardContent,
  CardTitle,
  Card,
} from "../../components/shared/ProductCard";
import { Button } from "../../components/ui/Button";

function ProductsDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  // console.log(userRole);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://productmanager-backend.onrender.com/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <h1 className=" text-4xl text-red-500">Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-around mt-5">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="w-full max-w-sm mb-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="aspect-square object-cover w-full rounded-t-lg"
                />
                <CardContent className="p-6 grid gap-4">
                  <div className="grid gap-2">
                    <CardTitle className="text-lg font-semibold">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground justify-center">
                      <PackageIcon className="w-4 h-4" />
                      <span>{product.department}</span>{" "}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-sm leading-relaxed">
                      {product.description}{" "}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">${product.price}</div>
                      <Button className="bg-slate-100 hover:bg-red-500 w-full sm:w-auto">
                        See More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
{
  /* <div className="product-container">
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
                </div> */
}

export default ProductsDisplay;
