// Restful-Booker calls: auth, create, read, update, and delete. The spec checks the status codes.

import { currentUrls, currentUsers } from '../data/environment';

export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
};

export type AuthBody = {
  token: string;
};

export type CreatedBooking = {
  bookingid: number;
  booking: Booking;
};

export function buildBooking(uniqueSuffix: string): Booking {
  return {
    firstname: 'Alex',
    lastname: `Rivera${uniqueSuffix}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-10',
      checkout: '2026-01-12',
    },
    additionalneeds: 'Breakfast',
  };
}

function apiUrl(): string {
  return currentUrls().api;
}

function bookingHeaders(token?: string): Record<string, string> {
  // Restful-Booker answers 418 when Accept is missing.
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Cookie = `token=${token}`;
  }

  return headers;
}

export const BookingApi = {
  authenticate(): Cypress.Chainable<Cypress.Response<AuthBody>> {
    return cy.request({
      method: 'POST',
      url: `${apiUrl()}/auth`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        username: currentUsers().api.username,
        password: currentUsers().api.password,
      },
    });
  },

  create(booking: Booking): Cypress.Chainable<Cypress.Response<CreatedBooking>> {
    return cy.request({
      method: 'POST',
      url: `${apiUrl()}/booking`,
      headers: bookingHeaders(),
      body: booking,
    });
  },

  read(bookingId: number): Cypress.Chainable<Cypress.Response<Booking>> {
    return cy.request({
      method: 'GET',
      url: `${apiUrl()}/booking/${bookingId}`,
      headers: { Accept: 'application/json' },
    });
  },

  update(bookingId: number, token: string, booking: Booking): Cypress.Chainable<Cypress.Response<Booking>> {
    return cy.request({
      method: 'PUT',
      url: `${apiUrl()}/booking/${bookingId}`,
      headers: bookingHeaders(token),
      body: booking,
    });
  },

  remove(bookingId: number, token: string, failOnStatusCode = true): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'DELETE',
      url: `${apiUrl()}/booking/${bookingId}`,
      headers: { Cookie: `token=${token}` },
      failOnStatusCode,
    });
  },

  readAllowingMissing(bookingId: number): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'GET',
      url: `${apiUrl()}/booking/${bookingId}`,
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
  },
};
