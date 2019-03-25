import React, { Component,} from 'react';
import {
  Col,
  Card,
  CardImg,
  CardBody,
  Button,
  CardTitle,
  Modal ,
  ModalHeader,
  Badge,
  ModalBody
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Comic extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
    }
  }
  ModalVisible =()=>{
    console.log('Openmodal')
    this.setState({modal :true})
  }

  ModalInvisible =()=>{
    console.log('Closemodal')
    this.setState({modal :false})
  }
  render() {

    return (
      <Col xs="12" sm="6" md="4" lg="3">
      <div style={{marginBottom:50}}>
        <Card className='zoom' onClick={this.ModalVisible}>
          <CardImg top width="100%" src={`${this.props.comicsImg}`} alt="Card image cap" style={{minHeight: 380}} />
            <CardBody style={{height: 150}}>
              <CardTitle>{this.props.comicsTitle}</CardTitle>
            </CardBody>
        </Card>

        <Modal isOpen={this.state.modal}>
        <ModalHeader ModalVisible={this.ModalVisible}>{this.props.comicsTitle}</ModalHeader>
          <CardImg src={`${this.props.comicsImg}`} />
          <h4><Badge style={style.button} href={`${this.props.comicsUrl}`} target="_blank" >Information</Badge></h4>
          <ModalBody>{this.props.comicsDesc}</ModalBody>
          <Button style={style} onClick={this.ModalInvisible}>x</Button>
        </Modal>
      </div>
    </Col>
    );
  }
}

var style= {
  backgroundColor: '#f78f3f',
  color :'white',
  position: 'absolute',
  top: '2%',
  left: '90%',
  cursor: 'pointer',

  button : {
    backgroundColor: 'rgb(247, 143, 63)',
    color: 'white',
    marginLeft: '25%',
    marginTop: '5%',
    width: '50%',
    },
  }


export default Comic;
