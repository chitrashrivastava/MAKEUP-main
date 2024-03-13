const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://pranjalshukla245:cdImBMeclOAfbR6X@cluster0.vtjn0jv.mongodb.net/Makeup-Site?retryWrites=true&w=majority'
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
