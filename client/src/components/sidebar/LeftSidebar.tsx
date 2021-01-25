import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DownArrow from '../../assets/down-arrow.svg';
import './LeftSidebar.css';


export default function LeftSidebar() {

    const StyledButton = withStyles({
        root: {
          background: 'transparent',
          '&:hover': {background: "lightseagreen", color: "white"},
          borderRadius: 3,
          border: "1px solid lightseagreen",
          color: 'lightseagreen',
          height: 48,
          padding: '0 30px',
          marginBottom: "1rem",
          width: "100%",
          transition: "0.6s ease",
        },
        label: {
          textTransform: 'capitalize',
        },
    })(Button);


    return (
        <div className="leftSidebar">
            <img src={DownArrow} className="downArowSvg" alt="down arrow" />
            <StyledButton variant="outlined" className="sidebarButon">My Emails</StyledButton>
            <StyledButton variant="outlined" className="sidebarButon">Compose Email</StyledButton>
        </div>
    )
}
