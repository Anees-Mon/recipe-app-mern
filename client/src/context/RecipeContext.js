import React from 'react'

const RecipeContext = React.createContext({
    recipesList: [],
    setRecipesList: () => {},
    deleteRecipe: () => {}
})

export default RecipeContext