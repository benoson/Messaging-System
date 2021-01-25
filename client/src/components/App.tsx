import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LeftSidebar from './sidebar/LeftSidebar';
import Navbar from './navbar/Navbar';
import ComposeEmailPage from './compose-email-page/ComposeEmailPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="dividedSection">
        <LeftSidebar />

        <BrowserRouter>
          <Switch>
            <Route path="/myEmails" component={ComposeEmailPage} exact />
            <Route path="/compose" component={ComposeEmailPage} exact />
            
            <Redirect from="/" to="/welcome" exact />
          </Switch>

        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
