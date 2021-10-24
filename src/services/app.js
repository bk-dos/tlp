import tlp from '../tlp_html'
import React, { useState } from 'react'

const keysAll = Object.keys(tlp)

const findDirectChildren = (currentKey, currentDisplay) => {
  let directChildren = []
  for (let i = 1; i < 10; i++) {
    const childKey = currentKey.length === 1? currentKey + "." + i : currentKey.toString() + i.toString()
    if (tlp.hasOwnProperty(childKey) && !currentDisplay.includes(childKey)) {
      directChildren.push(childKey)
    }
  }
  const end = currentKey.length === 1? currentKey + ".1" : currentKey + "1"
  const currentKeyNumofNonZero = currentKey.split("").filter(char => char !== "0" && char !== ".").length
  keysAll.forEach(key => {
    if (key > currentKey && key < end) {
      if (currentKeyNumofNonZero + 1 === key.split("").filter(char => char !== "0" && char !== ".").length) {
        directChildren.push(key)
      }
    }
  })
  return directChildren
}

// find all children which are currently displayed
const findAllChildren = (currentKey, currentDisplay) => {
  return currentDisplay.filter(key => key.startsWith(currentKey) && key !== currentKey)
}

const appService = {findDirectChildren, findAllChildren}
export default appService