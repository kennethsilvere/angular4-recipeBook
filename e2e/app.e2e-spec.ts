import { Angular4RecipeBookPage } from './app.po';

describe('angular4-recipe-book App', () => {
  let page: Angular4RecipeBookPage;

  beforeEach(() => {
    page = new Angular4RecipeBookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
