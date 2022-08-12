const Button = (props) => {
    const { id, text, disabled, onClick } = props;
    return (
        <button 
            disabled={disabled}
            id={id}
            onClick={onClick} 
            className="w-btn h-btn text-center text-gray-700 font-semibold bg-white border-white focus:outline-none hover:bg-gray-200 disabled:bg-gray-200">
                { text }
        </button>
    )
}

export default Button;