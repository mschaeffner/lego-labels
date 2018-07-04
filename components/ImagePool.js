import React from 'react'

const headings = [
  'SNOT',
  'CLIP',
  'HINGE',
]

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '525px',
    margin: '20px'
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: 'Arial',
    borderBottom: '1px solid black',
    cursor: 'pointer'
  },
  image: {
    width: '50px',
    height: '36px',
    boxSizing: 'border-box',
    border: '1px solid grey',
    objectFit: 'contain',
    cursor: 'pointer',
    marginRight: '2px',
    marginTop: '2px'
  },
  toolbar: {
    textAlign: 'right',
    marginBottom: '20px',
    marginTop: '10px'
  },
  button: {
    backgroundColor: '#55AA55',
    color: 'white',
    textDecoration: 'none',
    padding: '10px',
    borderRadius: '3px',
    fontWeight: 'bold'
  }
}

const DownloadButton = ({url}) =>
  <div style={styles.toolbar}>
    <a style={styles.button} href={url} >
      Create PDF
    </a>
  </div>

export default class ImagePool extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hiddenHeadings: []
    }
  }

  toggleHeading(heading) {
    const hiddenHeadings = this.state.hiddenHeadings
    const index = hiddenHeadings.indexOf(heading)
    if(index < 0) {
      hiddenHeadings.push(heading)
    } else {
      hiddenHeadings.splice(index, 1)
    }
    this.setState({hiddenHeadings})
  }

  getSectionImages(heading) {
    return this.props.allImages.filter(i => i.indexOf(`./${heading.toLowerCase()}/`) === 0)
  }

  getImgBorderStyle(image) {
    return (this.props.selectedImages.indexOf(image) < 0)
      ? ({border: '1px solid grey'})
      : ({border: '3px solid #55AA55'})
  }

  render() {
    const indexes = this.props.selectedImages.map(image => this.props.allImages.indexOf(image))
    const downloadLink = 'http://localhost:4000/?selectedImagesIndexes=' + JSON.stringify(indexes)

    return(
      <div style={styles.container}>

        <DownloadButton url={downloadLink} />

        {headings.map(heading =>
          <div style={styles.section}>

            <div style={styles.heading} onClick={() => this.toggleHeading(heading)}>
              {(this.state.hiddenHeadings.indexOf(heading) >= 0) ? '▸' : '▾'}
              {heading}
            </div>

            <div>
              {(this.state.hiddenHeadings.indexOf(heading) < 0) && this.getSectionImages(heading).map(image =>
                <img
                  key={image}
                  src={'http://localhost:3000/static/img/' + image}
                  style={{...styles.image, ...(this.getImgBorderStyle(image))}}
                  onClick={() => this.props.handleClick(image)}
                  alt=''
                />
              )}
            </div>

          </div>
        )}

      </div>
    )
  }

}
