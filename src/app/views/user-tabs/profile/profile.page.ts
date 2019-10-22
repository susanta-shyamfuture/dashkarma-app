import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public routerData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe(changeEvent => {
      if (changeEvent instanceof NavigationEnd) {
        this.routerData = route.snapshot.data;
      }
    });
  }

  ngOnInit() {
  }

}
