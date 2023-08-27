const { User, Meal, Menu, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    menus: async () => {
      return await Menu.find();
    },
    meals: async (parent, { menu, name }) => {
      const params = {};

      if (menu) {
        params.menu = menu;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Meal.find(params).populate('menu');
    },
    meal: async (parent, { _id }) => {
      return await Meal.findById(_id).populate('menu');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.meals',
          populate: 'menu',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.meals',
          populate: 'menu',
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ meals: args.meals.map(({ _id }) => _id) });
      const line_items = [];

      for (const meal of args.meals) {
        line_items.push({
          price_data: {
            currency: 'usd',
            meal_data: {
              name: meal.name,
              description: meal.description,
              images: [`${url}/images/${meal.image}`],
            },
            unit_amount: meal.price * 100,
          },
          quantity: meal.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { meals }, context) => {
      if (context.user) {
        const order = new Order({ meals });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateMeal: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Meal.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;