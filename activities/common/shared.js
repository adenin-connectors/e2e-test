'use strict';

module.exports = {
  filterItemsByDateRange: (items, daterange) => {
    const filteredItems = [];

    const start = new Date(daterange.startDate).valueOf();
    const end = new Date(daterange.endDate).valueOf();

    for (let i = 0; i < items.length; i++) {
      const tmpDate = new Date(items[i].date).valueOf();

      if (start < tmpDate && tmpDate < end) filteredItems.push(items[i]);
    }

    return filteredItems;
  },
  paginateItems: (items, pagination) => {
    const paginatedItems = [];

    const pageSize = parseInt(pagination.pageSize);
    const offset = (parseInt(pagination.page) - 1) * pageSize;

    if (offset > items.length) return paginatedItems;

    for (let i = offset; i < offset + pageSize; i++) {
      if (i >= items.length) break;

      paginatedItems.push(items[i]);
    }

    return paginatedItems;
  }
};
