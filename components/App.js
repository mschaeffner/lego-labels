import React, { Component } from 'react'
import AllImagesList from './AllImagesList'
import PrintPage from './PrintPage'
import ImagePool from './ImagePool'

const IMAGES_PER_PAGE = 32
const ALL_IMAGES = AllImagesList.split('\n').filter(x => x !== '')

export default class App extends Component {

  constructor(props) {
    super(props)
    const printMode = this.props.printMode || null
    const indexes = this.props.selectedImagesIndexes
    const selectedImages = ((indexes && JSON.parse(indexes)) || []).map(i => ALL_IMAGES[i])
    this.state = {
      printMode,
      selectedImages
    }
  }

  toggleImage(image) {
    const selectedImages = this.state.selectedImages
    const index = selectedImages.indexOf(image)
    if(index < 0) {
      if(selectedImages.length === 32) {
        alert('You can not select more than 32 images.')
      } else {
        selectedImages.push(image)
      }
    } else {
      selectedImages.splice(index, 1)
    }
    this.setState({selectedImages})
  }

  removeImage(image) {
    const selectedImages = this.state.selectedImages
    const index = selectedImages.indexOf(image)
    if(index >= 0) {
      selectedImages.splice(index, 1)
    }
    this.setState({selectedImages})
  }

  render() {
    return (
      <div>

        {!this.props.printMode && <ImagePool
          allImages={ALL_IMAGES}
          selectedImages={this.state.selectedImages}
          handleClick={(image) => this.toggleImage(image)}
        />}

        <PrintPage
          printMode={this.props.printMode}
          images={this.state.selectedImages}
          handleClick={(image) => this.removeImage(image)}
        />

      </div>
    )
  }

}
