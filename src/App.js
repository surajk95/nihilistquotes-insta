import './App.css';
import imge from './img.jpg'
import html2canvas from 'html2canvas'

function App() {
  const saveImage = async () => {
    const canvas = await html2canvas(document.querySelector("#app"))
    const dataURL = canvas.toDataURL()
    let link = document.createElement("a")
    link.download = "name"
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
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
