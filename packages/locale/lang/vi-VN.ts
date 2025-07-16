export default {
  vxe: {
    base: {
      pleaseInput: 'Vui lòng nhập',
      pleaseSelect: 'Vui lòng chọn',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'đang tải...'
    },
    error: {
      downErr: 'Tải xuống không thành công',
      errLargeData: 'Khi lượng dữ liệu bị ràng buộc quá lớn, vui lòng sử dụng {0}, nếu không nó có thể gây ra độ trễ',
      groupFixed: 'Nếu sử dụng các tiêu đề được nhóm, cột đóng băng phải được đặt theo nhóm',
      groupMouseRange: 'Tiêu đề nhóm không thể được sử dụng cùng lúc với "{0}" và điều này có thể gây ra lỗi',
      groupTag: 'Nhóm tiêu đề nhóm nên sử dụng "{0}" thay vì "{1}", có thể gây ra lỗi',
      scrollErrProp: 'Tham số này "{0}" không được hỗ trợ sau khi cuộn ảo được bật',
      errConflicts: 'Tham số "{0}" Xung đột với "{1}"',
      notSupportProp: '"{1}" không được hỗ trợ khi tham số "{0}" được bật, nó phải là "{2}", nếu không sẽ xảy ra lỗi',
      notConflictProp: 'Khi sử dụng "{0}", "{1}" nên được đặt, nếu không có thể có xung đột chức năng',
      unableInsert: 'Không thể được chèn vào vị trí đã chỉ định, vui lòng kiểm tra xem các tham số có đúng không',
      useErr: 'Đã xảy ra lỗi trong khi cài đặt mô -đun "{0}". Thứ tự có thể không chính xác. Mô -đun phụ thuộc cần được cài đặt trước bảng',
      barUnableLink: 'Thanh công cụ không thể liên kết các bảng',
      expandContent: 'Khe cắm cho dòng mở rộng phải là "nội dung", vui lòng kiểm tra xem nó có đúng không',
      reqComp: 'Thành phần "{0}" bị thiếu, vui lòng kiểm tra xem nó có được cài đặt chính xác không. https://vxeui.com/#/start/useglobal',
      reqModule: 'Thiếu mô -đun "{0}"',
      reqProp: 'Tham số "{0}" cần thiết, có thể gây ra lỗi',
      emptyProp: 'Tham số "{0}" không được phép trống',
      errProp: 'Tham số không được hỗ trợ "{0}", có thể là "{1}"',
      colRepet: 'Cột. {0} = "{1}" được lặp lại, điều này có thể khiến một số chức năng trở nên không thể sử dụng',
      notFunc: 'Phương thức "{0}" không tồn tại',
      errFunc: 'Tham số "{0}" không phải là một phương thức',
      notValidators: 'Xác minh toàn cầu "{0}" không tồn tại',
      notFormats: 'Định dạng toàn cầu "{0}" không tồn tại',
      notCommands: 'Chỉ thị toàn cầu "{0}" không tồn tại',
      notSlot: 'Khe "{0}" không tồn tại',
      noTree: '"{0}" không được hỗ trợ trong cấu trúc cây',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Tham số không được hỗ trợ "{0}"',
      checkProp: 'Khi khối lượng dữ liệu quá lớn, hộp kiểm có thể được lắp. Bạn nên đặt tham số "{0}" để cải thiện tốc độ kết xuất',
      coverProp: 'Tham số "{1}" của "{0}" được xác định nhiều lần, có thể gây ra lỗi',
      uniField: 'Tên trường "{0}" được xác định nhiều lần, có thể gây ra lỗi',
      repeatKey: 'Lặp lại khóa chính {0} = "{1}", có thể gây ra lỗi',
      delFunc: 'Phương thức "{0}" không được dùng nữa, vui lòng sử dụng "{1}"',
      delProp: 'Tham số "{0}" không được dùng, vui lòng sử dụng "{1}"',
      delEvent: 'Sự kiện "{0}" được không dùng nữa, vui lòng sử dụng "{1}"',
      removeProp: 'Tham số "{0}" không được khuyến khích và không được khuyến nghị, điều này có thể gây ra lỗi',
      errFormat: 'Nội dung được định dạng toàn cầu nên được xác định bằng cách sử dụng "vxetable.formats" và phương thức gắn "formatter = {0}" không còn được khuyến nghị.',
      notType: 'Loại tệp không được hỗ trợ "{0}"',
      notExp: 'Trình duyệt này không hỗ trợ chức năng nhập/xuất',
      impFields: 'Nhập khẩu không thành công. Vui lòng kiểm tra xem tên trường và định dạng dữ liệu có chính xác không.',
      treeNotImp: 'Bảng cây không hỗ trợ nhập khẩu',
      treeCrossDrag: 'Chỉ kéo cấp độ đầu tiên',
      treeDragChild: 'Cha mẹ không thể kéo đến con cái của họ',
      reqPlugin: '"{1}" không được cài đặt tại https://vxeui.com/other/khác',
      errMaxRow: 'Vượt quá khối lượng dữ liệu được hỗ trợ tối đa {0}, điều này có thể gây ra lỗi'
    },
    table: {
      emptyText: 'Chưa có dữ liệu',
      allTitle: 'Chọn tất cả/Hủy',
      seqTitle: 'Số seri',
      actionTitle: 'vận hành',
      confirmFilter: 'lọc',
      resetFilter: 'Cài lại',
      allFilter: 'tất cả',
      sortAsc: 'Lệnh tăng dần: thấp nhất đến cao nhất',
      sortDesc: 'Lệnh giảm dần: Cao nhất đến thấp nhất',
      filter: 'Bật lọc cho các cột đã chọn',
      impSuccess: 'Nhập thành công {0} bản ghi',
      expLoading: 'Xuất khẩu',
      expSuccess: 'Xuất khẩu thành công',
      expError: 'Xuất khẩu không thành công',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Cài đặt cột',
      customAll: 'tất cả',
      customConfirm: 'xác nhận',
      customClose: 'Đóng cửa',
      customCancel: 'Hủy bỏ',
      customRestore: 'Khôi phục mặc định',
      maxFixedCol: 'Số lượng cột đóng băng tối đa không thể vượt quá {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Di chuyển: {0}',
      resizeColTip: 'Chiều rộng: {0} pixel',
      resizeRowTip: 'Chiều cao: {0} pixel',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Vui lòng chọn ít nhất một bản ghi!',
      deleteSelectRecord: 'Bạn có chắc là bạn muốn xóa bản ghi đã chọn?',
      removeSelectRecord: 'Bạn có chắc là bạn muốn xóa bản ghi đã chọn?',
      dataUnchanged: 'Dữ liệu không thay đổi!',
      delSuccess: 'Hồ sơ được chọn đã bị xóa thành công!',
      saveSuccess: 'Tiết kiệm thành công!',
      operError: 'Một lỗi đã xảy ra và hoạt động không thành công!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'tìm kiếm',
      loadingText: 'đang tải',
      emptyText: 'Chưa có dữ liệu',
      maxOpt: '最大可选择的数量不能超过 {0} 个',
      overSizeErr: '已超出最大可选数量 {0} 个，超出部分将被忽略！',
      searchEmpty: '未匹配到数据！'
    },
    tree: {
      searchEmpty: '未匹配到数据！'
    },
    treeSelect: {
      clearChecked: '清除',
      allChecked: '全选',
      allExpand: '全部展开',
      clearExpand: '全部收起',
      total: '已选 {0}',
      search: '搜索',
      emptyText: '暂无数据'
    },
    pager: {
      goto: 'Đi',
      gotoTitle: 'Số lượng trang',
      pagesize: '{0} Các mục/trang',
      total: 'Tổng số {0} bản ghi',
      pageClassifier: 'Trang',
      homePage: 'trang nhất',
      homePageTitle: 'trang nhất',
      prevPage: 'Trang trước',
      prevPageTitle: 'Trang trước',
      nextPage: 'Trang tiếp theo',
      nextPageTitle: 'Trang tiếp theo',
      prevJump: 'Jump Up trang',
      prevJumpTitle: 'Jump Up trang',
      nextJump: 'Nhảy xuống trang',
      nextJumpTitle: 'Nhảy xuống trang',
      endPage: 'Trang cuối cùng',
      endPageTitle: 'Trang cuối cùng'
    },
    alert: {
      title: 'Hệ thống nhắc nhở'
    },
    button: {
      confirm: 'xác nhận',
      cancel: 'Hủy bỏ',
      clear: 'Thông thoáng'
    },
    filter: {
      search: 'tìm kiếm'
    },
    custom: {
      cstmTitle: 'Cài đặt cột',
      cstmRestore: 'Khôi phục mặc định',
      cstmCancel: 'Hủy bỏ',
      cstmConfirm: 'Chắc chắn',
      cstmConfirmRestore: 'Vui lòng xác nhận xem nó được khôi phục về cấu hình cột mặc định?',
      cstmDragTarget: 'Di chuyển: {0}',
      setting: {
        colSort: 'Loại',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Tiêu đề cột',
        colResizable: 'Chiều rộng cột (pixel)',
        colVisible: 'Có hiển thị không',
        colFixed: 'Đóng băng cột',
        colFixedMax: 'Các cột đóng băng (tối đa {0} cột)',
        fixedLeft: 'Bên trái',
        fixedUnset: 'Không đặt',
        fixedRight: 'Bên phải'
      }
    },
    import: {
      modes: {
        covering: 'Phương thức ghi đè (trực tiếp ghi đè dữ liệu bảng)',
        insert: 'Nối ở phía dưới (nối dữ liệu mới ở dưới cùng của bảng)',
        insertTop: 'Nối ở trên cùng (nối dữ liệu mới ở đầu bảng)',
        insertBottom: 'Nối ở phía dưới (nối dữ liệu mới ở dưới cùng của bảng)'
      },
      impTitle: 'Nhập dữ liệu',
      impFile: 'Tên tập tin',
      impSelect: 'Chọn Tệp',
      impType: 'Loại tệp',
      impOpts: 'Cài đặt tham số',
      impMode: 'Chế độ nhập',
      impConfirm: 'Nhập khẩu',
      impCancel: 'Hủy bỏ'
    },
    export: {
      types: {
        csv: 'CSV (dấu phẩy tách ra) (*. CSV)',
        html: 'Trang web (*.html)',
        xml: 'Dữ liệu XML (*.xml)',
        txt: 'Tệp văn bản (Tab phân tách) (*. TXT)',
        xls: 'Excel 97-2003 sổ làm việc (*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'Pdf (*.pdf)'
      },
      modes: {
        empty: 'Dữ liệu trống',
        current: 'Dữ liệu hiện tại (dữ liệu trên trang hiện tại)',
        selected: 'Dữ liệu đã chọn (dữ liệu được chọn trên trang hiện tại)',
        all: 'Dữ liệu đầy đủ (bao gồm tất cả dữ liệu phân trang)'
      },
      printTitle: 'In dữ liệu',
      expTitle: 'Xuất dữ liệu',
      expName: 'Tên tập tin',
      expNamePlaceholder: 'Vui lòng nhập tên tệp',
      expSheetName: 'tiêu đề',
      expSheetNamePlaceholder: 'Vui lòng nhập một tiêu đề',
      expType: 'Lưu loại',
      expMode: 'Chọn dữ liệu',
      expCurrentColumn: 'Tất cả các lĩnh vực',
      expColumn: 'Chọn trường',
      expOpts: 'Cài đặt tham số',
      expOptHeader: 'Tiêu đề',
      expHeaderTitle: 'Tiêu đề bảng có được yêu cầu không',
      expOptFooter: 'Kết thúc bảng',
      expFooterTitle: 'Là kết thúc của bảng cần thiết?',
      expOptColgroup: 'Tiêu đề nhóm',
      expOptTitle: 'Tiêu đề cột',
      expTitleTitle: 'Cho dù đó là tiêu đề cột, nếu không nó sẽ được hiển thị dưới dạng tên trường của cột',
      expColgroupTitle: 'Nếu có, một tiêu đề với cấu trúc nhóm được hỗ trợ',
      expOptMerge: 'Hợp nhất',
      expMergeTitle: 'Nếu có, các tế bào có cấu trúc hợp nhất được hỗ trợ',
      expOptAllExpand: 'Mở rộng cây',
      expAllExpandTitle: 'Nếu nó tồn tại, nó được hỗ trợ để mở rộng tất cả dữ liệu với các cấu trúc phân cấp',
      expOptUseStyle: 'phong cách',
      expUseStyleTitle: 'Nếu có, các tế bào có phong cách được hỗ trợ',
      expOptOriginal: 'Dữ liệu nguồn',
      expOriginalTitle: 'Nếu đó là dữ liệu nguồn, nhập vào bảng được hỗ trợ',
      expPrint: 'In',
      expConfirm: 'Xuất khẩu',
      expCancel: 'Hủy bỏ'
    },
    modal: {
      errTitle: 'Thông báo lỗi',
      zoomMin: 'Giảm thiểu',
      zoomIn: 'Tối đa hóa',
      zoomOut: 'sự giảm bớt',
      close: 'Đóng cửa',
      miniMaxSize: 'Số lượng cửa sổ được giảm thiểu không thể vượt quá {0}',
      footPropErr: 'Show-footer chỉ được sử dụng để kích hoạt đuôi bàn và phải được sử dụng với show-confirm-button | Hiển thị-C-Button | khe cắm'
    },
    drawer: {
      close: 'Đóng cửa'
    },
    form: {
      folding: 'Đóng',
      unfolding: 'Mở rộng'
    },
    toolbar: {
      import: 'Nhập khẩu',
      export: 'Xuất khẩu',
      print: 'In',
      refresh: 'làm cho khỏe lại',
      zoomIn: 'toàn màn hình',
      zoomOut: 'sự giảm bớt',
      custom: 'Cài đặt cột',
      customAll: 'tất cả',
      customConfirm: 'xác nhận',
      customRestore: 'Cài lại',
      fixedLeft: 'Đóng băng trái',
      fixedRight: 'Đóng băng đúng',
      cancelFixed: 'Giải phóng'
    },
    datePicker: {
      yearTitle: '{0} năm'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'Tháng Một',
        m2: 'Tháng hai',
        m3: 'Bước đều',
        m4: 'Tháng tư',
        m5: 'Có thể',
        m6: 'Tháng sáu',
        m7: 'Tháng bảy',
        m8: 'Tháng tám',
        m9: 'Tháng 9',
        m10: 'Tháng Mười',
        m11: 'Tháng mười một',
        m12: 'Tháng 12',
        quarterLabel: '{0} năm',
        monthLabel: '{0} năm',
        dayLabel: '{0} năm {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW of year yyyy',
          month: 'yyyy-MM',
          quarter: 'quarter q of year yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Mặt trời',
          w1: 'Mon',
          w2: 'TUE',
          w3: 'Thứ tư',
          w4: 'Thu',
          w5: 'Thứ Sáu',
          w6: 'Đã ngồi'
        },
        months: {
          m0: 'Tháng Một',
          m1: 'Tháng hai',
          m2: 'Bước đều',
          m3: 'Tháng tư',
          m4: 'Có thể',
          m5: 'Tháng sáu',
          m6: 'Tháng bảy',
          m7: 'Tháng tám',
          m8: 'Tháng 9',
          m9: 'Tháng Mười',
          m10: 'Tháng mười một',
          m11: 'Tháng 12'
        },
        quarters: {
          q1: 'Quý đầu tiên',
          q2: 'Quý thứ hai',
          q3: 'Quý thứ ba',
          q4: 'Quý thứ tư'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Xem trước',
      operBtn: {
        zoomOut: 'Thu nhỏ',
        zoomIn: 'phóng to',
        pctFull: 'Mở rộng quy mô như nhau',
        pct11: 'Hiển thị kích thước ban đầu',
        rotateLeft: 'Xoay sang trái',
        rotateRight: 'Xoay sang phải',
        print: 'Bấm để in hình ảnh',
        download: 'Bấm để tải xuống hình ảnh'
      }
    },
    upload: {
      fileBtnText: 'Nhấp hoặc kéo để tải lên',
      imgBtnText: 'Nhấp hoặc kéo để tải lên',
      dragPlaceholder: 'Vui lòng kéo và thả tệp vào khu vực này để tải lên',
      imgSizeHint: 'Tờ rơi {0}',
      imgCountHint: 'Hình ảnh tối đa {0}',
      fileTypeHint: 'Hỗ trợ các loại tệp {0}',
      fileSizeHint: 'Một kích thước tệp không vượt quá {0}',
      fileCountHint: 'Có thể tải lên các tệp {0}',
      uploadTypeErr: 'Loại tệp không phù hợp!',
      overCountErr: 'Chỉ các tệp {0} có thể được chọn nhiều nhất!',
      overCountExtraErr: 'Số lượng tối đa của {0} đã bị vượt quá và các tệp dư thừa {1} sẽ bị bỏ qua!',
      overSizeErr: 'Kích thước tệp tối đa không thể vượt quá {0}!',
      manualUpload: '点击上传',
      reUpload: 'Tải lại lại',
      uploadProgress: 'Tải lên {0}%',
      uploadErr: 'Tải lên không thành công',
      uploadSuccess: 'Tải lên thành công',
      moreBtnText: 'Thêm ({0})',
      viewItemTitle: 'Bấm để xem',
      morePopup: {
        readTitle: 'Xem danh sách',
        imageTitle: 'Tải lên hình ảnh',
        fileTitle: 'Tải lên tệp'
      }
    },
    empty: {
      defText: 'Chưa có dữ liệu'
    },
    colorPicker: {
      clear: 'Thông thoáng',
      confirm: 'xác nhận',
      copySuccess: 'Được sao chép vào bảng tạm: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Tên hình thức',
      defFormTitle: 'Hình thức không tên',
      widgetPropTab: 'Thuộc tính kiểm soát',
      widgetFormTab: 'Hình thức thuộc tính',
      error: {
        wdFormUni: 'Loại điều khiển này chỉ được phép thêm một trong biểu mẫu',
        wdSubUni: 'Kiểu điều khiển này chỉ được phép thêm một trong Subtable'
      },
      styleSetting: {
        btn: 'Cài đặt kiểu',
        title: 'Hình thức cài đặt kiểu',
        layoutTitle: 'Bố cục kiểm soát',
        verticalLayout: 'Bố cục trên và dưới cùng',
        horizontalLayout: 'Bố cục ngang',
        styleTitle: 'Phong cách tiêu đề',
        boldTitle: 'Tiêu đề đậm',
        fontBold: 'In đậm',
        fontNormal: 'thông thường',
        colonTitle: 'Hiển thị Đại tá',
        colonVisible: 'trình diễn',
        colonHidden: 'trốn',
        alignTitle: 'Liên kết',
        widthTitle: 'Chiều rộng tiêu đề',
        alignLeft: 'Bên trái',
        alignRight: 'Bên phải',
        unitPx: 'Pixel',
        unitPct: 'Tỷ lệ phần trăm'
      },
      widget: {
        group: {
          base: 'Điều khiển cơ bản',
          layout: 'Điều khiển bố cục',
          system: 'Điều khiển hệ thống',
          module: 'Điều khiển mô -đun',
          chart: 'Kiểm soát biểu đồ',
          advanced: 'Kiểm soát nâng cao'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Hộp đầu vào',
          textarea: 'Trường văn bản',
          select: 'Kéo xuống để chọn',
          row: 'Một hàng và nhiều cột',
          title: 'tiêu đề',
          text: 'chữ',
          subtable: 'Bảng phụ',
          VxeSwitch: 'liệu',
          VxeInput: 'Hộp đầu vào',
          VxeNumberInput: 'con số',
          VxeDatePicker: 'ngày',
          VxeTextarea: 'Trường văn bản',
          VxeSelect: 'Kéo xuống để chọn',
          VxeTreeSelect: 'Lựa chọn cây',
          VxeRadioGroup: 'Nút radio',
          VxeCheckboxGroup: 'Hộp kiểm',
          VxeUploadFile: 'tài liệu',
          VxeUploadImage: 'hình ảnh',
          VxeRate: 'điểm',
          VxeSlider: 'trượt'
        }
      },
      widgetProp: {
        name: 'Tên kiểm soát',
        placeholder: 'Nhắc nhở',
        required: 'Xác minh bắt buộc',
        multiple: 'Nhiều lựa chọn được cho phép',
        displaySetting: {
          name: 'Cài đặt hiển thị',
          pc: 'PC',
          mobile: 'Di động',
          visible: 'trình diễn',
          hidden: 'trốn'
        },
        dataSource: {
          name: 'Nguồn dữ liệu',
          defValue: 'Tùy chọn {0}',
          addOption: 'Thêm tùy chọn',
          batchEditOption: 'Chỉnh sửa hàng loạt',
          batchEditTip: 'Mỗi hàng tương ứng với một tùy chọn, hỗ trợ sao chép trực tiếp và dán từ các bảng, Excel và WPS.',
          batchEditSubTip: 'Mỗi hàng tương ứng với một tùy chọn. Nếu đó là một nhóm, các mục con có thể bắt đầu bằng một khoảng trống hoặc khóa tab và nó hỗ trợ sao chép trực tiếp và dán từ các bảng, excel và wps.',
          buildOption: 'Tùy chọn xây dựng'
        },
        rowProp: {
          colSize: 'Số lượng cột',
          col2: 'Hai cột',
          col3: 'Ba cột',
          col4: 'Bốn cột',
          col6: 'Sáu cột',
          layout: 'cách trình bày'
        },
        textProp: {
          name: 'nội dung',
          alignTitle: 'Liên kết',
          alignLeft: 'Bên trái',
          alignCenter: 'Trung tâm',
          alignRight: 'Bên phải',
          colorTitle: 'Màu phông chữ',
          sizeTitle: 'Kích thước phông chữ',
          boldTitle: 'Phông chữ đậm',
          fontNormal: 'thông thường',
          fontBold: 'In đậm'
        },
        subtableProp: {
          seqTitle: 'Số seri',
          showSeq: 'Hiển thị số sê -ri',
          showCheckbox: 'Nhiều lựa chọn được cho phép',
          errSubDrag: 'Subtable không hỗ trợ điều khiển này, vui lòng sử dụng các điều khiển khác',
          colPlace: 'Kéo điều khiển vào'
        },
        uploadProp: {
          limitFileCount: 'Giới hạn số lượng tập tin',
          limitFileSize: 'Giới hạn kích thước tệp',
          multiFile: 'Cho phép nhiều tệp được tải lên',
          limitImgCount: 'Giới hạn số lượng hình ảnh',
          limitImgSize: 'Giới hạn kích thước hình ảnh',
          multiImg: 'Cho phép tải nhiều hình ảnh lên'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Cài đặt trường',
      listSettingTab: 'Cài đặt tham số',
      searchTitle: 'Tiêu chí truy vấn',
      listTitle: 'Lĩnh vực danh sách',
      searchField: 'Trường truy vấn',
      listField: 'Lĩnh vực danh sách',
      activeBtn: {
        ActionButtonUpdate: 'biên tập',
        ActionButtonDelete: 'xóa bỏ'
      },
      search: {
        addBtn: 'biên tập',
        emptyText: 'Điều kiện truy vấn không được cấu hình',
        editPopupTitle: 'Chỉnh sửa trường truy vấn'
      },
      searchPopup: {
        colTitle: 'tiêu đề',
        saveBtn: 'cứu'
      }
    },
    text: {
      copySuccess: 'Được sao chép vào bảng tạm',
      copyError: 'Môi trường hiện tại không hỗ trợ hoạt động này'
    },
    countdown: {
      formats: {
        yyyy: 'Năm',
        MM: 'mặt trăng',
        dd: 'bầu trời',
        HH: 'giờ',
        mm: 'điểm',
        ss: 'Thứ hai'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Hoạt động này không thể được thực hiện trên các ô hợp nhất',
          multiErr: 'Hoạt động này không thể được thực hiện trên nhiều khu vực lựa chọn',
          selectErr: 'Không thể hoạt động trên các ô trong phạm vi được chỉ định',
          extendErr: 'Nếu phạm vi mở rộng chứa các ô được hợp nhất, tất cả các ô được hợp nhất phải có cùng kích thước',
          pasteMultiErr: 'Không thể dán, các khu vực được sao chép và dán cần phải có cùng kích thước để thực hiện thao tác này',
          cpInvalidErr: 'Các hoạt động không thể được thực hiện. Có các cột bị cấm ({0}) trong phạm vi bạn đã chọn.'
        },
        fnr: {
          title: 'Tìm và thay thế',
          findLabel: 'Tìm thấy',
          replaceLabel: 'thay thế',
          findTitle: 'Tìm những gì:',
          replaceTitle: 'Thay thế bằng:',
          tabs: {
            find: 'Tìm thấy',
            replace: 'thay thế'
          },
          filter: {
            re: 'Biểu cảm thường xuyên',
            whole: 'Kết hợp từ đầy đủ',
            sensitive: 'trường hợp nhạy cảm'
          },
          btns: {
            findNext: 'Tìm tiếp theo',
            findAll: 'Tìm tất cả',
            replace: 'thay thế',
            replaceAll: 'Thay thế tất cả',
            cancel: 'Hủy bỏ'
          },
          header: {
            seq: '#',
            cell: 'Tế bào',
            value: 'giá trị'
          },
          body: {
            row: 'Hàng: {0}',
            col: 'Cột: {0}'
          },
          empty: '(Giá trị null)',
          reError: 'Biểu thức chính quy không hợp lệ',
          recordCount: '{0} Các ô được tìm thấy',
          notCell: 'Không thể tìm thấy ô phù hợp',
          replaceSuccess: 'Đã thay thế thành công {0} ô'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: '分组',
          values: '值',
          groupPlaceholder: '拖至此处进行分组',
          valuesPlaceholder: '拖至此处进行聚合',
          dragExistCol: '该列已存在',
          sortHelpTip: '点击并拖动图标可以调整顺序'
        },
        aggFuncs: {
          sum: '求和',
          count: '计数',
          avg: '平均值',
          min: '最小值',
          max: '最大值',
          first: '首个值',
          last: '末尾值'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Đóng băng cột',
          fixedGroup: 'Đóng băng nhóm',
          cancelFixed: 'Giải phóng',
          fixedLeft: 'Đóng băng trái',
          fixedRight: 'Đóng băng đúng'
        },
        cases: {
          equal: 'bình đẳng',
          gt: 'Lớn hơn',
          lt: 'Ít hơn',
          begin: 'Sự khởi đầu là',
          endin: 'Kết thúc là',
          include: 'Bao gồm',
          isSensitive: 'trường hợp nhạy cảm'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Loại',
          clearSort: 'Xóa loại',
          sortAsc: 'Thứ tự tăng dần',
          sortDesc: 'thứ tự giảm dần',
          fixedColumn: 'Đóng băng cột',
          fixedGroup: 'Đóng băng nhóm',
          cancelFixed: 'Giải phóng',
          fixedLeft: 'Đóng băng trái',
          fixedRight: 'Đóng băng đúng',
          clearFilter: 'Xóa bộ lọc',
          textOption: 'Bộ lọc văn bản',
          numberOption: 'Bộ lọc số'
        },
        popup: {
          title: 'Phương pháp lọc tùy chỉnh',
          currColumnTitle: 'Cột hiện tại:',
          and: 'Và',
          or: 'hoặc',
          describeHtml: 'Có sẵn? Biểu thị một ký tự duy nhất <br/> sử dụng * đại diện cho bất kỳ nhiều ký tự nào'
        },
        cases: {
          equal: 'bình đẳng',
          unequal: 'Không bằng',
          gt: 'Lớn hơn',
          ge: 'Lớn hơn hoặc bằng',
          lt: 'Ít hơn',
          le: 'Nhỏ hơn hoặc bằng',
          begin: 'Sự khởi đầu là',
          notbegin: 'Nó không ở đầu',
          endin: 'Kết thúc là',
          notendin: 'Kết thúc không',
          include: 'Bao gồm',
          exclude: 'Không bao gồm',
          between: 'Giữa',
          custom: 'Bộ lọc tùy chỉnh',
          insensitive: 'Trường hợp không nhạy cảm',
          isSensitive: 'trường hợp nhạy cảm'
        },
        empty: '(trống)',
        notData: 'Không phù hợp'
      }
    },
    pro: {
      area: {
        mergeErr: 'Hoạt động này không thể được thực hiện trên các ô hợp nhất',
        multiErr: 'Hoạt động này không thể được thực hiện trên nhiều khu vực lựa chọn',
        extendErr: 'Nếu phạm vi mở rộng chứa các ô được hợp nhất, tất cả các ô được hợp nhất phải có cùng kích thước',
        pasteMultiErr: 'Không thể dán, các khu vực được sao chép và dán cần phải có cùng kích thước để thực hiện thao tác này'
      },
      fnr: {
        title: 'Tìm và thay thế',
        findLabel: 'Tìm thấy',
        replaceLabel: 'thay thế',
        findTitle: 'Tìm nội dung:',
        replaceTitle: 'Thay thế bằng:',
        tabs: {
          find: 'Tìm thấy',
          replace: 'thay thế'
        },
        filter: {
          re: 'Biểu cảm thường xuyên',
          whole: 'Kết hợp từ đầy đủ',
          sensitive: 'trường hợp nhạy cảm'
        },
        btns: {
          findNext: 'Tìm tiếp theo',
          findAll: 'Tìm tất cả',
          replace: 'thay thế',
          replaceAll: 'Thay thế tất cả',
          cancel: 'Hủy bỏ'
        },
        header: {
          seq: '#',
          cell: 'Tế bào',
          value: 'giá trị'
        },
        empty: '(Giá trị null)',
        reError: 'Biểu thức chính quy không hợp lệ',
        recordCount: '{0} Các ô được tìm thấy',
        notCell: 'Không tìm thấy ô phù hợp',
        replaceSuccess: 'Đã thay thế thành công {0} ô'
      }
    },
    renderer: {
      search: 'tìm kiếm',
      cases: {
        equal: 'bình đẳng',
        unequal: 'Không bằng',
        gt: 'Lớn hơn',
        ge: 'Lớn hơn hoặc bằng',
        lt: 'Ít hơn',
        le: 'Nhỏ hơn hoặc bằng',
        begin: 'Sự khởi đầu là',
        notbegin: 'Nó không ở đầu',
        endin: 'Kết thúc là',
        notendin: 'Kết thúc không',
        include: 'Bao gồm',
        exclude: 'Không bao gồm',
        between: 'Giữa',
        custom: 'Bộ lọc tùy chỉnh',
        insensitive: 'Trường hợp không nhạy cảm',
        isSensitive: 'trường hợp nhạy cảm'
      },
      combination: {
        menus: {
          sort: 'Loại',
          clearSort: 'Xóa loại',
          sortAsc: 'Thứ tự tăng dần',
          sortDesc: 'thứ tự giảm dần',
          fixedColumn: 'Đóng băng cột',
          fixedGroup: 'Đóng băng nhóm',
          cancelFixed: 'Giải phóng',
          fixedLeft: 'Đóng băng trái',
          fixedRight: 'Đóng băng đúng',
          clearFilter: 'Xóa bộ lọc',
          textOption: 'Lọc văn bản',
          numberOption: 'Lọc số'
        },
        popup: {
          title: 'Phương pháp lọc tùy chỉnh',
          currColumnTitle: 'Cột hiện tại:',
          and: 'Và',
          or: 'hoặc',
          describeHtml: 'Có sẵn? Biểu thị một ký tự duy nhất <br/> sử dụng * đại diện cho bất kỳ nhiều ký tự nào'
        },
        empty: '(trống)',
        notData: 'Không phù hợp'
      }
    }
  }
}
