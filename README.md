<img width="1153" alt="Screenshot 2023-08-14 at 21 51 08" src="https://github.com/bdon/HighRoadPlus/assets/77501/d766eb64-df21-4378-b615-eaeee45cbee6">

---

See https://github.com/protomaps/basemaps/issues/72 for discussion

HighRoadPlus layers (8 total):

```
roads_tunnels_2_minus
roads_tunnels_1_casing
roads_tunnels_1
roads_0_casing
roads_0
roads_bridges_1_casing
roads_bridges_1
roads_bridges_2_plus
```

Each layer visualizes 5 road classes (`highway`,`major_road`,`medium_road`,`minor_road`,`other`)

Alternatively,

5 classes * 2 (casing/no casing) * each level (-2,-1,0,1,2,3,4,5) = 80 layers

## Concept

This is the combination of two techniques to massively reduce the # of layers.

* Firstly, each road class is visualized using data-driven styling in a single layer. This needs to work around limitations in the MapLibre styling language, namely that `zoom`-based interpolations must be at the top level of an expression.

* Secondly, casings are drawn using two separate methods. For `layer` values `-1`,`0` and `1` (97% of all values), the traditional `casing` layer is used. For values `<= -2` and `>= 2` (3% of cases) a duplicate geometry is created at tileset creation time, with only the addition of one tag `casing=true`. This layer is then drawn in sorted order with different paint values depending on the `casing` tag.

## Drawbacks

* duplication in tile data (3% of cases), minor impact
* 2 different ways to draw casings, no impact
* No data-driven line-dash array or line ends (can be worked around)
* **Very small visual artifacts** at seams between `butt` line endings



## External references

* [OSM TagInfo layer= values](https://taginfo.openstreetmap.org/keys/layer#values)
* Oliver's [Single Highway Layer](https://github.com/wipfli/single-highway-layer)
* [migurski/HighRoad](https://github.com/migurski/HighRoad)
