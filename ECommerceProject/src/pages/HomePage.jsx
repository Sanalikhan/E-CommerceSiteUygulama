import Header from "../components/layout/sections/Header"
import Banner from "../components/layout/sections/Banner";
import  KeyCharacteristics from "../components/layout/sections/KeyCharacteristics";
import ExampleApplications from "../components/layout/sections/ExampleApplications";
import { Products } from "../components/layout/sections/Products";
import { useRef } from "react";
import Cart from "../components/layout/Cart";

export default function HomePage(){

    const productsRef = useRef(null);

    const handleScrollToProducts = ()=>{
        productsRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (

        <div className="flex flex-col">
            <Header/>
            <Banner onViewProducts = {handleScrollToProducts}/>
            <KeyCharacteristics/>
            <ExampleApplications/>
            <div ref={productsRef}>
            <Products/>
            </div>

            <Cart/>
            
            </div>

    );
}