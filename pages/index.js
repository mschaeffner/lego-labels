import App from '../components/App'

const Index = ({query}) =>
  <App
    printMode={query.printMode}
    selectedImagesIndexes={query.selectedImagesIndexes}
  />

Index.getInitialProps = ({ query }) => ({ query })

export default Index
