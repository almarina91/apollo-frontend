import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown/HeaderDropdown";

export const Header = () => {
    let history = useHistory();
    const {setCoordinatesArray, coordinatesArray } = usePlanContext();

    return (
        <div className='header'>
            <button className='header-button-left'
                    aria-label='back'
                    onClick={()=> {
                history.goBack()
                if(coordinatesArray) {
                    setCoordinatesArray([])
                }}}>
                <i className="fa fa-chevron-left"/>
            </button>
            <HeaderDropdown />
        </div>
    )
}