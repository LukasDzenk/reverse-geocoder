# reverse-geocoder

## Description

`reverse-geocoder` is a Node.js project that maps coordinates to a city / municipality / country / region / country.

## API documentation

### API documentation web page

API documentation is available [here](https://reverse-geocoder.onrender.com/docs/renderedDocs.html).

### Alternative ways to view and use the API documentation

In order to view the available API endpoints, parameters, responses and examples - use Postman to import the `src/docs/api.yaml` file as a "Definition" within the "APIs" tab (more information [here](https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/)).
This will allow you to render the `.yaml` file (which is a OpenAPI Specification (OAS) standard) within Postman, into a documentation file.
You can then use that documentation file to further convert it to a Postman "Collection" which will allow you to quickly test the API endpoints.

Alternatively, if you'd like to have only a quick preview, you can use [Swagger Editor](https://editor-next.swagger.io/) by simply pasting in the `api.yaml` content into the editor.

## Setup

### Prerequisites

- Yarn package manager (v1)
- Node.js (check if you are running a sufficient local version by comparing it to the value of "node" in `package.json` "engines" property)

### Installation

```bash
yarn install
```

## Running the project

### Development environment

```bash
yarn dev
```

### Production environment

```bash
yarn build
```

And then:

```bash
yarn start
```

## Testing

### Run all tests

```bash
yarn test
```
