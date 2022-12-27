<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://app.boardx.us">
    <img width="540" src="./docs/logo.svg" alt="BoardX Logo" />
  </a>
  <p>
    <a href="https://twitter.com/intent/follow?screen_name=boardxus" target="_blank">
      <img alt="Follow BoardX on Twitter" src="https://img.shields.io/twitter/follow/boardxus.svg?label=follow+BoardX&style=for-the-badge&logo=twitter">
    </a>
<a href="https://discord.gg/RBs5kHC8cS" target="_blank">
      <img alt="Join Discord" style="margin-left:5px;" src="https://img.shields.io/discord/1052420232704184350?style=for-the-badge&label=Join+Discord">
    </a>
  </p>
</div>

<h1 align="center">Next-Gen Collaborative Platform built on Web3 & AI</h3>

[BoardX](https://app.boardx.us) is an open-source evolutionary new collaborative platform built on the foundations of Web3 and AIGC. This platform is designed to facilitate collaboration and connection within teams, making it easy for users to share ideas, work on projects together, and stay up-to-date on the latest developments.

## Try it now

Go to [app.boardx.us](https://app.boardx.us) to start your journey. Stay up to date with our latest news by subscribing our [blog](https://share.boardx.us/).

<img src="https://uploads-ssl.webflow.com/63276f11bd112740c2d55d0b/63276fd289cc06129e308c13_persona.png" />

Watch the following Youtube video to see how BoardX brings AI into your workflow.

<p>
  <a href="https://www.youtube.com/watch?v=tjz6BGsKcr8" target="_blank">
<img height="300" src="https://img.youtube.com/vi/tjz6BGsKcr8/maxresdefault.jpg" />
  </a>
</p>

## Installation Guide

BoardX is open-source forever, you can deploy BoardX on your own server freely, or you can use our SaaS version by visiting [app.boardx.us](https://app.boardx.us).

> TO BE DONE

## Development

Development requirements:

- MongoDB with replica set ([distributed transactions required](https://docs.mongodb.com/manual/core/transactions/))
- Redis (distributed lock required)

You can build a local MongoDB replica set easily reference [this](https://gist.github.com/oleurud/d9629ef197d8dab682f9035f4bb29065)

Use `yarn` to install dependencies.

Start development server with `yarn dev`

###### Notes

- We shouldn't name a DTO type with `dto` only. [Hungarian notation](https://en.wikipedia.org/wiki/Hungarian_notation) may be useful but ignored semantic of a variable or a type. For example, if we name the parameter of create model API and methods as `CreateModelDTO` we cannot determine the usage scenario of this variable or type (is it a temporary type, a parameter type or a return type?). So we should specified the scene type of it like `CreateModelParam`. But we don't need the hungarian notation when the usage scenario is clear.
- MongoDB don't support WLock in transactions when create new document so we should use Redis as lock to ensure the concurrency.
- During testing we'll start a replica set in memory MongoDB. But you can specify the environment variable `MONGO_URL` to use external MongoDB clusters to speed up testing.
- We don't against leave TODO in comment but encourage leave a TODO if you have a better idea but can’t implement it in the short term. It maybe avoid an idea or a plan being forgotten.

### References

- [NestJS](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/docs/index.html)

### License

MIT
