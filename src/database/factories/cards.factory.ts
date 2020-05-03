// /* eslint-disable import/no-extraneous-dependencies */
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Card } from '../../modules/cards/cards.entity';

define(Card, (faker: typeof Faker) => {
  const card = new Card();
  card.amount = faker.random.number(1);
  card.email = faker.internet.email();
  card.phoneNumber = faker.phone.phoneNumber();
  card.totalTransaction = faker.random.number(10);
  card.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  return card;
});
