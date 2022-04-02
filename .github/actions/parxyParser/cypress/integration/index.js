context('Cypress proxy parsing', () => {
    beforeEach(() => {
        cy.visit('https://hidemy.name/en/proxy-list/?type=hs#list')
    })

    it('parse_proxy', function () {
        cy.get('a[href="/api/proxylist.txt?type=hs&out=plain&lang=en&utf"]').click()
        cy.get('input[placeholder="Access code from email"]').type(Cypress.env('proxy_key'), {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.get('textarea[class="input_text_field textarea ips"]').should('not.to.be.empty')
        cy.request({
            method: 'GET',
            url: `https://hidemy.name/api/proxylist.txt?out=plain&lang=en&utf&type=h`
        }).then(response => {
            let ave = response.body
            cy.writeFile('prox.txt', ave)
        })
    })
})
