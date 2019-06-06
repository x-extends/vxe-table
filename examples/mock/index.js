import XEAjax from 'xe-ajax'
import XEAjaxMock from 'xe-ajax-mock'

// import mock api
import './setup'
import './api'
import './error'

XEAjax.use(XEAjaxMock)
