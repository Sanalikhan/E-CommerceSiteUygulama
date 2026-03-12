import security from '../../assets/Vector(1).png';
import group from '../../assets/Group1707485378.png';
import safetyicon from '../../assets/Vector.png';

const iconsMap = {
    security: security,
    safety:safetyicon,
    organization:group
};
export function KeyCharacteristicsCard({title, description, icon}){



    return (
        <div className='flex-col mb-2 md:mb-20'>
            <div className='bg-white rounded-2xl md:pl-6 pt-6 pb-2 md:pr-6 font-nunito px-5'>            
            <img src={iconsMap[icon]} alt={title} className='mb-4 h-7 w-6 md:w-7 md:h-11'/>
            <div className='font-extrabold text-3xl md:text-[30px] pb-2'>{title}</div>
            <div className='mb-7 text-base md:text-lg text-gray-500'>{description}</div>
            <div className="w-full h-px bg-gray-200 mb-7 mr-6"></div>
            </div>
            
        </div>
    )
}