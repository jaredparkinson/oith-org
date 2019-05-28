import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Navigation } from 'src/app/models/Navigation';
import axios from 'axios';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public constructor(public dataService: DataService) {}

  public ngOnInit(): void {}

  public openChapter(nav: Navigation): void {}
}
