import React from "react"
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Pagination from 'react-bootstrap/Pagination'

class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      anno: this.props.annos,
      data: this.props.headers,
      annoSelected: this.props.annoSelected,
      totalPaginas: 0
    };
}

  paginacion = () => {
    let tr = document.querySelectorAll('tbody > tr')
    let transformacion = Array.from(tr)
    let items = [];
    let totalPaginas = Math.ceil(transformacion.length / 12)
    for (let number = 1; number <= totalPaginas; number++) {
      let id = `${number}_pag`
      items.push(
        <Pagination.Item key={number} id={id} onClick={() => this.props.evento(id, (number * 12))}>
          {number}
        </Pagination.Item>,
      );
    }
    return items
  }
  
  
  crearTabla = () => {

    let annoSeleccionado = this.props.annoSelected
    let nombreEnfermedad = this.props.nombreEnfermedad
    let columnas = this.props.columnas
    let th = this.props.headers
    let tr = []
    
    let obj = th.map(x => {
      return x.fieldName 
    })

    let headers = this.props.headers.map((e,i) =>{
      return (
          <OverlayTrigger key={i} overlay={
            <Tooltip id="tooltip-disabled">
            <span key={i}>{ e.nombre }</span>
          </Tooltip>  
          }>
          <th key={e.id}>{ e.nombre.length >= 10 ? e.nombre : e.nombre }</th>
          </OverlayTrigger>
      )
    })

    const construccion = (obj, data, td) => {
      obj.map(e =>{
        td.push(<td>{data[e]}</td>);
      })
    }    

    for(let data of columnas){
      let td = []
      if(nombreEnfermedad == "All Cause"){
        if(annoSeleccionado !== false){
          if(data.year == annoSeleccionado){
              construccion(obj, data, td)
          }else if(annoSeleccionado == 0){
              construccion(obj, data, td)
          }
        }else{
          construccion(obj, data, td)
        }
      }else if(nombreEnfermedad != "All Cause"){
        if(annoSeleccionado !== false){
          if(data.year == annoSeleccionado){
            construccion(obj, data, td)
          }
        }else{
          construccion(obj, data, td)
        }
      }

      if(td.length != 0){
        tr.push(<tr key={data['id']}>{td}</tr>)
      }
    }

    let datosTabla = []
    datosTabla.push(headers)
    datosTabla.push(tr)
    return datosTabla
  }

  columnas = () => {
      let tr = document.querySelectorAll('tbody > tr')
      let transformacion = Array.from(tr)
      let clase = 0
      let c = 1
      let primeraPag = document.getElementById(`${c}_pag`).parentElement.classList.add('active')
      transformacion.map((e,i) => {
        
        if(i % 12 == 0){
          clase = `${c}_pag`
          c++
        }
        e.setAttribute('class', clase)

        if(i >= 12){
          e.classList.add('d-none')
        }

      })
  }

  componentDidUpdate(){
    this.columnas()
  }

  render(){
    let datosTabla = this.crearTabla()
    let paginacion = this.paginacion()
     return (
       <>
       <Table striped bordered hover responsive key="Table">
          <thead key="thead">
          <tr key="tr_th">
            {datosTabla[0]}
          </tr>
          </thead>
          <tbody key="tbody">
            {datosTabla[1]}
          </tbody>
        </Table>
        <Pagination>{paginacion}</Pagination>
       </>
     )
  }

}

export default Tabla