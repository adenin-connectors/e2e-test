'use strict';

const moment = require('moment-timezone');

const generator = require('./common/generator');
const shared = require('./common/shared');

module.exports = async (activity) => {
  try {
    const now = moment().tz(activity.Context.UserTimezone);

    const twoHoursAgo = now.clone().hours(now.hours() - 2);
    const oneDayAgo = now.clone().days(now.days() - 1);
    const twoDaysAgo = now.clone().days(now.days() - 2);

    let items = [
      {
        id: '1054889',
        title: 'Damaged product, could I have a refund?',
        link: generator.detailUrl(),
        date: twoHoursAgo
      },
      {
        id: '1054891',
        title: 'When will I receive my order?',
        link: generator.detailUrl(),
        date: oneDayAgo
      },
      {
        id: '1054878',
        title: 'Cannot finish checkout process.',
        link: generator.detailUrl(),
        date: twoDaysAgo
      }
    ];

    const response = activity.Response.Data;
    const value = items.length;
    const dateRange = $.dateRange(activity);

    items = shared.filterItemsByDateRange(items, dateRange);

    const pagination = $.pagination(activity);

    items = shared.paginateItems(items, pagination);

    response.items = items;
    response.title = T(activity, 'Open Tickets');
    response.link = generator.detailUrl();
    response.linkLabel = T(activity, 'All tickets');
    response.actionable = value > 0;

    response.thumbnail = 'https://www.adenin.com/assets/images/wp-images/logo/freshdesk.svg'; // activity.Context.connector.host.connectorLogoUrl;

    if (value > 0) {
      response.value = value;
      response.date = items[0].date;
      response.description = value > 1 ? T(activity, 'You have {0} open tickets assigned.', value) : T(activity, 'You have 1 open ticket assigned.');
      response.briefing = response.description + ' The latest is <b>' + response.items[0].title + '</b>';
    } else {
      response.description = T(activity, 'You have no open tickets assigned.');
    }
  } catch (error) {
    $.handleError(activity, error);
  }
};
