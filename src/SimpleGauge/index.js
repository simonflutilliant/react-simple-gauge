import React from 'react'
class SimpleGauge extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.base = React.createRef()
    this.progress = React.createRef()
    this.point = React.createRef()
    this.text = React.createRef()
  }

  componentDidMount() {
    const percent = this.props.percent
      ? this.props.percent >= 0
        ? this.props.percent <= 100
          ? this.props.percent
          : 100
        : 0
      : 100
    let color = this.props.color || '#5BB030'
    if (this.props.intervals && this.props.colors) {
      let startValue = 0
      this.props.intervals.forEach((element, idx) => {
        if (percent >= startValue && percent < element) {
          color = this.props.colors[idx] || color
        }
        startValue = element
      })
    }

    const container = this.container.current
    const width = container.clientWidth

    const strokeWidth = width / 12
    const height = width / 2 + strokeWidth / 2
    const ratio = (width - strokeWidth) / 2
    const offset = Math.PI * ratio

    container.style.height = height + 'px'

    const bar = (percent * offset) / 100
    const offsetBar = offset * 2 - bar

    let circle = this.base.current
    circle.style.width = '100%'
    circle.style.height = '100%'
    circle.style.fill = 'none'
    circle.style.stroke = '#E5E5E5'
    circle.style.strokeLinecap = 'round'
    circle.setAttribute('cx', ratio)
    circle.setAttribute('cy', ratio)
    circle.setAttribute('r', ratio)
    circle.style.strokeDashoffset = offset
    circle.style.strokeDasharray = offset
    circle.style.strokeWidth = strokeWidth.toString()
    circle.style.transform = `translate(${strokeWidth / 2}px,${
      strokeWidth / 2
    }px)`

    circle = this.progress.current
    circle.style.width = '100%'
    circle.style.height = '100%'
    circle.style.fill = 'none'
    circle.style.stroke = '#E5E5E5'
    circle.style.strokeLinecap = 'round'
    circle.setAttribute('cx', ratio)
    circle.setAttribute('cy', ratio)
    circle.setAttribute('r', ratio)
    circle.style.strokeDashoffset = offset
    circle.style.strokeWidth = strokeWidth.toString()
    circle.style.transform = `translate(${strokeWidth / 2}px,${
      strokeWidth / 2
    }px)`

    circle = this.point.current
    circle.style.width = '100%'
    circle.style.height = '100%'
    circle.style.fill = 'none'
    circle.style.stroke = '#E5E5E5'
    circle.style.strokeLinecap = 'round'
    circle.setAttribute('cx', ratio)
    circle.setAttribute('cy', ratio)
    circle.setAttribute('r', ratio)
    circle.style.strokeWidth = strokeWidth.toString()
    circle.style.transform = `translate(${strokeWidth / 2}px,${
      strokeWidth / 2
    }px)`

    const progress = this.progress.current
    progress.style.stroke = color

    progress.style.strokeDasharray = `${bar} ${offsetBar}`

    const point = this.point.current
    point.style.strokeDasharray = `1 ${offset * 2 - 1}`
    point.style.strokeDashoffset = offset - bar
    point.style.stroke = 'black'

    const text = this.text.current
    text.style.fontSize = `${height / 3}px`
    text.style.fontWeight = 'bold'
    text.style.marginTop = `-${height / 2}px`
    text.style.color = color
    text.style.display = 'grid'
    text.style.justifyContent = 'center'
  }

  render() {
    return (
      <div
        ref={this.container}
        className='simple-gauge-container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <svg className='gauge-svg'>
          <circle ref={this.base} />
          <circle ref={this.progress} />
          <circle ref={this.point} />
        </svg>
        <div ref={this.text} className='simple-gauge-number'>
          {this.props.percent
            ? this.props.percent >= 0
              ? this.props.percent <= 100
                ? this.props.percent
                : 100
              : 0
            : 100}
          %
        </div>
      </div>
    )
  }
}

export default SimpleGauge
