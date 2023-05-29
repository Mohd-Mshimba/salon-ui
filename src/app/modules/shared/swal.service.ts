import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  async confirm(message: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });
    return result;
  }

  async exclamation(message: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });
    return result;
  }

  errorNotification(msg: string) {
    Swal.fire('', msg, 'warning');
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
    });
  }

  logInSuccess(message: string) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    }).fire({
      icon: 'success',
      title: 'Signed in successfully',
    });
  }

  successNotification(msg: string) {
    Swal.fire('', msg, 'success');
  }

  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  async successMessage(message: string) {
    const result = await Swal.fire({
      title: 'Successfully',
      text: message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });
    return result;
  }
}
