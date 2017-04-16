import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

// ApolloClient serves as a central store of query result data which caches and
// distributes the results of our queries.
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
// ApolloProvider makes that client instance (ApolloClient) available to our
// React component hierarchy. We suggest putting the ApolloProvider somewhere
// high in your view hierarchy, above any places where you need to access
// GraphQL data. For example, it could be outside of your root route component
// if you’re using React Router.
import { ApolloProvider } from 'react-apollo';

import App from '/imports/ui/App';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the `/graphql` endpoint on the same host.
const client = new ApolloClient(meteorClientConfig());

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app')
  );
});
