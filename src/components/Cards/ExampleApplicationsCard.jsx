export default function ExampleApplicationCard({ title, description, image }) {
  return (
    <div className="relative flex-col mb-3 md:mb-20 justify-start gap-6 sm:w-[60%] mx-auto md:min-w-35 w-full lg:w-[60%]">

      <img
        src={image}
        alt={title}
        className="z-5 md:h-full object-cover rounded-2xl flex min-w-4xs"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20 rounded-2xl"></div>
      <div className="absolute md:top-0 top-6 z-10 flex flex-col pt-6 md:px-4 px-6 text-white font-nunito">
        <h3 className="lg:text-[30px] sm:pb-2 lg:pb-2 md:text-xl font-extrabold sm:text-4xl text-3xl">
          {title}
        </h3>
        <p className="text-base pt-3 sm:text-xl md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
