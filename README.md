### Project Setup
Once you clone or download project go into your folder

>now copy **.env.local** file to **.env** file

### Installing
```
> npm install
```

### Database Config Setup
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret                  # database password
DB_NAME=envision                # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port
```
some other important parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port
```

### Migration and Seeders run
After creating database and updating .env file run below commands
```
> node_modules/.bin/sequelize db:migrate or npx sequelize-cli db:migrate
> node_modules/.bin/sequelize db:seed:all or npx sequelize-cli db:seed:all
```

`npm start` to the your project

### Create User
```
> POST : http:localhost:3000/users 
> Request : 
{
    "firstName": "Anton",
    "lastName": "Anton",
    "email": "anton@gmail.com",
    "location": "Asia/Aqtau",
    "birthdayDate": "1996-08-05"
}
```

### Update User
```
> PUT : http:localhost:3000/users 
> Request : 
{
    "firstName": "Anton",
    "lastName": "Anton",
    "email": "anton@gmail.com",
    "location": "Asia/Aqtau",
    "birthdayDate": "1996-08-05"
}
```

### Table Explanation
```
> Users => stores users table with birthday in UTC time
> Queues => stores queues for sending message and handle unsent message
```

### Job Explanation
```
> first job => queuing users that has his/her birthday by today (running every hour)
> second job => sending the messages and resend messages to birthday users (running every minute 30 and minute 0)
> third job => housekeeping and update user status if their birthday message already send and their birthday already passed (running every minute 30)
```