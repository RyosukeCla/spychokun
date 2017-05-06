<script>
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: {
    value: {
      type: Number,
      default: 30
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    const r = '#f87979'
    const b = 'rgba(255,159,64, 0.2)'
    const data = {
      lab: [],
      col: [],
      da: []
    }
    const mu = 50
    const sig = 10
    const vari = sig * sig
    const max = 18
    const value = this.value
    let x = 0
    const bobo = 1 / Math.sqrt(2 * Math.PI * vari)
    for (let i = 0; i < max; i++) {
      x = (i - max / 2) * 3.0 + mu
      data.lab.push(x)
      data.col.push(Math.abs(x - value) < 1.51 ? r : b)
      data.da.push(bobo * Math.exp(-(x - mu) * (x - mu) / (2 * vari)))
    }

    this.renderChart({
      labels: data.lab,
      datasets: [
        {
          label: '',
          backgroundColor: data.col,
          data: data.da
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: '偏差値'
      },
      legend: {
        display: false
      }
    })
  }
})
</script>
