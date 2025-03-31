import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

const AppContextProvider = (props) =>{
    const [credit, setCredit] = useState(false)
    const [image, setImage] = useState(false)
    const [resultImage, setResultImage] = useState(false)


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const {getToken} = useAuth()
    const {isSignedIn} = useUser()
    const {openSignIn} = useClerk()

    const loadCreditsData = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get(backendUrl + "/api/user/credits", {headers:{token}})
            if (data.success) {
                setCredit(data.credits)
                console.log(data.credits)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeBg = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }
            setImage(image)
            setResultImage(false)
            navigate('/result')

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        credit,setCredit,
        loadCreditsData,
        backendUrl,
        image,setImage,
        removeBg

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };
export default AppContextProvider