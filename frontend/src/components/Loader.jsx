import { SpinnerDotted } from 'spinners-react/lib/esm/SpinnerDotted'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SpinnerDotted size={100} color="#007bff" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  )
}
export default Loader
