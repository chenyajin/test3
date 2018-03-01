import { Test1Page } from './app.po';

describe('test1 App', () => {
  let page: Test1Page;

  beforeEach(() => {
    page = new Test1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
