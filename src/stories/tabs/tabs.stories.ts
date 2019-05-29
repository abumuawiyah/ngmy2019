import { action } from "@storybook/addon-actions";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";

import { CommonModule } from "@angular/common";
import { AtomicComponentModule } from "projects/atomic-component/src/public-api";

storiesOf("Components|Tab", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [CommonModule, AtomicComponentModule],
      schemas: [],
      declarations: [],
      entryComponents: []
    })
  )
  .add("default", () => {
    return {
      template: `
        <ThemeProvider>
          <Tabs [activeIndex]=1>
            <TabList>
              <Tab>
                Tab 1
              </Tab>
              <Tab>
                Tab 2
              </Tab>
              <Tab>
                Tab 3
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                Panel 1
              </TabPanel>
              <TabPanel>
                Panel 2
              </TabPanel>
              <TabPanel>
                Panel 3
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ThemeProvider>
      `,
      props: {}
    };
  })
  .add("bottom", () => {
    return {
      template: `
        <ThemeProvider>
          <Tabs [activeIndex]=1>
            <TabPanels>
              <TabPanel>
                Panel 1
              </TabPanel>
              <TabPanel>
                Panel 2
              </TabPanel>
              <TabPanel>
                Panel 3
              </TabPanel>
            </TabPanels>
            <TabList>
              <Tab>
                Tab 1
              </Tab>
              <Tab>
                Tab 2
              </Tab>
              <Tab>
                Tab 3
              </Tab>
            </TabList>
          </Tabs>
        </ThemeProvider>
      `,
      props: {}
    };
  })
  .add("left", () => {
    return {
      template: `
        <ThemeProvider>
          <Tabs [activeIndex]=1 [css]="tabsStyle">
            <TabList [css]="tabListStyle">
              <Tab>
                Tab 1
              </Tab>
              <Tab>
                Tab 2
              </Tab>
              <Tab>
                Tab 3
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                Panel 1
              </TabPanel>
              <TabPanel>
                Panel 2
              </TabPanel>
              <TabPanel>
                Panel 3
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ThemeProvider>
      `,
      props: {
        tabsStyle: {
          flexDirection: "row"
        },
        tabListStyle: {
          flexDirection: "column"
        }
      }
    };
  })
  .add("right", () => {
    return {
      template: `
        <ThemeProvider>
          <Tabs [activeIndex]=1 [css]="tabsStyle">
            <TabList [css]="tabListStyle">
              <Tab>
                Tab 1
              </Tab>
              <Tab>
                Tab 2
              </Tab>
              <Tab>
                Tab 3
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                Panel 1
              </TabPanel>
              <TabPanel>
                Panel 2
              </TabPanel>
              <TabPanel>
                Panel 3
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ThemeProvider>
      `,
      props: {
        tabsStyle: {
          flexDirection: "row"
        },
        tabListStyle: {
          flexDirection: "column",
          order: "1"
        }
      }
    };
  })
  .add("customize", () => {
    return {
      template: `
        <ThemeProvider>
          <Tabs [activeIndex]=1>
            <TabList>
              <Tab [css]="tabStyle">
                Tab 1
              </Tab>
              <Tab [css]="tabStyle">
                Tab 2
              </Tab>
              <Tab [css]="tabStyle">
                Tab 3
              </Tab>
            </TabList>
            <TabPanels [css]="tabPanelsStyle">
              <TabPanel>
                Panel 1
              </TabPanel>
              <TabPanel>
                Panel 2
              </TabPanel>
              <TabPanel>
                Panel 3
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ThemeProvider>
      `,
      props: {
        tabStyle: {
          borderBottom: 0,
          background: "tomato",
          height: 20,
          color: "white",
          marginBottom: 0
        },
        tabPanelsStyle: {
          border: "1px solid black",
          height: 200,
          width: "50%",
          padding: 16,
          marginLeft: 4
        }
      }
    };
  });
