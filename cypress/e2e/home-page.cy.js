describe('Positiу tests on the main page Python.org', () => {
  it('Main page opens and header is visible', () => {
    cy.visit('/');
    cy.contains('Welcome to Python.org').should('be.visible');
  });
});
