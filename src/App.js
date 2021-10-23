import './App.css'
import Proposition from './components/Proposition'
import React, { useState } from 'react'
import tlp from './tlp_html'

const keysToShow = ["1", "2", "3", "4", "5", "6", "7"]
const keysAll = Object.keys(tlp)

const App = () => {
  const [display, setDisplay] = useState([...keysToShow])

  const clickHandler = (event) => {
    const currentKey = event.currentTarget.dataset.key
    let keysToAdd = []
    for (let i = 1; i < 10; i++) {
      const childKey = currentKey.length === 1? currentKey + "." + i : currentKey.toString() + i.toString()
      if (tlp.hasOwnProperty(childKey) && !display.includes(childKey)) {
        keysToAdd.push(childKey)
      }
    }
    const end = currentKey.length === 1? currentKey + ".1" : currentKey + "1"
    const currentKeyNumofNonZero = currentKey.split("").filter(char => char !== "0" && char !== ".").length
    keysAll.forEach(key => {
      if (key > currentKey && key < end) {
        if (currentKeyNumofNonZero + 1 === key.split("").filter(char => char !== "0" && char !== ".").length) {
          keysToAdd.push(key)
        }
      }
    })
    const newDisplay = display.concat(keysToAdd).sort()
    setDisplay(newDisplay)
  }

  return (
    <div>
      <h1>Tractatus Logico-Philosophicus / Logisch-Philosophische Abhandlung / 論理哲学論考</h1>
      <p>English1 by Ogden, English2 by Pears/McGuinness</p>
      {display.map(key => {
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
