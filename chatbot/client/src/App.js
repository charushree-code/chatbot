import React from "react";
import Chatbot from "./components/chatbot/chatbot"
import home from "./components/home/home"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {

  return (
  <Router>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      
      <Switch>
     <Route path='/chatbot' component={Chatbot}/>
     <Route path='/' exact component={home}/>
     </Switch>
     </div>
  </Router>
  );
}

export default App;
