//server.js
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const dbconnect = require('./db.js');
const Modelcarta = require('./models/cartaModel.js');


const app = express();
const openai = new OpenAI({
    apiKey: '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' 
});

// Servir archivos estáticos desde el directorio 'public' para probar con el html
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/cartas',async (req, res)=>{
    try{
        const ourCartas =  await Modelcarta.find()
        res.send(ourCartas)
    }catch(error){
        console.log(error)
    }
});

app.post('/generar-carta', async (req, res) => {
    try {
        //const { cargo, empresa, experiencia } = req.body;
        const { consulta } = req.body;
        //const carta = await generarCartaDeMotivacion(cargo, empresa, experiencia);
        const carta = await consultaGeneral(consulta);
        // Convertir la carta a una cadena
        const cartaString = carta.toString();
        // guardar en la base de datos
        // Crear una instancia del modelo de carta con los datos
        const ourCarta = new Modelcarta({
            cargo: cargo,
            empresa: empresa,
            experiencia: experiencia,
            carta: cartaString
        });
        
        // Guardar la instancia en la base de datos
        await ourCarta.save();
        res.json({ carta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar la carta de intención' });
    }
});

async function consultaGeneral(consulta) {
    // OpenAI para generar la carta de intención
    // utilizando la información proporcionada por el usuario
    console.log(`${consulta}`);
    const prompt = `me podrias ayudar con: ${consulta}\n`;
    const response = await openai.chat.completions.create({
        messages: [{"role": "system", content: "tu asistente de cartas de intención."},
        { role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });
    
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
}
async function generarCartaDeMotivacion(cargo, empresa, experiencia) {
    // OpenAI para generar la carta de intención
    // utilizando la información proporcionada por el usuario
    console.log(`${cargo}, ${empresa}, ${experiencia}`);
    const prompt = `haz una carta de motivación con lo siguiente: cargo: ${cargo}, empresa: ${empresa} y experiencia en ese cargo: ${experiencia} años de experiencia\n`;
    const response = await openai.chat.completions.create({
        messages: [{"role": "system", content: "tu asistente de cartas de intención."},
        { role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

dbconnect();