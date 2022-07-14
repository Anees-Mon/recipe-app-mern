import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdEdit, MdDeleteOutline } from 'react-icons/md'
import './index.css'

const RecipeItemDetails = props => {
    const [recipeDetails, setRecipeDetails] = useState({})
    const { match } = props
    const { id } = match.params

    useEffect(() => {
        const getRecipeDetails = async () => {
            const url = `http://localhost:3005/recipe-details/${id}`
            const response = await fetch(url)
            if (response.ok) {
                const responseData = await response.json()
                setRecipeDetails(responseData)
            }
        }
        getRecipeDetails()
    }, [])

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
            const { history } = props
            history.replace('/')
        }
    }

    const onClickDelete = async () => {
        deleteRecipeFromPostgres()
        deleteRecipeFromMongoDB()
    }

    const { name, image, ingredients, steps } = recipeDetails
    return (
        <div className='details-container'>
            <div className='details-heading-buttons-container'>
                <h1 className='details-heading'>{name}</h1>
                <div className='details-buttons-container'>
                    <Link className='details-link' to={`/recipe/${id}/edit`}>
                        <button className='details-button edit-button' type='button'>
                            <MdEdit className='details-icon' /> Edit
                        </button>
                    </Link>
                    <button className='details-button delete-button' type='button' onClick={onClickDelete}>
                        <MdDeleteOutline className='details-icon' /> Delete
                    </button>
                </div>
            </div>
            <div className='details-content-container'>
                <div>
                    <h1 className='sub-heading'>Ingredients</h1>
                    <p className='description'>{ingredients}</p>
                    <h1 className='sub-heading'>Steps To Prepare</h1>
                    <p className='description'>{steps}</p>
                </div>
                <img className='details-recipe-image' alt='recipe detail' src={image} />
            </div>

        </div>
    )
}

export default RecipeItemDetails