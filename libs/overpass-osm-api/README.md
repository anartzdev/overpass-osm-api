# Open Street Map with Overpass Turbo API - NestJS Library

Nest Library to take data from Open Street Map use Overpass API with Overpass QL.
## Instructions
### Install
```npm install my-hello-library```
### Use library
... Define instructions to consume library

Take Boundary Box info using search with unknown boundary box limits

```typescript
const data = await this.getLocationBySearch("Gernika");
await this.getLocationBoundaryBox(data[0]['boundingbox'])
// 43.2954421,-2.7176555,43.3274464,-2.6658945
```
