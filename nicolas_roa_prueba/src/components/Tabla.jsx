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
    let g = 0
    transformacion.map(e => {
      if(!e.className.includes('d-none')) g++
    })

    let items = [];
    let totalPaginas = Math.ceil(g / 10)
    for (let number = 1; number <= totalPaginas; number++) {
      let id = `${number}_pag`
      items.push(
        <Pagination.Item key={number} id={id} onClick={() => this.props.evento(id, (number * 10))}>
          {number}
        </Pagination.Item>,
      );
    }
    return items
  }
  
  
  crearTabla = () => {
    let headers = this.props.headers.map((e,i) =>{
      return (
          <OverlayTrigger key={i} overlay={
            <Tooltip id="tooltip-disabled">
            <span>{ e.nombre }</span>
          </Tooltip>  
          }>
          <th key={e.id}>{ e.nombre.length >= 10 ? e.nombre : e.nombre }</th>
          </OverlayTrigger>
      )
    })

    let columnas = this.props.columnas
    let th = this.props.headers
    let anno = this.props.anno
    let tr = []
    
    let obj = th.map(x => {
      return x.fieldName 
    })
    
    const ordenamiento = (e) => {
      let td = []
      let annoSeleccionado = this.props.annoSelected
      obj.map(x => {
        if(annoSeleccionado != false){
          if(e['year'] == annoSeleccionado){
            td.push(<td>{e[x]}</td>)
          }
        }else{
          td.push(<td>{e[x]}</td>)
        }
      }) 
      return td;
    }

    columnas.map(e => {
      let r = ordenamiento(e)
      tr.push(<tr>{r}</tr>) 
    })


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
        
        if(i % 10 == 0){
          clase = `${c}_pag`
          c++
        }
        e.setAttribute('class', clase)

        if(i > 10){
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
       <Table striped bordered hover responsive>
          <thead>
          <tr>
            {datosTabla[0]}
          </tr>
          </thead>
          <tbody>
            {datosTabla[1]}
          </tbody>
        </Table>
        <Pagination>{paginacion}</Pagination>
       </>
     )
  }

}

export default Tabla