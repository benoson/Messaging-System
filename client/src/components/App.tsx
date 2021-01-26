import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LeftSidebar from './sidebar/LeftSidebar';
import Navbar from './navbar/Navbar';
import ComposeEmailPage from './compose-email-page/ComposeEmailPage';
import WelcomePage from './welcome-page/WelcomePage';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          
          <div className="dividedSections">
              <LeftSidebar />

              <div className="mainContent">
                <Switch>
                  <Route path="/welcome" component={WelcomePage} exact />
                  <Route path="/myEmails" component={ComposeEmailPage} exact />
                  <Route path="/compose" component={ComposeEmailPage} exact />

                  <Redirect from="/" to="/welcome" exact />
                </Switch>
              </div>
          </div>

          </BrowserRouter>
    </div>
  );
}

export default App;
