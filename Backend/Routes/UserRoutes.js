const express=require('express')
const router=express.Router()
const User=require('./../model/User')
const {jwtAuthMiddleware, generateToken}=require('./../jwt')

 //to signup the data 
 // POST route to add a person
router.post('/signup', async (req, res) =>{
  try{
      const data = req.body // Assuming the request body contains the User data

      // Check if there is already an admin user
      const adminUser = await User.findOne({ role: 'Admin' });
      if (data.role === 'Admin' && adminUser) {
          return res.status(400).json({ error: 'Admin user already exists' });
      }

      // Validate Aadhar Card Number must have exactly 12 digit
      if (!/^\d{12}$/.test(data.aadharCardNumber)) {
          return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
      }

      // Check if a user with the same Aadhar Card Number already exists
      const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
      if (existingUser) {
          return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
      }

      // Create a new User document using the Mongoose model
      const newUser = new User(data);

      // Save the new user to the database
      const response = await newUser.save();
      console.log('data saved');

      const payload = {
          id: response.id
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error',details:err.message});
  }
})

  
  // Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract aadharcard and password from request body
        const {aadharCardNumber, password} = req.body;
  
        // Find the users by aadhar
        const users = await User.findOne({aadharCardNumber: aadharCardNumber});
  
        // If user does not exist or password does not match, return error
        if( !users || !(await users.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }
  
        // generate Token 
        const payload = {
            id: users.id
        }
        const token = generateToken(payload);
  
        // return token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Profile route
  router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const users = await User.findById(userId);
        res.status(200).json(users);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// Get List of all voters with only name,age,address 
router.get('/', async (req, res) => {
  try {
      // Find all users
      const Users = await User.find({}, 'name age role adress -_id');

      // Return the list of users
      res.status(200).json(Users);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

// to update the password


router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        // Find the user by userID
        const user = await User.findById(userId);

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  module.exports=router
  