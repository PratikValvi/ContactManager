import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import ContactList from './Components/ContactList';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';

function App() {
  return (
    <>
      <ChakraProvider>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <ContactList />
              </Route>
              <Route path="/add">
                <AddContact />
              </Route>
              <Route path="/edit">
                <EditContact />
              </Route>
            </Switch>
          </Router>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
