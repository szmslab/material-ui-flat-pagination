export const enum Position {
  Current,
  LowEllipsis,
  HighEllipsis,
  LowEnd,
  HighEnd,
  Standard,
}

export interface PagePosition {
  page: number;
  position: Position;
}

const createPagePosition = (position: Position, page = 0): PagePosition => {
  return {
    page,
    position,
  };
};

export const computePages = (
  limitProp: number,
  offsetProp: number,
  totalProp: number,
  innerButtonCountProp: number,
  outerButtonCountProp: number
): PagePosition[] => {
  const limit = limitProp >= 1 ? limitProp : 1;
  const offset = offsetProp >= 0 ? offsetProp : 0;
  const total = totalProp >= 0 ? totalProp : 0;
  const innerButtonCount = innerButtonCountProp >= 0 ? innerButtonCountProp : 0;
  const outerButtonCount = outerButtonCountProp >= 1 ? outerButtonCountProp : 1;

  const minPage = 1;
  const maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);
  const currentPage = Math.floor(offset / limit) + 1;
  const previousPage = currentPage <= minPage ? 0 : currentPage - 1;
  const nextPage = currentPage >= maxPage ? 0 : currentPage + 1;

  const pages: PagePosition[] = [];

  // previous
  pages.push(createPagePosition(Position.LowEnd, previousPage));

  // low
  const lowInnerReservedButtonCount = Math.max(innerButtonCount + currentPage - maxPage, 0);
  const lowInnerEllipsisPage = currentPage - innerButtonCount - lowInnerReservedButtonCount - 1;
  const lowOuterEllipsisPage = minPage + outerButtonCount;
  for (let i = minPage; i < currentPage; i++) {
    if (i < lowOuterEllipsisPage) {
      pages.push(createPagePosition(Position.Standard, i));
    } else {
      pages.push(
        i === lowOuterEllipsisPage && i < lowInnerEllipsisPage
          ? createPagePosition(Position.LowEllipsis)
          : createPagePosition(Position.Standard, i)
      );
      for (let j = Math.max(i, lowInnerEllipsisPage) + 1; j < currentPage; j++) {
        pages.push(createPagePosition(Position.Standard, j));
      }
      break;
    }
  }

  // current
  pages.push(createPagePosition(Position.Current, currentPage));

  // high
  const highInnerReservedButtonCount = Math.max(innerButtonCount - currentPage + minPage, 0);
  const highInnerEllipsisPage = currentPage + innerButtonCount + highInnerReservedButtonCount + 1;
  const highOuterEllipsisPage = maxPage - outerButtonCount;
  for (let i = currentPage + 1; i <= maxPage; i++) {
    if (i < highInnerEllipsisPage) {
      pages.push(createPagePosition(Position.Standard, i));
    } else {
      pages.push(
        i === highInnerEllipsisPage && i < highOuterEllipsisPage
          ? createPagePosition(Position.HighEllipsis)
          : createPagePosition(Position.Standard, i)
      );
      for (let j = Math.max(i, highOuterEllipsisPage) + 1; j <= maxPage; j++) {
        pages.push(createPagePosition(Position.Standard, j));
      }
      break;
    }
  }

  // next
  pages.push(createPagePosition(Position.HighEnd, nextPage));

  return pages;
};

export const getOffset = (page: number, limit: number): number => {
  const offset = (page - 1) * limit;
  return offset < 0 ? 0 : offset;
};
