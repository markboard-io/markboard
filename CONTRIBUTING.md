# Contribution Guidelines

## Project Structure

```typescript
|- `excalidraw/`
  |- `actions/` store all actions taking effects to canvas
	|- `charts/` excalidraw charts support
	|- `components/` react components
	  |- `LayerUI` react entry point, core react components are aggregated here
	     |- `<Island className='menu-container' />` App Menu
		|- `MenuUtisl` MenuLinks & Menu Seperator in the App Menu
		|- `Island` the common react components to create a floating panel, aka "island"
		|- `InitializeApp` The loading wrapper for <ExclidrawApp />. Presents <LoadingMessage /> if `i18n` is not ready.
	|- `css/` common stylesheets
	|- `data/` data operation utilities
	|- `element/` excalidraw canvas elements & helpers
	|- `excalidraw-app/` react entry point
	|- `hooks/` react hooks
	|- `package/` react entry point
	|- `renderer/` excalidraw canvas rendering implementations
	  |- `renderElement` control details about drawing element on canvas
		|- `renderScene` draw scene on canvas
		|- `roundRect` draw round rectangle on canvas
	|- `scene/` excalidraw scene related code
	|- `tests/` unit tests and e2e tests
	|- `align`
	|- `analytics`
	|- `appState` global app state
	|- `bug-issue-template` excalidraw github bug issue report template
	|- `clients` getClient Colors & getClientInitials
```
