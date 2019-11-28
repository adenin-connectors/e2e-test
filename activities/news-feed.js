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
        title: 'Grand Opening of a New Plant in China',
        link: generator.detailUrl(),
        thumbnail: 'https://my.digitalassistant.app/rimage/demo.adenin.com/images/t0001054889/tp1000126.jpeg?format=jpeg&width=150&height=150&mode=crop&quality=98',
        description: 'On Monday, the new plant of Toaster Inc. was officially opened at Chuansha, Shanghai. ',
        date: twoHoursAgo
      },
      {
        id: '1054891',
        title: 'Opening of new logistics and distribution center',
        link: generator.detailUrl(),
        description: 'The new 10,000 square meter distribution centre in Edison, New Jersey will offer a wide range of logistics services. Together the two Toaster warehouse facilities reinforce the company’s existing network of 19 locations in the USA.',
        thumbnail: 'https://my.digitalassistant.app/rimage/demo.adenin.com/images/t0001054891/tp1000126.jpeg?format=jpeg&width=150&height=150&mode=crop&quality=98',
        date: oneDayAgo
      },
      {
        id: '1054878',
        title: 'New Wi-Fi enabled product line',
        link: generator.detailUrl(),
        description: 'We called our new series “Toasti-Fi” because consumers should have access to their home appliances everywhere and anytime. With “Toasti-Fi” we help our customers to stay connected to their home, no matter where they are.',
        thumbnail: 'https://my.digitalassistant.app/rimage/demo.adenin.com/images/t0001054878/tp1000126.png?format=jpeg&width=150&height=150&mode=crop&quality=98',
        date: twoDaysAgo
      }
    ];

    const dateRange = $.dateRange(activity);

    items = shared.filterItemsByDateRange(items, dateRange);

    const value = items.length;
    const pagination = $.pagination(activity);

    items = shared.paginateItems(items, pagination);

    activity.Response.Data.items = items;
    activity.Response.Data.title = T(activity, 'News Feed');
    activity.Response.Data.link = generator.detailUrl();
    activity.Response.Data.linkLabel = T(activity, 'All News');
    activity.Response.Data.actionable = value > 0;

    activity.Response.Data.thumbnail = 'https://www.adenin.com/assets/images/wp-images/logo/sharepoint-online.svg';

    if (value > 0) {
      activity.Response.Data.value = value;
      activity.Response.Data.date = items[0].date; // items are alrady sorted ascending
      activity.Response.Data.description = value > 1 ? T(activity, 'You have {0} news items.', value) : T(activity, 'You have 1 news item.');
      activity.Response.Data.briefing = activity.Response.Data.description + ' The latest is <b>' + activity.Response.Data.items[0].title + '</b>.';
    } else {
      activity.Response.Data.description = T(activity, 'You have no news.');
    }
  } catch (error) {
    $.handleError(activity, error);
  }
};
