import React from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Router, Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import ContactList from './Components/ContactList';
import Contact from './Components/Contact';
import history from './history';
import { ContactProvider } from './Components/ContactContext';

function App() {
  return (
    <>
      <ChakraProvider>
        <ContactProvider>
          <div className="App">
            <Router history={history}>
              <Header />
              <Switch>
                <Route exact path="/">
                  <ContactList />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
              </Switch>
            </Router>
          </div>
        </ContactProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
