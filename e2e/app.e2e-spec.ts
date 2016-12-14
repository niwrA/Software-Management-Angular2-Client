import { SOFTWAREMANAGEMENTPage } from './app.po';

describe('software-management App', function() {
  let page: SOFTWAREMANAGEMENTPage;

  beforeEach(() => {
    page = new SOFTWAREMANAGEMENTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
