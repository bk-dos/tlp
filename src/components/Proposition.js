import React from 'react'



const Proposition = ({leftPosition, text, lang}) => {
  //console.log(tes)
  //console.log(text)
  const htmlContent = text.map(line => `<p>${line}</p>`).join("")
  //console.log(htmlContent)
  return (
    <div style={{marginLeft: `${leftPosition.length}em`}}>
      <p style={{display: "inline-block", verticalAlign: "top", width: "70px"}}>{lang}:</p>
      <div
        dangerouslySetInnerHTML={{__html: htmlContent}}
        style={{display: "inline-block", verticalAlign: "top"}}
      >
      </div>
    </div>
  )
}

export default Proposition