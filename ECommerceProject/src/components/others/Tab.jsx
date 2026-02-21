import {setFilter} from "../../features/CatalogSlice"
import { useDispatch, useSelector } from "react-redux"
export function Tab(){
const dispatch = useDispatch();
const activeFilter = useSelector(state => state.catalog.activeFilter);

const tabs = [
    {label: "Latest", value: "latest"},
    {label: "Popular", value: "popular"},
    {label: "Featured", value: "featured"},
    {label: "Price: Low-High", value: "low-high"},
    {label: "Price:High-Low", value:"high-low"}
];
    return (
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row sm:justify-between w-full sm:px-16 text-gray-400 text-sm">
            <ul className="flex items-center gap-2 font-nunitoSans text-[10px] sm:text-sm">
                {tabs.map(tab => (
                    <li
                    key = {tab.value}
                    onClick={()=> dispatch(setFilter(tab.value))}
                    className="cursor-pointer flex flex-col items-center"
                    >
                        <span className={activeFilter === tab.value? "text-red-900 font-bold underline underline-offset-4": ""}>
                            {tab.label}
                            <span>
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between border outline outline-offset-0 rounded-full px-3 border-gray-300 p-2 font-nunito gap-5 w-70">
                <p className="pl-3 font-bold">Search your product here</p>
                
<svg className="p-3 rounded-full bg-[#FFA920] text-white w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="currentColor"/>
</svg>
            </div>

        </div>
    )
}