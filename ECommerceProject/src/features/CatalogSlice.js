import {createSlice} from "@reduxjs/toolkit";
import { Products } from "../components/layout/sections/Products";

const initialState = {
    banner: {
        title: "Partitions And Cages",
        description1: "Industrial partitions and cages are physical barriers in industrial and commercial settings to create distinct, secure areas within a larger space. They are typically constructed from sturdy materials like wire mesh and steel, providing both security and organization.",
        description2: "Industrial partitions and cages are durable structural solutions designed to divide, secure, and organize large industrial or commercial spaces. Built with heavy-gauge wire mesh, reinforced steel panels, and strong framing, they offer long-term reliability in demanding environments. These systems integrate seamlessly into existing facility layouts and can be expanded, relocated, or reconfigured as operational needs evolve. With multiple door options, locking systems, and customizable layouts, they provide flexible, secure, and efficient workspace management.",
        image:"/images/image-18.png"
    },
    KeyCharacteristics: [
    {
    id: 1,
    title:"Security",
    description:"They prevent unauthorized access to valuable inventory, tools, equipment, or sensitive areas like server rooms and hazardous material storage.",
    icon: "security"
     },
        {
    id: 2,
    title: "Organization",
    description:
      "They help streamline workflow by creating specific work zones and separating different types of processes or materials within a facility.",
    icon: "organization"
  },
  {
    id: 3,
    title: "Safety",
    description:
      "They contribute to a safer work environment by isolating hazardous areas or machinery and protecting employees from potential dangers.",
    icon: "safety"
  }
],
exampleApplications: [
  {
    id: 1,
    title: "Warehouses and Distribution Centers",
    description:
      "Securing valuable inventory, creating separate storage areas, and restricting access to hazardous materials.",
    image: "/images/Rectangle-182.png"
  },
  {
    id: 2,
    title: "Manufacturing Facilities",
    description:
      "Guarding machinery, creating controlled environments for specific processes, and securing tool cribs and equipment.",
    image: "/images/Rectangle-10900.png"
  },
  {
    id: 3,
    title: "Data Centers",
    description:
      "Securing server racks and IT equipment, ensuring data protection and compliance.",
    image: "/images/Rectangle184.png"
  }
],
  products: [
    {
  id: 1,
  title: '36" and 48" Wide 5-S Storage Cabinets',
  image: "/images/AdobeExpressfile(8)1.png",
  price: {
    min: 1523.66,
    max: 1544.67
  },
  featured: true,
  popular : false
},
    {
      id: 2,
      image: "/images/AdobeExpressfile(9)1.png",
      title: '36" Small Parts Storage and Security Cabinets',
      price: { min: 1933.93, max: 2180.76 },
      featured: true,
      popular: false
    },
    {
      id: 3,
      image: "/images/image-4.png",
      title: "Adjustable Spring Safety Gate",
      price: { min: 159.91, max: 199.55 },
      featured: true,
      popular: true
    },
    {
      id: 4,
      image: "/images/image-5.png",
      title: "All Welded Heavy Duty Gear Lockers",
      price: { min: 534.61, max: 1172.86 },
      featured: true,
      popular: false
    },
    {
      id: 5,
      image: "/images/image-10.png",
      title: "All Welded Heavy Duty Storage Cabinet Lockers",
      price: { min: 843.47, max: 1178.0 },
      featured: false,
      popular: true
    },
    {
      id: 6,
      image: "/images/image-11.png",
      title: "Barriers",
      price: { min: 1186.0, max: 5611.0 },
      featured: false,
      popular: true
    },
    {
      id: 7,
      image: "/images/image-12.png",
      title: "Bollard Cover",
      price: { min: 40.95, max: 112.95 },
      featured: false,
      popular: true
    },
    {
      id: 8,
      image: "/images/image-13.png",
      title: "Bollard Covers",
      price: { min: 35.99, max: 79.99 },
      featured: false,
      popular: false
    },
    {
  id: 9,
  title: "Bollards",
  image: "/images/image-14.png",
  price: { min: 93.10, max: 267.93 },
  featured: false,
  popular: true
},
{
  id: 10,
  title: "Bolt Down Bollards",
  image: "/images/image-15.png",
  price: { min: 199.95, max: 629.95 },
  featured: false,
  popular: true
},
{
  id: 11,
  title: "Bounce Back Bollard",
  image: "/images/image-16.png",
  price: { min: 159.91, max: 199.55 },
  featured: false, 
  popular: false
},
{
  id: 12,
  title: "Box Lockers",
  image: "/images/image-17.png",
  price: { min: 534.61, max: 1172.86 },
  featured: false, 
  popular: true
}
  ],
  activeFilter : "Latest",
  searchTerm : ""
};
const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers:{
      setFilter : (state,action) =>{
        state.activeFilter = action.payload;
      },
      setSearchTerm : (state,action) =>{
        state.searchTerm = action.payload;
      }
    }
});
export const {setFilter, setSearchTerm} = catalogSlice.actions;
export default catalogSlice.reducer;
