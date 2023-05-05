# GraphQL API

## Bootstrap Server

Run the following commands

```bash
    echo "node_modules\n.DS_Store\n.env" > .gitignore
    git init
    npm init -y
    npm install -g typescript
    tsc --init -y
```

## Install Dependencies

```bash
    npm i --save type-graphql apollo-server graphql@15.x reflect-metadata @typegoose/typegoose mongoose class-validator bcrypt jsonwebtoken cookie-parser config dotenv
```

# Install Dev-Dependencies

```bash
    npm install --save-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/lodash pino-pretty @types/cookie-parser ts-node-dev typescript
```
