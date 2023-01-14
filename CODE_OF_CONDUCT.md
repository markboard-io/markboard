# Code Of Conduct

1.  Make sure that all of your application code should be placed inside the `imports/` directory. See [Meteor - File structure](https://guide.meteor.com/structure.html#javascript-structure)

2.  Use absolute imports e.g. `import { App } from '/imports/ui/App'` instead of relative imports `../../../imports/ui/App` when you need to import files across hierarchies.

3.  SCSS files must not have the same name as their corresponding TSX files.

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

4.  Follow [BEM methodology](https://getbem.com/introduction/) to write your CSS/SCSS selectors

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

5.  Use excalidraw `i18n` solution to support multiple languages

    ```typescript
    import { t, defaultLang, setLanguage } from '/imports/i18n'
    ```

6.  Use [Command Pattern](https://refactoring.guru/design-patterns/command) to manipulate canvas, check code under folder `/imports/excalidraw/actions`

    - We have `manager.ts#ActionManager` to `registerAction`, `executeActio` and `renderAction` into the canvas.

7.  Use [jotai](https://jotai.org/) as our state management solution. The jotai is superior to [recoil](https://recoiljs.org/), both of them are atomic-oritented state management tools. It has proven success in the Excalidraw app, we could follow this pattern to scale it across the entire project.

8.  Create a module “whitelist” that can be read by the build process, but does not actually run to make dynamic expressions work with import.

    - See `imports/i18n/declare-imports.ts` for reference.
    - See [Meteor - Using import() with dynamic expressions](https://docs.meteor.com/packages/dynamic-import.html#Using-import-with-dynamic-expressions)

9.  **Avoid** Using `Meteor.wrapAsync` to convert callback-style function call into async/await function. It might be causing performance issues. See [Rocket.Chat/Rocket.Chat#23079](https://github.com/RocketChat/Rocket.Chat/pull/23079)

10. Use `/imports/excalidraw/components/icons.tsx` to declare SVG icons and customize them.

11. **Avoid** using `Meteor.call`, use `Meteor.callAsync` instead

12 **Make use of Tree-Shaking** Import the component only you need

    ```typescript
    // ✅ Good
    import Form from 'react-bootstrap/Form'
    // ❌ Bad
    import { Form } from 'react-bootstrap'
    ```
