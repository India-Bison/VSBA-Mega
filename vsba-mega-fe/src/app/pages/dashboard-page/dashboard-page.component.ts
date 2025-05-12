import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-page',
    imports: [HeaderComponent, CommonModule,ButtonComponent],
    templateUrl: './dashboard-page.component.html',
    standalone: true,
})
export class DashboardPageComponent {
   steps = [
  { name: 'm1', step: 1 },
  { name: 'm2', step: 2 },
  { name: 'm3', step: 3 },
  { name: 'm4', step: 4 },
  { name: 'm5', step: 5 },
];
current_step = 1;
params: any = {}
constructor(private ar: ActivatedRoute, private route: Router) {}
ngOnInit() {
  this.ar.queryParams.subscribe(params => {
    this.params = params;
    const step = +params['step'];
     if (step >= 1 && step <= this.steps.length) {
      this.current_step = step;
    } else if (params['step']) {
      alert(`Step ${step} navach kahcih step nahi`);
      this.current_step = 1;
      this.route.navigate([], {
        relativeTo: this.ar,
        queryParams: { step: 1 },
        queryParamsHandling: 'merge',
      });
    }
  });;
}


step_to_step(step: number) {
  if (step >= 1 && step <= this.steps.length) {
    this.current_step = step;
    this.route.navigate([], {
      relativeTo: this.ar,
      queryParams: { step },
      queryParamsHandling: 'merge',
    });
    console.log(`mmmmmmmmmmm ${step}`);
  }
}

}
