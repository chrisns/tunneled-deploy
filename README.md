# tunneled-deploy

Useful for running command securely like setting up webhooks for updating docker images.

```shell
docker run \
  --privileged \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e SUBDOMAIN=thedomainyouwant \ # the domainyouwant.localtunnel.me will be requested
  -e COMMAND_STRING=docker pull tunneled-deploy \ # the command you want to run
  -e SECRET_TOKEN=supersecrettoken \ # the secret you want
  tunneled-deploy
```

Then when thats running

```shell
curl https://thedomainyouwant.localtunnel.me -X POST -H  "Content-Type: application/json" -d '{"token": "supersecrettoken"}'
```
You'll note you'll get a *200* if its all good, *500* if the command returned a failure or a *403* if you gave an invalid token.