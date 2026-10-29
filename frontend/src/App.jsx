
import { useEffect } from "react";
import Home from "./pages/Home";
import getCurrentUser from "./features/getCurrentUser.js";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async ()=>{
      const data = await getCurrentUser()
      dispatch(setUserData(data))
    }
    getUser()
  }, [])
  
  return (
    <>
      <Home></Home>
    </>
  )
}

export default App;