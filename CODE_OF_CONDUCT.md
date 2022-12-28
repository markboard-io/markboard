# Code Of Conduct

1. Make sure that all of your application code should be placed inside the `imports/` directory. See [Meteor - File structure](https://guide.meteor.com/structure.html#javascript-structure)

2. Use absolute imports e.g. `import { App } from '/imports/ui/App'` instead of relative imports `../../../imports/ui/App` when you need to import files across hierarchies

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
