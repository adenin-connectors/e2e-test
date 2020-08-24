'use strict';

const fs = require('fs');

const {sep} = require('path');
const {promisify} = require('util');

const yaml = require('js-yaml');

const readFile = promisify(fs.readFile);

module.exports = async (activity) => {
  try {
    let data = {};
    let _action = $.getObjPath(activity.Request, 'Data.model._action');

    if (_action) {
      activity.Request.Data.model._action = {};
    } else {
      _action = {};
    }

    switch (activity.Request.Path) {

    case '/create':
    case 'create':
    case 'submit': {
      data = $.getObjPath(activity.Request, 'Data.model');
      data._action = {
        response: {
          success: true,
          message: T(activity, 'Ticket created')
        }
      };
      break;
    }
    default: {
      const fname = __dirname + sep + 'common' + sep + 'ticket-create.form';
      const schema = yaml.safeLoad(await readFile(fname, 'utf8'));

      data.title = T(activity, 'Create Ticket');
      data.formSchema = schema;

      if (activity.Request.Query && activity.Request.Query.query) data.form.subject = activity.Request.Query.query;

      data._actionList = [{
        id: 'create',
        label: T(activity, 'Create Ticket'),
        settings: {
          actionType: 'a'
        }
      }];

      break;
    }
    }

    // copy response data
    activity.Response.Data = data;
  } catch (error) {
    $.handleError(activity, error);
  }
};
