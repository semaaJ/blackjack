const Card = (props) => {
    const { symbol, colour, rank, classNames } = props;
    const cardCss = "bg-white px-3 shadow-xl ring-1 ring-gray-900/5 w-40 h-60 m-2 ";

    return (
        <div className={classNames ? `${classNames} ${cardCss}` : cardCss}>
            <div className="mx-auto ">
                <div className="flex flex-col w-full">
                    <h1 className={`text-4xl ${ colour }`}>{ symbol }</h1>
                    <h1 className={`text-4xl ${ colour }`}>{ rank }</h1>
                </div>
            
                <div className="flex justify-center">
                    <h1 className={`text-7xl ${ colour }`}>{ rank }</h1>
                </div>
            
                <div className="flex flex-col w-full items-end">
                    <h1 className={`text-4xl ${ colour }`}>{ rank }</h1>
                    <h1 className={`text-4xl ${ colour }`}>{ symbol }</h1>
                </div>
            </div>
        </div>
    )
}

export default Card;