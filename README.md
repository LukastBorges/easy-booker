# Easy booker

This sample application showcases a full implementation of a simulated booking tool, with mocked property offers and the possibility to create, update, list and delete bookings.

## What is inside?
This project uses many tools:

- [Vite](https://vitejs.dev)
- [Vite boilerplate template](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Cypress](https://www.cypress.io/)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Ant Design](https://ant.design)
- [Day.js](https://day.js.org)
- [Font Awesome](https://fontawesome.com)
- [Axios](https://day.js.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [JSON server](https://github.com/typicode/json-server)

## Business constraints

To simplify some of the flows and development time a few constraints related to business rules were considered:
- The project has a fixed user, there's no login, authentication or authorization implemented.
- You can edit a booking but you can't change the number of occupants or the room. This would require some nested changes on the properties offer that were ruled out to save development time. This usually is better performed in the server handling anyway.
- Once you create a booking, that room will be subtracted from availability to avoid double booking. It is oversimplified as each room type has only 1 ID but there are multiple rooms of that type. However when removing a booking, the room usage won't be updated since it would add significant complexity to the frontend code, and again, this type of side effect should be done in a real backend.

## Getting Started

To run this application properly make sure to follow the steps below.

### Install

To install dependencies run this command at the route of the project

```bash
npm install
```

### Usage

To simulate server, run:

```bash
npm run serve:db
```

#### For dev mode:

```bash
npm run dev
```

You should be able to access the application at 
<http://localhost:5173> from a browser.

#### Production-ready:

```bash
npm run build
```
Then:

```bash
npm run serve
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Test

```bash
npm run test
```

View and interact with your unit/component tests via UI.

```bash
npm run test:ui
```

Run end-to-end tests with Cypress.

```bash
npm run dev
npm run serve:test
npm run test:e2e
```

## License

This project is licensed under the MIT License.
