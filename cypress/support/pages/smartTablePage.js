export class SmartTablePage {

    updateAgeByFirstName(name, age) {
        cy.get('nb-card').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)

        })

    }

    addNewRecordWithFirstAndLastName(firstName, lastName) {
        cy.get('nb-card').find('.nb-plus').click()
        cy.get('nb-card').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', firstName)
            cy.wrap(tableColumns).eq(3).should('contain', lastName)
        })

    }
}

export const onSmartTablePage = new SmartTablePage()