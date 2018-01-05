'use strict';

const createPageObject = (page) => {
  return {
    page: page,
    isCurrent: false,
    isEnd: false,
    isEllipsis: false,
    isLowSide: false
  };
};

const createCurrentPageObject = (page) => {
  const obj = createPageObject(page);
  obj.isCurrent = true;
  return obj;
};

const createOtherPageObject = (page, isLowSide) => {
  const obj = createPageObject(page);
  obj.isLowSide = isLowSide;
  return obj;
};

const createEndPageObject = (page, isLowSide) => {
  const obj = createOtherPageObject(page, isLowSide);
  obj.isEnd = true;
  return obj;
};

const createEllipsisPageObject = (isLowSide) => {
  const obj = createOtherPageObject(0, isLowSide);
  obj.isEllipsis = true;
  return obj;
};

export function computePagination(offset, limit, total, reservedPageCount) {
  const minPage = 1;
  const maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);
  const currentPage = Math.floor(offset / limit) + 1;
  const previousPage = currentPage <= minPage ? 0 : currentPage - 1;
  const nextPage = currentPage >= maxPage ? 0 : currentPage + 1;

  const pages = [];

  // previous
  pages.push(createEndPageObject(previousPage, true));

  // low
  const lowInnerReservedPageCount = Math.max(reservedPageCount + currentPage - maxPage, 0);
  const lowInnerEllipsisPage = currentPage - reservedPageCount - lowInnerReservedPageCount - 1;
  const lowOuterEllipsisPage = minPage + reservedPageCount;
  for (let i = minPage; i < currentPage; i++) {
    if (i < lowOuterEllipsisPage) {
      pages.push(createOtherPageObject(i, true));
    } else {
      pages.push(i === lowOuterEllipsisPage && i < lowInnerEllipsisPage
        ? createEllipsisPageObject(true) : createOtherPageObject(i, true));
      for (let j = Math.max(i, lowInnerEllipsisPage) + 1; j < currentPage; j++) {
        pages.push(createOtherPageObject(j, true));
      }
      break;
    }
  }

  // current
  pages.push(createCurrentPageObject(currentPage));

  // high
  const highInnerReservedPageCount = Math.max(reservedPageCount - currentPage + minPage, 0);
  const highInnerEllipsisPage = currentPage + reservedPageCount + highInnerReservedPageCount + 1;
  const highOuterEllipsisPage = maxPage - reservedPageCount;
  for (let i = currentPage + 1; i <= maxPage; i++) {
    if (i < highInnerEllipsisPage) {
      pages.push(createOtherPageObject(i, false));
    } else {
      pages.push(i === highInnerEllipsisPage && i < highOuterEllipsisPage
        ? createEllipsisPageObject(false) : createOtherPageObject(i, false));
      for (let j = Math.max(i, highOuterEllipsisPage) + 1; j <= maxPage; j++) {
        pages.push(createOtherPageObject(j, false));
      }
      break;
    }
  }

  // next
  pages.push(createEndPageObject(nextPage, false));

  return pages;
}

export function getOffset(page, limit) {
  return (page - 1) * limit;
}
