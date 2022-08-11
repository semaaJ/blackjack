const Button = (props) => {
    const { id, text, disabled, onClick } = props;

    return (
        <button 
            id={id}
            disabled={disabled} 
            onClick={onClick} 
            className="text-center ml-1 mr-1 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                { text }
        </button>
    )
}

export default Button;