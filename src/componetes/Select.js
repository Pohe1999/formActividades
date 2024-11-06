
    const pbsdata = "./../PB.json"
    // const getStatedata= countrydata.find(country=>country.country_id===getcountryId).states;

    console.log(pbsdata)

    const fs = require('fs');

    fs.readFile(pbsdata, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    //   console.log(jsonData);
    const poligonos = [...new Set(jsonData.map((pol)=>pol.POLIGONO))]
    const secciones = [...new Set(jsonData.filter((SECC)=>(SECC.POLIGONO) === 8 ).map((pol)=>pol.SECCION))];
    const ubts = [...new Set(jsonData.map((data)=>(data.UBT)))]
    const ubtSeleccionada = [...new Set(jsonData.filter((SECC)=>(SECC.SECCION) === 4208 ).map((pol)=>pol.UBT))];
   
            
    console.log(poligonos);
    console.log(jsonData[400].POLIGONO);
    
    console.log(ubtSeleccionada);
    console.log(secciones);

    let pb_x = jsonData.find(ubtx => ubtx.UBT == "4208-31");
    console.log(jsonData[0]['NOMBRE DE PB']);
    console.log(pb_x['NOMBRE DE PB']);
});

