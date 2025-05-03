import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-uploder',
  imports: [CommonModule],
  templateUrl: './image-uploder.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploderComponent
    }
  ],
  standalone: true,
})
export class ImageUploderComponent implements ControlValueAccessor {
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;

  images: string[] = [];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.images = this.multiple ? value : [value];
    } else {
      this.images = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length == 0) return;
    const fileArray = Array.from(files);
    for (let file of fileArray) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const get_iamges = e.target.result;
        if (this.multiple) {
          this.images.push(get_iamges);
          this.onChange(this.images);
        } else {
          this.images = [get_iamges];
          this.onChange(get_iamges);
        }
      };
      reader.readAsDataURL(file);
    }

    this.onTouched();
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    if (this.multiple) {
      this.onChange(this.images);
    } else {
      this.onChange('');
    }
  }
}