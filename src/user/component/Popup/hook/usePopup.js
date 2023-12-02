import { useDispatch } from 'react-redux'
import { clearPopup, setPopup } from '../../../redux/popupSlice'

export const POPUP_NAME = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    ROOMFILTER: "ROOMFILTER"
}

export const usePopup = () => {
    const dispatch = useDispatch()

    return {
        open: (popupName) => { dispatch(setPopup({ popup: popupName })) },
        close: () => { dispatch(clearPopup({ popup: "" })) },
    }
}