 import logo from "../../../assets/801.png"
 import call from "../../../assets/call.png"
 import search from "../../../assets/search.png"
 
 
 export default function Header(){

    return (
        <header className="flex bg-[#650404] w-full justify-center">
            <div className="flex lg:gap-5 lg:h-32 lg:px-12 items-center justify-between md:py-4 p-5 w-full sm:p-5">
                    {/*logo */}
            <div>
                        <img className="md:w-50 lg:w-60 sm:w-50 w-40" src={logo} alt="logo"/>
                    </div>

                    {/*nav links*/}
                    <ul className="hidden sm:flex sm:gap-3 md:gap-5 lg:gap-18 text-white sm:items-center text-[10px] sm:text-[8px] md:text-xs lg:text-lg font-nunito">
                        <li className="flex items-center">
                            <div>About Us</div>
                            <svg className="hidden md:w-4 md:h-4  text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                         </svg>
                        </li>
                        <li>Contact Us</li>
                        <li>Products</li>
                        <li>Customized Solutions</li>
                        <li>Services</li>
                    </ul>

                    {/*contact number and search*/}
                    <div className="flex gap-4 md:gap-4 lg:gap-14">
                        <div className="flex items-center gap-2 text-white">
                        <img className="h-3" src={call}/>
                        <p className="font-nunito text-[10px] md:text-xs lg:text-lg">800-922-6120</p>
                        </div>
                        <img className="w-8 h-8 lg:h-12 lg:w-12 bg-white rounded-full" src={search} alt= "search icon"/>
                    </div>

                </div>
            

        </header>
    )
}
