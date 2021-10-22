import './App.css'
import Proposition from './components/Proposition'
import React, { useState } from 'react'
import tlp from './tlp_html'

const keysToShow = ["1", "2", "3", "4", "5", "6", "7"]

const App = () => {
  const [display, setDisplay] = useState([...keysToShow])

  const clickHandler = (event) => {
    const currentKey = event.currentTarget.dataset.key
    let keysToAdd = []
    for (let i = 1; i < 10; i++) {
      const childKey = currentKey.length === 1? currentKey + "." + i : currentKey.toString() + i.toString()
      if (tlp.hasOwnProperty(childKey) && !display.hasOwnProperty(childKey)) {
        keysToAdd.push(childKey)
      }
    }
    const newDisplay = display.concat(keysToAdd).sort()
    setDisplay(newDisplay)
  }

  return (
    <div>
      <h1>Tractatus Logico-Philosophicus / Logisch-Philosophische Abhandlung / 論理哲学論考</h1>
      <p>English1 by Ogden, English2 by Pears/McGuinness</p>
      {display.map(key => {
        console.log(key)
        return (
          <div key={key}>
            <p style={{marginLeft: `${key.length}em`}}>{key} <button data-key={key} onClick={clickHandler}>expand</button></p>
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
