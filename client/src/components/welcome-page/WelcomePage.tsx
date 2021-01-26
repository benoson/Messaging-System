import LoginSection from '../login-section/LoginSection';
import RegisterSection from '../register-section/RegisterSection';
import './WelcomePage.css';

export default function WelcomePage() {
    return (
        <div className="welcomePageSection">
            <LoginSection />
            <div className="divider"></div>
            <RegisterSection />
        </div>
    )
}
