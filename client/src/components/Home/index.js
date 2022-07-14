import { useEffect, useContext } from 'react'
import { connect } from 'react-redux'

import RecipeItem from '../RecipeItem'
import RecipeContext from '../../context/RecipeContext'

import './index.css'

const defaultRecipe = {
    id: 0,
    name: "",
    image: "https://thumbs.dreamstime.com/b/add-icon-plus-sign-simple-vector-cross-illustration-148041788.jpg",
}

const Home = props => {
    const value= useContext(RecipeContext)
    const {recipesList, setRecipesList} = value
    const updatedRecipesList = recipesList.filter(eachRecipe => eachRecipe.name.toLowerCase().includes(props.searchInput.toLowerCase()))

    useEffect(() => {
        const getRecipes = async () => {
            const url = 'http://localhost:3005/recipes-list'
            const response = await fetch(url)
            if (response.ok) {
                const responseData = await response.json()
                setRecipesList(responseData)
            }
        }
        getRecipes()
    }, [])

    return (
        <> <img className="header-image" alt="recipe" src="https://waylandlibrary.org/wp-content/uploads/2017/06/cooking-header.jpg" />
            <div className='home-content'>
                <h1 className='home-title'>Popular Recipes</h1>
                <ul className='recipes-list'>
                    {updatedRecipesList.map(eachRecipe => <RecipeItem key={eachRecipe.id} recipeDetails={eachRecipe} />)}
                    {updatedRecipesList.length !== 0 && <RecipeItem key={defaultRecipe.id} recipeDetails={defaultRecipe} />}
                </ul>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        searchInput: state.searchInput
    }
}



export default connect(mapStateToProps)(Home)