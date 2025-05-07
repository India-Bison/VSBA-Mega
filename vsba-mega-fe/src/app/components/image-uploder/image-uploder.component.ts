import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  @Input() accept: string = '.jpg,.jpeg,.webp,.png';

  images: string[] = [];
  params:any;
  paramValue: any = {}

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(public ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.ar.queryParams.subscribe(params => {
      this.paramValue = params;
    });
  }
  
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
    if (!files || files.length === 0) return;
  
    const fileArray = Array.from(files);
    const acceptedTypes = this.accept.split(',').map(type => type.trim().toLowerCase());
  
    for (let file of fileArray) {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(extension)) {
        alert(`Invalid file type: ${extension}. Allowed: ${this.accept}`);
        continue;
      }
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageData = e.target.result;
        if (this.multiple) {
          this.images.push(imageData);
          this.onChange(this.images);
        } else {
          this.images = [imageData];
          this.onChange(imageData);
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