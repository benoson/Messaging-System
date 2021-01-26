import DownArrow from '../../assets/down-arrow.svg';
import StyledButton from '../custom-button/CustomButton';
import './LeftSidebar.css';


export default function LeftSidebar() {

    return (
        <div className="leftSidebar">
            <img src={DownArrow} className="downArrowSvg" alt="down arrow" />
            <StyledButton buttonText="My Emails" />
            <StyledButton buttonText="Compose Email" />
        </div>
    )
}
