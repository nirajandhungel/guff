import React from 'react'

const AuthImagePattern = ({title, subtitle}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
            <div className="grid grid-cols-3 gap-3 mb-8">

                {/* "aspect-square" ensures the element is alaways a square, h=w */}
                {/* creating an array of 9 elements, just to use that div 9 times */}
                {[...Array(9)].map((_,i)=>(
                    <div 
                    key={i}
                    className={`aspect-square rounded-2xl  ${i%2===0?"animate-pulse":""}`} 
                    style={{ backgroundColor: "#4820a569" }}
                    >

                    </div>
                ))}

            </div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-base-content/60">{subtitle}</p>
        </div>
    </div>
  )
}

export default AuthImagePattern
