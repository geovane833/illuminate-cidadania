const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Substitua pelo URL do seu banco de dados Firebase
});

const db = admin.firestore();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/cadastrarReclamacao.html');
});

app.post('/processar-reclamacao', (req, res) => {
  const nomeRua = req.body.nomeRua;
  const pontoReferencia = req.body.pontoReferencia;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const nomeReclamante = req.body.nomeReclamante;
  const whatsapp = req.body.whatsapp;

  // Salvar dados no Firestore
  db.collection('Reclamacao').add({
    nomeRua,
    pontoReferencia,
    bairro,
    cidade,
    nomeReclamante,
    whatsapp,
  })
  .then(docRef => {
    res.send('Reclamação processada com sucesso! ID: ' + docRef.id);
  })
  .catch(error => {
    res.status(500).send('Erro ao processar reclamação: ' + error.message);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});