import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

let PORT = 8080;
const dbConnectionString = process.env.DB_CONNECTIONSTRING

export const db = new pg.Pool({
    connectionString: dbConnectionString,

});

app.listen(8080, function () {
    console.log(`(҂◡_◡) ᕤ Server is running on port 8080`)
});

app.get("/", (req, res) => {
    res.send("we work")
})

app.get("/make-table", async (req, res) => {
    const result = await db.query(`CREATE TABLE IF NOT EXISTS powerpuffgirls(
        girl_id SERIAL PRIMARY KEY ,
        name VARCHAR(255),
        power TEXT ,
        ingredient VARCHAR(255) ,
        imgURL TEXT

    );`)
    res.json(result)
})

app.get('/seed-powerpuffgirls', async (req, res) => {
    const result = await db.query(`INSERT INTO powerpuffgirls (name, power, ingredient, imgURL )
    VALUES 
    ('Bubbles', 'Cuteness', 'Sweet', 'https://i.pinimg.com/564x/c4/f3/ef/c4f3ef0b1c780ad7504acc4beaf5d0e3.jpg'),
    ('Blossom', 'Leadership', 'Sage' , 'https://i.pinimg.com/564x/b9/6a/2f/b96a2f0007a66dced1f30aeecfc33cb0.jpg'),
    ('Buttercup', 'Savage', 'Sour' , 'https://i.pinimg.com/564x/0f/b3/17/0fb3176fe05da164a642ea509c4b1f46.jpg')
    ;`)
    res.json(result)
})
