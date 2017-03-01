import { CINSClientPage } from './app.po';

describe('cins-client App', () => {
  let page: CINSClientPage;

  beforeEach(() => {
    page = new CINSClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
