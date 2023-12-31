const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload");
const fs = require("fs");
const { url } = require("inspector");
const cloudinary = require("cloudinary").v2;

app.use(
  fileupload({
  useTempFiles: true,
  })
 );

app.use(cors());
app.use(express.json());
mongoose.connect(
    "mongodb+srv://vacationapk:apk192407@cluster0.zuj273r.mongodb.net/?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
   );

// Localhost configration
// mongoose.connect("mongodb://localhost/riders", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });

cloudinary.config({
  cloud_name: "dolq5ge5g",
 api_key: 577799122689975,
 api_secret: "u6uc3xFRS2BuvOaoI8twMLunOvM",
});


   const Rider = mongoose.model("Rider", {
    ID: Number,
    Name: String,
    Email: String,
    Position: String,
    NRIC: String,
    Status: Boolean,
    Image: String,
   });

   app.get("/allriders", async (req, res) => {
    const { id, name, email } = req.query;
    let query = {};
  
    if (id) {
      query.ID = id;
    }
    if (name) {
      query.Name = { $regex: name, $options: "i" };
    }
    if (email) {
      query.Email = { $regex: email, $options: "i" };
    }
  
    try {
      const allriders = await Rider.find(query);
  
      res.send({ status: "ok", data: allriders });
    } catch (error) {
      console.log(error);
    }
  });


app.get('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the rider by the provided ID
      const rider = await Rider.findOne({_id:id});
  
      if (!rider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ data: rider });
    } catch (error) {
      console.error('Error retrieving rider:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the rider' });
    }
  });
  
app.post('/riders', async (req, res) => {
    try {
      // Extract the rider data from the request body
      const {  id,name, email, position, nric, status, url } = req.body;
     console.log(url)
      // Create a new rider instance
      const rider = new Rider({
        ID:id,
        Name:name,
        Email:email,
        Position:position,
        NRIC:nric,
        Status:status,
        Image:url,
      });
  
      // Save the rider to the database
      await rider.save();
  
      res.status(201).json({ message: 'Rider created successfully' });
    } catch (error) {
      console.error('Error creating rider:', error);
      res.status(500).json({ error: 'An error occurred while creating the rider' });
    }
  });
const removeTmp = (path) => {
 fs.unlink(path, (err) => {
 if (err) throw err;
 });
};

  // Upload image to Cloudinary
app.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    const imageFile = req.files.image;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "images",
      });
      removeTmp(imageFile.tempFilePath);
      res.json({
      public_id: result.public_id,
      url: result.secure_url,
      });
      } catch (err) {
      console.error(err);
      res.status(500).json({
      error: "Failed to upload image to Cloudinary. Please try again later.",
      });
      }
     });


  // PUT method to update a rider
  app.put('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, position, nric, status } = req.body;
  
      // Validate if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid rider ID' });
      }
  
      // Find the rider by ID and update the fields
      const updatedRider = await Rider.findByIdAndUpdate(
        id,
        {
          Name: name,
          Email: email,
          Position: position,
          NRIC: nric,
          Status: status,
        },
        { new: true } // Set { new: true } to return the updated rider
      );
  
      if (!updatedRider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ message: 'Rider updated successfully', data: updatedRider });
    } catch (error) {
      console.error('Error updating rider:', error);
      res.status(500).json({ error: 'An error occurred while updating the rider' });
    }
  });
  
  
  // DELETE method to remove a rider
app.delete('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the rider by ID and remove it
      const deletedRider = await Rider.findByIdAndRemove(id);
  
      if (!deletedRider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ message: 'Rider deleted successfully' });
    } catch (error) {
      console.error('Error deleting rider:', error);
      res.status(500).json({ error: 'An error occurred while deleting the rider' });
    }
  });
  
app.listen(5000, () => {
    console.log("Server connected on port 5000");
   });