import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb';
import { WaitingComponent } from './waiting/waiting';
@NgModule({
	declarations: [BreadcrumbComponent,
    WaitingComponent],
	imports: [],
	exports: [BreadcrumbComponent,
    WaitingComponent]
})
export class ComponentsModule {}
