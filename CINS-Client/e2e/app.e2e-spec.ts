import { RestmeClientPage } from './app.po';

describe('restme-client App', function() {
  let page: RestmeClientPage;

  beforeEach(() => {
    page = new RestmeClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
