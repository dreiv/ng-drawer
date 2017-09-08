# Drawer

The `<app-drawer>` component is a panel that can be placed on the side of some primary content.
It can contain any content. 

The drawer and its associated content live inside of an `<app-drawer-container>` component:

```html
<app-drawer-container>
  <app-drawer>
    <!-- drawer content -->
  </app-drawer>

  <!-- primary content -->
</app-drawer-container>
```

A drawer container may contain one or two `<app-drawer>` elements. When there are two 
`<app-drawer>` elements, each must be placed on a different side of the container.

### Positioning the drawer
The `position` property determines whether the drawer appears at the `"start"` or `"end"` of the
container. By default, the 
drawer appears at the start of the container.
