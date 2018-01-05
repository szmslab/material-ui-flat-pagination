'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computePagination = computePagination;
exports.getOffset = getOffset;
var createPageObject = function createPageObject(page) {
  return {
    page: page,
    isCurrent: false,
    isEnd: false,
    isEllipsis: false,
    isLowSide: false
  };
};

var createCurrentPageObject = function createCurrentPageObject(page) {
  var obj = createPageObject(page);
  obj.isCurrent = true;
  return obj;
};

var createOtherPageObject = function createOtherPageObject(page, isLowSide) {
  var obj = createPageObject(page);
  obj.isLowSide = isLowSide;
  return obj;
};

var createEndPageObject = function createEndPageObject(page, isLowSide) {
  var obj = createOtherPageObject(page, isLowSide);
  obj.isEnd = true;
  return obj;
};

var createEllipsisPageObject = function createEllipsisPageObject(isLowSide) {
  var obj = createOtherPageObject(0, isLowSide);
  obj.isEllipsis = true;
  return obj;
};

function computePagination(offset, limit, total, reservedPageCount) {
  var minPage = 1;
  var maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);
  var currentPage = Math.floor(offset / limit) + 1;
  var previousPage = currentPage <= minPage ? 0 : currentPage - 1;
  var nextPage = currentPage >= maxPage ? 0 : currentPage + 1;

  var pages = [];

  // previous
  pages.push(createEndPageObject(previousPage, true));

  // low
  var lowInnerReservedPageCount = Math.max(reservedPageCount + currentPage - maxPage, 0);
  var lowInnerEllipsisPage = currentPage - reservedPageCount - lowInnerReservedPageCount - 1;
  var lowOuterEllipsisPage = minPage + reservedPageCount;
  for (var i = minPage; i < currentPage; i++) {
    if (i < lowOuterEllipsisPage) {
      pages.push(createOtherPageObject(i, true));
    } else {
      pages.push(i === lowOuterEllipsisPage && i < lowInnerEllipsisPage ? createEllipsisPageObject(true) : createOtherPageObject(i, true));
      for (var j = Math.max(i, lowInnerEllipsisPage) + 1; j < currentPage; j++) {
        pages.push(createOtherPageObject(j, true));
      }
      break;
    }
  }

  // current
  pages.push(createCurrentPageObject(currentPage));

  // high
  var highInnerReservedPageCount = Math.max(reservedPageCount - currentPage + minPage, 0);
  var highInnerEllipsisPage = currentPage + reservedPageCount + highInnerReservedPageCount + 1;
  var highOuterEllipsisPage = maxPage - reservedPageCount;
  for (var _i = currentPage + 1; _i <= maxPage; _i++) {
    if (_i < highInnerEllipsisPage) {
      pages.push(createOtherPageObject(_i, false));
    } else {
      pages.push(_i === highInnerEllipsisPage && _i < highOuterEllipsisPage ? createEllipsisPageObject(false) : createOtherPageObject(_i, false));
      for (var _j = Math.max(_i, highOuterEllipsisPage) + 1; _j <= maxPage; _j++) {
        pages.push(createOtherPageObject(_j, false));
      }
      break;
    }
  }

  // next
  pages.push(createEndPageObject(nextPage, false));

  return pages;
}

function getOffset(page, limit) {
  return (page - 1) * limit;
}