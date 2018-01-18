import React from 'react'

class Article extends React.Component {
  constructor(props) {
    super()

  }
  render() {
    return (
      <h1>{this.props.content}</h1>
    )
  }
}

export default Article