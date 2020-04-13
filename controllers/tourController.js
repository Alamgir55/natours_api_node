const fs = require('fs');

const tours = JSON.parse( fs.readFileSync(`${__dirname}/./../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'error',
            message: 'NO data'
        })
    }
    next();
}

exports.getAllTours =  (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        results: tours.length,
        data: {
            tours      
        }
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
   
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'error',
            message: 'name and price require'
        })
    }
    next();
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId }, req.body);
 
    tours.push(newTour);
    fs.writeFile(`${__dirname}/./../dev-data/data/tours-simple.json`, JSON.stringify(tours),
     error => {
         res.status(201).json({
             status: 'success',
             data: {
                 tours: newTour
             }
         })
     }
    )
 };

exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here...>'
        }
    }); 
};

exports.deleteTour =  (req, res) => {
    
    res.status(204).json({
        status: 'success',
        data: null
    })
}
