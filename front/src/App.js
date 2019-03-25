import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CryptoJS from "crypto-js";
import Comic from './Components/comic';
import {Container,Row,Button,
 }from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const PRIV_KEY = "ce1693d8baa06f879abcab4c75c19e34006074db";
const PUBLIC_KEY = "1415ee478404a80e6f620f034e526ca0";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();


class App extends Component {
  state = {
    data: [],
    total : 0
  }
  limit = 8;

  componentDidMount() {
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&offset=${this.state.offset}&limit=${this.limit}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => response.json())
    .then(data => this.setState({data: data.data.results , total : data.data.total /10}));
    //Je divise par / 10 pour limiter le nombre de page en dynamique //
  }
  
  handleClick=(e)=>{
    this.setState({
    limit : 8 , offset : e.target.value
    })
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&offset=${e.target.value}&limit=${this.limit}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => response.json())
    .then(data => this.setState({data: data.data.results}));
    }

  render() {
    // this.props.onNbPageClick(this.state.data , this.state.limit, this.state.offset)
    console.log(this.state.total)
    const dataList = this.state.data.map((data,i)=>{
     return (<Comic key={i} 
      comicsTitle={data.name} 
      comicsUrl={data.urls[1].url} 
      comicsDesc={data.description} 
      comicsImg={`${data.thumbnail.path}/portrait_xlarge.jpg`}/>)
    })

    var buttonList = [];
    var maxPage = this.state.total / this.limit;
    for(var i=0; i<maxPage; i++) {
      buttonList.push(<Button style={style.btnPage} value={i} onClick={this.handleClick}>{i+1}</Button>);
    }

    return (
      <Container>
      <img className="marvel"src="./marvel_1.jpg" />
      <Row> 
        {dataList}
        
      </Row>
      {buttonList}
      </Container>
    )
  }
}

var style= {
  btnPage : {
    backgroundColor: 'rgb(247, 143, 63)',
    color: 'white',
    marginLeft :'3px',
    paddingRight :'25px',
    width: '30px',
    },
  }

export default App




