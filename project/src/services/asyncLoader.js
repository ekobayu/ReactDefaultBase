import LoadingPageComponent from '../components/LoadingPageComponent'
import Loadable from 'react-loadable'

const asyncLoader = (importComponent) => Loadable({
  loader: () => importComponent,
  loading: LoadingPageComponent,
  delay: 300
})

export default asyncLoader
