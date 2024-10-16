import React from 'react'
import AirbnbLogo from "../assets/AirbnbLogo.png"

function Logo({width = '200px'}) {
  return (
    <div style={{width}}>
      <img src={AirbnbLogo} />
    </div>
  )
}

export default Logo;