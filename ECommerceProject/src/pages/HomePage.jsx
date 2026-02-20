        
import Header from "../components/layout/sections/Header"
import Banner from "../components/layout/sections/Banner";
import  KeyCharacteristics from "../components/layout/sections/KeyCharacteristics";
import ExampleApplications from "../components/layout/sections/ExampleApplications";
export default function HomePage(){

    return (

        <div className="flex flex-col">
            <Header/>
            <Banner/>
                       
            <KeyCharacteristics/>
            <ExampleApplications/>

            </div>

    );
}