import React from 'react';

/*
* If you are relying on the current user in your queries, you’ll want to clear
* the store when the current user state changes. To do so, use
* client.resetStore() in the Meteor.logout callback:
*
* Meteor.logout(function() {
*   return client.resetStore(); // make all active queries re-run when the log-out process completed
* });
*
* The `client` variable refers to your `ApolloClient` instance. It would be
* imported in your template, or passed via props thanks to `withApollo` in React
* for example.
*/
import { withApollo } from 'react-apollo';
import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});

/*
 * Demonstrate the use of `withApollo` higher order component to give access to
 * the Apollo Client directly in the component's props as `client`.
 * `client` is used here to reset the data store when the current user changes.
 * See for more information: http://dev.apollodata.com/core/meteor.html#Accounts
 */
const LoginForm = props => (
  <Accounts.ui.LoginForm
    onSignedInHook={() => props.client.resetStore()}
    onSignedOutHook={() => props.client.resetStore()}
    onPostSignUpHook={() => props.client.resetStore()}
  />
);

export default withApollo(LoginForm);
