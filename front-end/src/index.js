import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store,persistor} from './redux/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient} contextSharing={true}>

      <App />
    </QueryClientProvider>
    </PersistGate>
    
  </Provider>
  ,
  document.getElementById('root')
);
