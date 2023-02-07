# Open Street Map with Overpass Turbo API - NestJS Library

Nest Library to take data from Open Street Map use Overpass API with Overpass QL.

## Instructions

### Install

```npm install my-hello-library```

### Use library

... Define instructions to consume library

Take Boundary Box info using search with unknown boundary box limits

`const data = await this.getLocationBySearch("Gernika");
await this.getLocationBoundaryBox(data[0]['boundingbox'])
// 43.2954421,-2.7176555,43.3274464,-2.6658945
`

## API al detalle

Obtenemos los servicios de la API Open Street Map con los datos de los filtros que pasamos ([Map Features]("https://wiki.openstreetmap.org/wiki/Map_features")) cuya zona la asignamos mediante la especificación de los limites del mapa seleccionado que conocemos (**boundaries box**) o especificando un área como un pueblo, comarca, provincia,..., donde realizará una llamada adicional para obtener el Boundaries Box y pedir los objetos especificados con el filtro de elementos del mapa.

Los datos que se podrán enviar serán:

**http://localhost:3000/osm-api**
`
{
    "search": "Eibar"
}
`

ó ya con los limites que conocemos, que podrían extraerse de un mapa con Leaflet

`
{
    "bbox": "43.2954421,-2.7176555,43.3274464,-2.6658945"
}
`

Si no añadimos el valor "filters" con la información de clave + valor (por ejemplo clave = amenity y valor = bar) buscará las fuentes de la zona especificada por nombre de área o especificando directamente sus boundaries box.
Añadiendo "filters" con la opción de bar, restaurante y hotel:
Mediante nombre del lugar:

`{
   "search": "Eibar",
    "filters": ["amenity=bar", "amenity=restaurant", "tourism=hotel"]
}`

Especificando los límites de la zona con bbox: 43.1640982,-2.4996626,43.2258879,-2.4323883:

`{
   "bbox": "43.1640982,-2.4996626,43.2258879,-2.4323883",
    "filters": ["amenity=bar", "amenity=restaurant", "tourism=hotel"]
}`

**http://localhost:3000/osm-api/area/<LUGAR>**

Por ejemplo:
http://localhost:3000/osm-api/area/medina+de+pomar

Obtenemos la información de los límites geográficos de Medina de Pomar (Burgos) devolviendo lo siguiente:

`43.1640982,-2.4996626,43.2258879,-2.4323883`

¿Qué será esto? El recuadro de los límites de la zona en la que queremos hacer una búsqueda.


