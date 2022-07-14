import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Component } from 'react';

import Header from './components/Header'
import Home from './components/Home'
import Form from './components/Form'
import RecipeItemDetails from './components/RecipeItemDetails'
import NotFound from './components/NotFound';
import store from './redux/store';
import RecipeContext from './context/RecipeContext'

import './App.css';

class App extends Component {
  state= {recipesList: []}

  setRecipesList= fetchedRecipesList => {
    this.setState({recipesList: fetchedRecipesList})
  }  

  deleteRecipe = id => {
    this.setState(prevState => ({
      recipesList: prevState.recipesList.filter(eachRecipe => eachRecipe.id !== id)
    }))
  }

  render(){
    const {recipesList} = this.state
    return (
      <BrowserRouter>
        <Provider store={store}>
          <RecipeContext.Provider value={{recipesList, setRecipesList: this.setRecipesList, deleteRecipe: this.deleteRecipe}}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={Form} />
              <Route exact path="/recipe/:id" component={RecipeItemDetails} />
              <Route exact path="/recipe/:id/edit" component={Form} />
              <NotFound/>
            </Switch>
          </RecipeContext.Provider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
