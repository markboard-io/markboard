# Code Of Conduct

1. Make sure that all of your application code should be placed inside the `imports/` directory. See [Meteor - File structure](https://guide.meteor.com/structure.html#javascript-structure)

2. Use absolute imports e.g. `import { App } from '/imports/ui/App'` instead of relative imports `../../../imports/ui/App` when you need to import files across hierarchies.

3. SCSS files must not have the same name as their corresponding TSX files.

   ```typescript
   // ❌ Bad
   // SomeComponent.scss
   .selector { ... }
   // SomeComponent.tsx
   import './SomeComponent.scss'

   // ✅ Good
   // SomeComponent.style.scss
   .selector { ... }
   // SomeComponent.tsx
   import './SomeComponent.style.scss'
   ```

   Since meteor has bugs with it, see [meteor/meteor#10708](https://github.com/meteor/meteor/issues/10708).

4. Follow [BEM methodology](https://getbem.com/introduction/) to write your CSS/SCSS selectors

   ```css
   /* Block: layer-ui Element: __wrapper__footer Modifiers: --transition-bottom */
   .layer-ui__wrapper__footer-left--transition-bottom {
   }
   /* Block layer-ui Element: __wrapper_footer Modifiers: --center */
   .layer-ui__wrapper__footer-center {
   }
   /* Block: /  Element: disable-zen-mode Modifiers: --visible */
   .disable-zen-mode--visible {
   }
   ```

5. Use excalidraw `i18n` solution to support multiple languages

6. Use [Command Pattern](https://refactoring.guru/design-patterns/command) to manipulate canvas, check code under folder `/imports/excalidraw/actions`

   - We have `manager.ts#ActionManager` to `registerAction`, `executeActio` and `renderAction` into the canvas.
