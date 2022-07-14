const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize');
const mongoose = require('mongoose')

const {RecipeListModel, RecipeDetailsModel} = require('./model')
// const RecipeDetailsModel = require('./model')


const db = new Sequelize('postgres://postgres:postgres@localhost:5432/recipes')
const testDb = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testDb()

mongoose.connect("mongodb://localhost:27017/recipes",
    (err) => err ? console.log(err) : console.log("Connected to recipe database")
)

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3005, () => {
    console.log('App running on port 3005')
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, Postgres, and Sequelize' })
})

app.get('/recipes-list', async (request, response) => {
    /* pool.query('SELECT * FROM recipe ORDER BY id ASC', (error, resolve) => {
        if (error) {
            throw error
        }
        response.status(200).json(resolve.rows)
    }) */

    try {
        const dbResponse = await RecipeListModel.findAll({ order: ['id'] })
        response.status(200).send(dbResponse)
    }
    catch (error) {
        throw error
    }
})

app.post('/recipes-list', async (request, response) => {
    const { name, image } = request.body
    /* pool.query(`INSERT INTO
    recipe (name, image)
    VALUES ('${name}', '${image}')
    RETURNING id`, (error, resolve) => {
        if (error) {
            throw error
        }
        response.status(201).json({ id: resolve.rows[0].id })
    }) */
    try {
        const dbResponse = await RecipeListModel.create({ name, image })
        response.status(201).json({ id: dbResponse.id })
    }
    catch (error) {
        throw error
    }

})

app.delete('/recipes-list/:id', async (request, response) => {
    const { id } = request.params
    /* pool.query(`DELETE FROM recipe WHERE id=${id}`, (error, resolve) => {
        if (error) {
            throw error
        }
        response.status(200).send('Recipe deleted')
    }) */
    try {
        const dbResponse = await RecipeListModel.destroy({
            where: { id, }
        });
        response.status(200).send('Recipe deleted')
    }
    catch (error) {
        throw error
    }

})

app.put('/recipes-list/:id', async (request, response) => {
    const { id } = request.params
    const { name, image } = request.body
    /* pool.query(`UPDATE recipe SET name='${name}', image='${image}' WHERE id= ${id}`, (error, resolve) => {
        if (error) {
            throw error
        }
        response.status(200).send('Recipe updated')
    }) */
    try {
        const dbResponse = await RecipeListModel.update({ name, image }, {
            where: { id, }
        });
        response.status(200).send('Recipe updated')
    }
    catch (error) {
        throw error
    }


})
























app.get('/recipe-details/:id', (request, response) => {
    const { id } = request.params
    RecipeDetailsModel.findOne({ id }, (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            response.status(200).send(data);
        }
    });
});

app.post('/recipe-details', (request, response) => {
    const { id, name, image, ingredients, steps } = request.body
    RecipeDetailsModel.create({ id, name, image, ingredients, steps }, (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            response.status(201).send(`Recipe added with ID: ${id}`);
        }
    })
})

app.delete('/recipe-details/:id', (request, response) => {
    const { id } = request.params
    RecipeDetailsModel.deleteOne({ id }, (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            response.status(200).send(`Removed recipe with ID: ${id}`);

        }
    });
});

app.put('/recipe-details/:id', (request, response) => {
    const { id } = request.params
    const { name, image, ingredients, steps } = request.body
    RecipeDetailsModel.updateOne({ id },
        {
            $set: {
                name, image, ingredients, steps
            }
        }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                response.status(200).send(`Recipe edited with ID: ${id}`);
            }
        })
})