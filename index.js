const express = require("express");
const app = express();
const Sequelize = require('sequelize');

//set project
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//set database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database/carrentalsystem.sqlite'
});
const user = sequelize.define("user",{
    userid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING
    },
    drivinglicense:{
        type: Sequelize.STRING
    },
    address:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    }
});
const payment = sequelize.define("payment",{
    paymentid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    carholdername:{
        type: Sequelize.STRING
    },
    cardnumber: Sequelize.STRING
});
const rental = sequelize.define("rental",{
    rentalid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid:{
        type: Sequelize.INTEGER
    },
    carid:{
        type: Sequelize.INTEGER
    },
    paymentid:{
        type: Sequelize.INTEGER
    },
    checkindate:{
        type: Sequelize.STRING
    },
    checkoutdate:{
        type: Sequelize.STRING
    },
    rentaltotal:{
        type: Sequelize.INTEGER
    }
});
const car = sequelize.define("car",{
    carid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseplate:{
        type: Sequelize.STRING
    },
    year:{
        type: Sequelize.STRING
    },
    capacity:{
        type: Sequelize.INTEGER
    },
    priceperday:{
        type: Sequelize.INTEGER
    },
    insurance_charge:{
        type: Sequelize.INTEGER
    },
    brand:{
        type: Sequelize.STRING
    },
    color:{
        type: Sequelize.STRING
    }
});
sequelize.sync();

app.get("/getuser",(req,res) => {
    user.findAll().then(data => {
        if (data) {
            res.json(data);
        }
    }).catch(err => {
        res.status(500).send(err);
    })
});

app.post("/createuser",(req,res) => {
    user.create(req.body).then(() => {
        res.json({});
    }).catch(err => {
        res.status(500).send(err);
    });
});

//connect server
app.listen(3000,() => {
    console.log("connect server");
});