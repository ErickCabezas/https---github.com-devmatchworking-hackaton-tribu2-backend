const mongoose = require('mongoose');
//const { cargo, empresa, experiencia } = req.body y la carta;
const cartaSchema= new mongoose.Schema({
    cargo: {
        type: String,
    },
    empresa: {
        type: String,
    },
    experiencia: {
        type: String,
    },
    carta: {
        type: String,
    }

},
{
    //timestamps: para que me agrege de forma automatica la fecha de creación en una columna
    timestamps: true,
    //
    versionKey: false,
}
);

const Modelcarta= mongoose.model("cartas", cartaSchema);
module.exports = Modelcarta;