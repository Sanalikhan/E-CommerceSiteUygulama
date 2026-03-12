import Newsletter from "../../others/NewsLetter";
import logo from '../../../assets/801.png'
import { QuickGridStyle } from "../../others/QuickLinkGrid";
import { ServicesGridStyle } from "../../others/ServicesFooterGrid";
import { ContactFooterGrid } from "../../others/ContactFooterGrid";
export default function Footer(){
    return(
        <div className="bg-[#2F2D42] text-gray-300 w-full flex flex-col items-center relative">
        <Newsletter/>
        <img src={logo} alt="logo" className="md:w-70 w-50 absolute top-35 lg:left-40 md:left-30 sm:left-20 left-10"/>
       
    <div className="bg-[#2F2D42] w-[90%] sm:w-[70%] text-white py-14 mt-4">

      {/* Top section */}
      <div className="flex justify-between gap-5 sm:gap-10 relative">

        {/* Left column */}
        <div className="flex flex-col gap-6 w-40 md:w-80">
          <p className="text-gray-300 pt-9 text-xs font-semibold font-nunito">
            Subscribe to our Newsletter for Spotlight Products and Specials.
          </p>

          <button className="bg-[#FFA920] text-white text-xs sm:text-base w-fit px-6 py-3 rounded-full">
            Contact Us
          </button>

          <div className="flex items-center ">
            <div className="h-0.5 bg-gray-300 rounded-full w-4"></div>
            <span className="text-gray-300 text-xs mx-2 font-semibold font-nunito">Follow on</span>

   <svg
  className="w-8 h-8 p-1 bg-[#2F2D42]"
  viewBox="0 0 24 24"
  fill="#FFFFFF"
>
  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.4V9.85c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.8 8.44-4.93 8.44-9.93z"/>
</svg>

   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-[#FFFFFF] bg-[#2F2D42] rounded-full w-8 h-8 p-2" viewBox="0 0 16 16">
  <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
</svg>
<svg fill="currentColor" className="text-white w-8 h-8 p-2 bg-[#2F2D42] rounded-full" xmlns="http://www.w3.org/2000/svg"
	 viewBox="-10 -50 300.366 400.366">
<g>
	<path d="M34.703,0.183C15.582,0.183,0.014,15.748,0,34.884C0,54.02,15.568,69.588,34.703,69.588
		c19.128,0,34.688-15.568,34.688-34.704C69.391,15.75,53.83,0.183,34.703,0.183z"/>
	<path d="M60.748,83.531H8.654c-2.478,0-4.488,2.009-4.488,4.489v167.675c0,2.479,2.01,4.488,4.488,4.488h52.093
		c2.479,0,4.489-2.01,4.489-4.488V88.02C65.237,85.539,63.227,83.531,60.748,83.531z"/>
	<path d="M193.924,81.557c-19.064,0-35.817,5.805-46.04,15.271V88.02c0-2.48-2.01-4.489-4.489-4.489H93.424
		c-2.479,0-4.489,2.009-4.489,4.489v167.675c0,2.479,2.01,4.488,4.489,4.488h52.044c2.479,0,4.489-2.01,4.489-4.488v-82.957
		c0-23.802,4.378-38.555,26.227-38.555c21.526,0.026,23.137,15.846,23.137,39.977v81.535c0,2.479,2.01,4.488,4.49,4.488h52.068
		c2.478,0,4.488-2.01,4.488-4.488v-91.977C260.366,125.465,252.814,81.557,193.924,81.557z"/>
</g>
</svg>
<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg"
	 className="text-[#FFFFFF] w-8 h-8 p-2 bg-[#2F2D42] rounded-full" viewBox="0 0 96.875 96.875">
<g>
	<path d="M95.201,25.538c-1.186-5.152-5.4-8.953-10.473-9.52c-12.013-1.341-24.172-1.348-36.275-1.341
		c-12.105-0.007-24.266,0-36.279,1.341c-5.07,0.567-9.281,4.368-10.467,9.52C0.019,32.875,0,40.884,0,48.438
		C0,55.992,0,64,1.688,71.336c1.184,5.151,5.396,8.952,10.469,9.52c12.012,1.342,24.172,1.349,36.277,1.342
		c12.107,0.007,24.264,0,36.275-1.342c5.07-0.567,9.285-4.368,10.471-9.52c1.689-7.337,1.695-15.345,1.695-22.898
		C96.875,40.884,96.889,32.875,95.201,25.538z M35.936,63.474c0-10.716,0-21.32,0-32.037c10.267,5.357,20.466,10.678,30.798,16.068
		C56.434,52.847,46.23,58.136,35.936,63.474z"/>
</g>
</svg>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-4">
            <QuickGridStyle/>
        </div>

        {/* Services */}
        <div className=" sm:flex sm:flex-col sm:gap-4 hidden">
            <ServicesGridStyle/>
        </div>

        {/* Contact */}
        <div className=" sm:flex sm:flex-col sm:gap-4 hidden">
          <ContactFooterGrid/>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-center border-t border-gray-600 mt-10 pt-6 text-gray-300 text-xs font-semibold font-nunito">

        <span>© All Copyright 2026 by cechms.co</span>
        <span>Designed And Developed by Esco Logics</span>

      </div>
        </div>
        </div>
    )
}