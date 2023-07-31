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
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })
  return dateAssert
}

export class DatepickerPage {

  selectCommonDatepickerDateFromToday(dayFromToday) {
    return cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(dayFromToday)
      return cy.wrap(input).invoke('prop', 'value').then(prop => {
        return prop.includes(dateAssert)
      })


    })
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssertFirst = selectDayFromCurrent(firstDay)
      let dateAssertSecond = selectDayFromCurrent(secondDay)
      const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
      cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
    })
  }
}

export const onDatePickerPage = new DatepickerPage() 