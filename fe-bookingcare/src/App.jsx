import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Admin from './pages/Home/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
