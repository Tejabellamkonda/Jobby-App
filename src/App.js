import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/Not Found'
import JobItemDetails from './components/Job Item Details'
import Home from './components/Home'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
