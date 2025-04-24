import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, JsonPipe
    ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}