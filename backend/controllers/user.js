const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const buffer= Buffer.from(email);
  const maskedEmail = buffer.toString('base64');
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: maskedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

  // 
  const email = req.body.email;
  const buffer= Buffer.from(email);
  const maskedEmail = buffer.toString('base64');
    User.findOne({ email: maskedEmail })
      .then(user => {
        if (!user) {
          console.log('user non trouvé');
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'tBNq9krgFiK0aR6U61C4vv5MqzHmnDZm',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

