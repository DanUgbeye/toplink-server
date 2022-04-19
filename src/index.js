require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.route('/').get((req, res) => {
    res.send('server up and running!!!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`app started on port ${PORT}`);
});
