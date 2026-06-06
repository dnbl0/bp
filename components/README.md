The components directory structure is inspired by Atomic Design. The components are split into multiple categories:

-   Atoms
-   Molecules
-   Organisms
-   Templates
-   Pages

### Rules of atoms

-   Should not compose other components/only uses [native elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or framework-specific components similar to native elements
-   Can have its own markup & styles
-   Can maintain its own internal state
-   Should not be tightly coupled to specific UI or Logic areas
-   Should not access application (or higher level) state directly
-   Should not have any non-ui/layout related side effects
-   Should not implement any application-specific business logic

### Rules of molecules

-   A component made up of one or more Atoms
-   Can have its own markup & styles
-   Can maintain its own internal state
-   Should not be tightly coupled to specific UI or Logic areas
-   Should not access application (or higher level) state directly
-   Should not have any non-ui/layout related side effects
-   Should not implement any application-specific business logic

### Rules of organisms

-   A complex component made up of multiple atoms and/or molecules and/or other organisms
-   Can have its own markup & styles
-   Can fetch application-specific data
-   Can implement application-specific business logic
-   Can be connected to application (or higher level) state
-   Can be tightly coupled with a specific area (UI and/or Logic) of the app
-   Can be organized into sub-folders by logical categorization (feature, page, etc...)

### Rules of templates

-   A component that facilitates the layout of multiple organisms
-   Can have its own markup & styles.
-   Can accept & pass props as required.
-   Should not access application (or higher level) state
-   Should not have any non-ui/layout related side effects
-   Should not implement any application-specific business logic

### Rules of pages

-   A component that implements a particular template
-   Can fetch application-specific data
-   Can implement application-specific business logic
-   Can be connected to application (or higher level) state
-   Should not have its own markup & styles

## References

-   [Brad Frost: Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
-   [Ben Fox: Atomic Design for Developers](https://benjaminwfox.com/blog/tech/atomic-design-for-developers)
