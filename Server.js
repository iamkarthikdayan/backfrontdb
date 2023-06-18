const express = require('express');
const app = express();
const PORT = 4578 //PORT
const mongoose = require('mongoose'); //mongoose for DB
const cors = require('cors'); // to remore cor issue
app.use(cors())  // cor policy activation
app.use(express.json()); // to render json req from frontend
app.use(express.urlencoded({ extended: true })); // to render form data from frontend

//connect backend with DB
mongoose.connect("mongodb+srv://neongt2003:9745558302@cluster0.os5f3lx.mongodb.net/MES")//!insert your username
    .then(() => { console.log("MongoDB connected successfully") })//*success message
    .catch((err) => { console.log("Error connecting to MongoDB " + err) });//*fail message

// CRUD operation 
// C-Create - POST 
//R-READ-GET
//U-Update -PUT
//D-Delete - DELETE


const PRODUCT = require("./model/product")

app.post('/addData',async (req, res) => {
    try {

        let item = req.body
        console.log(item)


        const saveData = await PRODUCT(item) //PRODUCT is a model. we cross check the form data with the model we created before saving it
        await saveData.save()  // through this code we save the incoming data from front end to db 
        res.send((saveData))


    } catch (error) {
        res.send(error);
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});