const directiorioName = __dirname.replaceAll('\\', '/');
const module = directiorioName.split(/[/]/)[2];
const scenarioName = directiorioName.slice(directiorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directiorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module}`, () => {

    it('should be able to delete a product', () => {
        cy.log(`Create a product number ${testCaseId}`);
        cy.log(`Delete a product number ${testCaseId}`);
    });
});