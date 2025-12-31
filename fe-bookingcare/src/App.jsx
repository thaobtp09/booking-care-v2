import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Admin from './pages/Home/Admin';
import SpecialtyPage from './pages/SpecialtyPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/specialties" component={SpecialtyPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
