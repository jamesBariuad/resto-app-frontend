import React from 'react'

const LoadingDisplay = () => {
  return (
    <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", backgroundColor:"#E5B299"}}>
        <strong>Getting Data From Server</strong>
        <br></br>
        <img src={require("../assets/images/loading-gif.gif")}></img>
    </div>
  )
}

export default LoadingDisplay