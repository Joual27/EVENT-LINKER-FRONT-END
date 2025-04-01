import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as profileActions from '../../state/profile/profile.actions'
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { appIsLoading, showFailurePopup, showSuccessPopup, stopLoading } from '../../ui-state/ui.actions';

enum UploadState {
  Initial,
  Selected,
  Uploading,
  Success,
  Failed
}

interface FileItem {
  file: File;
  name: string;
  size: string;
  progress: number;
  state: UploadState;
  preview?: SafeUrl;
}

@Component({
  selector: 'app-file-upload',
  imports : [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{
  private sanitizer = inject(DomSanitizer);
  private store = inject(Store);
  @Input() title !: string;
  UploadState = UploadState;
  dragAreaActive = false;
  selectedFile: FileItem | null = null;
  uploadState = UploadState.Initial;
  @Output() closePopup = new EventEmitter<void>();
  
  readonly SUPPORTED_FORMATS = 'JPG, PNG, GIF or JPEG';
  readonly MAX_SIZE = '2MB';
  readonly MAX_SIZE_BYTES = 2 * 1024 * 1024;
  

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAreaActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAreaActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAreaActive = false;
    
    if (event.dataTransfer?.files.length) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFileSelection(input.files[0]);
    }
  }

  handleFileSelection(file: File): void {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExt || '')) {
      this.store.dispatch(showFailurePopup({errors : ["Unsupported Image Format"]}))
      return;
    }

    if (file.size > this.MAX_SIZE_BYTES) {
      this.store.dispatch(showFailurePopup({errors : ["The max size is 2MB !"]}));
      return;
    }

    const preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

    this.selectedFile = {
      file,
      name: file.name,
      size: this.formatFileSize(file.size),
      progress: 0,
      state: UploadState.Selected,
      preview
    };
    
    this.uploadState = UploadState.Selected;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  uploadFile(): void {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('profileImg', this.selectedFile.file); 
    this.store.dispatch(profileActions.updateProfile({ data: formData }));
    this.uploadState = UploadState.Uploading;
    this.selectedFile.state = UploadState.Uploading;
    this.store.dispatch(appIsLoading());
    this.handleClosingPopup();
    setTimeout(() => {
      this.store.dispatch(stopLoading());
      this.store.dispatch(showSuccessPopup({message : "Profile Pic updated Successfully ! "}));
    } , 5000);
    
  }
  
  removeFile(): void {
    this.selectedFile = null;
    this.uploadState = UploadState.Initial;
  }

  retryUpload(): void {
    if (this.selectedFile) {
      this.selectedFile.progress = 0;
      this.uploadFile();
    }
  }

  handleClosingPopup() : void {
    this.closePopup.emit();
    this.removeFile();
  }

}