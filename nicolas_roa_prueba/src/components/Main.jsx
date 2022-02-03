import React from "react";
import LeftBar from "./LeftBar";
import SelectorFilter from "./SelectFilter";
import Chart from "./Chart"
import Tabla from "./Tabla"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreEnfermedad:"All Cause",
            annos:this.props.annos,
            anno:false,
            nombreDeLasEnfermedades:this.props.ndle,
            encabezados:this.props.encabezados,
            columnas:this.props.columnas,
            favoritos: [],
            tituloGrafico: '', 
            labeles: [],
            dataGrafico:[],
        };
        this.filtoSelectAnno = this.filtoSelectAnno.bind(this);
        this.filtoEnfermedad = this.filtoEnfermedad.bind(this);
        this.agregarFavorito = this.agregarFavorito.bind(this)
    }

    renderGrafico(nombreEnfermedad, anno = false){
        let resultado = []
        let titulo = ""
        let labeles = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        
        titulo = `Muertes en EEUU por ${nombreEnfermedad} ${anno}`
        let fieldName = this.props.ndle.find(e => { if(e.nombre == nombreEnfermedad){ return e } })
        let filtradoData = this.props.columnas.sort((a, b) => { return a['year'] - b['year'] }) 
        
        if(anno == false){
            labeles = this.props.annos
            labeles.map(m => {
                let totalPorAnno = 0
                filtradoData.map(e => {
                    if(e['year'] == m){
                        totalPorAnno += e[fieldName['fieldName']]
                    }
                })
                resultado.push(totalPorAnno)
            })
        }else{
            filtradoData.map(e => {
                if(e['year'] == anno){
                    resultado.push(e[fieldName['fieldName']])
                }
            })
        }
                

        this.setState({
            tituloGrafico:titulo,
            labeles:labeles,
            dataGrafico:resultado
        })        
    }

    renderTabla(nombreEnfermedad, anno){
        let labeles = []
        
        this.props.encabezados.map((e,i) => {
            if(nombreEnfermedad != "All Cause"){
                if(i <= 2) labeles.push({"nombre":`${e.nombre}`, "fieldName":`${e.fieldName}`})
                if(e.nombre == nombreEnfermedad) labeles.push({"nombre":`${e.nombre}`, "fieldName":`${e.fieldName}`})
            }else{
                labeles.push({"nombre":`${e.nombre}`, "fieldName":`${e.fieldName}`})
            }
        })
        
        this.setState({
            encabezados:labeles,
            anno:anno
        })
    }

    filtoEnfermedad(e) {
        let elemento = e.target
        let selectAnno = document.getElementsByClassName("annos")[0]
        let labelEnfermedad = document.getElementsByClassName("nombreEnfermedad")[0]
        let nombreEnfermedad = elemento.innerText
        let anno = false

        selectAnno.value = "0"
        labelEnfermedad.setAttribute('name', elemento.id)
        labelEnfermedad.innerText = nombreEnfermedad

        if(this.state.favoritos.includes(elemento.id)){
            selectAnno.removeAttribute("disabled")
            if(selectAnno.value != 0) anno = selectAnno 
        }else{
            selectAnno.setAttribute("disabled", true)
        }

        this.setState({
            nombreEnfermedad:labelEnfermedad.innerText
        })
        this.renderGrafico(nombreEnfermedad, anno)
        this.renderTabla(nombreEnfermedad, anno)
    }

    filtoSelectAnno(e){
        let anno = e.target.value;
        let pagination = document.getElementsByClassName("pagination")[0]
        let labelEnfermedad = document.getElementsByClassName("nombreEnfermedad")[0]
        this.setState({
            annoSelected:anno
        })
        this.renderGrafico(labelEnfermedad.innerText, anno)
        this.renderTabla(labelEnfermedad.innerText, anno)
    }

    agregarFavorito(e){
        if(e.target.type !== undefined){
            let selectAnno = document.getElementsByClassName("annos")[0]
            let nombreEnfermedad = document.getElementsByClassName("nombreEnfermedad")[0].getAttribute('name')
            let name = e.target.name;

            let statusFav = this.state.favoritos
            if(!statusFav.includes(name)){
                statusFav.push(name)
                if(name == nombreEnfermedad) selectAnno.removeAttribute("disabled")
                e.target.classList.remove("btn-dark")
                e.target.classList.add("btn-danger")
                this.setState({ favoritos:statusFav })
                localStorage.removeItem("favoritos")
                localStorage.setItem("favoritos", statusFav)
            }else{
                statusFav.pop(name)
                selectAnno.setAttribute("disabled", true)
                e.target.classList.add("btn-dark")
                e.target.classList.remove("btn-danger")
                this.setState({ favoritos:statusFav })
                localStorage.removeItem("favoritos")
                localStorage.setItem("favoritos", statusFav)
            }
        }
    }

    cambiarPagina = (id) => {
        let pags = document.querySelector(".pagination > .active")
        let pagSelect = document.getElementById(id)
        
        pags.classList.remove('active')
        pagSelect.parentElement.classList.add('active')
    
        let tr = document.querySelectorAll('tbody > tr')
        let transformacion = Array.from(tr)
        transformacion.map((e,i) => {
          if(e.classList.value.includes(id)){
            e.classList.remove('d-none')
          }else{
            e.classList.add('d-none')
          }
        }) 
    }

    crearFavoritosLocales = () => {
        let ls = localStorage.getItem("favoritos")
        if(ls !== null){
            console.log(1);
            if(ls.includes(",")){
                let lsArray = ls.split(",")
                lsArray.map(e => {
                    let btn = document.getElementsByName(e)[0]
                    btn.classList.remove("btn-dark")
                    btn.classList.add("btn-danger")    
                    console.log(e);
                })
            }else{
                let btn = document.getElementsByName(ls)[0]
                btn.classList.remove("btn-dark")
                btn.classList.add("btn-danger")
            }
        }else{
            console.log(12);
        }

    }

    componentDidMount(){
        this.crearFavoritosLocales()
        this.renderGrafico("All Cause")
    }

    render(){
        return(
            <>
            <Container fluid>
                <h3 className="text-center mt-5 mb-5">Visor Causas de muerte EEUU</h3>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={4}>
                        <LeftBar evento={this.filtoEnfermedad} agregarFavorito={this.agregarFavorito} data={this.props.ndle} enfF={this.state.favoritos}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <SelectorFilter evento={this.filtoSelectAnno} data={this.props.annos}/>
                        <Chart labeles={this.state.labeles} data={this.state.dataGrafico} titulo={this.state.tituloGrafico}/>
                        <Tabla headers={this.state.encabezados} columnas={this.state.columnas} annos={this.state.annos} annoSelected={this.state.anno} nombreEnfermedad={this.state.nombreEnfermedad} evento={this.cambiarPagina}/>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default Main