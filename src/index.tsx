import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { store } from 'redux/store';
import './translations/i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="530741558195-vqpk5hpom5qu2dhfmcaiqr9dpck4ee20.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
);

reportWebVitals();
