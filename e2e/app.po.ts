import { browser, element, by } from 'protractor';

export class SOFTWAREMANAGEMENTPage {
  navigateTo() {
    return browser.get('/');
  }

  getProjectsButton() {
    return element(by.buttonText('Projects')).getText();
  }

  clickButtonByName(name: string) {
    element(by.buttonText(name)).click();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  updateProjectDetails() {
    let projInput = element(by.css('input[type=text]'));
    projInput.sendKeys(' 123');
    let projStart = element(by.css('input[type=date]'));
    projStart.sendKeys('23062016');
  }
}
