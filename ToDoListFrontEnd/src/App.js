import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import ToDo from './Components/js/ToDo/TodoPage';
import NotFound from './Components/js/ErrorHandling/NotFound';

function App() {
  return (
    //setup routing just in case if the user decides to add more modules to the application
    <Router>
    <Switch>
     <Route exact path="/" component={ToDo}/>
     <Route  component={NotFound}/>
     </Switch>
    </Router>
  );
}
export default App;
