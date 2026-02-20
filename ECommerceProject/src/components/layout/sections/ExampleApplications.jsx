import { useSelector } from "react-redux";
import ExampleApplicationCard from "../../Cards/ExampleApplicationsCard";

export default function ExampleApplications() {
  const applications = useSelector(
    (state) => state.catalog.exampleApplications
  );

  return (
    <section className="w-full bg-white px-4 lg:px-16 flex-col items-center">
      <h2 className="font-extrabold font-nunitoSans text-3xl md:text-5xl sm:text-3xl lg:text-5xl  text-center my-5 sm:my-14 lg:my-14">
      Example Applications
      </h2>
      <div className="relative lg:w-[85%] mx-auto">   
<svg className="hidden lg:block lg:absolute lg:-left-16 lg:bottom-[55%] lg:p-3 lg:rounded-full lg:border lg:border-gray-300 lg:shadow lg:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="currentColor"/>
</svg>
<svg className="hidden lg:block lg:absolute lg:-right-16 lg:bottom-[55%] lg:p-3 lg:rounded-full lg:text-white lg:bg-[#FFA920] lg:shadow lg:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="currentColor"/>
</svg>
      <div className="relative flex flex-wrap lg:flex lg:flex-row md:flex md:flex-nowrap gap-2 md:gap-4 rounded-2xl px-3">
        {applications.map((item) => (
          <ExampleApplicationCard
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}

      <div className="hidden lg:absolute lg:flex lg:gap-0.5 lg:justify-center lg:w-full lg:bottom-12">
        <div className="w-2.5 h-2.5 bg-red-900 rounded-full border-red-900"></div>
        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full border-gray-300"></div>
      </div>
      </div>
      </div>

    </section>
    
  );
}