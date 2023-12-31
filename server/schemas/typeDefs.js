const typeDefs = `
  type Menu {
    _id: ID
    name: String
  }

  type GoogleMapApiKey {
    apiKey: String
  }

  type Meal {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    menu: Menu
  }

  type Order {
    _id: ID
    purchaseDate: String
    meals: [Meal]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input MealInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    menues: [Menu]
    meals(menu: ID, name: String): [Meal]
    meal(_id: ID!): Meal
    user: User
    order(_id: ID!): Order
    checkout(meals: [MealInput]): Checkout
    googleApikey: GoogleMapApiKey
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(meals: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateMeal(_id: ID!, quantity: Int!): Meal
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;