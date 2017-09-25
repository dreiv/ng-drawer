# Drawer

The drawer(`<app-drawer>`) component is a panel that can be placed on the side of some primary 
content. It can contain any content. 

The drawer and its associated content live inside of an `<app-drawer-container>` component:

```html
<app-drawer-container>
  <app-drawer>
    <!-- drawer content -->
  </app-drawer>

  <!-- primary content -->
</app-drawer-container>
```

A drawer container(`<app-drawer-container>`) may contain one or two `<app-drawer>` elements. When 
there are two `<app-drawer>` elements, each must be placed on a different side of the container.

The drawer container component contains the necessary code to coordinate up to two drawer components
and the backdrop.

### Bound Properties

| Name | Type | Description |
| --- | --- | --- |
| `opened` | `boolean` | Whether or not the drawer is opened. Use this binding to open/close the drawer. |
| `position` | `"start"\|"end"` | The `position` property determines whether the drawer appears at the `"start"` or `"end"` of the container. By default, the drawer appears at the start of the container. |
| `mode` | `"over"\|"push"\|"side"` | The mode or styling of the drawer, default being `"over"`. With `"over"` the drawer will appear above the content, and a backdrop will be shown. With `"push"` the drawer will push the content of the `<md-drawer-container>` to the side. `"side"` will resize the content and keep the drawers opened. Clicking the backdrop will close drawers that do not have `mode="side"`. |
| `docked`| `boolean` | Whether the drawer is docked or not. When the drawer is docked, the sides ofthe drawer will be slightly visible and the drawer's header willbe rotated according to the drawer side it is attached to. |
| `width`| `string` | The width of the drawer, if this is not set the drawer will take 90% of the container's width. |                          

### Events

| Name | Description |
| --- | --- |
| `onStateChange` | Emitted when the drawer's state has changed. This is used to coordinate the drawers within their container. |


### Methods

| Signature | Description |
| --- | --- |
| `open(): void` | Open the drawer. Equivalent to `opened = true`. |
| `close(): void` | Close the drawer. Equivalent to `opened = false`. |
| `toggle(): void` | Toggle the drawer. This is equivalent to `opened = !opened`. |
