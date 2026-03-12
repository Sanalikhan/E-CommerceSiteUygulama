import { useSelector } from "react-redux";
import { KeyCharacteristicsCard } from "../../Cards/KeyCharacteristicsCard";

export default function KeyCharacteristics(){
const keyChar =useSelector((state)=> state.catalog.KeyCharacteristics);

return (
    <div className="flex flex-col mx-auto sm:px-2 lg:px-16 bg-[#FFF4E0]">
    <h2 className="font-nunitoSans font-extrabold pt-10 sm:pt-14 md:pt-24 text-3xl md:text-5xl text-center pb-10">
        Key Characteristics
    </h2>
    <div className="flex flex-col mx-auto w-[70%] sm:w-full sm:flex-row gap-1 sm:gap-2 lg:gap-8">
        {keyChar.map((item)=> <KeyCharacteristicsCard key={item.id} 
        title = {item.title}
        description={item.description}
        icon={item.icon}/>)}
    </div>
    </div>
)



}