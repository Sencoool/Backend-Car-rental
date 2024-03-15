// index.js
const express = require("express");
const app = express();
const Sequelize = require("sequelize");

//set project
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//set database
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database/carrentalsystem.sqlite",
});
const user = sequelize.define("user", {
  userid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  drivinglicense: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  typeid: {
    type: Sequelize.STRING,
    defaultValue: "user",
  },
});
const payment = sequelize.define("payment", {
  paymentid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  carholdername: {
    type: Sequelize.STRING,
  },
  cardnumber: Sequelize.STRING,
});
const rental = sequelize.define("rental", {
  rentalid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: Sequelize.INTEGER,
  },
  carid: {
    type: Sequelize.INTEGER,
  },
  paymentid: {
    type: Sequelize.INTEGER,
  },
  checkindate: {
    type: Sequelize.STRING,
  },
  checkoutdate: {
    type: Sequelize.STRING,
  },
  rentaltotal: {
    type: Sequelize.INTEGER,
  },
});
const car = sequelize.define("car", {
  carid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  licenseplate: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.STRING,
  },
  capacity: {
    type: Sequelize.INTEGER,
  },
  priceperday: {
    type: Sequelize.INTEGER,
  },
  insurance_charge: {
    type: Sequelize.INTEGER,
  },
  brand: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  Image: {
    type: Sequelize.STRING,
  },
});
sequelize.sync();

app.get("/getuser", (req, res) => {
  user
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/admincreatecar", (req, res) => {
  car
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/history", (req, res) => {
  rental
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/getuser/:id", (req, res) => {
  user
    .findByPk(req.params.id)
    .then((u) => {
      if (!u) {
        res.status(404).send("no user");
      } else {
        res.json(u);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/createuser", (req, res) => {
  user
    .create(req.body)
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkuser = await user.findOne({ where: { username } });
    // console.log(checkuser,"Hello");
    if (!checkuser) {
      return res.json({ massage: "ON", userid: checkuser.userid });
    }
    return res.json({ massage: true, checkuser, userid: checkuser.userid });
  } catch (error) {
    res.status(500).send("Error in login");
  }
});

app.post("/createcar", (req, res) => {
  car
    .create(req.body)
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/showcar", (req, res) => {
  car
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/showcar/:id", (req, res) => {
  car
    .findByPk(req.params.id)
    .then((u) => {
      if (!u) {
        res.status(404).send("no user");
      } else {
        res.json(u);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/admincar", (req, res) => {
  rental
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/payment", (req, res) => {
  console.log(req.body);
  payment
    .create(req.body)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/payment", (req, res) => {
  payment
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/payment/:name", (req, res) => {
  payment
    .findOne({ where: { carholdername: req.params.name } })
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {});
});

app.get("/rental", (req, res) => {
  rental
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/rental/:id", (req, res) => {
  rental
    .findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {});
});

app.get("/receipt/:id", (req, res) => {
  receipt
    .findOne({ where: { userid: req.params.id } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {});
});

app.post("/rental", (req, res) => {
  rental
    .create(req.body)
    .then(() => {
      res.json({});
    })
    .catch((err) => {});
});

app.get("/receipt", (req, res) => {
  rental
    .findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/detailrent/:carid", (req, res) => {
  car
    .findByPk(req.params.carid)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/showcar/:id", (req, res) => {
  car
    .findByPk(req.params.id)
    .then((car) => {
      if (!car) {
        res.status.send("Bookn not found");
      } else {
        car
          .update(req.body)
          .then(() => {
            res.send(car);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/getuser/:id", (req, res) => {
  user
    .findByPk(req.params.id)
    .then((user) => {
      if (!car) {
        user.status.send("Bookn not found");
      } else {
        car
          .update(req.body)
          .then(() => {
            user.send(car);
          })
          .catch((err) => {
            user.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.put("/payment/:id", (req, res) => {
  payment
    .findByPk(req.params.id)
    .then((car) => {
      if (!car) {
        res.status.send("Bookn not found");
      } else {
        car
          .update(req.body)
          .then(() => {
            res.send(car);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/rental/:id", (req, res) => {
  rental
    .findByPk(req.params.id)
    .then((user) => {
      if (!car) {
        user.status.send("Bookn not found");
      } else {
        car
          .update(req.body)
          .then(() => {
            user.send(car);
          })
          .catch((err) => {
            user.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/getuser/:id", (req, res) => {
  user
    .findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status.send("Bookn not found");
      } else {
        user
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/showcar/:id", (req, res) => {
  car
    .findByPk(req.params.id)
    .then((car) => {
      if (!car) {
        res.status.send("Bookn not found");
      } else {
        car
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/payment/:id", (req, res) => {
  payment
    .findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status.send("Bookn not found");
      } else {
        user
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/rental/:id", (req, res) => {
  rental
    .findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status.send("Bookn not found");
      } else {
        user
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// app.put('/showcar/:id',(req,res)=>{
//     car.findByPk(req.params.id).then(car =>{
//         if(!car){
//             res.status.send('Bookn not found')
//         }else{
//             user.update(req.body).then(()=>{
//                 res.send(car)
//             }).catch(err=>{
//                 res.status(500).send(err)
//             })
//         }
//     }).catch(err=>{
//         res.status(500).send(err)
//     })
// })

//connect server
app.listen(3000, () => {
  console.log("connect server");
});
