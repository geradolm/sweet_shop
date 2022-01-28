module.exports = app => {

  let items = {
     "item": [
     {
      id: 1,
      productName: "Brandy Snap",
      productQuantity: 15,
      productPrice: 1.50,
      productDescription: "A mixture of golden syrup, flour, ginger, cream, sugar, butter and lemon juice.",
    },
    {
      id: 2,
      productName: "Tiramisu",
      productQuantity: 35,
      productPrice: 3.65,
      productDescription: "Delicate lady finger cookies, espresso, mascarpone cheese, eggs, sugar, Marsala wine, rum and cocoa powder.",
    },
    {
      id: 3,
      productName: "Chocolate Brownie",
      productQuantity: 18,
      productPrice: 2.80,
      productDescription: "Frosting, cream cheese, chocolate, cocoa powder, sugar.",
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
],
}

  app.get('/stock', (req, res) => {
    res.send(JSON.stringify(items, null, 5));  
  });
  
  app.post('/stock/add', (req, res) =>{
    let newItem = req.body;
    items["item" + newItem.id] = newItem;
    return res.send("201 OK Item added!: \n" + JSON.stringify(newItem, null, 5));
  });

  app.put('/stock/update/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let updatedItem = req.body; 
    if(items["item" + id] != null){
      items["item" + id] = updatedItem;
      res.send("200 Update Item! \n" + JSON.stringify(updatedItem, null, 5));
    }else{
      res.send("400 Don't Exist Item:\n:" + JSON.stringify(updatedItem, null, 5));
    }
  });

  app.delete('/stock/delete/:id', (req, res) =>{
    let deleteItem = items["item" + req.params.id];
    delete items["item" + req.params.id];
    res.send( "200 Deleted Item: \n" + JSON.stringify(deleteItem, null, 5));
  });
}
