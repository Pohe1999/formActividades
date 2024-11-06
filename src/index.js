import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ContactForm from './componetes/ContactForm';
import Countrystate from './componetes/Countrystate';
import FormActividades from './componetes/FormActividades';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormActividades />
    {/* <ContactForm/> */}
  </React.StrictMode>
);


