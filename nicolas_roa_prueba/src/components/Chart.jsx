import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
  )

  class Chart extends React.Component{

    constructor(props){
      super(props)
      this.state = { 
        labeles:this.props.labeles,
        data:this.props.data 
      }
    }
  
  
    BarChart() {
      const labels = this.props.labeles;    
      const scores = this.props.data;
      const titulo = this.props.titulo;
  
      const options = {
        fill: true,
        animations: false,
        scales: {
          y: {
            min: 0,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      };
  
      const data = {
        datasets: [
          {
            label: titulo,
            tension: 0.3,
            data: scores,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(51, 124, 255)",
          },
        ],
        labels,
      }
  
      return(
        <Bar data={data} options={options} className="mb-5"/>
      )
  }
  
  
    render(){
      let bar = this.BarChart()
        return (
          <div className="App">
            {bar}
          </div>
      );
    }
  }
  
  export default Chart