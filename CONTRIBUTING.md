# Contribution Guidelines

## Project Structure

```typescript
|- `excalidraw/`
  |- `actions/` store all actions taking effects to canvas
	  |- `register` register a new action
		|- `manager` `actionManager` that manages all actions
		  |- `executeAction` execute action
			|- `updater` update `appState` by the result of `action.perform`
			|- `renderAction` `actionManager.renderAction('toggleShortcuts')` render react components defined in action PanelComponent
		|- `types` declare all types for actions related
		  |- `Action` the `Action` type definition
			  |- `contextItemPredicate` the assert condition for action to be displayed on context menu
				|- `checked` whether enabled this feature on context menu
	|- `app/` ExclidrawApp react component entry point
	  |- `ExclidrawApp` react entrypoint for excalidraw
		  |- `onChange` drives `CollabAPI.syncElements` to help realtime synchronization work
	|- `charts/` excalidraw charts support
	|- `components/` react components
		|- `Actions` actions related components
		  |- `<ShapesSwitcher />` group shapes related widgets
	  |- `LayerUI` react entry point, core react components are aggregated here
	     |- `<Island className='menu-container' />` App Menu
		|- `MenuUtisl` MenuLinks & Menu Seperator in the App Menu
		|- `Island` the common react components to create a floating panel, aka "island"
		|- `InitializeApp` The loading wrapper for <ExclidrawApp />. Presents <LoadingMessage /> if `i18n` is not ready.
		|- `ContextMenu` context menu for excalidraw, wrapped with `<Popover />`.
		|- `ExclidrawCore` core of excalidraw
		  |- `syncActionResult` sync `appState` to react after execute actions
		|- `icons` declare all SVG icons here
		|- `Stats` show current scene & selected element information
	|- `css/` common stylesheets
	|- `data/` data operation utilities
	|- `element/` excalidraw canvas elements & helpers
	|- `hooks/` react hooks
	|- `renderer/` excalidraw canvas rendering implementations
	  |- `renderElement` control details about drawing element on canvas
		  |- `renderElement` renderElement by type
		|- `renderScene` draw scene on canvas
		  |- `strokeGrid` controls the implementation of grid rendering
			|- `editingLinearElement` add or editing linear element on canvas
		|- `roundRect` draw round rectangle on canvas
	|- `scene/` excalidraw scene related code
	|- `tests/` unit tests and e2e tests
	|- `align`
	|- `analytics`
	|- `appState` global app state
	  |- `currentItemBackgroundColor` shape background color
	|- `bug-issue-template` excalidraw github bug issue report template
	|- `clients` getClient Colors & getClientInitials
	|- `shapes` declare all shape constants in `<ShapesSwitcher />`
	|- `keys` declare all key constants for shortcuts etc.
```

## Troubleshooting

1. Failed to run `meteor run` or `meteor add accounts-password`

   It probably is cased by `install request to https://github.com/kelektiv/node.bcrypt.js/releases/download/v5.0.1/bcrypt_lib-v5.0.1-napi-v3-darwin-x64-unknown.tar.gz failed, reason: connect ETIMEDOUT 20.205.243.166:443`.

   You can run meteor behind a proxy to fix the problem:

   ```bash
   export HTTP_PROXY=http://user:password@1.2.3.4:5678
   export HTTPS_PROXY=http://user:password@1.2.3.4:5678
   ```

   See: https://github.com/meteor/meteor/wiki/Using-Meteor-behind-a-proxy

## Notable Debugging Tools

- [Meteor DevTools Evolved](https://chrome.google.com/webstore/detail/meteor-devtools-evolved/ibniinmoafhgbifjojidlagmggecmpgf?hl=en)
- [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- `npm run debug:brk` with Chrome Devtools to debug code
