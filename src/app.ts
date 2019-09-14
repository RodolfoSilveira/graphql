import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import path from 'path'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares ():void {
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(bodyParser.json())
    this.express.use(cors())
  }

  private routes ():void {
    const server = new GraphQLServer({
      typeDefs: path.resolve(__dirname, 'schema.graphql'),
      resolvers
    })

    server.start(({ port }): void => {
      console.log(
        `Server started, listening on port ${port} for incoming requests.`
      )
    })
  }
}

export default new App().express
