import React from "react";
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';


const SelectorFilter = (props) => {
    let annos = props.data.map(e => { return e })
        annos = annos.sort((a,b) => { return a - b })
    let opciones = annos.map((e,i) => { return (<option key={`opt_${i}`} value={e}>{e}</option>) })

    return (
        <>
        <Form.Label className="nombreEnfermedad" name="all_cause">All Cause</Form.Label>
        <Row className="mt-2 mb-5">
            <Col xs={12} md={4}>
                <Form.Group>
                    <Form.Control as="select" controlid="selectAnnon" className="annos" onChange={props.evento} disabled={true}>
                        <option key={0} value="0">Seleccione Año</option>
                        {opciones}
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col xs={12} md={12}>
                <span className="text-muted">(Para seleccionar un año debe dar clic en un causal y ponerlo en favoritos.)</span>
            </Col>
        </Row>
        </>
    )
}

export default SelectorFilter