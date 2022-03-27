import Loader from '../Loader/Loader'

const withLoader = (WrappedComponent) => function ({ loading }) {
  if (loading) return <Loader />
  return <WrappedComponent />
}

export default withLoader
