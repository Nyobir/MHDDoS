context('Cypress proxy parsing', () => {
    beforeEach(() => {
        cy.visit('https://hidemy.name/en/proxy-list/?type=hs#list')
    })

    it('parse_proxy_http', function () {
        cy.contains('.form_checkbox', 'HTTP').find('[type="checkbox"]').check({ force: true })
        cy.contains('.form_checkbox', 'HTTPS').find('[type="checkbox"]').check({ force: true })
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

    it('parse_proxy_socks', function () {
        cy.contains('.form_checkbox', 'Socks 4').find('[type="checkbox"]').check({ force: true })
        cy.get('input[placeholder="Access code from email"]').type(Cypress.env('proxy_key'), {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.get('textarea[class="input_text_field textarea ips"]').should('not.to.be.empty')
        cy.request({
            method: 'GET',
            url: `https://hidemy.name/api/proxylist.txt?out=plain&lang=en&utf&type=h`
        }).then(response => {
            let ave = response.body
            cy.writeFile('socks4.txt', ave)
        })
    })

    it('parse_proxy_socks', function () {
        cy.contains('.form_checkbox', 'Socks 5').find('[type="checkbox"]').check({ force: true })
        cy.get('input[placeholder="Access code from email"]').type(Cypress.env('proxy_key'), {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.get('textarea[class="input_text_field textarea ips"]').should('not.to.be.empty')
        cy.request({
            method: 'GET',
            url: `https://hidemy.name/api/proxylist.txt?out=plain&lang=en&utf&type=h`
        }).then(response => {
            let ave = response.body
            cy.writeFile('socks5.txt', ave)
        })
    })
})
