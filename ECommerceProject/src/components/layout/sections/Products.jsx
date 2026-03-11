import { useSelector } from "react-redux"
import ProductCard from "../../Cards/ProductCard";
import { Tab } from "../../others/tab";
import Pagination from "../../others/pagination";
export function Products(){

    const {products, activeFilter, searchTerm} = useSelector((state)=> state.catalog);
    let filteredProducts = [...products];

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
        <div className="flex flex-col" >
            <Tab/>
            <div className="grid grid-col-1 justify-center sm:grid-cols-2 sm:justify-center sm:mx-auto sm:gap-x-10 lg:grid-cols-4 lg:px-10">
            {filteredProducts.map((product)=> <ProductCard 
            id = {product.id} 
            title={product.title}
            image={product.image}
            price={product.price}
            featured={product.featured}/>)}
            </div>
            <Pagination/>
        </div>

    )
}