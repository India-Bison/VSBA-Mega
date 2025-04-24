import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatDatepickerModule, JsonPipe, MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,MatIconModule,
    MatNativeDateModule,DatePipe
    ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
 
}