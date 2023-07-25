/// <reference types="cypress" />

import { table } from "console";
import { navigateTo } from "../support/pages/navigationPage";

describe("test", () => {


  it("Select dat", () => {

    cy.visit("/");
    function selectDayFromCurrent(day) {
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('default', { month: 'short' })
      let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttrbute => {
        if (!dateAttrbute.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent(day)
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })
      return dateAssert
    }
    navigateTo.datepickerPage()
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(60)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })


  })



  it("open the app", () => {
    cy.visit("/");
    navigateTo.datepickerPage()
    cy.contains('nb-card', 'Common Datepicker').find('input').click()

  })

  it('Modify age based on the name on Smart Table', () => {
    cy.visit("/");
    navigateTo.smartTablePage()
    cy.get('nb-card').contains('tr', 'Jack').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('26')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '26')

    })

  })
  it.only('add new record to row', () => {
    cy.visit("/");
    navigateTo.smartTablePage()
    cy.get('nb-card').find('.nb-plus').click()
    cy.get('nb-card').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Gerardo')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Gzz')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Gerardo')
      cy.wrap(tableColumns).eq(3).should('contain', 'Gzz')
    })


  })

})