import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface ButtonProps {
    buttonText: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    hoverBgColor: string;
    hoverTextColor: string;
}

export default function CustomButton({buttonText, backgroundColor, textColor, borderColor, hoverBgColor, hoverTextColor}: ButtonProps) {

    const StyledButton = withStyles({
        root: {
          background: backgroundColor,
          '&:hover': {background: hoverBgColor, color: hoverTextColor},
          borderRadius: 3,
          border: `1px solid ${borderColor}`,
          color: textColor,
          height: 48,
          padding: '0 30px',
          marginBottom: "1rem",
          width: "100%",
          transition: "0.6s ease"
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
