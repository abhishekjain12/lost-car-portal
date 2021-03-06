import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {FilterModel, OrderBy} from "../../../shared/model/filter.model";
import {MatTableDataSource} from "@angular/material/table";
import {allComplaintDisplayColumns, Complaint, ComplaintModel} from "../complaint.model";
import {Constant} from "../../../shared/constant";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {StorageService} from "../../../shared/service/storage.service";
import {ComplaintService} from "../complaint.service";
import {AppConfig} from "../../../app.config";
import {environment} from "../../../../environments/environment";
import {AcceptModalComponent} from "./accept-modal/accept-modal.component";
import {ViewComplaintDetailsModalComponent} from "../view-complaint-details-modal/view-complaint-details-modal.component";

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.scss']
})
export class AllComplaintsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<Complaint>;
  displayedColumns = allComplaintDisplayColumns;
  COMPLAINT_STATUS = Constant.COMPLAINT_STATUS;
  pageSize = Constant.PAGE_SIZE_LIST;
  isFiltered = false;

  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private storageService: StorageService,
    private complaintService: ComplaintService
  ) {
    this.filterModel.order_by.push(new OrderBy());
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredComplaints();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.isFiltered = false;
    this.filterModel = new FilterModel();
    this.filterModel.order_by.push(new OrderBy());
    this.getFilteredComplaints();
    this.router.navigate([AppConfig.ALL_COMPLAINT]).then();
  }

  getFilteredComplaints() {
    this.spinnerService.show();
    this.subscription.add(
      this.complaintService.getFilteredComplaints(this.filterModel).subscribe((res: ComplaintModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openDetailsModal(complaint: Complaint) {
    this.dialog.open(ViewComplaintDetailsModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: complaint
    });
  }

  openAcceptModal(complaint: Complaint) {
    this.dialog.open(AcceptModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: complaint
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredComplaints();
      }
    });
  }

  downloadFile(complaint: Complaint) {
    window.location.href = environment.HOST + AppConfig.COMPLAINT_DOWNLOAD_API + complaint.file_name;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
