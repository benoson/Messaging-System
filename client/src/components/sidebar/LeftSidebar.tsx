import CustomButton from '../custom-button/CustomButton';
import { NavLink } from 'react-router-dom';
import './LeftSidebar.css';


export default function LeftSidebar() {

    return (
        <div className="leftSidebar">
            <NavLink to="/compose" className="navLinkItem">
                <CustomButton
                    buttonText="Compose Email"
                    backgroundColor="transparent"
                    textColor="lightseagreen"
                    borderColor="lightseagreen"
                    hoverBgColor="lightseagreen"
                    hoverTextColor="white"
                />
            </NavLink>

            <NavLink to="/myEmails" className="navLinkItem">
                <CustomButton
                    buttonText="My Emails"
                    backgroundColor="transparent"
                    textColor="lightseagreen"
                    borderColor="lightseagreen"
                    hoverBgColor="lightseagreen"
                    hoverTextColor="white"
                />
            </NavLink>
        </div>
    )
}
