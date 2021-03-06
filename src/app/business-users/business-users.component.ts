import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-business-users',
  templateUrl: './business-users.component.html',
  styleUrls: ['./business-users.component.css']
})
export class BusinessUsersComponent {

  displayedColumns = ['reg_id', 'name', 'category', 'mobile', 'state', 'city', 'country'];
   dataSource: MatTableDataSource<UserData>;
   @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {
      // Create 100 users
      const users: UserData[] = [];
      for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  /** Builds and returns a new User. */
  function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      reg_id: id,
      name: name,
      category: CATEGORY[Math.round(Math.random() * (CATEGORY.length - 1))],
      mobile: Math.round(Math.random() * 10000000000),
      state:'Telangana',
      city:'Hyderabad',
      country:'India'
    };
  }

  /** Constants used to fill up our data base. */
  const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
  const CATEGORY = ["Furniture","Hardware","Clothing","Fashion Jewellery","Valves","Plywood"]
  export interface UserData {
    reg_id: number;
    name: string;
    category: string;
    mobile: number;
    state: string;
    city: string;
    country: string;
  }
