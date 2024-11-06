import React, { useRef, useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import pbsdata from './../PB.json';
import '../estilos/estilos.css'

function FormActividades()
{
 const[poligono, setpoligono]=useState('');
 const[state, setState]=useState([]);
 const[stateid, setStateid]= useState('');
 const[ubtselect, setUbtSelect]=useState('');
 const[ubt, setUbt]=useState([]);
 const[pb, setPb]=useState([]);
 const [file, setFile] = useState(null);
 const [imageHeight, setImageHeight] = useState(20);
 const formRef = useRef(null);
  

  const handlepoligono=(e)=>{
    const getpoligono= e.target.value;
    const getStatedata= pbsdata.filter((SECC)=>(SECC.POLIGONO) == getpoligono );
    const secciones = pbsdata.filter((SECC)=>(SECC.POLIGONO) == getpoligono ).map((pol)=>pol.SECCION);
    
  
    let set = new Set( secciones.map(JSON.stringify) )
    let arrSinDuplicaciones = Array.from( set ).map( JSON.parse );
    
    //setState(getStatedata);
    setState(arrSinDuplicaciones);
    setpoligono(getpoligono);
  //console.log(getpoligono);
  }

  const handlestate = (e)=>{
    const stateid= e.target.value;
    // const secciones = pbsdata.filter((SECC)=>(SECC.POLIGONO) == getpoligono ).map((pol)=>pol.SECCION);
    // const ubts = [...new Set(jsonData.map((data)=>(data.UBT)))]
    // const ubtSeleccionada = [...new Set(jsonData.filter((SECC)=>(SECC.SECCION) === 4208 ).map((pol)=>pol.UBT))];

    const ubts = pbsdata.filter((SECC)=>(SECC.SECCION) == stateid ).map((pol)=>pol.UBT);
    console.log(stateid);
    setStateid(stateid);
    setUbt(ubts)


  }

  const handleUbt = (e)=>{
    const stateid= e.target.value;
    const pb_x = pbsdata.find(ubtx => ubtx.UBT == stateid);
    setPb(pb_x['NOMBRE DE PB']);
    setUbtSelect(stateid);
    //console.log(stateid);
    // setUbt(stateid);

  }


  function handleChange(e) {
    console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];  // Obtiene el archivo seleccionado
          if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFile(reader.result);  // Establece la imagen en formato base64
              };
              reader.readAsDataURL(file);  // Convierte la imagen a base64
          }
  
  
  }


const handleSubmit=(e)=>{
  e.preventDefault();
  
 
  // const formRef = {"POLIGONO": poligono, 
  //                   "SECCION" : stateid,
  //                   "UBT": stateid,
  //                   "PB": pb};
  const formData = new FormData();
  let now = new Date();
  formData.append('HORA', now);
  formData.append('POLIGONO', poligono);
  formData.append('SECCION', stateid);
  formData.append('UBT', ubtselect);
  formData.append('PB', pb);
  formData.append('IMAGEN', file);
  
  // console.log(formData);
  fetch("https://script.google.com/macros/s/AKfycbxTLJYVYkfUBSbvQ7OMq3nCTGpgarsvsxFkQ_dXJTs2WMefwa4LkytqSCJV4vR4LZ1DiA/exec", {
    method: 'POST',
    body: formData,
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.msg);
      
      setpoligono('');
      setState([]);
      setStateid('');
      setUbtSelect('');
      setUbt([]);
      setPb([]);
      setFile(null);
    })
    .catch(err => console.log(err));

    
};

// alert(pb);




const poligonos = [...new Set(pbsdata.map((pol)=>pol.POLIGONO))];
console.log(poligonos);
// const secciones = [...new Set(pbsdata.map((SECC)=>(SECC.SECCION)))];
// const secciones = [...new Set(pbsdata.filter((SECC)=>(SECC.POLIGONO) =="9" ).map((pol)=>pol.SECCION))];
return(
<React.Fragment>
         <Container className="content" style={{ width: "auto", height: "auto", alignItems: "center", display: "flex", justifyContent: "center" }}>
        <div className="row">
          <div className="col-sm-12">
         <h1>Evidencia Volanteo Calaverita</h1>
         <form className="row g-3" onSubmit={handleSubmit}>

              <div className="col-md-3">
                <label  className="form-label"> Polígono</label>            
                    <div className="text-dark"> 
                       <select name='poligono' className='form-control' onChange={(e)=>handlepoligono(e)} required>
                        <option value="">--Selecciona el Polígono--</option>
                        {
                        // const poligonos = [...new Set(jsonData.map((pol)=>pol.POLIGONO))]
                        poligonos.map( (getpol)=>(
                          <option value={getpol.POLIGONO} key={getpol.POLIGONO}>{getpol}</option> 
                        ))

                        }
                  
                    
                        </select>           
                    </div>
                    </div>
                    <div className="col-md-3">
                <label  className="form-label"> Sección</label>            
                    <div className="text-dark"> 
                    <select name='seccion' className='form-control' onChange={(e)=>handlestate(e)} required>
                        <option value="">--Seleccione la sección-</option>
                        {
                          state.map((getstate)=>(
                            <option value={getstate.SECCION} >{ getstate }</option>
                          ))
                        }
                       
                       
                        </select>          
                    </div>
                    </div>

                    <div className="col-md-3">
                <label  className="form-label"> UBT</label>            
                    <div className="text-dark"> 
                    <select name='ubt' className='form-control' onChange={(e)=>handleUbt(e)} required>
                        <option value="">--Seleccione la UBT-</option>
                        {
                          ubt.map((getubt)=>(
                            <option value={getubt.UBT} >{ getubt }</option>
                          ))
                        }
                       
                       
                        </select>   

                             
                    </div>
                    </div>

                    <label  className="form-label"> {pb}</label>

                    <div className="text-dark"> 
                        <label>Subir evidencia fotografica</label><br/>
                        <input type="file" onChange={handleChange} accept="image/*" required/>
                        <img src={file} style={{ height: imageHeight }} onLoad={() => setImageHeight(200)}/>
                        
                    </div>

            
                    <div className="col-md-2" style={{padding:'9px'}}>
                      <label  className="form-label"> </label>            
                    <div className="text-dark"> 
                      <button  name='submit' className='btn btn-success'>Enviar</button>
                     </div>
                    </div>

        </form>
        </div>
        </div>
        </Container>
       
    </React.Fragment>);
}

export default FormActividades;