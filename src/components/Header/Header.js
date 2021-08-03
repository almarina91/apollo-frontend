import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown/HeaderDropdown";
import { CLASS, ICON } from "../../utils/enums";

/**
 * A header component.
 * @coordinatesArray - coordinates that were saved while training.
 */

export const Header = () => {
    let history = useHistory();
    const {setCoordinatesArray, coordinatesArray } = usePlanContext();

    return (
        <div className={CLASS.header}>
            <button className={CLASS.headerLeftButton}
                    aria-label='back'
                    onClick={()=> {
                history.goBack()
                if(coordinatesArray) {
                    setCoordinatesArray([])
                }}}>
                <i className={ICON.chevron}/>
            </button>
            <HeaderDropdown />
        </div>
    )
}