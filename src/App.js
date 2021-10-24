import './App.css'
import Proposition from './components/Proposition'
import React, { useState } from 'react'
import tlp from './tlp_html'
import appService from './services/app'

const keysToShow = ["1", "2", "3", "4", "5", "6", "7"]
//const keysAll = Object.keys(tlp)


const App = () => {
  const [display, setDisplay] = useState([...keysToShow])
  const [collapse, setCollapse] = useState([])

  const clickHandler = (event) => {
    const currentKey = event.currentTarget.dataset.key
    const mode = event.currentTarget.textContent

    if (mode === "expand") {
      const keysToAdd = appService.findDirectChildren(currentKey, [...display])
      const newDisplay = display.concat(keysToAdd).sort()

      const newCollapse = collapse.concat(currentKey)

      setCollapse(newCollapse)
      setDisplay(newDisplay)
    }

    if (mode === "collapse") {
      const keysToRemove = appService.findAllChildren(currentKey, [...display])
      const newDisplay = [...display].filter(key => !keysToRemove.includes(key))
      //console.log(keysToRemove.includes("2.01"))

      let newCollapse = collapse.filter(key => !keysToRemove.includes(key))
      newCollapse = newCollapse.filter(key => key !== currentKey)
      //console.log("removed", keysToRemove)

      setCollapse(newCollapse)
      setDisplay(newDisplay)
    }
  }

  //console.log("collapse", collapse)
  return (
    <div>
      <h1>Tractatus Logico-Philosophicus / Logisch-Philosophische Abhandlung / 論理哲学論考</h1>
      <p>English1 by Ogden, English2 by Pears/McGuinness</p>
      {display.map(key => {
        return (
          <div key={key}>
            <p style={{marginLeft: `${key.length}em`}}>
              {key} 
              <button data-key={key} onClick={clickHandler}>
                {collapse.includes(key)? "collapse" : "expand"}
              </button>
            </p>
            <Proposition leftPosition={key} text={tlp[key]["German"]} lang="German"/>
            <Proposition leftPosition={key} text={tlp[key]["Ogden"]} lang="English1"/>
            <Proposition leftPosition={key} text={tlp[key]["PearsMcGuinness"]} lang="English2"/>
          </div>
        )
      })}
    </div>
  )
}

export default App
