import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { profilePath } from '../utils/constants'
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <div className="p-5 flex flex-col items-center bg-slate-400 w-10/12">
          <div>
            {userInfo?.profileImage || userInfo?.userInfo?.profileImage ? (
              <img
                src={ 
                  profilePath +
                  (userInfo?.profileImage || userInfo?.userInfo?.profileImage)
                }
                alt="Selected"
                style={{
                  maxWidth: '150px', // Set the maximum width
                  maxHeight: '150px', // Set the maximum height
                  borderRadius:'50px'
                }}
              />
            ) : null}
          </div>

          <h1 className="text-3xl  p-4">{userInfo?.name||userInfo?.userInfo?.name||"MERN"}</h1>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus sit, voluptatibus aspernatur nesciunt iusto
            perferendis inventore, consequuntur sed assumenda minima libero,
            architecto aperiam veniam doloremque!
          </p>
          <div className="flex">
            <Link
              to="/signin"
              className="bg-blue-500 text-white py-2 px-4 mx-10 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white py-2 px-4 mx-10 rounded"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Hero
