<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://InnoDeck.app" target="_blank">
    <img height="100" src="./public/images/logo.svg" alt="InnoDeck Logo" />
  </a>
  <p>
    <a href="https://twitter.com/intent/follow?screen_name=InnoDeckapp" target="_blank">
      <img alt="Follow InnoDeck on Twitter" src="https://img.shields.io/twitter/follow/InnoDeckapp.svg?label=follow+InnoDeck&style=for-the-badge&logo=twitter">
    </a>
<a href="https://discord.gg/5Ny6UuNKVD" target="_blank">
      <img alt="Join Discord" style="margin-left:5px;" src="https://img.shields.io/discord/1063090582890758175?style=for-the-badge&label=Join+Discord">
    </a>
  </p>
</div>

<h1 align="center">Next-Gen All-in-One Collaborative Workspace</h3>

[InnoDeck](https://InnoDeck.app) is an open-source **Digital Whiteboard, Documents, Video Conferencing, Team Chat** all-in-one collaborative workspace designed for your team. It aims to facilitate collaboration and communication within the team, enabling team members to easily share ideas and work together on projects.

For personal use, InnoDeck is a **Notion Open Source Alternative** for you to do Note Taking, Tasks Management, Whiteboard Sketching and more. You can host InnoDeck as a personal knowledge database on your own server, while notion stores your data on its cloud.

## Core Features

[Website](https://InnoDeck.app) • [Live Demo](https://InnoDeck.app) • [Open Server](https://InnoDeck.app) • [Docs](https://InnoDeck.app/docs) • [Blog](https://InnoDeck.app/blog)

InnoDeck = Miro + Notion + Zoom + Slack. The open source Zoom One alternative. We're building features for "All-in-One Workspace" using enterprise-grade open source tools.

- 🪧 **Digital Whiteboard** (Sticky Notes, Diagrams, Drawings, Generative AI)
- 📝 **Real-time Synced Documents** (Note Taking, Team Knowledge Center)
- 📹 **Video Conferencing** (Virtual Meetings, Screen Sharing)
- 💬 **Team Chat** (Send Text Messages, Images, Emojis)

## Installation Guide

InnoDeck is open-source forever, you can deploy InnoDeck on your own server freely, or you can use our SaaS version by visiting [InnoDeck.app](https://InnoDeck.app).

We officially provide 3 ways of deployment: Digital Ocean, Docker Images and Manual Installation.

### Deploy via DigitalOcean

Deploying InnoDeck with [DigitalOcean](digitalocean.com) is the recommended way to have your own instance running, especially if you are not an expert in linux server or tired of typing a set of commands manually.

Click the folloying button to get your first InnoDeck instance running in minutes:

<p>
  <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/InnoDeck/InnoDeck/tree/main">
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
