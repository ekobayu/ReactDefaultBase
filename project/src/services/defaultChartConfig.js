import get from 'lodash.get'
import simplifyNumbers from './simplifyNumbers'
import { scaleLinear } from 'd3-scale'
import uniq from 'lodash.uniq'
import sortby from 'lodash.sortby'

const colors = {
  primary: 'rgb(33, 133, 208, 0.8)',
  primaryHover: 'rgba(33, 133, 208, 0.3)',
  secondary: 'rgba(255, 145, 25, 0.9)',
  secondaryHover: 'rgba(255, 145, 25, 0.3)',
  unknown: 'rgba(104, 104, 104, 0.2)',
  v2: {
    primary: '#26bfc4',
    primaryHover: 'rgba(33, 133, 208, 0.3)',
    secondary: 'rgba(255, 145, 25, 0.9)',
    secondaryHover: 'rgba(255, 145, 25, 0.3)',
    unknown: '#bdbdbd'
  }
}

colors.grossMargin = colors.primary
colors.grossMarginHover = colors.primaryHover

colors.trxCount = colors.secondary
colors.trxCountHover = colors.secondaryHover

colors.sales = 'rgba(136,182,182, 0.8)'
colors.salesHover = 'rgba(136,182,182, 0.3)'

colors.hicard = colors.secondary
colors.hicardHover = colors.secondaryHover

colors.towaki = colors.secondary
colors.towakiHover = colors.secondaryHover

colors.ovo = 'rgba(118, 75, 204, 0.8)'
colors.ovoHover = 'rgba(118, 75, 204, 0.3)'

const isStatisticIndex = (dataIndex, rawdata) => {
  const data = sortby(uniq(rawdata))
  const maxValue = data.reduce((a, b) => Math.max(a, b))
  const minValue = data.reduce((a, b) => Math.min(a, b))
  const medianValue = data[Math.floor(data.length / 2)]

  // show only first occurence
  const maxIndex = rawdata.indexOf(maxValue)
  const minIndex = rawdata.indexOf(minValue)
  const medianIndex = rawdata.indexOf(medianValue)

  return (dataIndex === maxIndex) ||
    (dataIndex === minIndex) ||
    (dataIndex === medianIndex)
}

const getDefaultChartOptions = (originalMinValue, originalMaxValue, minRotation, maxRotation, datalabelsConfig = {}) => {
  let minValue = originalMinValue
  let maxValue = originalMaxValue
  let stepSize = originalMaxValue - originalMinValue

  if (originalMinValue >= 0 && originalMaxValue) {
    const ticks = 3
    const scale = scaleLinear().domain([minValue, maxValue]).nice(ticks)
    minValue = scale.domain()[0]
    maxValue = scale.domain()[1]

    stepSize = (maxValue - minValue) / 2
  }

  return {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        // backgroundColor: 'rgba(160,160,160,1)',
        borderRadius: 9,
        color: '#FFF',
        align: 'start',
        anchor: 'end',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0
        },
        font: {
          size: 10,
          lineHeight: 0.6
          // weight: 'bold'
        },
        formatter: simplifyNumbers,
        ...datalabelsConfig
      }
    },
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 15
      }
    },
    layout: {
      padding: {
        top: 30,
        right: 30,
        bottom: 10
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || ''

          if (label) {
            label += ': '
          }
          label += simplifyNumbers(tooltipItem.yLabel)

          return label
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#999',
          autoSkip: false,
          minRotation: minRotation,
          maxRotation: maxRotation
        },
        gridLines: {
          zeroLineColor: 'rgba(0,0,0,0.15)',
          zeroLineBorderDash: [2],
          borderDash: [2],
          color: 'rgba(0,0,0,0.15)',
          display: true,
          drawBorder: false,
          drawOnChartArea: true
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: '#DADADA',
          fontSize: '12',
          fontStyle: 'italic',
          stepSize: stepSize,
          min: minValue,
          max: maxValue,
          beginAtZero: true,
          callback: function (label) {
            return simplifyNumbers(label)
          }
        },
        gridLines: {
          borderDash: [2],
          color: 'rgba(0,0,0,0.15)',
          zeroLineColor: 'rgba(0,0,0,0.15)',
          zeroLineBorderDash: [2],
          display: true,
          drawBorder: false,
          drawOnChartArea: true
        }
      }]
    }
  }
}

const getDefaultChartBarMultipleAxisOptions = (minValue, maxValue, minRotation, maxRotation) => {
  return {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    layout: {
      padding: {
        right: 30,
        bottom: 20
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || ''

          if (label) {
            label += ': '
          }
          label += simplifyNumbers(tooltipItem.yLabel)

          return label
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#999',
          autoSkip: false,
          minRotation: minRotation,
          maxRotation: maxRotation
        },
        gridLines: {
          zeroLineColor: 'rgba(0,0,0,0.15)',
          zeroLineBorderDash: [2],
          borderDash: [2],
          color: 'rgba(0,0,0,0.15)',
          display: true,
          drawBorder: false,
          drawOnChartArea: true
        }
      }],
      yAxes: [{
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'left',
        id: 'revenue-axis'
      }, {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'right',
        id: 'transaction-axis'
      }]
    }
  }
}

const getDefaultChartBarThreeAxisOptions = (originalMinValue, originalMaxValue, minRotation, maxRotation, datalabelsConfig = {}) => {
  let minValue = []
  let maxValue = []
  let stepSize = []

  originalMaxValue.forEach((v, idx) => {
    minValue[idx] = originalMinValue
    maxValue[idx] = v
    stepSize[idx] = v - originalMinValue[idx]

    if (originalMinValue >= 0 && v) {
      const scale = scaleLinear().domain([originalMinValue, maxValue[idx]]).nice(5)

      minValue[idx] = scale.domain()[0]
      maxValue[idx] = scale.domain()[1]
      stepSize[idx] = (maxValue[idx] - minValue[idx]) / 2
    }
  })

  return {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        // backgroundColor: 'rgba(160,160,160,1)',
        borderRadius: 9,
        color: '#FFF',
        align: 'start',
        anchor: 'end',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0
        },
        font: {
          size: 10,
          lineHeight: 0.6
          // weight: 'bold'
        },
        formatter: simplifyNumbers,
        ...datalabelsConfig
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 15
      }
    },
    layout: {
      padding: {
        top: 25,
        right: 30,
        bottom: 0
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    elements: {
      line: {
        fill: false
      },
      bar: {
        fill: false
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || ''

          if (label) {
            label += ': '
          }
          label += simplifyNumbers(tooltipItem.yLabel)

          return label
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#999',
          autoSkip: false,
          minRotation: minRotation,
          maxRotation: maxRotation
        },
        gridLines: {
          zeroLineColor: 'rgba(0,0,0,0.15)',
          zeroLineBorderDash: [2],
          borderDash: [2],
          color: 'rgba(0,0,0,0.15)',
          display: true,
          drawBorder: true,
          drawOnChartArea: true
        }
      }],
      yAxes: [
        {
          id: 'gross-margin-axis',
          position: 'left',
          ticks: {
            beginAtZero: true,
            stepSize: stepSize[0],
            min: minValue[0],
            max: maxValue[0],
            fontColor: '#DADADA',
            fontSize: '12',
            fontStyle: 'italic',
            callback: function (label) {
              return simplifyNumbers(label)
            }
          },
          gridLines: {
            borderDash: [2],
            color: colors.grossMargin,
            zeroLineColor: 'rgba(0,0,0,0.15)',
            zeroLineBorderDash: [2],
            display: false,
            drawBorder: true,
            drawOnChartArea: false,
            lineWidth: 5
          }
        },
        {
          id: 'trx-count-axis',
          position: 'right',
          ticks: {
            beginAtZero: true,
            stepSize: stepSize[1],
            min: minValue[1],
            max: maxValue[1],
            fontColor: '#DADADA',
            fontSize: '12',
            fontStyle: 'italic',
            callback: function (label) {
              return simplifyNumbers(label)
            }
          },
          gridLines: {
            borderDash: [2],
            zeroLineWidth: 1,
            zeroLineColor: 'rgba(0,0,0,0.15)',
            zeroLineBorderDash: [2],
            color: colors.trxCount,
            display: false,
            drawBorder: true,
            drawOnChartArea: true,
            lineWidth: 5
          }
        },
        {
          id: 'sales-axis',
          position: 'right',
          ticks: {
            beginAtZero: true,
            stepSize: stepSize[2],
            min: minValue[2],
            max: maxValue[2],
            fontColor: '#DADADA',
            fontSize: '12',
            fontStyle: 'italic',
            callback: function (label) {
              return simplifyNumbers(label)
            }
          },
          gridLines: {
            borderDash: [2],
            zeroLineWidth: 1,
            zeroLineColor: colors.sales,
            zeroLineBorderDash: [2],
            color: colors.sales,
            display: false,
            drawBorder: true,
            drawOnChartArea: true,
            lineWidth: 5
          }
        }
      ]
    }
  }
}

export const getDefaultChartBar = (originalMinValue, originalMaxValue, minRotation, maxRotation) => {
  const datalabelsConfig = {
    align: 'end',
    backgroundColor: '#737272',
    display: (context) => {
      const length = context.dataset.data.length
      if (length < 7) {
        return true
      }
      return isStatisticIndex(context.dataIndex, context.dataset.data)
    }
  }
  let minValue = originalMinValue
  let maxValue = originalMaxValue

  if (originalMinValue >= 0 && originalMaxValue) {
    const ticks = 3
    const scale = scaleLinear().domain([minValue, maxValue]).nice(ticks)
    minValue = scale.domain()[0]
    maxValue = scale.domain()[1]
  }

  const defaultChart = getDefaultChartOptions(originalMinValue, originalMaxValue, minRotation, maxRotation, datalabelsConfig)
  return {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function (tooltipItem, data) {
          const rawLabel = get(data, `raw_labels.${tooltipItem[0].index}`)
          const datasetsLabel = get(data, `datasets[${tooltipItem[0].index}].label`)
          return rawLabel || datasetsLabel || ''
        }
      }
    },
    layout: {
      padding: {
        top: 40,
        right: 20,
        bottom: 10
      }
    },
    title: {
      display: false
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        ...datalabelsConfig,
        borderRadius: 5,
        color: '#FFF',
        align: 'center',
        anchor: 'end',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0
        },
        font: {
          size: 10,
          lineHeight: 0.6
          // weight: 'bold'
        },
        formatter: simplifyNumbers
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        // categoryPercentage: 0.5,
        afterFit: (scaleInstance) => {
          scaleInstance.width = 200 // set label width
        },
        ticks: {
          fontColor: '#3c3c3c',
          fontSize: 12,
          fontWeight: 600,
          autoSkip: false,
          minRotation: minRotation,
          maxRotation: maxRotation
        },
        gridLines: {
          display: false,
          drawBorder: true,
          drawTicks: true,
          borderDash: [2],
          zeroLineBorderDash: [2],
          zeroLineColor: 'rgba(0,0,0,0.15)',
          color: 'rgba(0,0,0,0.15)',
          drawOnChartArea: true
        }
      }],
      yAxes: [{
        ticks: Object.assign({}, defaultChart.scales.yAxes[0].ticks, {
          fontColor: '#485465',
          fontSize: 10,
          fontStyle: 'bold'
        }),
        gridLines: defaultChart.scales.yAxes[0].gridLines
      }]
    }
  }
}

const getDefaultTimeseriesChartOptions = (originalMinValue, originalMaxValue, minRotation, maxRotation) => {
  const datalabelsConfig = {
    align: 'end',
    backgroundColor: '#999',
    display: (context) => {
      const rawData = context.dataset.data.map(item => item.y)
      const length = context.dataset.data.length
      if (length < 7) {
        return true
      }
      return isStatisticIndex(context.dataIndex, rawData)
    },
    formatter: function (value, context) {
      return simplifyNumbers(value.y)
    }
  }

  const defaultChart = getDefaultChartOptions(originalMinValue, originalMaxValue, minRotation, maxRotation, datalabelsConfig)
  return {
    hover: defaultChart.hover,
    layout: {
      padding: {
        top: 30,
        right: defaultChart.layout.padding.right,
        bottom: defaultChart.layout.padding.bottom
      }
    },
    maintainAspectRatio: defaultChart.maintainAspectRatio,
    plugins: defaultChart.plugins,
    tooltips: defaultChart.tooltips,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        usePointStyle: true,
        fontColor: '#485465',
        fontSize: 10,
        fontStyle: 'bold'
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        source: 'auto',
        bounds: 'ticks',
        time: {
          minUnit: 'day',
          distribution: 'series',
          displayFormats: {
            day: 'DD MMM YYYY',
            week: 'DD MMM YYYY',
            month: 'MMM YYYY',
            quarter: 'MMM YYYY',
            year: 'MMM YYYY'
          },
          tooltipFormat: 'DD MMM YYYY'
        },
        ticks: Object.assign({}, defaultChart.scales.xAxes[0].ticks, {
          fontColor: '#485465',
          fontSize: 10,
          fontWeight: 'bold'
        }),
        gridLines: {
          display: false
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          }
        }
      }],
      yAxes: [{
        ticks: Object.assign({}, defaultChart.scales.yAxes[0].ticks, {
          fontColor: '#485465',
          fontSize: 10,
          fontStyle: 'bold'
        }),
        gridLines: defaultChart.scales.yAxes[0].gridLines
      }]
    }
  }
}

const getDerivedDefaultChartOptions = (originalMinValue, originalMaxValue, minRotation, maxRotation) => {
  const datalabelsConfig = {
    align: 'end',
    backgroundColor: '#999',
    display: (context) => {
      const length = context.dataset.data.length
      if (length < 7) {
        return true
      }
      return isStatisticIndex(context.dataIndex, context.dataset.data)
    }
  }

  const defaultChart = getDefaultChartOptions(originalMinValue, originalMaxValue, minRotation, maxRotation, datalabelsConfig)
  return {
    hover: defaultChart.hover,
    layout: {
      padding: {
        top: 30,
        right: defaultChart.layout.padding.right,
        bottom: defaultChart.layout.padding.bottom
      }
    },
    maintainAspectRatio: defaultChart.maintainAspectRatio,
    plugins: defaultChart.plugins,
    tooltips: defaultChart.tooltips,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        usePointStyle: true,
        fontColor: '#485465',
        fontSize: 10,
        fontStyle: 'bold'
      }
    },
    scales: {
      xAxes: [{
        type: 'category',
        ticks: Object.assign({}, defaultChart.scales.xAxes[0].ticks, {
          fontColor: '#485465',
          fontSize: 10,
          fontWeight: 'bold'
        }),
        gridLines: {
          display: false
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          }
        }
      }],
      yAxes: [{
        ticks: Object.assign({}, defaultChart.scales.yAxes[0].ticks, {
          fontColor: '#485465',
          fontSize: 10,
          fontStyle: 'bold'
        }),
        gridLines: defaultChart.scales.yAxes[0].gridLines
      }]
    }
  }
}

const getHorizontalBarOptions = (originalMinValue, originalMaxValue, minRotation, maxRotation) => {
  const datalabelsConfig = {
    align: 'end',
    backgroundColor: '#737272',
    display: (context) => {
      const length = context.dataset.data.length
      if (length < 7) {
        return true
      }
      return isStatisticIndex(context.dataIndex, context.dataset.data)
    }
  }
  let minValue = originalMinValue
  let maxValue = originalMaxValue
  let stepSize = originalMaxValue - originalMinValue

  if (originalMinValue >= 0 && originalMaxValue) {
    const ticks = 3
    const scale = scaleLinear().domain([minValue, maxValue]).nice(ticks)
    minValue = scale.domain()[0]
    maxValue = scale.domain()[1]

    stepSize = (maxValue - minValue) / 2
  }

  return {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function (tooltipItem, data) {
          const rawLabel = get(data, `raw_labels.${tooltipItem[0].index}`)
          const datasetsLabel = get(data, `datasets[${tooltipItem[0].index}].label`)
          return rawLabel || datasetsLabel || ''
        }
      }
    },
    title: {
      display: false
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        borderRadius: 5,
        color: '#FFF',
        align: 'center',
        anchor: 'end',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0
        },
        font: {
          size: 10,
          lineHeight: 0.6
          // weight: 'bold'
        },
        formatter: simplifyNumbers,
        ...datalabelsConfig
      }
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 10
      }
    },
    scales: {
      yAxes: [{
        // categoryPercentage: 0.5,
        stacked: true,
        afterFit: (scaleInstance) => {
          scaleInstance.width = 200 // set label width
        },
        ticks: {
          fontColor: '#3c3c3c',
          fontSize: 12,
          fontWeight: 600,
          autoSkip: false,
          minRotation: minRotation,
          maxRotation: maxRotation
        },
        gridLines: {
          display: true,
          drawBorder: true,
          drawTicks: true,
          borderDash: [2],
          zeroLineBorderDash: [2],
          zeroLineColor: 'rgba(0,0,0,0.15)',
          color: 'rgba(0,0,0,0.15)',
          drawOnChartArea: true
        }
      }],
      xAxes: [{
        stacked: true,
        display: true,
        ticks: {
          stepSize: stepSize,
          min: minValue,
          max: maxValue,
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: true,
          drawTicks: false,
          drawBorder: true,
          borderDash: [2],
          zeroLineBorderDash: [2],
          zeroLineColor: 'rgba(0,0,0,0.15)',
          color: 'rgba(0,0,0,0.15)'
        }
      }]
    }
  }
}

export default getDefaultChartOptions
export {
  colors,
  getDefaultChartBarMultipleAxisOptions,
  getDefaultChartBarThreeAxisOptions,
  getDefaultTimeseriesChartOptions,
  getDerivedDefaultChartOptions,
  getHorizontalBarOptions
}
