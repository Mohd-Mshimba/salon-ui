import { SwalService } from './../../modules/shared/swal.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/services/customer.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  userDetails: any;
  roles!: string | null
email:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router:Router,
    private customerService:CustomerService,
    private swalService:SwalService,
    private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
      this.roles = localStorage.getItem('roles');
      this.email = localStorage.getItem('username');
      if (!this.roles) {
        this.router.navigate(['']);
      }
      this.customerService.getLogedIn(this.email).subscribe({
        next: (res:any) => {
          localStorage.setItem("id",res[0]?.id)
          this.userDetails = res[0];
        },
        error: () => {
          this.swalService.errorNotification("User we're not found");
        }
      });
    }

    // hasRole(role: number | number[]) {
    //   const userRole = this.authService.UserInfo.role;
    //   if (role instanceof Array) return role.includes(userRole);
    //   return role === userRole;
    // }

  onLogOut(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    })
  }
}
