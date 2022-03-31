const core = require('@actions/core');
const github = require('@actions/github');

context('Cypress TodoMVC test', () => {
    beforeEach(() => {
        // https://on.cypress.io/visit
        cy.visit('https://hidemy.name/en/proxy-list/?type=h#list')
    })

    it('test', function () {
        cy.get('a[href="/api/proxylist.txt?type=h&out=plain&lang=en&utf"]').click()
        cy.get('input[placeholder="Access code from email"]').type('555241928668692', {force: true})
        cy.get('button[type="submit"]').click({force: true})
        cy.get('textarea[class="input_text_field textarea ips"]').should('not.to.be.empty')
        cy.request({
            method: 'GET',
            url: `https://hidemy.name/api/proxylist.txt?out=plain&lang=en&utf&type=h`
        }).then(response => {
            let ave = response.body
            //console.log(ave)
            //core.setOutput("proxies", ave);
            console.log(`The event payload: ${ave}`);
            //cy.writeFile('prox.txt', ave)
        })
    })

    // more examples
    //
    // https://github.com/cypress-io/cypress-example-todomvc
    // https://github.com/cypress-io/cypress-example-kitchensink
    // https://on.cypress.io/writing-your-first-test
})
