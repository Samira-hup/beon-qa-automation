import { BookingApi, buildBooking, type Booking } from '../../support/api/booking';

describe('Restful-Booker booking lifecycle', () => {
  let token = '';
  let bookingId = 0;
  let removed = false;

  afterEach(function () {
    if (this.currentTest?.state !== 'failed' || removed || !token || !bookingId) {
      return;
    }

    BookingApi.remove(bookingId, token, false);
  });

  it('chains auth, create, read, update, and delete', () => {
    const created = buildBooking(String(Date.now()));
    const updated: Booking = {
      ...created,
      bookingdates: {
        ...created.bookingdates,
        checkout: '2026-01-20',
      },
    };

    cy.step('Generate an auth token');
    BookingApi.authenticate().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token, 'auth token').to.be.a('string').and.not.be.empty;
      token = response.body.token;
    });

    cy.step('Create a booking');
    cy.then(() => BookingApi.create(created)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid, 'booking id').to.be.a('number');
      bookingId = response.body.bookingid;
    });

    cy.step('Read the booking and match the created data');
    cy.then(() => BookingApi.read(bookingId)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(created);
    });

    cy.step('Update the checkout date');
    cy.then(() => BookingApi.update(bookingId, token, updated)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(updated);
    });

    cy.step('Delete the booking');
    cy.then(() => BookingApi.remove(bookingId, token)).then((response) => {
      expect(response.status).to.eq(201);
      removed = true;
    });

    cy.step('Confirm the booking no longer exists');
    cy.then(() => BookingApi.readAllowingMissing(bookingId)).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
