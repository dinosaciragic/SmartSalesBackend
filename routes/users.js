const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../shared/constants');
const nodemailer = require('nodemailer');
// User model
const User = require('../models/User');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smartsalesbih@gmail.com',
    pass: 'Smartsales5432112345',
  },
});

// Get user by email
router.get('/', (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }).then((user) => {
    res.send(user);
  });
});

// Login page
router.get('/login', (req, res) => {
  res.send('Login');
});

// Register page
router.get('/register', (req, res) => {
  res.send('Register');
});

// Get user by id
router.get('/single/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then((order) => {
    res.send(order);
  });
});

// Get all user emails
router.get('/email', async (req, res) => {
  const results = await User.find({}, { _id: 0, email: 1 });
  res.send(results);
});

// Register Handle
router.post('/register', upload.single('companyImage'), (req, res) => {
  var companyImage;

  if (req.file) {
    companyImage = req.file.path;
  }

  const {
    email,
    password,
    savePassAsPlainText,
    isCompany,
    companyType,
    companyName,
    description,
    contactNumber,
    website,
    instagram,
    facebook,
    followerIds,
    location,
    postsLeft,
  } = req.body;

  let errors = [];

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters long' });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    // Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'There is already a User with that e-mail' });
        res.send(errors);
      } else {
        const newUser = new User({
          email,
          password,
          savePassAsPlainText,
          isCompany,
          companyType,
          companyName,
          description,
          contactNumber,
          companyImage,
          website,
          instagram,
          facebook,
          followerIds,
          location,
          postsLeft,
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                var mailOptions = {
                  from: 'smartsalesbih@gmail.com',
                  to: newUser.email,
                  subject: 'Dobrodošli!',
                  text: `Dobrodošli, sniženja su na vašem dlanu! 

                    Od sada SmartSales će se pobrinuti da upoznate i kroz njihove posebne ponude, zavolite SmartSales brendove. 

                    Ukoliko želite iskoristiti određenu ponudu, kontaktirajte ili posjetite prodavača i zatražite Vašu SmartSales cijenu. Sve informacije su Vam na raspolaganju putem profila prodavača, kojem možete pristupiti klikom na profilnu sliku.

                    Imate prijedlog, problem ili pitanje za SmartSales tim? 

                    Kontaktirajte nas putem aplikacije i opcije "Pošaljite nam Vaše prijedloge" ili putem e-mail adrese: info@smartsalesbih.com
                                
                    Uz SmartSales uživajte u sniženjima i posebnim ponudama! 
                                
                    SmartSales tim.`,
                };

                transport.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('info', info);
                  }
                });

                res.send(user);
              })
              .catch((err) => console.error(err));
          })
        );
      }
    });
  }
});

// Login handle
router.post('/login', async (req, res) => {
  try {
    let errors = [];
    // Add validation DS 08.02.2020.

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      errors.push({ msg: 'Email or password is incorrect' }); // Add email or password is incorrect once tested DS 08.02.2020.
      res.send(errors);
    }

    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      errors.push({ msg: 'Email or password is incorrect' }); // Add email or password is incorrect once tested DS 08.02.2020.
      res.send(errors);
    }

    // Create and assign a token
    const token = jwt.sign(
      { _id: user._id, isCompany: user.isCompany },
      constants.TOKEN_SECRET
    );
    res.header('Authorization', token).send({ token: token });
  } catch (error) {
    console.error(error);
  }
});

// api/edit/id
router.put(
  '/edit/:id',
  upload.single('companyImage'),
  async (req, res, next) => {
    var companyImage;

    if (req.file) {
      companyImage = req.file.path;
    }

    const {
      _id,
      email,
      isCompany,
      companyType,
      companyName,
      description,
      contactNumber,
      website,
      instagram,
      facebook,
      followerIds,
      location,
      postsLeft,
    } = req.body;

    const editedUser = new User({
      _id,
      email,
      isCompany,
      companyType,
      companyName,
      description,
      contactNumber,
      companyImage,
      website,
      instagram,
      facebook,
      followerIds,
      location,
      postsLeft,
    });

    User.findByIdAndUpdate({ _id: req.params.id }, editedUser).then(
      (updatedCompany) => {
        res.send({ updatedCompany: true });
      }
    );
  }
);

// Get user by id
router.get('/single/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

// api/users/all
router.get('/all', paginatedAll(User), (req, res) => {
  res.send(res.paginatedResults);
});

// api/users/all/companies?page=1
router.get('/all/companies', paginatedCompanies(User), (req, res) => {
  res.send(res.paginatedResults);
});

// Pagination middleware
function paginatedCompanies(model) {
  return async (req, res, next) => {
    const page = req.query.page;
    const limit = 12;
    const startIndex = (page - 1) * limit;

    try {
      const results = await model
        .find({ isCompany: true })
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

// Pagination middleware
function paginatedAll(model) {
  return async (req, res, next) => {
    try {
      const results = await model.find();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = router;
