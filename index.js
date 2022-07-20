import express from "express";
import data from "./data/mock.json" assert {type: "json"};

const app = express();

const PORT = 3000;

app.use('/images', express.static('images'));

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET
app.get('/', (req, res) => {
    res.json(data);
});

//POST - using express.json and express.urlencoded
app.post('/item', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

//GET - Download method
app.get('/download', (req, res) => {
    res.download('images/mountains.jpeg');
});

//GET - Redirect method
app.get('/redirect', (req, res) => {
    res.redirect('http://www.google.com');
});

//GET with route handler next();
app.get('/next', (req, res, next) => {
    console.log('This response will be sent by the next function');
    next();
}, (req, res) => {
    res.send('I just set up a route with a second callback.');
});

//Route chaining
app.route('/class')
    .get((req, res) => {
       //res.send('retrieving class info');
       throw new Error();

    })
    .post((req, res) => {
        res.send('creating class info');
    })
    .put((req, res) => {
        res.send('updating class info');
    });

//GET with routing parameters
app.get('/class/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = data.filter((student) => student.id === studentId);

    res.send(student);
});

//POST
app.post('/create', (req, res) => {
    res.send('This is a POST request at /create');
});

//PUT
app.put('/edit', (req, res) => {
    res.send('This is a PUT request at /edit');
});

//DELETE
app.delete('/delete', (req, res) => {
    res.send('This is a PUT request at /delete');
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something is broken');
});

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
    console.log(data);
})