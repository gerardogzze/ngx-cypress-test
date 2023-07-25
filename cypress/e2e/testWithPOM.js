/// <reference types ="Cypress" />

import { on } from 'events';
import { onDatePickerPage } from '../support/pages/datepickerPage';
import { onFormLayoutPage } from '../support/pages/formLayoutsPage';
import { navigateTo } from '../support/pages/navigationPage';
import { onSmartTablePage } from '../support/pages/smartTablePage';

describe('Test with Page Object Model', () => {
  beforeEach('Open the application', () => {
    cy.visit('/');
  });

  it.only('Verify navigation across different pages', () => {
    navigateTo.formLayoutPage()

    cy.contains('nb-card', 'Inline form').find('form').within(() => {
      cy.get('input').eq(0).should('have.attr', 'placeholder', 'Jane Doe')
      cy.get('input').eq(1).should('have.attr', 'placeholder', 'Email')
    })
    cy.contains('nb-card', 'Using the Grid').find('form').within(() => {
      cy.get('input').eq(0).should('have.attr', 'placeholder', 'Email')
      cy.get('input').eq(1).should('have.attr', 'placeholder', 'Password')
      cy.get('input').eq(2).should('have.attr', 'type', 'radio')
      cy.get('label').eq(0).should('have.text', 'Email')
      cy.get('label').eq(1).should('have.text', 'Password')
      cy.get('label').eq(2).should('have.text', 'Radios')


    })

    navigateTo.datepickerPage();
    navigateTo.toastrPage();
    navigateTo.tooltipPage();
    navigateTo.smartTablePage();
  });

  it('Submit Inline and Basic form and select tomorrow from the calendar', () => {
    navigateTo.formLayoutPage();
    cy.fixture('testData.json').then(data => {
      const formLayoutData = data.formLayoutData
      onFormLayoutPage.submitInlineFormWithNameAndEmail(formLayoutData.name, formLayoutData.email)
      onFormLayoutPage.submitBasicFormWithEmailAndPassword(formLayoutData.emailPassword, formLayoutData.password)
    })

    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(4)
    onDatePickerPage.selectDatepickerWithRangeFromToday(50, 51)

  });

  it('Modify age based on the name', () => {
    navigateTo.smartTablePage()

    cy.fixture('testData.json').then(data => {
      const smartTableData = data.smartTableData
      onSmartTablePage.updateAgeByFirstName(smartTableData.firstNameToUpdate, smartTableData.newAge)
      cy.get('nb-card').contains('tr', smartTableData.firstNameToUpdate).then(tableRow => {
        cy.wrap(tableRow).find('td').eq(6).should('contain', smartTableData.newAge)
        cy.wrap(tableRow).find('td').eq(2).should('contain', smartTableData.firstNameToUpdate)

      })

    })

  })

  it('Create a new record with first name and last name', () => {
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Oliver')
  })
});

