import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TabPanelsComponent } from "./tab-panels.component";

describe("TabPanelsComponent", () => {
  let component: TabPanelsComponent;
  let fixture: ComponentFixture<TabPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPanelsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
