import { Link } from 'react-router-dom'
import { useContext } from 'react'

import RecipeContext from '../../context/RecipeContext'

import './index.css'

const RecipeItem = (props) => {
    const { recipeDetails } = props
    const { id, name, image } = recipeDetails
    const linkto = id === 0 ? '/add' : `/recipe/${id}`

    const value = useContext(RecipeContext)
    const { deleteRecipe } = value


    const deleteRecipeFromPostgres = async () => {
        const url = `http://localhost:3005/recipes-list/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.text()
            console.log(responseData)
        }
    }

    const deleteRecipeFromMongoDB = async () => {
        const url = `http://localhost:3005/recipe-details/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.text()
            console.log(responseData)
        }
    }

    const onClickRemoveButton = async (event) => {
        event.preventDefault()
        deleteRecipeFromPostgres()
        deleteRecipeFromMongoDB()
        deleteRecipe(id)
    }



    return (
        <Link className='home-recipe-link' to={linkto}>
            <li className='home-recipe-item'>
                {id !== 0 && (
                    <div className='home-button-container'>
                        <button className='home-delete-button' type='button' onClick={onClickRemoveButton}></button>
                    </div>
                )}
                <img className='home-recipe-image' alt="food" src={image} />
                {id !== 0 && <p className='home-recipe-heading'>{name}</p>}
            </li>
        </Link>
    )
}

export default RecipeItem