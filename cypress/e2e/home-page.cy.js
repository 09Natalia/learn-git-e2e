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

   //it('Main page opens and header is visible', () => {
    // cy.title().should('eq', 'Welcome to Python.org');
   //});

});

