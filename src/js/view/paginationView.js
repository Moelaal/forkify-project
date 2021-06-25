import View from './view.js';
import svgIcons from '../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );

    // on page 1 and other pages
    if (curPage === 1 && numPage > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${svgIcons}#icon-arrow-right"></use>
                </svg>
            </button>
      `;
    }
    //last page
    if (curPage === numPage && numPage > 1) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                     <use href="${svgIcons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
      `;
    }
    //first page
    if (curPage < numPage) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${svgIcons}#icon-arrow-right"></use>
            </svg>
        </button>
       
      `;
    }
    //On page 1 and no other pages
    return '';
  }
}

export default new paginationView();
