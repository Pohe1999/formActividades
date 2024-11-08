import React, { useRef, useState } from 'react';  // Importamos React, useState para manejo de estado y useRef para referencia del formulario
import pbsdata from './../PBS_06112024.json';  // Importamos los datos de polígono, sección, UBT y PB desde un archivo JSON
import supabase from '../supabaseClient';  // Importamos el cliente de Supabase para insertar datos en la base de datos

function FormActividades() {
  // Estados para almacenar la información seleccionada por el usuario en el formulario
  const [poligono, setPoligono] = useState('');  // Estado para el polígono seleccionado
  const [state, setState] = useState([]);  // Estado para las secciones disponibles según el polígono seleccionado
  const [stateid, setStateid] = useState('');  // Estado para la sección seleccionada
  const [ubtselect, setUbtSelect] = useState('');  // Estado para el UBT seleccionado
  const [ubt, setUbt] = useState([]);  // Estado para los UBTS disponibles según la sección seleccionada
  const [pb, setPb] = useState([]);  // Estado para el nombre de PB según el UBT seleccionado
  const [file, setFile] = useState(null);  // Estado para almacenar la imagen cargada
  const [imageHeight, setImageHeight] = useState(20);  // Estado para controlar la altura de la imagen cargada
  const formRef = useRef(null);  // Referencia al formulario para realizar acciones si es necesario
  const [status, setStatus] = useState('');  // Estado para manejar el estado del envío del formulario (éxito o error)
  const [formData, setFormData] = useState({ POLIGONO: '', SECCION: '', UBT: '', PB: '', IMAGEN: '' });  // Estado para almacenar los datos del formulario

  // Función para manejar el cambio en el campo de polígono
  const handlePoligono = (e) => {
    const getPoligono = e.target.value;  // Obtenemos el polígono seleccionado
    const getStateData = pbsdata.filter((SECC) => SECC.POLIGONO === getPoligono);  // Filtramos los datos de PBS según el polígono seleccionado
    const secciones = getStateData.map((pol) => pol.SECCION);  // Extraemos las secciones correspondientes a ese polígono

    // Eliminamos duplicados de las secciones utilizando un Set
    let set = new Set(secciones.map(JSON.stringify));
    let arrSinDuplicaciones = Array.from(set).map(JSON.parse);

    // Actualizamos el estado con las secciones sin duplicados
    setState(arrSinDuplicaciones);
    setPoligono(getPoligono);  // Actualizamos el polígono seleccionado
  };

  // Función para manejar el cambio en el campo de sección
  const handleState = (e) => {
    const stateid = e.target.value;  // Obtenemos la sección seleccionada
    const ubts = pbsdata.filter((SECC) => SECC.SECCION === stateid).map((pol) => pol.UBT);  // Filtramos los UBTS según la sección seleccionada

    // Actualizamos los estados con los UBTS correspondientes a la sección seleccionada
    setStateid(stateid);
    setUbt(ubts);  // Establecemos los UBTS disponibles
  };

  // Función para manejar el cambio en el campo de UBT
  const handleUbt = (e) => {
    const stateid = e.target.value;  // Obtenemos el UBT seleccionado
    const pb_x = pbsdata.find((ubtx) => ubtx.UBT === stateid);  // Buscamos el nombre de PB correspondiente al UBT seleccionado

    // Actualizamos el estado con el nombre de PB
    setPb(pb_x ? pb_x['NOMBRE DE PB'] : '');  // Si no se encuentra el UBT, dejamos el nombre de PB vacío
    setUbtSelect(stateid);  // Actualizamos el UBT seleccionado
  };

  // Función para manejar el cambio del archivo de imagen
  function handleChange(e) {
    const file = e.target.files[0];  // Obtenemos el archivo seleccionado

    // Si se selecciona un archivo, lo leemos y lo convertimos a base64
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);  // Establecemos la imagen en formato base64
      };
      reader.readAsDataURL(file);  // Convertimos la imagen a base64
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto del formulario (recargar la página)

    // Creamos un objeto FormData con los datos del formulario
    const formData = new FormData();
    let now = new Date();

    formData.POLIGONO = poligono;  // Asignamos el polígono seleccionado
    formData.SECCION = stateid;  // Asignamos la sección seleccionada
    formData.UBT = ubtselect;  // Asignamos el UBT seleccionado
    formData.PB = pb;  // Asignamos el nombre de PB
    formData.IMAGEN = file;  // Asignamos la imagen cargada

    try {
      // Enviamos los datos a Supabase
      const { data, error } = await supabase
        .from('CalaveritaNov2024')  // Nombre de la tabla en Supabase
        .insert([formData]);  // Insertamos los datos

      if (error) throw error;  // Si ocurre un error, lo lanzamos

      // Si todo va bien, mostramos un mensaje de éxito
      setStatus('Datos enviados con éxito!');

      // Limpiamos los campos del formulario
      setPoligono('');
      setState([]);
      setStateid('');
      setUbtSelect('');
      setUbt([]);
      setPb([]);
      setFile(null);
    } catch (error) {
      console.error('Error al enviar los datos:', error.message);  // Si ocurre un error, lo mostramos en la consola
      setStatus('Error al enviar los datos');  // Mostramos un mensaje de error
    }
  };

  // Obtenemos los polígonos disponibles del archivo de datos
  const poligonos = [...new Set(pbsdata.map((pol) => pol.POLIGONO))];  // Eliminamos duplicados de los polígonos

  return (
    <React.Fragment>
      <div className='bg-purple-700 py-6'>
        <div className='container mx-auto'>
          <h1 className='text-center text-4xl font-extrabold text-white mb-4'>Evidencia Volanteo Calaverita</h1>
          <h4 className='text-center text-lg text-slate-100 mb-8 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-lg'>
            Formulario de registro de comprobación de volanteo de calaveritas 2024. ¡Recuerda seleccionar la UBT correcta!
          </h4>
        </div>

        {/* Formulario para capturar los datos */}
        <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg'>
          {/* Campo para seleccionar el polígono */}
          <div>
            <label className='block text-xl font-medium text-gray-800'>Polígono</label>
            <select
              name="poligono"
              onChange={handlePoligono}
              required
              className='w-full p-3 mt-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              <option value="">--Selecciona el Polígono--</option>
              {poligonos.map((getPol) => (
                <option value={getPol} key={getPol}>
                  {getPol}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para seleccionar la sección */}
          <div>
            <label className='block text-xl font-medium text-gray-800'>Sección</label>
            <select
              name="seccion"
              onChange={handleState}
              required
              className='w-full p-3 mt-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              <option value="">--Seleccione la sección--</option>
              {state.map((getState) => (
                <option value={getState} key={getState}>
                  {getState}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para seleccionar el UBT */}
          <div>
            <label className='block text-xl font-medium text-gray-800'>UBT</label>
            <select
              name="ubt"
              onChange={handleUbt}
              required
              className='w-full p-3 mt-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              <option value="">--Seleccione el UBT--</option>
              {ubt.map((getUbt) => (
                <option value={getUbt} key={getUbt}>
                  {getUbt}
                </option>
              ))}
            </select>
          </div>

          {/* Mostrar el nombre de PB asociado al UBT */}
          <div>
            <label className='block text-lg font-medium text-gray-800'>PB: {pb}</label>
          </div>

          {/* Campo para cargar la imagen */}
          <div>
            <label className='block text-xl font-medium text-gray-800'>Subir evidencia fotográfica</label>
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              required
              className='w-full p-3 mt-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
            {file && <img src={file} alt="Vista previa" style={{ height: imageHeight }} className="mt-4 mx-auto rounded-md" />}
          </div>

          {/* Botón para enviar el formulario */}
          <div>
            <button
              type="submit"
              className='w-full py-3 mt-6 text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              Enviar
            </button>
          </div>
        </form>

        {/* Mostrar el estado de envío del formulario */}
        {status && (
          <p className='text-center text-lg text-white mt-6'>
            {status}
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export default FormActividades;
