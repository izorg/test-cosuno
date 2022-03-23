import crypto from "crypto";
import fs from "fs";
import path from "path";

import { faker } from "@faker-js/faker";

import { type Company, Speciality } from "../src/schema.generated";

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default getRandomInt;

const specialities = Object.values(Speciality);

const getRandomSpecialities = () => {
  const allSpecialities = [...specialities];

  const specialityCount = getRandomInt(1, allSpecialities.length);

  const companySpecialities = [];

  for (let i = 0; i < specialityCount; i++) {
    const randomIndex = getRandomInt(0, allSpecialities.length - 1);

    companySpecialities.push(allSpecialities[randomIndex]);

    allSpecialities.splice(randomIndex, 1);
  }

  return companySpecialities.sort();
};

const data: Company[] = [];

const ITEM_COUNT = 1000;

for (let i = 0; i < ITEM_COUNT; i++) {
  const id = crypto.randomUUID();

  data.push({
    city: faker.address.city(),
    id,
    name: faker.company.companyName(),
    specialities: getRandomSpecialities(),
  });
}

void fs.promises.writeFile(
  path.resolve(__dirname, "../src/server/data.json"),
  JSON.stringify(data, null, 2)
);
