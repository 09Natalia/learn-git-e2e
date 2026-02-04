Cypress.on('uncaught:exception', (error, runnable) => {
    return false;
});


describe('Positive tests on the main page Python.org', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const topMenuItems = [
        {name: 'Python', urlPath: '/'},
        {name: 'PSF', urlPath: '/psf'},
        {name: 'Docs', urlPath: 'https://docs.python.org'},
        {name: 'PyPI', urlPath: 'https://pypi.org'},
        {name: 'Jobs', urlPath: '/jobs'},
        {name: 'Community', urlPath: '/community'}

    ];
    const topMenuItemTitles = [
        { name: 'Python', title: 'The Python Programming Language' },
        { name: 'PSF', title: 'The Python Software Foundation' },
        { name: 'Docs', title: 'Python Documentation' },
        { name: 'PyPI', title: 'Python Package Index' },
        { name: 'Jobs', title: 'Python Job Board' }
    ];
    
    const menuItems = [ 'About', 'Downloads', 'Documentation', 
        'Community', 'Success Stories', 'News', 'Events' 
    ];
    
    topMenuItems.forEach(({ name, urlPath }) => {
      it(`Tab ${name} opens the correct page`, () => {
        cy.contains('a', name).click();
        cy.url().should('include', urlPath);
      });
    });
    
    topMenuItemTitles.forEach(({ name, title }) => {
      it(`Tab ${name} has the correct attribute ${title}`, () => {
        cy.get('#top').contains('a', name)
            .should('have.attr', 'title', title);
        });
    });

    it('Tab Community has not attribute title', () => { 
        cy.get('#top').contains('a', 'Community') 
            .should('not.have.attr', 'title'); });

    

    it('Donate button is exist', () => {
    cy.get('a.donate-button').should('exist');
    });

    it('Search field is exist', () => {
    cy.get('#id-search-field').should('exist');
    });

    it('Go Button is exist', () => {
    cy.get('#submit').should('exist');
    });

    menuItems.forEach(item => { it(`В меню есть пункт "${item}"`, () => {
        cy.get('#mainnav').contains('a', item)
            .should('exist'); 
        });
    });

});

describe('Search field positive test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Searching for "Learn" returns results', () => { 
        cy.get('#id-search-field').type('Learn'); 
        cy.get('#submit').click(); 
        cy.contains('Learn').should('exist'); 
    });
});

describe('Search field negative test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Searching for an empty value does not return a result.', () => { 
        cy.get('#submit').click();
        cy.url().should('include', 'search');
        cy.get('#id-search-field').should('have.value', '');
        cy.get('.list-recent-events').should('not.exist'); 
    });
});

