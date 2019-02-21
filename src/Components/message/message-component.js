import React, { Component } from "react";


export default class MessageComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      message: "",
      error: false,
      myData: []
    }; 
  }

  render() {
    return (
      this.state.myData.map( mess => 
        <div class="message">
          <div><img src={mess.foto}  alt="Message" /></div>
          <div>{mess.email}</div>  
          <div>{mess.date}</div>
          <div>{mess.message}</div>
        </div> 
      )
    )
  }
}
      
    