import { action } from "@storybook/addon-actions";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";

import { CommonModule } from "@angular/common";
import { AtomicComponentModule } from "projects/atomic-component/src/public-api";

storiesOf("Components|Frontal", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [CommonModule, AtomicComponentModule],
      schemas: [],
      declarations: [],
      entryComponents: []
    })
  )
  .add("dropdown", () => {
    return {
      template: `
        <ThemeProvider>
          <Dropdown></Dropdown>
        </ThemeProvider>
      `,
      props: {}
    };
  })
  .add("auto-complete", () => {
    return {
      template: `
        <ThemeProvider>
           on progress
        </ThemeProvider>
      `,
      props: {}
    };
  })
  .add("customize", () => {
    return {
      template: `
        <ThemeProvider>
           on progress
        </ThemeProvider>
      `,
      props: {}
    };
  });
