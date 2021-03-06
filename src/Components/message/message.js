import React, { Component } from "react";
import {Col} from 'reactstrap';
import {Button, FormGroup, ControlLabel,  FormControl } from 'react-bootstrap';
import store from 'store';
import './message.css'

export default class Message extends Component  {
  constructor() {
    super()
    this.state = {
      email: "",
      message: "",
      error: false,
      authenticated: false,
      redirectToReferrer: false,
      myData: [],
      res: [],
      name: store.get('User').name.title + ' ' + store.get('User').name.first + ' ' + store.get('User').name.last,
    };  
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.message.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const message =  this.state.message
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    store.set('message', { email:store.get('User').email, message: message, date: date,foto:store.get('User').picture.large });
    const myData_post = store.get('message');
    this.state.myData.push(myData_post)
    store.set('message', this.state.myData );
    this.state.res.push(myData_post)
  }

  componentWillMount() { 
    const getToken = store.get('loggedIn');
    if(!getToken) { 
      this.props.history.replace({pathname: '/Login'}); 
    }
  } 

  componentDidMount(){
    const myData =  store.get('message') || [{ email: store.get('User').email, message: 'Mensaje de prueba', date: '2018-11-18', foto:store.get('User').picture.large }];
    var result = []
    if (myData)
      result = myData.filter(newe => newe.email === store.get('User').email )
    this.setState({myData});
    this.setState({res:result });
    store.set('message_all', store.get('message') );
  }

  render() {
    return (
      <div className="Row">
        <Col xs="5" sm="5" md="5">
          <h1>Escribe un mensaje..</h1>
          <form  onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Correo Electronico</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={store.get('User').email}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="message">
              <ControlLabel>Mensaje</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Escribe aqui..." onChange={this.handleChange} />
            </FormGroup>
            <Button
            block
            bsStyle="info"
            bsSize="large"
            type="submit">
              Enviar
            </Button>
          </form>
        </Col>
        
        <Col xs="5" sm="5" md="5">
        <h1>Chat</h1>
          <section id="timeline">
            {this.state.myData && this.state.res  && 
              this.state.res.map( mess => 
                <article key={mess.message}>
                  <div className="inner">
                    <h2 class="chat-message">{mess.email}</h2> 
                    <p>{mess.message}</p>
                  </div>
                </article>
              )}
       </section>
      </Col>
    </div>
   )
  }
}
    
  