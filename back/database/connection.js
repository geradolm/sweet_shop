module.exports = (app) => {
  let items = [
    {
      id: 1,
      productName: "Brandy Snap",
      productQuantity: 15,
      productPrice: 1.5,
      productDescription:
        "A mixture of golden syrup, flour, ginger, cream, sugar, butter and lemon juice.",
    },
    {
      id: 2,
      productName: "Tiramisu",
      productQuantity: 35,
      productPrice: 3.65,
      productDescription:
        "Delicate lady finger cookies, espresso, mascarpone cheese, eggs, sugar, Marsala wine, rum and cocoa powder.",
    },
    {
      id: 3,
      productName: "Chocolate Brownie",
      productQuantity: 18,
      productPrice: 2.8,
      productDescription:
        "Frosting, cream cheese, chocolate, cocoa powder, sugar.",
    },
    {
      id: 4,
      productName: "Candy Floss",
      productQuantity: 20,
      productPrice: 3.25,
      productDescription: "A pinky sweet and tasty sugar.",
    },
    {
      id: 5,
      productName: "Lemon Slushie",
      productQuantity: 30,
      productPrice: 1.95,
      productDescription: "A lemon flavored ice crystals",
    },
  ];

  app.get("/stock", (req, res) => {
    res.status(200).json(items);
  });

  app.get("/stock/:id", function (req, res) {
    let found = items.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });

  app.post("/stock/add", (req, res) => {
    let itemIds = items.map((item) => item.id);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newItem = {
      id: newId,
      productName: req.body.productName,
      productQuantity: req.body.productQuantity,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  });

  app.put("/stock/update/:id", (req, res) => {
    let found = items.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
    if (found) {
      let updated = {
        id: found.id,
        productName: req.body.productName,
        productQuantity: req.body.productQuantity,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
      };
      let targetIndex = items.indexOf(found);
      items.splice(targetIndex, 1, updated);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete("/stock/delete/:id", (req, res) => {
    let found = items.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
    if (found) {
      let targetIndex = items.indexOf(found);
      items.splice(targetIndex, 1);
    }
    res.sendStatus(204);
  });
};
