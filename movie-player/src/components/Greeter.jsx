import React from 'react'

const Greeter = ({ username }) => {

  const message = `Hello, ${ username }`
  
    return (
    <div className="bg-black text-white flex flex-col justify-left items-left">
      <h1 className="text-4xl font-bold pt-3 pl-10">{ message }</h1>
    </div>
    )
}

export default Greeter