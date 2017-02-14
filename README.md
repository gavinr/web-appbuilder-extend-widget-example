# web-appbuilder-extend-widget-example
Example of creating a new widget, extending from an existing ArcGIS Web AppBuilder widget in the process to reduce code duplication.

## How to Extend

## Example Widget

This is an example of extending from the Web AppBuilder "Editor" widget - a hypothetical problem where you want to prevent the user from moving a point outside of a boundary (St. Louis, MO in this case).

You can see we extend from the Editor widget (We have checked in the widget's code for convenice, but we never ever make modifications to any of the code in that folder), include the css and nls, and then override the `_createEditor` function, being sure to call `this.inherited(arguments)`.
