import axios from "axios"
import { useNavigate } from "react-router-dom"
import { CsrfToken } from "../types"
import useStore from "../store"

export const useError = () => {
    const naviate = useNavigate()
    const resetEditedTask = useStore((state) => state.resetEditedTask)
    const getCsrfToken = async () => {
        const {data}  = await axios.get<CsrfToken>(
            `${process.env.REACT_APP_API_URL}/csrf`
        )
        axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token

    }
    const switchErrorHandling = (msg: string) => {
        switch (msg) {
            case 'invalid csrf token':
                getCsrfToken()
                alert('CSRF token is invalid, please try again')
                break
            case 'invalid or expired jwt':
                alert('access token is expired, please login')
                resetEditedTask()
                naviate('/')
                break
            case 'missing or malformed jwt':
                alert('access token is not valid, please login')
                resetEditedTask()
                naviate('/')
                break
            case 'duplicated key not allowed':
                alert('email already exist, please use anothe one')
                naviate('/')
                break
            case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
                alert('password is not correct')
                naviate('/')
                break
            case 'record not found':
                alert('email is not correct')
                naviate('/')
                break
            default:
                alert(msg)
        }
    }
    return { switchErrorHandling }

}