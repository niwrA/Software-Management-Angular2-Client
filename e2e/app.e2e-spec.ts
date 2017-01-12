import { SOFTWAREMANAGEMENTPage } from './app.po';

describe('software-management App', function () {
  let page: SOFTWAREMANAGEMENTPage;

  beforeEach(() => {
    page = new SOFTWAREMANAGEMENTPage();
  });

  it('should have a projects button', () => {
    page.navigateTo();
    expect(page.getProjectsButton()).toEqual('Projects');
  });

  it('click projects should navigate', () => {
    page.navigateTo();
    page.clickButtonByName('Projects');
    expect(page.getProjectsButton()).toEqual('Projects');
    page.clickButtonByName('details');
    page.updateProjectDetails();
  });

});
