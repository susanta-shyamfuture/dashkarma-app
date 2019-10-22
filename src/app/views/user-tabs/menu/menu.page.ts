import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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
