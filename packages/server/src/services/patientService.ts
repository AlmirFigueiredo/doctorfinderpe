import Patient from '../models/patient';
//import Fastify from 'fastify';
//import cors from '@fastify/cors'

//no packaje.json estava: //"dev": "ts-node src/app.ts"
//const app = Fastify({ logger: true})

/*const start = async () => {
  try {
    return await Patient.findAll();
  } catch (err) {
    throw new Error('Error retrieving patients');
  }
}*/

//start();
//const getAllPatients = Fastify({ logger: true})
export const getAllPatients = async () => {
  try {
    return await Patient.findAll();
  } catch (error) {
    throw new Error('Error retrieving patients');
  }
};
// Faz os outros ai...
