import './App.css';
import imge from './img.jpg'
import html2canvas from 'html2canvas'
import { createApi } from "unsplash-js"
import { unsplashKey } from './unsplashkey';

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: unsplashKey
})

function App() {
  const saveImage = async () => {
    const imageResult = await api.photos.getRandom({ query: "dark mountain", orientation: "landscape", count: 1 })
    if(imageResult.type!=='success') {
      console.log(`failed to fetch unsplash`)
      const res = imageResult?.response[0]?.urls?.regular
      console.log(`zzzimageurl`, res)
    }
    //setPhotosResponse(result);
    console.log(`zzzresponse`, imageResult)


    const canvas = await html2canvas(document.querySelector("#app"))
    const dataURL = canvas.toDataURL()
    let link = document.createElement("a")
    link.download = "name"
    link.href = dataURL
    document.body.appendChild(link)
    //link.click()
    document.body.removeChild(link)
  }
  
  return (
    <>
      <div className="app" id="app">
        <img src={imge} className="img" alt="preview" />
        <div className="text">there is only one truth; rest are conjectures.</div>
      </div>
      <button onClick={saveImage}>save</button>
    </>
  );
}

export default App;
