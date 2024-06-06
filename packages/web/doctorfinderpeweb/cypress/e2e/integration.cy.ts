/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Doctor Registration and Login', () => {
    const randomUser = {
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Test@1234',
        cpf: faker.string.numeric(11),
        rg: faker.string.numeric(9),
    };

    const randomDoctorDetails = {
        specialty: 'Cardiologia', 
        crm: faker.string.numeric(6),
        zip_code: faker.location.zipCode('########'),
        local_number: faker.number.int({ min: 1, max: 1000 }).toString(),
        street: faker.location.street(),
        neighborhood: faker.location.county(),
        complement: faker.word.adjective(),
        city: faker.location.city(),
        local_phone: faker.phone.number('###########'),
        street_number: faker.number.int({ min: 1, max: 1000 }).toString(),
    };

    it('should register a new doctor successfully and redirect to login', () => {
        // Visitar a pag de registro
        cy.visit('http://localhost:8080/register');

        // Preencher os campos do formulário de registro
        cy.get('input[name="username"]').type(randomUser.username);
        cy.get('input[name="name"]').type(randomUser.name);
        cy.get('input[name="email"]').type(randomUser.email);
        cy.get('input[name="password"]').type(randomUser.password);
        cy.get('input[name="cpf"]').type(randomUser.cpf);
        cy.get('input[name="rg"]').type(randomUser.rg);

        // Selecionar o tipo de user (medico)
        cy.get('input[name="role"][value="Doctor"]').check();

        // Preencher campos
        cy.get('select[name="specialty"]').select(randomDoctorDetails.specialty);
        cy.get('input[name="crm"]').type(randomDoctorDetails.crm);
        cy.get('input[name="zip_code"]').type(randomDoctorDetails.zip_code);
        cy.get('input[name="local_number"]').type(randomDoctorDetails.local_number);
        cy.get('input[name="street"]').type(randomDoctorDetails.street);
        cy.get('input[name="neighborhood"]').type(randomDoctorDetails.neighborhood);
        cy.get('input[name="complement"]').type(randomDoctorDetails.complement);
        cy.get('input[name="city"]').type(randomDoctorDetails.city);
        cy.get('input[name="local_phone"]').type(randomDoctorDetails.local_phone);
        cy.get('input[name="street_number"]').type(randomDoctorDetails.street_number);

        // Submeter o form
        cy.contains('button', 'Criar conta').click();

        // Verificar o redirecionamento
        cy.url().should('include', '/login');
    });

    it('should log in with the newly registered doctor', () => {
        // Visitar a pag de login
        cy.visit('http://localhost:8080/login');

        // Preencher login
        cy.get('input[name="email"]').type(randomUser.email);
        cy.get('input[name="password"]').type(randomUser.password);

        // Submeter o form de login
        cy.contains('button', 'Entrar').click();

        // Verificar o red apos login
        cy.url({ timeout: 10000 }).should('not.include', '/login');
        cy.url().should('include', '/');
    });

    it('should show error message with invalid login credentials', () => {
        // Visitar a pag de login
        cy.visit('http://localhost:8080/login');

        // Preencher invalido
        cy.get('input[name="email"]').type('invaliduser@example.com');
        cy.get('input[name="password"]').type('invalidpassword');

        // Submeter o form de login
        cy.contains('button', 'Entrar').click();

        // Verificar erro
        cy.contains('Email ou senha inválidos').should('be.visible');
    });
});

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

        // Preencher o form
        cy.get('input[name="username"]').type(randomUser.username);
        cy.get('input[name="name"]').type(randomUser.name);
        cy.get('input[name="email"]').type(randomUser.email);
        cy.get('input[name="password"]').type(randomUser.password);
        cy.get('input[name="cpf"]').type(randomUser.cpf);
        cy.get('input[name="rg"]').type(randomUser.rg);

        // Selecionar o tipo de user (paceinte)
        cy.get('input[name="role"][value="Patient"]').check();

        // Submeter o form
        cy.contains('button', 'Criar conta').click();

        // Verificar o red para pag de login
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

        // verificar o red de login
        cy.url({ timeout: 10000 }).should('not.include', '/login');
        cy.url().should('include', '/');
    });

    it('should show error message with invalid login credentials', () => {
        // Visitar a pag de login
        cy.visit('http://localhost:8080/login');

        // Preencher form
        cy.get('input[name="email"]').type('invaliduser@example.com');
        cy.get('input[name="password"]').type('invalidpassword');

        // Submeter o form de login
        cy.contains('button', 'Entrar').click();

        // Verificar erro
        cy.contains('Email ou senha inválidos').should('be.visible');
    });
});
