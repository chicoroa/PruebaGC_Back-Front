import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

class LeftBar extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            favoritos:this.props.enfF,
            enfermedades:this.props.data,
            activeTab: props.activeTab || 1
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    enfermedades(){
        let enfermedades = this.state.enfermedades;
        let r = enfermedades.map((e,i) => {
            if(i > 2){
                return (
                    <Row className="barra" key={`barra2_${i}`}>
                        <Col xs={10} md={10}>
                            <p id={e.fieldName} key={e.fieldName} onClick={this.props.evento} className="enfermedades">{e.nombre}</p>
                        </Col>
                        <Col xs={2} md={2}>
                            <Button name={e.fieldName} key={i} onClick={this.props.agregarFavorito} variant="dark">
                                <FontAwesomeIcon icon={faHeart} />
                            </Button>
                        </Col>
                    </Row>
                )   
    
            } 
        })

        return r
    }

    favoritos(){
        let dato = this.props.enfF
        let r = dato.map((e, i) => { 
            let elemento = document.getElementById(e)
            return (
                <Row className="barra" key={`barra_${i}`}>
                    <Col xs={10} md={10} key={`col_${i}`}>
                        <p id={elemento.id} key={elemento.id} onClick={this.props.evento} className="enfermedades">{elemento.innerText}</p>
                    </Col>
                </Row>
            )
        })

        return r
    }

    buscador(e){
        let todosLosNombreE = document.querySelectorAll(".enfermedades")
        let buscado = e.target.value.toUpperCase()
        let resultados = document.getElementById("resultados")
        todosLosNombreE.forEach(x => {
            let elemento = x.innerText.toUpperCase()
            if(elemento.includes(buscado)){
                x.classList.remove('d-none')
                x.parentElement.nextSibling.classList.remove('d-none')
                resultados.append(x.parentNode.parentElement)
            }else{
                x.classList.add('d-none')
                x.parentElement.nextSibling.classList.add('d-none')
                let buscarDentroResultados = document.querySelectorAll(x.parentNode.parentElement.children[0].childNodes[0].id)
                if(buscarDentroResultados.length > 0){
                    resultados.removeChild(x.parentNode.parentElement)
                }
                resultados.parentElement.append(x.parentNode.parentElement)
            }
        });
    }

    handleSelect(selectedTab) {
        this.setState({ activeTab: selectedTab });
    }

    render(){
        let enfe = this.enfermedades()
        let enfav = this.favoritos()
        return (
            <>
            <Card className="shadow-lg" key="Card" style={{ width: '30rem' }}>
                <Card.Body>
                    <Row>
                        <Col key="central" xs={12} md={12} className="text-left">
                            <Tabs className="myClass" key="Tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                                <Tab key="tab1" eventKey={1} key="Enfermedades" title="Enfermedades">
                                    <Col key="dataEnf" xs={12} md={12} className="mt-5 mb-5">
                                        <Form.Control key="buscador" type="text" placeholder="Buscador" onChangeCapture={this.buscador} className="mb-5"/>
                                        <div key="resultados" id="resultados"></div>
                                        {enfe}
                                    </Col>
                                </Tab>
                                <Tab key="tab2" eventKey={2} key="Favoritos" title="Favoritos">
                                    <Col key="dataFav" xs={12} md={12} className="mt-5 mb-5">
                                        {enfav}
                                    </Col>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </>
        )
    }
}

export default LeftBar