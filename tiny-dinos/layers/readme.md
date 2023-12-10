## Understanding Layers

The layers have the following schema:
Note: string in colors is a hex color

```
{
[layer_key] : {
art: {[trait_value]: string}
colors: {[trait_value]: [string]}
offset: [number, number]
}
}
```

The art is defined in strings like this (a picture of a basic tiny dino with eyes and chest colors):

      `
        ..1111
        ..12121
        ..11111
        ..133
        1.1131
        .1133
        ..1.1
      `,

Numbers 1-f (hex) can be used to represent different colors

### Compact schema

A more compact schema formamt is also possible, for simpler cases:

```
{
[layer_key] : {
art: string
colors: {[trait_value]: string}
offset: [number, number]
}
}
```
