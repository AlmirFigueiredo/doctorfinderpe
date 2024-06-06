/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Patient Registration and Login', () => {
    const randomUser = {
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Test@1234',
        cpf: faker.string.numeric(11),
        rg: faker.string.numeric(9),
    };

    it('Should register a new patient successfully and redirect to login', () => {
        // Visitar a pag de registro
        cy.visit('http://localhost:8080/register');

        // Preencher os campos do formulário de registro
        cy.get('input[name="username"]').type(randomUser.username);
        cy.get('input[name="name"]').type(randomUser.name);
        cy.get('input[name="email"]').type(randomUser.email);
        cy.get('input[name="password"]').type(randomUser.password);
        cy.get('input[name="cpf"]').type(randomUser.cpf);
        cy.get('input[name="rg"]').type(randomUser.rg);

        // Selecionar o tipo de user (paciente)
        cy.get('input[name="role"][value="Patient"]').check();

        // Submeter o formulario
        cy.contains('button', 'Cria conta').click();

        // Verificar o redirecionamento para a pag de login
        cy.url().should('include', '/login');
    });

    it('should log in with the newly registered user', () => {
        // Visitar a pag de login
        cy.visit('http://localhost:8080/login');

        // Preencher os campos de login
        cy.get('input[name="email"]').type(randomUser.email);
        cy.get('input[name="password"]').type(randomUser.password);

        // Submeter o form de login
        cy.contains('button', 'Entrar').click();

        // Verificar o redirecionamento apos login
        cy.url({ timeout: 10000 }).should('not.include', '/login');
        cy.url().should('include', '/');
    });

    it('should show error message with invalid login credentials', () => {
        // Visitar a pag de login
        cy.visit('http://localhost:8080/login');

        // Preencher os campos de login com credenciais invalidas
        cy.get('input[name="email"]').type('invaliduser@example.com');
        cy.get('input[name="password"]').type('invalidpassword');

        // Submeter o form de login
        cy.contains('button', 'Entrar').click();

        // Verificar a exib de erro
        cy.contains('Email ou senha inválidos').should('be.visible');
    });
});
