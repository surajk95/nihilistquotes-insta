import './App.css';
import imge from './img.jpg'
import html2canvas from 'html2canvas'
import { createApi } from "unsplash-js"
import { unsplashKey } from './unsplashkey';
import { useState, useEffect } from 'react';
import { quotes } from './quotes'

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: unsplashKey
})

function App() {
  const [config, setConfig] = useState({shouldGenerate: true, index: 0})

  // useEffect(() => {
  //   const imageContainer = document.querySelector(`#unsplashImage`)
  //   imageContainer.addEventListener(`load`, onImageLoad)

  //   return (() => {
  //     imageContainer.removeEventListener(`load`, onImageLoad)
  //   })
  // }, [])

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

  const saveImage = async () => {
    const imageResult = await api.photos.getRandom({ query: "dark mountain mountains hills landscape", orientation: "landscape", count: 1 })
    if(imageResult.type!=='success') {
      console.log(`failed to fetch unsplash`)
    }
    const res = imageResult?.response[0]?.urls?.regular
    console.log(`zzzimageurl`, res)
    const imageContainer = document.querySelector(`#unsplashImage`)
    imageContainer.src = res
  }


  
  return (
    <>
      <div className="app" id="app">
        <img src={imge} className="img" id="unsplashImage" alt="preview" onLoad={onImageLoad} />
        <div className="text" id="text">initial quote. this won't download.</div>
      </div>
      <button onClick={saveImage}>save</button>
    </>
  );
}

export default App;
