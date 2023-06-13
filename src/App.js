import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './apollo';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';


import RestaurantSearch from './components/RestaurantSearch';
import RestaurantDetails from './components/RestaurantDetails';
import Cart from './components/Cart';

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  // const dispatch = useDispatch({ type: '' });

  return (
    <ApolloProvider client={client}>    
      <SnackbarProvider maxSnack={3}> 
        <Router>
        <Navbar {...{isLoggedIn}}/>
          <Switch>
            <Route exact path="/" component={RestaurantSearch} />
            <Route path="/restaurant/:id" component={RestaurantDetails} />
            <Route path="/cart/:id" component={Cart} />
          </Switch>
        </Router>
        </SnackbarProvider>.
    </ApolloProvider>
  );
};

export default App;