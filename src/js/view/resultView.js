import View from './view.js';
import previewView from './previewView.js';
import svgIcons from '../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipe found in query ,please try again :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

console.log('here we are');
export default new ResultView();
