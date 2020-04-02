const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(404).json({message: 'Hello from the server side!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to thid endpoit..');
// })

const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours      
        }
    });
}); 

app.post('/api/v1/tours', (req, res) => {
   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({id: newId }, req.body);

   tours.push(newTour);
   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
    error => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        })
    }
   )

});

const port = 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}`);
})