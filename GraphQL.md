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
