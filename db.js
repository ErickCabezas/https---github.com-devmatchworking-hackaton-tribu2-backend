const mongoose = require('mongoose');

async function dbconnect(){
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/CartaDeIntencion")
    console.log("conexión exitosa a la BD: ", db.connection.name)
  } catch (error) {
    console.log("Error: "+error)
  }
}

module.exports = dbconnect;
//mongodb://localhost:27017/CartaDeIntencion
