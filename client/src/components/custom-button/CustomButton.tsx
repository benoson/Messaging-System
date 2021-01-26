import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface ButtonText {
    buttonText: string;
}

export default function StyledButton({buttonText}: ButtonText) {

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
        <div>
            <StyledButton variant="outlined" className="sidebarButon">{buttonText}</StyledButton>
        </div>
    )
}
