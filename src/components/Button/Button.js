import { ColorSwatchIcon, RefreshIcon, EyeIcon, PlayIcon } from '@heroicons/react/solid';

export const ICONS = {
    0: <ColorSwatchIcon className="w-5 text-gray-500 sm:flex-row ml-2" />,
    1: <PlayIcon className="h-5 w-5 text-gray-500 sm:flex-row ml-2" />,
    2: <h1 className="text-base text-gray-500 sm:flex-row ml-2">x2</h1>,              
    3: <EyeIcon className="h-5 w-5 text-gray-500 sm:flex-row ml-2" />,            
    4: <RefreshIcon className="h-5 w-5 text-gray-500 sm:flex-row ml-2" />                            
}

const Button = (props) => {
    const { id, icon, text, disabled, onClick } = props;
    return (
        <button 
            id={id}
            disabled={disabled}
            onClick={onClick} 
            className="w-btn-small sm:h-btn text-center text-gray-700 text-sm bg-white border-white 
                sm:w-full sm:font-semibold sm:text-lg hover:bg-gray-200 disabled:bg-gray-200">
               <div className="flex flex-col flex-col-reverse items-center justify-center sm:flex-row ">
                   { text }
                   { ICONS[icon]}             
                </div>
        </button>
    )
}

export default Button;