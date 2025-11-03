import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class PaginatorConfig extends MatPaginatorIntl {
  override nextPageLabel = $localize`:لیبل دکمه صفحه بعد در صفحه بندی لیست:صفحه بعد`;
  override previousPageLabel = $localize`:لیبل دکمه صفحه قبل در صفحه بندی لیست:صفحه قبل`;
  override firstPageLabel = $localize`:لیبل دکمه اولین صفحه در صفحه بندی لیست:اولین صفحه`;
  override lastPageLabel = $localize`:لیبل دکمه آخرین صفحه در صفحه بندی لیست:آخرین صفحه`;
  override itemsPerPageLabel = $localize`:لیبل تعداد در هر صفحه در صفحه بندی لیست:تعداد در هر صفحه:`;

  override getRangeLabel = function(page: number, pageSize: number, length: number): string {
    if (pageSize === 0) {
      return '';
    }
    return `صفحه ${page + 1} از ${Math.ceil(length / pageSize)}`;
  };
}
