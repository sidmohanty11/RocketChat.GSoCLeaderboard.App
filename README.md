# RocketChat.GSoCLeaderboard.App
A Rocket.Chat App which greets user and informs them about a slash command which when used can add them to the GSoC Leaderboard

## Usage
- First and foremost, the admin needs to provide the GSoC leaderboard's password in the App's Settings and by default the domain is set to https://gsoc.rocket.chat so we need not need to change that.
![gsoc-leaderboard0](https://user-images.githubusercontent.com/73601258/149777497-b7d2e7b0-afda-4e68-953b-6e01cb9d0e44.png)
- Then, when a user joins the #gsoc22 channel we greet,
![gsoc-leaderboard1](https://user-images.githubusercontent.com/73601258/149777664-c9320c3b-064b-475a-a611-c69ce59eed80.png)
- You are now only a slash command away from adding yourself to the GSoC leaderboard.
![gsoc-leaderboard2](https://user-images.githubusercontent.com/73601258/149777813-180bdd45-ac01-400c-9423-ce76f2a39032.png)
- Boom! Congratulations, you've been successfully added to the leaderboard now!
![gsoc-leaderboard3](https://user-images.githubusercontent.com/73601258/149778026-8848206a-a258-4044-9b2a-2e15e91be6a1.png)

## Contributing
You'll need to set up the Rocket.Chat Apps dev environment, please see https://developer.rocket.chat/apps-development/rocket.chat-app

To install the using the command line, you have to turn on the setting Enable development mode on the Rocket.Chat server under `Admin > General > Apps`.

Then you can clone this repo and then:

```
npm install
rc-apps deploy
```

Follow the instructions and when you're done, the app will be installed on your Rocket.Chat server.

Accepting feature requests and bugs on the [issues page](https://github.com/sidmohanty11/RocketChat.GSoCLeaderboard.App/issues).
