# Queries and Mutations

## Create User Mutation

```graphql
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    name
    email
  }
}
```

## Login User Mutation

```graphql
mutation loginUser($input: LoginInput!) {
  loginUser(input: $input)
}
```

## Get User Query

```graphql
query {
  me {
    _id
    name
    email
  }
}
```

## Create Product Mutation

```graphql
mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    _id
    name
    price
    description
    productId
  }
}
```

# Get Products Query

```graphql
mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    _id
    name
    price
    description
    productId
  }
}
```

## Get Product Query

```graphql
query product($input: GetProductInput!) {
  product(input: $input) {
    _id
    productId
    name
    description
    price
  }
}
```
