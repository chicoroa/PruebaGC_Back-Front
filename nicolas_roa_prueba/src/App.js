import { useFetch }  from './services/data';
import Main from "./components/Main"


function App() {
  let annos = []
  let ndle = []
  let headers = []
  let columnas = []

  const { data, loading, error } = useFetch()
  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if(data.length != 0){
      annos = data.Annos.map(e => { return e.nombre })
      ndle = data.Enfermedades.map(e => { return e })
      headers = data.Encabezados.map(e => { return e })
      columnas = data.Datos.map(e => { return e})
  }

  return (
    <div className="App">
      { ndle != '' ? <Main annos={annos} ndle={ndle} encabezados={headers} columnas={columnas}/> : ''}
    </div>
  );
}

export default App;
