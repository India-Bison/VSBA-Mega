import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subProjectsOfProject'
})
export class SubProjectsOfProjectPipe implements PipeTransform {

  transform(projects: any[], project_id: any): unknown {
    console.log('projects', project_id,);
    return projects.filter((project) => project.parent_id == project_id);
  }

}
