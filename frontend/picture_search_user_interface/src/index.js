import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk'
import placeListReducer from './store/reducers/placeList'
import fetchFlickrDataReducer from './store/reducers/fetchFlickrData'
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

// Creating cahce and link for ApolloClient
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
})
const client = new ApolloClient({
  cache,
  link
})



const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers(
  {
    placeList: placeListReducer,
    photoList: fetchFlickrDataReducer

  }
)

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
