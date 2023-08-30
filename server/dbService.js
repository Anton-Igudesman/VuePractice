const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_information',
    port: 3306
})

connection.connect(error => {
    if (error) console.log(error.message);
    else {
       console.log(`Connected to database on Port 3306`); 
    }
});

class DBService {
    static getDbServiceInstance() {
        return new DBService();
    }

    async createUser(firstName, lastName, email) {
        try {
            const insertUser = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);";
                connection.query(query, [firstName, lastName, email], (error, result) => {
                if (error) reject(new Error(error.message));
                resolve(insertUser);
            })
        });
        console.log(insertUser)
        } catch (error) {
            console.log(error);
        }
        
        

    }
}