const db = require('../config/connection');
const { User, Meal, Menu } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Menu', 'menues');
  await cleanDB('Meal', 'meals');
  await cleanDB('User', 'users');

  const menues = await Menu.insertMany([
    { name: 'Traditional' },
    { name: 'Soup' },
    { name: 'Salad' },
    { name: 'Dessert' },
    { name: 'Drinks' }
  ]);

  console.log('menues seeded');

  const meals = await Meal.insertMany([
    {
      name: 'Byrek',
      description:
        'The pastry is made of a thin flaky dough such as filo with a variety of fillings, such as meat, cheese, spinach, or potatoes.',
      image: 'byrek.jpeg',
      menu: menues[0]._id,
      price: 4.99,
      quantity: 35
    },
    {
      name: 'Fli',
      description:
        'It consists of multiple crêpe-like layers brushed with cream and served with sour cream and butter. ',
      image: 'fli.webp',
      menu: menues[0]._id,
      price: 2.99,
      quantity: 40
    },
    {
      name: 'Tave dheu',
      menu: menues[1]._id,
      description:
        'Tave dheu is a soup of beef liver, garlic, bell peppers, feta cheese and ricotta cheese. Chili flakes and bay leaves are used for a boost of flavor and then placed in clay pots to bake until melty, warm-your-soul goodness. ',
      image: 'taveDheu.jpeg',
      price: 9.99,
      quantity: 50
    },
    {
      name: 'Tarator',
      menu: menues[1]._id,
      description:
        'Tarator, a chilled yogurt and cucumber soup, superb for hot summer days, can also be used as a dip for seafood or a pour-over sauce for cauliflower, etc.',
      image: 'tarator.jpeg',
      price: 4.99,
      quantity: 60
    },
    {
      name: 'Greek salad',
      menu: menues[2]._id,
      description:
        'A traditional Greek salad consists of sliced cucumbers, tomatoes, green bell pepper, red onion, olives, and feta cheese. ',
      image: 'greek-salad.jpeg',
      price: 7.99,
      quantity: 35
    },
    {
      name: 'Baklava',
      menu: menues[3]._id,
      description:
        'Baklava is a layered pastry dessert made of filo pastry, filled with chopped nuts, and sweetened with syrup or honey.',
      image: 'baklava.jpeg',
      price: 5.99,
      quantity: 50
    },
    {
      name: 'Chocolate Cake',
      menu: menues[3]._id,
      description:
        'Chocolate Mousse Cake filled with an easy homemade chocolate mousse, and warm chocolate frosting poured on top',
      image: 'chocolate-cake.jpeg',
      price: 9.99,
      quantity: 25
    },
    {
      name: 'Pepsi',
      menu: menues[4]._id,
      description: 'Refreshing cold drink',
      image: 'pepsi.jpeg',
      price: 1.99,
      quantity: 100
    },
  ]);

  console.log('meals seeded');

  await User.create({
    firstName: 'Tom',
    lastName: 'Cruise',
    email: 'tom@testmail.com',
    password: 'password123',
    orders: [
      {
        meals: [meals[0]._id, meals[0]._id, meals[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Lewis',
    lastName: 'Hamilton',
    email: 'lewis@testmail.com',
    password: 'password1234567'
  });

  console.log('users seeded');

  process.exit();
});