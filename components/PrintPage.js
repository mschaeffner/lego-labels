import React from 'react'

// somehow we need to scale down width and height to 75%
const styles = {
  previewPage: {
    width: '15cm',
    margin: '0.3cm',
    border: '1px solid grey'
  },
  printPage: {
    width: '15cm',
  },
  row: {
    height: '2.68cm',
  },
  tile: {
    width: '3.75cm',
    height: '2.68cm',
    boxSizing: 'border-box',
//    border: '1px solid grey',
    display: 'inline-block',
    overflow: 'hidden'
  },
  image: {
    width: '3.75cm',
    height: '2.68cm',
    objectFit: 'contain',
    cursor: 'pointer',
  }
}

const Tile = ({src, handleClick}) =>
  <div style={styles.tile}>
    <img
      key={src}
      src={'http://localhost:3000/static/img/' + src}
      style={styles.image}
      onClick={() => handleClick(src)}
      alt=''
    />
  </div>

export default ({images, handleClick, printMode}) =>
  <div style={printMode ? styles.printPage : styles.previewPage}>

    {[0,1,2,3,4,5,6,7].map(row =>
      <div style={styles.row}>
        {[0,1,2,3].map(col =>
          <Tile
            src={images[row * 4 + col] || './blank.png'}
            handleClick={handleClick}
          />
        )}
      </div>
    )}

  </div>
