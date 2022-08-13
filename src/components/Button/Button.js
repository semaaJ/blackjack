import { ColorSwatchIcon, RefreshIcon, EyeIcon, PlayIcon } from '@heroicons/react/solid';

export const ICONS = {
    0: <ColorSwatchIcon className="ml-2 h-5 w-5 text-gray-500" />,
    1: <PlayIcon className="ml-2 h-5 w-5 text-gray-500" />,
    2: <h1 className="ml-2 text-base text-gray-500">x2</h1>,              
    3: <EyeIcon className="ml-2 h-5 w-5 text-gray-500" />,            
    4: <RefreshIcon className="ml-2 h-5 w-5 text-gray-500" />                            
}

const Button = (props) => {
    const { id, icon, text, disabled, onClick } = props;
    return (
        <button 
            id={id}
            disabled={disabled}
            onClick={onClick} 
            className="w-btn-small h-btn text-center text-gray-700 text-sm bg-white border-white 
                sm:w-full sm:font-semibold sm:text-lg hover:bg-gray-200 disabled:bg-gray-200">
               <div className="flex items-center justify-center">
                   { text }
                   { ICONS[icon]}             
                </div>
        </button>
    )
}

export default Button;