const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

const db = new Sequelize('postgres://postgres:postgres@localhost:5432/recipes')

const RecipeListModel = db.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'recipe',
    createdAt: false,
    updatedAt: false,
    timestamps: false
});

exports.RecipeListModel = RecipeListModel














const RecipeDetailsModel = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: true
    },
});

exports.RecipeDetailsModel = mongoose.model('recipe', RecipeDetailsModel, 'recipe');