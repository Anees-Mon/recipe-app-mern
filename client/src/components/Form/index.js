import { useState, useEffect } from 'react'
import './index.css'

const Form = props => {
    const { match } = props
    const { id } = match.params

    useEffect(() => {
        const getRecipeDetails = async () => {
            const url = `http://localhost:3005/recipe-details/${id}`
            const response = await fetch(url)
            if (response.ok) {
                const responseData = await response.json()
                setName(responseData.name)
                setImage(responseData.image)
                setIngredients(responseData.ingredients)
                setSteps(responseData.steps)
            }
        }
        if (id !== undefined) {
            getRecipeDetails()
        }
    }, [])

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')

    const onChangeName = event => setName(event.target.value)
    const onChangeImage = event => setImage(event.target.value)
    const onChangeIngredients = event => setIngredients(event.target.value)
    const onChangeSteps = event => setSteps(event.target.value)

    const addRecipeToPostgres = async () => {
        const recipeObject = {
            name,
            image,
        }

        const url = "http://localhost:3005/recipes-list"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeObject),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.json()
            const { id } = responseData
            addRecipeToMongoDB(id)

        }
    }

    const addRecipeToMongoDB = async (id) => {
        const recipeDetailsObject = {
            id,
            name,
            image,
            ingredients,
            steps,
        }
        const url = "http://localhost:3005/recipe-details"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeDetailsObject),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.text()
            console.log(responseData)
            const { history } = props
            history.replace('/')
        }
    }

    const updateRecipeInPostgres = async () => {
        const recipeObject = {
            name,
            image,
        }

        const url = `http://localhost:3005/recipes-list/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeObject),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.text()
            console.log(responseData)
        }
    }

    const updateRecipeInMongoDB = async () => {
        const recipeDetailsObject = {
            name,
            image,
            ingredients,
            steps,
        }
        const url = `http://localhost:3005/recipe-details/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeDetailsObject),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const responseData = await response.text()
            console.log(responseData)
            const { history } = props
            history.replace('/')
        }
    }

    const onSubmitRecipe = async (event) => {
        event.preventDefault()
        if (id !== undefined) {
            updateRecipeInPostgres()
            updateRecipeInMongoDB()
        }
        else { addRecipeToPostgres() }
    }


    return (
        <div className='form-page-content'>
            <img className='form-image' alt='form' src='https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?t=st=1656935546~exp=1656936146~hmac=27846beff86d2851c69c595550a1341591e61e485af1d72b1b5322fc5621ef29&w=740' />
            <form className='form-container' onSubmit={onSubmitRecipe}>
                <h1 className='form-title'>{id === undefined ? 'ADD RECIPE' : 'EDIT RECIPE'}</h1>
                <label className='form-label' htmlFor='name'>RECIPE NAME</label>
                <input className='form-input' id="name" placeholder='Enter recipe name' value={name} onChange={onChangeName} />
                <label className='form-label' htmlFor='image'>IMAGE URL</label>
                <input className='form-input' id="image" placeholder='Enter image url' value={image} onChange={onChangeImage} />
                <label className='form-label' htmlFor='ingredients'>INGREDIENTS</label>
                <textarea className='form-input' rows="4" cols="100" id="ingredients" placeholder='Enter recipe ingredients' value={ingredients} onChange={onChangeIngredients} />
                <label className='form-label' htmlFor='steps'>STEPS</label>
                <textarea className='form-input' rows="8" cols="100" id="steps" placeholder='Enter how to prepare' value={steps} onChange={onChangeSteps} />
                <button className='form-button' type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default Form