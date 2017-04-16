import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Header from './Header';
import Loading from './Loading';
import LoginForm from './LoginForm';

const App = ({ curUser, refetch, userLoading }) => (
  <div className="App">

    <Header />

    <div className="App-block">
      {userLoading
        ? <Loading />
        : <div className="App-content">
            <LoginForm />
            {curUser
              ? <div>
                  <pre>{JSON.stringify(curUser, null, 2)}</pre>
                  <button onClick={() => refetch()}>Refetch the query!</button>
                </div>
              : 'Please log in!'}
          </div>}
    </div>

  </div>
);

App.propTypes = {
  curUser: PropTypes.object,
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
};

/*
 * We use `gql` from graphql-tag to parse GraphQL query strings into the standard GraphQL AST
 * See for more information: https://github.com/apollographql/graphql-tag
 */
const GET_CUR_USER_DATA = gql`
  query getCurUser {
    curUser {
      emails {
        address
        verified
      }
      randomString
      _id
    }
  }
`;

/*
 * Apollo Client lets you attach GraphQL queries to your UI components to easily load data
 *
 * We use the `graphql` higher order component to send the graphql query to our server
 * See for more information: http://dev.apollodata.com/react/
 * The graphql() container is the recommended approach for fetching data or
 * making mutations. It is a React Higher Order Component, and interacts with
 * the wrapped component via props.
 */
const withData = graphql(
  GET_CUR_USER_DATA,
  { options: { notifyOnNetworkStatusChange: true }, // },
  // {
    // Destructure the default props to more explicit ones
    props: ({ data: { error, loading, curUser, refetch } }) => {
      if (loading) return { userLoading: true };
      if (error) return { hasErrors: true };

      return {
        curUser,
        refetch,
      };
    },
  }
);

export default withData(App);
