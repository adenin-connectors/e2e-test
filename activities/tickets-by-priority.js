'use strict';

const generator = require('./common/generator');

module.exports = async (activity) => {
  try {
    activity.Response.Data = {
      title: T(activity, 'Tickets By Priority'),
      link: generator.detailUrl(),
      linkLabel: T(activity, 'Open Dashboard'),
      chart: {
        configuration: {
          data: {
            labels: [
              T(activity, 'High'),
              T(activity, 'Medium'),
              T(activity, 'Low')
            ],
            datasets: [{
              data: [7, 18, 5]
            }]
          },
          options: {
            title: {
              display: true,
              text: T(activity, 'Tickets By Priority')
            }
          }
        },
        template: 'pie-labels',
        palette: 'adenin.PriorityRedOrangeBlue'
      }
    };
  } catch (error) {
    $.handleError(activity, error);
  }
};
