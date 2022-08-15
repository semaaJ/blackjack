import { ColorSwatchIcon, RefreshIcon, EyeIcon, PlayIcon, ChevronDoubleDownIcon } from '@heroicons/react/solid';

export const ICONS = {
    0: <ColorSwatchIcon className="h-5 w-5 text-gray-500" />,
    1: <PlayIcon className="h-5 w-5 text-gray-500" />,
    2: <ChevronDoubleDownIcon className="h-5 w-5 text-gray-500" />,              
    3: <EyeIcon className="h-5 w-5 text-gray-500" />,            
    4: <RefreshIcon className="h-5 w-5 text-gray-500" />                            
}

const Button = (props) => {
    const { id, icon, text, disabled, onClick } = props;
    return (
        <button 
            id={id}
            disabled={disabled}
            onClick={onClick} 
            aria-label={`${ text } button`}
            className="w-1/5 py-2 text-center text-gray-700 text-sm bg-white border-white sm:text-lg hover:bg-gray-200 disabled:bg-gray-200">
               <div className="flex flex-col items-center align-middle justify-center">
                    { ICONS[icon]}             
                    { text }
                </div>
        </button>
    )
}

export default Button;