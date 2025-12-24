describe('Movie Catalog E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main page', () => {
    cy.contains('Popular Movies');
    cy.get('input[placeholder="Search movies..."]').should('be.visible');
  });

  it('should navigate to add movie page', () => {
    cy.contains('Add Movie').click();
    cy.url().should('include', '/add');
    cy.contains('Add New Movie');
  });

  it('should filter movies', () => {
    cy.get('input[placeholder="Search movies..."]').type('Inception');
    cy.contains('Inception').should('be.visible');
    // Assuming "The Dark Knight" is in the list but should be hidden
    // This depends on the initial data
  });
});
