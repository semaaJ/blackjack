import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Card = (props) => {
    const { symbol, colour, rank } = props;
    const cardRef = useRef();
  
    useEffect(() => {
        gsap.to(cardRef.current, {
            rotationY: "180",
            scaleX: "-1",
            duration: "0.2"
        });
    });
    
    return (
        <div ref={cardRef}>
            <div className="-ml-28 bg-white px-3 w-40 h-60 shadow-2xl rounded-lg sm:m-2 sm:ml-0 hover:-translate-y-4 hover:duration-300">
                <div className="flex flex-col justify-center"  style={{ backfaceVisibility: "hidden" }}>
                    <div className="flex flex-col w-full items-start ">
                        <div className="flex flex-col items-center">
                            <h1 className={`text-4xl cursor-default ${ colour }`}>{ symbol }</h1>
                            <h1 className={`text-4xl cursor-default ${ colour }`}>{ rank }</h1>
                        </div>
                    </div>
                
                    <div className="flex justify-center">
                        <h1 className={`text-7xl cursor-default ${ colour }`}>{ rank }</h1>
                    </div>
                
                    <div className="flex flex-col w-full items-end">
                        <div className="flex flex-col items-center">
                            <h1 className={`text-4xl cursor-default ${ colour }`}>{ symbol }</h1>
                            <h1 className={`text-4xl cursor-default ${ colour }`}>{ rank }</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;