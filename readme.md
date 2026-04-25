# reverse-geocoder

## Description

`reverse-geocoder` is a Node.js project that maps coordinates to a city / municipality / country / region / country.

## API documentation

The OpenAPI specification lives at `src/public/docs/api.yaml`. To view it:

- Paste the file contents into [Swagger Editor](https://editor-next.swagger.io/) for a quick preview.
- Or import it into Postman as an "API" definition to generate a documentation/collection ([guide](https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/)).

## Setup

### Prerequisites

- pnpm package manager
- Node.js (check if you are running a sufficient local version by comparing it to the value of "node" in `package.json` "engines" property)

### Installation

```bash
pnpm install
```

## Running the project

### Development environment

```bash
pnpm dev
```

### Production environment

```bash
pnpm build
```

And then:

```bash
pnpm start
```

## Testing

### Run all tests

```bash
pnpm test
```
