import * as model from './model.js';
import { TIMEOUT_RECIPE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //1.LoadRecipe
    resultView.update(model.pageSearchResult());
    // console.log(res, data, recipe);

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    //2.render recipe

    //3) select element
    recipeView.render(model.state.recipe);

    //Testing
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controllerSearchResult = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    // 3)render
    // console.log(model.state.search.results);
    resultView.render(model.pageSearchResult());

    // 4)Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controllerPagination = function (goto) {
  //1) render
  resultView.render(model.pageSearchResult(goto));
  //2)
  paginationView.render(model.state.search);
};

const controllerServings = function (servings) {
  //1)
  model.updateServings(servings);
  //2)
  recipeView.update(model.state.recipe);

  //3)
};

const controllerAddbookmarks = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  //update bookmark
  recipeView.update(model.state.recipe);

  //
  bookmarksView.render(model.state.bookmarks);
};

const controllerBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controllerAddRecipe = async function (newRecipe) {
  // uplodad recipe
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // upload new recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    //close recipe

    bookmarksView.render(model.state.bookmarks);

    //CHANGe id

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, TIMEOUT_RECIPE_SEC * 1000);
  } catch (err) {
    console.error('*********', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addhandlerBookmark(controllerBookmarks);
  recipeView.addhandlerRender(controllerRecipe);
  recipeView.addhandlerUpdateServings(controllerServings);
  recipeView.addhandlerAddbookmark(controllerAddbookmarks);
  searchView.addHandlerSearch(controllerSearchResult);
  paginationView.addhandlerClick(controllerPagination);
  addRecipeView.handlerUploader(controllerAddRecipe);
};

init();
