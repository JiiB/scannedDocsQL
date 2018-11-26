# scannedDocsQL

Create a `.env` file inside of the server directory with the following infomation:

```
DATABASE_PASSWORD=<password>
DATABASE_USERNAME=<db-username>
EMAIL_NAME=<sender-email>
EMAIL_PASSWORD=<email-password>
```

## Dependencies

Make sure `pm2` is installed globally

Start the server with `pm2 start start-pm2.json`
