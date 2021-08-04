import {Route, Switch} from 'react-router-dom'
import LoginPage from './pages/loginPage'

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default App;
