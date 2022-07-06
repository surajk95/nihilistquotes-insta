import './App.css';
import imge from './gold-contour.png'
import html2canvas from 'html2canvas'
import { useState, useEffect } from 'react'
import { quotes } from './quotes'

function App() {
  const [config, setConfig] = useState({shouldGenerate: true, index: 0})

  const onImageLoad = async () => {
    console.log(`onimageload`, config)
    if(config.index===0)  {
      setConfig(config => ({...config, index: 1}))
      return
    }
    if(!config.shouldGenerate) return

    //change quote and trigger download
    if(config.index===3) {
      setConfig({...config, shouldGenerate: false})
      alert(`finished downloading`)
      return
    }
    const currentQuote = quotes[config.index]
    setConfig({...config, index: config.index+1})
    const quoteContainer = document.querySelector(`#text`)
    quoteContainer.innerHTML = currentQuote
    console.log(`zzz changed quote`, currentQuote)
        
    // const imageContainer = document.querySelector(`#unsplashImage`)
    // console.log(`zzz image loaded`, imageContainer.src)
    const canvas = await html2canvas(document.querySelector("#app"))
    const dataURL = canvas.toDataURL()
    console.log(`zzzgeneratedurl`, dataURL)
    let link = document.createElement("a")
    link.download = "#nihilistquotes #quotes #nihilist #quote #love #art #feelings #sad #me #philosophy #app #thoughts #instagram"
    link.href = dataURL
    document.body.appendChild(link)
    setTimeout(link.click(), 1000)
    document.body.removeChild(link)

    //saveImage()
  }

  const saveImage = async (i) => {
    const currentQuote = quotes[i]
    const quoteContainer = document.querySelector(`#text`)
    quoteContainer.innerHTML = currentQuote

    const canvas = await html2canvas(document.querySelector("#app"))
    const dataURL = canvas.toDataURL()
    //console.log(`zzzgeneratedurl`, dataURL)
    let link = document.createElement("a")
    link.download = `#nihilistquotes #quotes #nihilist #quote #love #art #feelings #sad #me #philosophy #app #thoughts #instagram #fashion #photooftheday #thoughtoftheday ${i}`
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const initDownload = () => {
    for(let i=35; i<quotes.length; i++) {
      console.log(`zzz`, i)
      saveImage(i)
    }
  }


  
  return (
    <>
      <div className="app" id="app">
        <img src={imge} className="img" id="unsplashImage" alt="preview" onLoad={onImageLoad} />
        <div className="text" id="text">initial quote. this won't download.</div>
        <div className="watermark">nihilistquotes</div>
      </div>
      <button onClick={initDownload}>save</button>
    </>
  );
}

export default App;
