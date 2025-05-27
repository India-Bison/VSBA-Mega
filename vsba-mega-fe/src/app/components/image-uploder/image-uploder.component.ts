import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
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
  @Input() is_required: boolean = false;
  @Input() lebal: any = '';
  @Input() disabled: boolean = false;
  @Input() accept: string = '.jpg,.jpeg,.webp,.png';
  imageSizes: string[] = [];
  @Input() maxFileSize: number = 1;
  images: string[] = [];
  params: any;
  paramValue: any = {}

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor(public ar: ActivatedRoute, private injector: Injector) { }

  ngOnInit(): void {
    this.ar.queryParams.subscribe(params => {
      this.paramValue = params;
    });
  }
  control: any;
  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }
    }, 100);
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
    const maxSizeBytes = this.maxFileSize * 1024 * 1024;

    for (let file of fileArray) {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(extension)) {
        alert(`Invalid file type: ${extension}. Allowed: ${this.accept}`);
        continue;
      }
      if (file.size > maxSizeBytes) {
        const actualSizeMB = (file.size / 1024 / 1024).toFixed(2);
        alert(`"${file.name}" is ${actualSizeMB} MB. Max allowed size is ${this.maxFileSize} MB.`);
        continue;
      }
      const sizeInKB = file.size / 1024;
      const sizeLabel = sizeInKB > 1024
        ? (sizeInKB / 1024).toFixed(2) + ' MB'
        : sizeInKB.toFixed(2) + ' KB';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageData = e.target.result;
        if (this.multiple) {
          this.images.push(imageData);
          this.imageSizes.push(sizeLabel)
          this.onChange(this.images);
        } else {
          this.images = [imageData];
          this.imageSizes = [sizeLabel];
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