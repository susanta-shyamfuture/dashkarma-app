import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
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
