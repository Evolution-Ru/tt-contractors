# @ApiModel(args?: IApiModelArgs)

Decorate model class.

Example:

```ts
@ApiModel({
  description: "Version description",
  name: "Version"
})
export class DealModel {
 ...
}
```

# IApiModelArgs

## description: string

Define description
- Optional

## name: string

Define name
- Optional
- Default is name of model class