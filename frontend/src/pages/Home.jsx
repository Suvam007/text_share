import React from 'react'
import { useState } from 'react'

const Home = () => {

  const [text, settext] = useState("")
  const [code, setcode] = useState("")
  const [retreivedText, setretreivedText] = useState("")
  const [inputcode, setinputcode] = useState("")

  const sharetext = async() => {
    const response = await fetch('https://text-share-final.onrender.com/generate-code',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }), // eta frontend theke backend e jai mane body will contain text
    })

    const data = await response.json();
    console.log(data)
    if(data.id){
    //console.log(response.body)
    setcode(data.id);
    }
  }

  const gettext = async()=>{
    const response = await fetch(`https://text-share-final.onrender.com/${inputcode}`);
    const data = await response.json();
    setretreivedText(data.text || "text not found")
    setinputcode("")
  }

return (
  <div className="bg-black h-screen w-screen overflow-auto p-6 text-gray-200">
    
    <div className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 pb-2">
        TextyShare
      </h1>
      <p className="text-gray-400 text-lg">Share text snippets securely and effortlessly</p>
    </div>
    
    {/* Share Section */}
    <div className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8 mb-8 shadow-lg border border-gray-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400"></div>
      
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">
        Share Text
      </h1>
      
      <div className="w-full max-w-2xl relative z-10">
        <textarea
          value={text}
          onChange={(e) => {
            settext(e.target.value)
          }}
          className="w-full h-40 bg-gray-800 rounded-lg p-4 text-gray-200 border border-gray-700 shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="Enter your text here..."
        ></textarea>
      </div>
      
      <button

        onClick={sharetext}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-medium py-3 px-8 rounded-lg mt-6 transition-all duration-200 shadow-md"
      >
        Generate Code
      </button>
      
      {code === "input something" ? (
        
  <div className="mt-6 bg-gray-800/90 p-5 rounded-lg border border-gray-700 w-full max-w-2xl shadow-lg">
    <p className="text-lg font-medium text-gray-300 flex flex-col sm:flex-row items-center justify-center gap-3">
      <span>Input something</span> 
      {/* <span className="bg-black px-4 py-2 rounded-md text-purple-300 font-mono tracking-wider border border-gray-700 shadow-inner">{code}</span> */}
    </p>
  </div>
) : code ? (
  <div className="mt-6 bg-gray-800/90 p-5 rounded-lg border border-gray-700 w-full max-w-2xl shadow-lg">
    <p className="text-lg font-medium text-gray-300 flex flex-col sm:flex-row items-center justify-center gap-3">
      <span>Share this code:</span> 
      <span className="bg-black px-4 py-2 rounded-md text-purple-300 font-mono tracking-wider border border-gray-700 shadow-inner">{code}</span>
    </p>
  </div>
) : null}

    </div>
    
    {/* Retrieve Section */}
    <div className="bg-gray-900/70 rounded-xl p-8 border border-gray-700 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500"></div>
      
      <div className="flex flex-col items-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-100">
          Retrieve Text
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 max-w-2xl mx-auto">
          <input 
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 w-full md:w-2/3 shadow-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
            value={inputcode}
            placeholder="Enter sharing code"
            onChange={(e) => {
              setinputcode(e.target.value)
            }}
          />
          
          <button
            onClick={gettext}
            className="bg-gradient-to-r from-amber-400 to-pink-500 hover:opacity-90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md w-full md:w-auto"
          >
            Retrieve
          </button>
        </div>
        
        {retreivedText && (
          <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-2xl shadow-md">
            <h3 className="text-lg font-medium text-gray-300 mb-3">Retrieved Text:</h3>
            <p className="p-4 text-gray-200 bg-black rounded-md border border-gray-700 shadow-inner min-h-12">{retreivedText}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Home
