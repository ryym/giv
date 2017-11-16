import React from 'react'
import classes from 'classnames'

export interface Props {
  children: any
}

const TRANSITION_MS = 650
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default class Dialog extends React.Component<Props, any> {
  // state = { visible: false, inFrame: false, done: false }
  state = { visible: true, inFrame: true, done: false }

  render() {
    // if (!this.state.done) {
    //   setTimeout(() => {
    //     this.setState({ visible: true, inFrame: true, done: true })
    //     setTimeout(() => {
    //       this.hide()
    //     }, 2000)
    //   }, 2000)
    // }

    return (
      <div className="w-dialog-container">
        <div className={classes("w-dialog", {
          "is-visible": this.state.visible,
          "in-frame": this.state.inFrame,
        })}>
          {this.props.children}
        </div>
        <div className="w-dialog-mask"></div>
      </div>
    )
  }

  // XXX: 実際にはvisible はpropsのはずなので、`wait`も不要かも
  async hide() {
    this.setState({ visible: false })
    await wait(TRANSITION_MS)
    this.setState({ inFrame: false })
  }
}

// export default function Dialog({ children }: Props) {
// }
