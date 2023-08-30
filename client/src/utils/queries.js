import { gql } from '@apollo/client';

export const QUERY_MEALS = gql`
  query getMeals($menu: ID) {
    meals(menu: $menu) {
      _id
      name
      description
      price
      quantity
      image
      menu {
        _id
      }
    }
  }
`;

export const QUERY_GOOGLE_MAPS_KEY = gql`
query GOOGLE {

  googleApikey {
    apiKey
  }
}`

export const QUERY_CHECKOUT = gql`
  query getCheckout($meals: [MealInput]) {
    checkout(meals: $meals) {
      session
    }
  }
`;

export const QUERY_ALL_MEALS = gql`
  {
    meals {
      _id
      name
      description
      price
      quantity
      menu {
        name
      }
    }
  }
`;

export const QUERY_MENUES = gql`
  {
    menues {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        meals {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;