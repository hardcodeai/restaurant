import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './apollo';

import RestaurantSearch from './components/RestaurantSearch';
import RestaurantDetails from './components/RestaurantDetails';
import Cart from './components/Cart';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={RestaurantSearch} />
          <Route path="/restaurant/:id" component={RestaurantDetails} />
          <Route path="/cart/:id" component={Cart} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;