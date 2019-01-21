## I am a dummy service of Users.

##### Before run
- Change configs in `config/index.js` and `config/sequelize.js`, or
- For local using start database on docker-compose `docker-compose up -d`

##### Install dependencies
```bash
npm install
```
##### Run migrations
```bash
npm run migrate
```
##### Rollback migrations
```bash
npm run rollback
```
##### Run tests
```bash
npm test
```
##### Show test coverage
```bash
npm run coverage
```
##### Run service
````bash
npm start
````
##### Show api documents in browser `http://localhost:8085/docs/ui`

---
#### TODO:
For build images change package `"@esoft_private/esoft-service": "git+ssh://git@git.etagi.com:kmayer/esoft-service.git#v1.0.0",`,
 and add `.ssh` dir to project root.