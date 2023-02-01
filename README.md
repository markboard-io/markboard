<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://InnoDeck.app" target="_blank">
    <img height="100" src="./public/images/logo.svg" alt="InnoDeck Logo" />
  </a>
  <p>
    <a href="https://twitter.com/intent/follow?screen_name=InnoDeckapp" target="_blank">
      <img alt="Follow InnoDeck on Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fimg.shields.io%2Ftwitter%2Ffollow%2FInnoDeckapp">
    </a>
  </p>
</div>

<h1 align="center">InnoDeck: Capture. Retrieve. Publish.</h3>

[InnoDeck](https://InnoDeck.app) is an open-source free-form note-taking app for memo storage, retrieval and share.

## Core Features

[Website](https://InnoDeck.app) • [Live Demo](https://InnoDeck.app) • [Open Server](https://InnoDeck.app) • [Docs](https://InnoDeck.app/docs) • [Blog](https://InnoDeck.app/blog)

- Whiteboard & Markdown
- Cocreate with AI
- Collaborative & Sharable

## Installation Guide

InnoDeck is an open-source software, you can deploy InnoDeck on your own server without any concern, or you can use our SaaS version by visiting [InnoDeck.app](https://InnoDeck.app).

We officially provide 3 ways of deployment: Digital Ocean, Docker Images and Manual Installation.

### Deploy via DigitalOcean

Deploying InnoDeck with [DigitalOcean](digitalocean.com) is the recommended way to have your own instance running, especially if you are not an expert in linux server or tired of typing a set of commands manually.

Click the folloying button to get your first InnoDeck instance running in minutes:

<p>
  <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/InnoDeck/InnoDeck/tree/main" target="_blank">
  <img src="https://www.deploytodo.com/do-btn-blue.svg" alt="Deploy to DO">
  </a>
</p>

The cost of DigitalOcean's deployment is super low, starting from $5 per instance per month. Our official server [InnoDeck.app](https://InnoDeck.app) is deployed on DigitalOcean too.

### Deploy via docker

> TODO

### Deploy via manual installation

> TODO

## Local Development

```bash
meteor npm install
npm start # local dev
npm run lint # lint
npm t # test
meteor shell # debugging
```

### Notable Used Tools

- [meteor](https://github.com/meteor/meteor) Meteor, the JavaScript App Platform.
- [excalidraw](https://github.com/excalidraw/excalidraw) Virtual whiteboard for sketching hand-drawn like diagrams.
- [lexical](https://github.com/facebook/lexical) Lexical is an extensible text editor framework that provides excellent reliability, accessibility and performance.
- [yjs](https://github.com/yjs/yjs) A CRDT framework with a powerful abstraction of shared data
- [jisti](https://github.com/jitsi) Jitsi Videobridge is a WebRTC compatible video router or SFU that lets build highly scalable video conferencing infrastructure.

### License

[MIT](./LICENSE)
