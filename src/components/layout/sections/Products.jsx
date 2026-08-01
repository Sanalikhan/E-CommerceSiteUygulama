import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Cards/ProductCard";
import { Tab } from "../../others/Tab";
import { fetchProducts } from "../../../features/CatalogSlice";

export function Products() {

    const { products, activeFilter, searchTerm, status, error } = useSelector((state) => state.catalog);
    const dispatch = useDispatch();
    let filteredProducts = [...products];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    //filtering based on opened tab
    switch (activeFilter){
        case "featured":
        filteredProducts = products.filter(product=> product.featured === true);
        break;

        case "popular":
        filteredProducts = products.filter(product=> product.popular === true);
        break;

        case "low-high":
        filteredProducts = [...products].sort((a,b)=> a.price.min - b.price.min);
        break;

        case "high-low":
        filteredProducts = [...products].sort((a,b)=> b.price.min - a.price.min);
        break;

        default:
        filteredProducts = products;
    }
    if (searchTerm.trim() !== ""){
        filteredProducts = filteredProducts.filter(product=> product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return (
        <div className="flex flex-col">
            <Tab/>
            {status === 'loading' && (
                <div className="text-center py-16 text-gray-600">Loading products...</div>
            )}
            {status === 'failed' && (
                <div className="text-center py-16 text-red-600">{error}</div>
            )}
            <div className="grid grid-col-1 justify-center sm:grid-cols-2 sm:justify-center sm:mx-auto sm:gap-x-10 lg:grid-cols-4 lg:px-10">
                {filteredProducts.map((product)=> (
                    <ProductCard 
                        key={product.id}
                        id={product.id} 
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        featured={product.featured}
                    />
                ))}
            </div>
        </div>

    )
}