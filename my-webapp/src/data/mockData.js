import { faker } from '@faker-js/faker';

// Define the available roles
const roles = [
  'Product Designer',
  'Product Manager',
  'Frontend Developer',
  'Backend Developer'
];

// Define the available teams
const teams = [
  'Design',
  'Product',
  'Marketing',
  'Technology'
];

export const generateMockData = () => {
  return Array.from({ length: 100 }, () => ({
    // Profile Information
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    status: faker.helpers.arrayElement(['Active', 'Inactive']),
    role: faker.helpers.arrayElement(roles), // Use the specified roles
    userId: faker.datatype.uuid(),
    image: faker.image.avatar(),

    // Personal Information
    dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString(), // Format date here
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Non-binary']),
    nationality: faker.location.country(),
    contactNumber: faker.phone.number(),
    email: faker.internet.email(),
    workEmail: faker.internet.email(),

    // Research and Publication Information
    researchTopics: faker.lorem.words(3),
    publications: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      title: faker.lorem.sentence(),
      year: faker.date.past().getFullYear(),
      journal: faker.company.name(),
    })),

    // Teams
    teams: faker.helpers.arrayElements(teams, 1), // Use the specified teams
  }));
};
