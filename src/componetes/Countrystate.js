import React, { useState } from 'react';  // Importamos React y useState para manejar el estado
import countrydata from './../countries.json';  // Importamos los datos de los países desde un archivo JSON

// Componente principal que maneja el formulario de selección de país y estado
function Countrystate() {
  // Definimos el estado para manejar el país seleccionado, los estados del país y el estado seleccionado
  const [countryid, setCountryid] = useState('');  // Guardará el ID del país seleccionado
  const [state, setState] = useState([]);  // Guardará la lista de estados del país seleccionado
  const [stateid, setStateid] = useState('');  // Guardará el ID del estado seleccionado

  // Función que se ejecuta cuando se selecciona un país
  const handlecounty = (e) => {
    const getcountryId = e.target.value;  // Obtenemos el valor del país seleccionado
    // Buscamos el país en el JSON y obtenemos sus estados
    const getStatedata = countrydata.find(country => country.country_id === getcountryId).states;
    // Actualizamos el estado con los estados del país seleccionado
    setState(getStatedata);
    // Actualizamos el ID del país seleccionado
    setCountryid(getcountryId);
  };

  // Función que se ejecuta cuando se selecciona un estado
  const handlestate = (e) => {
    const stateid = e.target.value;  // Obtenemos el valor del estado seleccionado
    // Actualizamos el estado con el ID del estado seleccionado
    setStateid(stateid);
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto de enviar el formulario (recargar la página)
    // Mostramos una alerta con el país y el estado seleccionados
    alert("Get Country id: " + countryid + " And " + stateid);
  };

  return (
    <React.Fragment>
      <div>
        <h3 className=''>Select Country and State from JSON file in React js</h3>
        {/* El formulario que contiene los selects para el país y el estado */}
        <form onSubmit={handleSubmit}>
          {/* Select para elegir el país */}
          <div>
            <label>Country</label>
            <select name='country' onChange={(e) => handlecounty(e)}>
              <option value="">--Select Country--</option>
              {/* Recorremos los datos de países y mostramos un option para cada uno */}
              {
                countrydata.map((getcountry, index) => (
                  <option value={getcountry.country_id} key={index}>{getcountry.country_name}</option>
                ))
              }
            </select>
          </div>

          {/* Select para elegir el estado */}
          <div>
            <label>State</label>
            <select name='states' onChange={(e) => handlestate(e)}>
              <option value="">--Select State--</option>
              {/* Recorremos los estados y mostramos un option para cada uno */}
              {
                state.map((getstate, index) => (
                  <option value={getstate.state_id} key={index}>{getstate.state_name}</option>
                ))
              }
            </select>
          </div>

          {/* Botón de envío del formulario */}
          <div>
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </React.Fragment>
  );
}

export default Countrystate;
