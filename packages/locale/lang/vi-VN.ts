export default {
  vxe: {
    base: {
      pleaseInput: 'Vui lòng nhập',
      pleaseSelect: 'Vui lòng chọn',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Đang tải...'
    },
    error: {
      downErr: 'Tải xuống thất bại',
      errLargeData: 'Khi lượng dữ liệu liên kết quá lớn, vui lòng sử dụng {0}, nếu không có thể bị lag',
      groupFixed: 'Nếu dùng tiêu đề nhóm, cột cố định phải được thiết lập theo nhóm',
      groupMouseRange: 'Tiêu đề nhóm không thể dùng cùng với "{0}", có thể gây lỗi',
      groupTag: 'Cột tiêu đề nhóm nên dùng "{0}" thay vì "{1}", có thể gây lỗi',
      scrollErrProp: 'Sau khi bật cuộn ảo, không hỗ trợ tham số "{0}"',
      errConflicts: 'Tham số "{0}" xung đột với "{1}"',
      modelConflicts: 'Giá trị trường liên kết "{0}" xung đột với "{1}", sẽ xảy ra lỗi',
      notSupportProp: 'Khi bật tham số "{0}", không hỗ trợ "{1}", nên là "{2}", nếu không sẽ xảy ra lỗi',
      reqSupportProp: 'Khi dùng "{0}", nên thiết lập "{1}", nếu không có thể xảy ra lỗi',
      notConflictProp: 'Khi dùng "{0}", nên thiết lập "{1}", nếu không có thể xung đột chức năng',
      unableInsert: 'Không thể chèn vào vị trí chỉ định, vui lòng kiểm tra tham số',
      useErr: 'Đã xảy ra lỗi khi cài đặt module "{0}", thứ tự có thể không đúng, các module phụ thuộc cần được cài trước Table',
      barUnableLink: 'Thanh công cụ không thể liên kết với bảng',
      expandContent: 'Slot của dòng mở rộng phải là "content", vui lòng kiểm tra',
      reqComp: 'Thiếu component "{0}", vui lòng kiểm tra cài đặt. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Thiếu module "{0}"',
      reqProp: 'Thiếu tham số bắt buộc "{0}", có thể gây lỗi',
      emptyProp: 'Tham số "{0}" không được để trống',
      errProp: 'Tham số không được hỗ trợ "{0}", có thể là "{1}"',
      colRepet: 'column.{0}="{1}" bị lặp, có thể khiến một số chức năng không dùng được',
      notFunc: 'Phương thức "{0}" không tồn tại',
      errFunc: 'Tham số "{0}" không phải là phương thức',
      notValidators: 'Validator toàn cục "{0}" không tồn tại',
      notFormats: 'Formatter toàn cục "{0}" không tồn tại',
      notCommands: 'Lệnh toàn cục "{0}" không tồn tại',
      notSlot: 'Slot "{0}" không tồn tại',
      noTree: 'Cấu trúc cây không hỗ trợ "{0}"',
      noGroup: 'Sau khi nhóm dữ liệu, không hỗ trợ "{0}"',
      notProp: 'Tham số không được hỗ trợ "{0}"',
      returnErr: 'Giá trị trả về của tham số "{0}" được mong đợi là "{1}" nhưng thực tế là "{2}"',
      notSupportReturn: 'Khi giá trị trả về là "{0}", tham số nên dùng "{1}" thay vì "{2}"',
      checkProp: 'Khi lượng dữ liệu quá lớn, checkbox có thể bị lag; nên đặt tham số "{0}" để tăng tốc render',
      coverProp: 'Tham số "{1}" của "{0}" được định nghĩa trùng, có thể gây lỗi',
      uniField: 'Tên trường "{0}" được định nghĩa trùng, có thể gây lỗi',
      repeatKey: 'Khóa chính bị lặp {0}="{1}", có thể gây lỗi',
      repeatProp: 'Tham số bị lặp {0}="{1}", có thể gây lỗi',
      delFunc: 'Phương thức "{0}" đã lỗi thời, vui lòng dùng "{1}"',
      delProp: 'Tham số "{0}" đã lỗi thời, vui lòng dùng "{1}"',
      delEvent: 'Sự kiện "{0}" đã lỗi thời, vui lòng dùng "{1}"',
      removeProp: 'Tham số "{0}" đã lỗi thời, không khuyến nghị dùng, có thể gây lỗi',
      errFormat: 'Nội dung định dạng toàn cục nên được định nghĩa bằng "VXETable.formats"; cách mount "formatter={0}" không còn được khuyến nghị',
      notType: 'Loại tệp không được hỗ trợ "{0}"',
      notExp: 'Trình duyệt này không hỗ trợ nhập/xuất',
      impFields: 'Nhập thất bại, vui lòng kiểm tra tên trường và định dạng dữ liệu',
      treeNotImp: 'Bảng cây không hỗ trợ nhập',
      treeCrossDrag: 'Chỉ có thể kéo cấp đầu tiên',
      treeDragChild: 'Không thể kéo cấp cha vào cấp con của chính nó',
      reqPlugin: 'Plugin mở rộng chưa được cài đặt "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Vượt quá lượng dữ liệu tối đa được hỗ trợ {0} dòng, có thể gây lỗi',
      useNew: 'Không khuyến nghị dùng {0}, vui lòng dùng {1}',
      errorVersion: 'Phiên bản không khớp, phiên bản hiện tại {0}, phiên bản tối thiểu được hỗ trợ là {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Không có dữ liệu',
      allTitle: 'Chọn tất cả/Bỏ chọn',
      seqTitle: 'STT',
      actionTitle: 'Thao tác',
      confirmFilter: 'Lọc',
      resetFilter: 'Đặt lại',
      allFilter: 'Tất cả',
      sortAsc: 'Tăng dần: thấp đến cao',
      sortDesc: 'Giảm dần: cao đến thấp',
      filter: 'Bật lọc cho cột đã chọn',
      impSuccess: 'Đã nhập thành công {0} bản ghi',
      expLoading: 'Đang xuất',
      expSuccess: 'Xuất thành công',
      expError: 'Xuất thất bại',
      expFilename: 'Xuất_{0}',
      expOriginFilename: 'Xuất_Nguồn_{0}',
      customTitle: 'Thiết lập tùy chỉnh',
      customAll: 'Tất cả',
      customConfirm: 'Xác nhận',
      customClose: 'Đóng',
      customCancel: 'Hủy',
      customRestore: 'Khôi phục mặc định',
      maxFixedCol: 'Số cột cố định tối đa không được vượt quá {0}',
      maxGroupCol: 'Số trường nhóm tối đa không được vượt quá {0}',
      dragTip: 'Di chuyển: {0}',
      resizeColTip: 'Rộng: {0} pixel',
      resizeRowTip: 'Cao: {0} pixel',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Đang tải...'
    },
    grid: {
      selectOneRecord: 'Vui lòng chọn ít nhất một bản ghi!',
      deleteSelectRecord: 'Bạn có chắc muốn xóa các bản ghi đã chọn không?',
      removeSelectRecord: 'Bạn có chắc muốn gỡ các bản ghi đã chọn không?',
      dataUnchanged: 'Dữ liệu chưa thay đổi!',
      delSuccess: 'Đã xóa các bản ghi đã chọn!',
      saveSuccess: 'Lưu thành công!',
      operError: 'Đã xảy ra lỗi, thao tác thất bại!'
    },
    select: {
      clear: 'Xóa',
      allChecked: 'Chọn tất cả',
      total: 'Đã chọn {0} mục',
      close: 'Đóng',
      search: 'Tìm kiếm',
      loadingText: 'Đang tải...',
      emptyText: 'Không có dữ liệu',
      maxSize: 'Số lượng có thể chọn tối đa không được vượt quá {0}',
      overSizeErr: 'Đã vượt quá số lượng có thể chọn tối đa {0}, phần vượt quá sẽ bị bỏ qua!',
      searchEmpty: 'Không tìm thấy dữ liệu phù hợp!'
    },
    list: {
      allChecked: 'Chọn tất cả',
      dragTip: 'Di chuyển: {0}'
    },
    tree: {
      searchEmpty: 'Không tìm thấy dữ liệu phù hợp!',
      dragTip: 'Di chuyển: {0}'
    },
    treeSelect: {
      clearChecked: 'Xóa',
      allChecked: 'Chọn tất cả',
      allExpand: 'Mở rộng tất cả',
      clearExpand: 'Thu gọn tất cả',
      total: 'Đã chọn {0} mục',
      filterCount: 'Tìm thấy {0} bản ghi',
      close: 'Đóng',
      search: 'Tìm kiếm',
      emptyText: 'Không có dữ liệu'
    },
    tableSelect: {
      filterCount: 'Tìm thấy {0} bản ghi'
    },
    pager: {
      goto: 'Đến',
      gotoTitle: 'Trang',
      pagesize: '{0}/trang',
      total: 'Tổng {0} bản ghi',
      pageClassifier: 'Trang',
      homePage: 'Trang đầu',
      homePageTitle: 'Trang đầu',
      prevPage: 'Trang trước',
      prevPageTitle: 'Trang trước',
      nextPage: 'Trang sau',
      nextPageTitle: 'Trang sau',
      prevJump: 'Nhảy lên',
      prevJumpTitle: 'Nhảy lên',
      nextJump: 'Nhảy xuống',
      nextJumpTitle: 'Nhảy xuống',
      endPage: 'Trang cuối',
      endPageTitle: 'Trang cuối'
    },
    alert: {
      title: 'Thông báo hệ thống'
    },
    button: {
      confirm: 'Xác nhận',
      cancel: 'Hủy',
      clear: 'Xóa'
    },
    filter: {
      search: 'Tìm kiếm'
    },
    custom: {
      cstmTitle: 'Thiết lập tùy chỉnh',
      cstmRestore: 'Khôi phục mặc định',
      cstmCancel: 'Hủy',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Vui lòng xác nhận có khôi phục cấu hình cột mặc định không?',
      cstmDragTarget: 'Di chuyển: {0}',
      setting: {
        colSort: 'Sắp xếp',
        sortHelpTip: 'Nhấn vào biểu tượng để bắt đầu kéo',
        colTitle: 'Tiêu đề cột',
        colResizable: 'Độ rộng cột (pixel)',
        colVisible: 'Hiển thị',
        colFixed: 'Cột cố định',
        colFixedMax: 'Cột cố định ({0})',
        colAlign: 'Căn chỉnh',
        colHeadAlign: 'Căn chỉnh tiêu đề',
        colFootAlign: 'Căn chỉnh chân',
        fixedLeft: 'Trái',
        fixedUnset: 'Không',
        fixedRight: 'Phải',
        alignLeft: 'Trái',
        alignCenter: 'Giữa',
        alignRight: 'Phải',
        moveUp: 'Di chuyển lên',
        moveDn: 'Di chuyển xuống',
        putTop: 'Đưa lên đầu',
        putBottom: 'Đưa xuống cuối',
        moveUpTitle: 'Nhấn để di chuyển lên',
        moveDnTitle: 'Nhấn để di chuyển xuống',
        putTopTitle: 'Nhấn để đưa lên đầu',
        putBottomTitle: 'Nhấn để đưa xuống cuối',
        anLeftTitle: 'Căn trái',
        anCenterTitle: 'Căn giữa',
        anRightTitle: 'Căn phải'
      }
    },
    import: {
      modes: {
        covering: 'Ghi đè (ghi đè trực tiếp dữ liệu bảng)',
        insert: 'Thêm vào cuối (thêm dữ liệu mới vào cuối bảng)',
        insertTop: 'Thêm vào đầu (thêm dữ liệu mới vào đầu bảng)',
        insertBottom: 'Thêm vào cuối (thêm dữ liệu mới vào cuối bảng)'
      },
      impTitle: 'Nhập dữ liệu',
      impFile: 'Tên tệp',
      impSelect: 'Chọn tệp',
      impType: 'Loại tệp',
      impOpts: 'Thiết lập tham số',
      impMode: 'Chế độ nhập',
      impConfirm: 'Nhập',
      impCancel: 'Hủy'
    },
    export: {
      types: {
        csv: 'CSV (phân tách bằng dấu phẩy)(*.csv)',
        html: 'Trang web(*.html)',
        xml: 'Dữ liệu XML(*.xml)',
        txt: 'Tệp văn bản (phân tách bằng tab)(*.txt)',
        xls: 'Sổ làm việc Excel 97-2003(*.xls)',
        xlsx: 'Sổ làm việc Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Dữ liệu trống',
        current: 'Dữ liệu hiện tại (dữ liệu trang hiện tại)',
        selected: 'Dữ liệu đã chọn (dữ liệu được chọn trên trang hiện tại)',
        all: 'Toàn bộ dữ liệu (bao gồm dữ liệu của tất cả các trang)'
      },
      printTitle: 'In dữ liệu',
      expTitle: 'Xuất dữ liệu',
      expName: 'Tên tệp',
      expNamePlaceholder: 'Vui lòng nhập tên tệp',
      expSheetName: 'Tiêu đề',
      expSheetNamePlaceholder: 'Vui lòng nhập tiêu đề',
      expType: 'Loại lưu',
      expMode: 'Chọn dữ liệu',
      expCurrentColumn: 'Tất cả trường',
      expColumn: 'Chọn trường',
      widthMode: 'Thiết lập độ rộng cột',
      wModeTitle: 'Thiết lập cách render độ rộng cột khi in',
      wdModes: {
        default: 'Mặc định',
        auto: 'Tự động (tự điều chỉnh theo nội dung)',
        scale: 'Tỷ lệ (render theo tỷ lệ trang)'
      },
      expOpts: 'Thiết lập tham số',
      expOptHeader: 'Tiêu đề',
      expHeaderTitle: 'Có cần tiêu đề không',
      expOptFooter: 'Chân',
      expFooterTitle: 'Có cần chân không',
      expOptColgroup: 'Tiêu đề nhóm',
      expOptTitle: 'Tiêu đề cột',
      expTitleTitle: 'Có dùng tiêu đề cột không, nếu không sẽ hiển thị tên trường của cột',
      expColgroupTitle: 'Nếu có, hỗ trợ tiêu đề có cấu trúc nhóm',
      expOptMerge: 'Gộp ô',
      expMergeTitle: 'Nếu có, hỗ trợ ô có cấu trúc gộp',
      expOptAllExpand: 'Mở rộng cây',
      expAllExpandTitle: 'Nếu có, hỗ trợ mở rộng toàn bộ dữ liệu có cấu trúc phân cấp',
      expOptTreeAllExpand: 'Mở rộng cây',
      expTreeAllExpandTitle: 'Nếu có, tự động mở rộng tất cả các cấp cây',
      expOptRowGroupAllExpand: 'Mở rộng nhóm',
      expRowGroupAllExpandTitle: 'Nếu có, tự động mở rộng tất cả các cấp nhóm',
      expOptUseStyle: 'Kiểu',
      expUseStyleTitle: 'Nếu có, hỗ trợ ô có kiểu',
      expOptOriginal: 'Dữ liệu nguồn',
      expOriginalTitle: 'Nếu là dữ liệu nguồn, hỗ trợ nhập vào bảng',
      expPrint: 'In',
      expConfirm: 'Xuất',
      expCancel: 'Hủy'
    },
    modal: {
      errTitle: 'Lỗi',
      zoomMin: 'Thu nhỏ',
      zoomIn: 'Phóng to',
      zoomOut: 'Khôi phục',
      close: 'Đóng',
      miniMaxSize: 'Số cửa sổ thu nhỏ không được vượt quá {0}',
      footPropErr: 'show-footer chỉ dùng để bật chân, cần dùng với show-confirm-button | show-cancel-button | slot'
    },
    drawer: {
      close: 'Đóng'
    },
    form: {
      folding: 'Thu gọn',
      unfolding: 'Mở rộng'
    },
    toolbar: {
      import: 'Nhập',
      export: 'Xuất',
      print: 'In',
      refresh: 'Làm mới',
      zoomIn: 'Toàn màn hình',
      zoomOut: 'Khôi phục',
      custom: 'Thiết lập tùy chỉnh',
      customAll: 'Tất cả',
      customConfirm: 'Xác nhận',
      customRestore: 'Đặt lại',
      fixedLeft: 'Cố định bên trái',
      fixedRight: 'Cố định bên phải',
      cancelFixed: 'Bỏ cố định cột'
    },
    iconPicker: {
      search: 'Tìm kiếm',
      emptyText: 'Không có dữ liệu'
    },
    datePicker: {
      yearTitle: 'Năm {0}'
    },
    dateRangePicker: {
      pleaseRange: 'Vui lòng chọn ngày bắt đầu và ngày kết thúc'
    },
    input: {
      date: {
        m1: 'Th1',
        m2: 'Th2',
        m3: 'Th3',
        m4: 'Th4',
        m5: 'Th5',
        m6: 'Th6',
        m7: 'Th7',
        m8: 'Th8',
        m9: 'Th9',
        m10: 'Th10',
        m11: 'Th11',
        m12: 'Th12',
        quarterLabel: 'Năm {0}',
        monthLabel: 'Năm {0}',
        dayLabel: 'Năm {0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Tuần WW năm yyyy',
          month: 'yyyy-MM',
          quarter: 'Quý q năm yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Chủ nhật',
          w1: 'Thứ hai',
          w2: 'Thứ ba',
          w3: 'Thứ tư',
          w4: 'Thứ năm',
          w5: 'Thứ sáu',
          w6: 'Thứ bảy'
        },
        months: {
          m0: 'Tháng Một',
          m1: 'Tháng Hai',
          m2: 'Tháng Ba',
          m3: 'Tháng Tư',
          m4: 'Tháng Năm',
          m5: 'Tháng Sáu',
          m6: 'Tháng Bảy',
          m7: 'Tháng Tám',
          m8: 'Tháng Chín',
          m9: 'Tháng Mười',
          m10: 'Tháng Mười một',
          m11: 'Tháng Mười hai'
        },
        quarters: {
          q1: 'Quý 1',
          q2: 'Quý 2',
          q3: 'Quý 3',
          q4: 'Quý 4'
        }
      }
    },
    calendar: {
      yearLabel: 'Năm {0}',
      monthLabel: 'Tháng {0}'
    },
    cascader: {
      clearChecked: 'Xóa',
      allChecked: 'Chọn tất cả',
      total: 'Đã chọn {0} mục',
      close: 'Đóng',
      search: 'Tìm kiếm'
    },
    numberInput: {
      currencySymbol: '₫'
    },
    imagePreview: {
      popupTitle: 'Xem trước',
      operBtn: {
        zoomOut: 'Thu nhỏ',
        zoomIn: 'Phóng to',
        pctFull: 'Vừa trang',
        pct11: 'Hiển thị kích thước gốc',
        rotateLeft: 'Xoay trái',
        rotateRight: 'Xoay phải',
        print: 'Nhấn để in ảnh',
        download: 'Nhấn để tải ảnh xuống'
      }
    },
    upload: {
      fileBtnText: 'Nhấn hoặc kéo thả để tải lên',
      imgBtnText: 'Nhấn hoặc kéo thả để tải lên',
      dragPlaceholder: 'Kéo tệp vào khu vực này để tải lên',
      imgSizeHint: 'Một ảnh {0}',
      imgCountHint: 'Tối đa {0} ảnh',
      fileTypeHint: 'Hỗ trợ loại tệp {0}',
      fileSizeHint: 'Kích thước một tệp không vượt quá {0}',
      fileCountHint: 'Tối đa có thể tải lên {0} tệp',
      uploadTypeErr: 'Loại tệp không khớp!',
      overCountErr: 'Chỉ có thể chọn tối đa {0} tệp!',
      overCountExtraErr: 'Đã vượt quá số lượng tối đa {0}, {1} tệp vượt quá sẽ bị bỏ qua!',
      overSizeErr: 'Kích thước tệp tối đa không được vượt quá {0}!',
      manualUpload: 'Nhấn để tải lên',
      reUpload: 'Tải lên lại',
      uploadProgress: 'Đang tải lên {0}%',
      uploadErr: 'Tải lên thất bại',
      uploadSuccess: 'Tải lên thành công',
      moreBtnText: 'Thêm ({0})',
      moreImgBtnText: 'Ảnh ({0})',
      moreFileBtnText: 'Tệp ({0})',
      viewItemTitle: 'Nhấn để xem',
      morePopup: {
        readTitle: 'Xem danh sách',
        imageTitle: 'Tải ảnh lên',
        fileTitle: 'Tải tệp lên'
      }
    },
    empty: {
      defText: 'Không có dữ liệu'
    },
    colorPicker: {
      clear: 'Xóa',
      confirm: 'Xác nhận',
      copySuccess: 'Đã sao chép vào clipboard: {0}',
      hex: 'Thập lục phân'
    },
    formDesign: {
      formName: 'Tên biểu mẫu',
      defFormTitle: 'Biểu mẫu chưa đặt tên',
      widgetPropTab: 'Thuộc tính tiện ích',
      widgetFormTab: 'Thuộc tính biểu mẫu',
      error: {
        wdFormUni: 'Loại tiện ích này chỉ được thêm một lần trong biểu mẫu',
        wdSubUni: 'Loại tiện ích này chỉ được thêm một lần trong bảng con'
      },
      styleSetting: {
        btn: 'Thiết lập kiểu',
        title: 'Thiết lập kiểu biểu mẫu',
        layoutTitle: 'Bố cục tiện ích',
        verticalLayout: 'Bố cục dọc',
        horizontalLayout: 'Bố cục ngang',
        styleTitle: 'Kiểu tiêu đề',
        boldTitle: 'Tiêu đề in đậm',
        fontBold: 'Đậm',
        fontNormal: 'Thường',
        colonTitle: 'Hiển thị dấu hai chấm',
        colonVisible: 'Hiển thị',
        colonHidden: 'Ẩn',
        alignTitle: 'Căn chỉnh',
        widthTitle: 'Độ rộng tiêu đề',
        alignLeft: 'Trái',
        alignRight: 'Phải',
        unitPx: 'pixel',
        unitPct: 'phần trăm'
      },
      widget: {
        group: {
          base: 'Tiện ích cơ bản',
          layout: 'Tiện ích bố cục',
          system: 'Tiện ích hệ thống',
          module: 'Tiện ích module',
          chart: 'Tiện ích biểu đồ',
          advanced: 'Tiện ích nâng cao'
        },
        copyTitle: 'Bản sao_{0}',
        component: {
          input: 'Ô nhập',
          textarea: 'Vùng văn bản',
          select: 'Chọn thả xuống',
          row: 'Một dòng nhiều cột',
          title: 'Tiêu đề',
          text: 'Văn bản',
          subtable: 'Bảng con',
          VxeSwitch: 'Có/Không',
          VxeInput: 'Ô nhập',
          VxeNumberInput: 'Số',
          VxeDatePicker: 'Ngày',
          VxeTextarea: 'Vùng văn bản',
          VxeSelect: 'Chọn thả xuống',
          VxeTreeSelect: 'Chọn cây',
          VxeRadioGroup: 'Nhóm radio',
          VxeCheckboxGroup: 'Nhóm checkbox',
          VxeUploadFile: 'Tệp',
          VxeUploadImage: 'Ảnh',
          VxeRate: 'Đánh giá',
          VxeSlider: 'Thanh trượt'
        },
        row: {
          placeholder: 'Vị trí tiện ích'
        }
      },
      widgetProp: {
        name: 'Tên tiện ích',
        placeholder: 'Gợi ý',
        required: 'Kiểm tra bắt buộc',
        multiple: 'Cho phép chọn nhiều',
        displaySetting: {
          name: 'Thiết lập hiển thị',
          pc: 'Máy tính',
          mobile: 'Điện thoại',
          visible: 'Hiển thị',
          hidden: 'Ẩn'
        },
        dataSource: {
          name: 'Nguồn dữ liệu',
          defValue: 'Tùy chọn {0}',
          addOption: 'Thêm tùy chọn',
          batchEditOption: 'Chỉnh sửa hàng loạt',
          batchEditTip: 'Mỗi dòng tương ứng một tùy chọn, hỗ trợ sao chép dán trực tiếp từ bảng, Excel, WPS.',
          batchEditSubTip: 'Mỗi dòng tương ứng một tùy chọn; nếu là nhóm, mục con có thể bắt đầu bằng khoảng trắng hoặc tab, hỗ trợ sao chép dán trực tiếp từ bảng, Excel, WPS.',
          buildOption: 'Tạo tùy chọn'
        },
        rowProp: {
          colSize: 'Số cột',
          col2: 'Hai cột',
          col3: 'Ba cột',
          col4: 'Bốn cột',
          col6: 'Sáu cột',
          layout: 'Bố cục'
        },
        textProp: {
          name: 'Nội dung',
          alignTitle: 'Căn chỉnh',
          alignLeft: 'Trái',
          alignCenter: 'Giữa',
          alignRight: 'Phải',
          colorTitle: 'Màu chữ',
          sizeTitle: 'Cỡ chữ',
          boldTitle: 'Chữ in đậm',
          fontNormal: 'Thường',
          fontBold: 'Đậm'
        },
        subtableProp: {
          seqTitle: 'STT',
          showSeq: 'Hiển thị số thứ tự',
          showCheckbox: 'Cho phép chọn nhiều',
          errSubDrag: 'Bảng con không hỗ trợ tiện ích này, vui lòng dùng tiện ích khác',
          colPlace: 'Kéo tiện ích vào đây'
        },
        uploadProp: {
          limitFileCount: 'Giới hạn số tệp',
          limitFileSize: 'Giới hạn kích thước tệp',
          multiFile: 'Cho phép tải nhiều tệp',
          limitImgCount: 'Giới hạn số ảnh',
          limitImgSize: 'Giới hạn kích thước ảnh',
          multiImg: 'Cho phép tải nhiều ảnh'
        },
        rules: {
          required: 'Trường bắt buộc'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Thiết lập trường',
      listSettingTab: 'Thiết lập tham số',
      searchTitle: 'Điều kiện tìm kiếm',
      listTitle: 'Trường danh sách',
      searchField: 'Trường tìm kiếm',
      listField: 'Trường danh sách',
      activeBtn: {
        ActionButtonUpdate: 'Sửa',
        ActionButtonDelete: 'Xóa'
      },
      search: {
        addBtn: 'Sửa',
        emptyText: 'Chưa cấu hình điều kiện tìm kiếm',
        editPopupTitle: 'Sửa trường tìm kiếm'
      },
      searchPopup: {
        colTitle: 'Tiêu đề',
        saveBtn: 'Lưu'
      }
    },
    text: {
      copySuccess: 'Đã sao chép vào clipboard',
      copyError: 'Môi trường hiện tại không hỗ trợ thao tác này'
    },
    countdown: {
      formats: {
        yyyy: 'năm',
        MM: 'tháng',
        dd: 'ngày',
        HH: 'giờ',
        mm: 'phút',
        ss: 'giây'
      }
    },
    contextMenu: {
      loadingText: 'Đang tải...'
    },
    switch: {
      onText: 'Bật',
      offText: 'Tắt'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'Quý {q} năm {yyyy}',
        month: 'Tháng {MM} năm {yyyy}',
        week: 'Tuần {W} năm {yyyy}',
        day: '{eLabel}, {dd}/{MM}/{yyyy}',
        date: '{dd}/{MM}/{yyyy}',
        hour: '{dd}/{MM}/{yyyy} {HH}:00',
        minute: '{dd}/{MM}/{yyyy} {HH}:{mm}',
        second: '{dd}/{MM}/{yyyy} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy}',
        quarter: 'Q{q}',
        month: 'Th{M}',
        week: 'T{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}',
        quarter: 'Q{start.q}~Q{end.q}',
        month: '{start.M}~{end.M}',
        week: 'T{start.W}~T{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'CN',
        w1: 'T2',
        w2: 'T3',
        w3: 'T4',
        w4: 'T5',
        w5: 'T6',
        w6: 'T7'
      },
      days: {
        w0: 'Chủ nhật',
        w1: 'Thứ hai',
        w2: 'Thứ ba',
        w3: 'Thứ tư',
        w4: 'Thứ năm',
        w5: 'Thứ sáu',
        w6: 'Thứ bảy'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Không thể thực hiện thao tác này trên ô đã gộp',
          multiErr: 'Không thể thực hiện thao tác này trên nhiều vùng đã chọn',
          selectErr: 'Không thể thao tác trên ô của vùng chỉ định',
          extendErr: 'Để thực hiện thao tác này, tất cả ô đã gộp phải có cùng kích thước',
          pasteMultiErr: 'Không thể dán; vùng sao chép và vùng dán phải cùng kích thước để thực hiện thao tác này',
          cpInvalidErr: 'Không thể thực hiện thao tác này; vùng bạn chọn có cột bị cấm ({0})'
        },
        fnr: {
          title: 'Tìm và thay thế',
          titleFd: 'Tìm',
          titleRe: 'Thay thế',
          findLabel: 'Tìm',
          replaceLabel: 'Thay thế',
          findTitle: 'Tìm:',
          replaceTitle: 'Thay thế bằng:',
          tabs: {
            find: 'Tìm',
            replace: 'Thay thế'
          },
          filter: {
            re: 'Biểu thức chính quy',
            whole: 'Khớp toàn bộ từ',
            sensitive: 'Phân biệt chữ hoa chữ thường'
          },
          btns: {
            findNext: 'Tìm tiếp',
            findAll: 'Tìm tất cả',
            replace: 'Thay thế',
            replaceAll: 'Thay thế tất cả',
            cancel: 'Hủy'
          },
          header: {
            seq: '#',
            cell: 'Ô',
            value: 'Giá trị'
          },
          body: {
            row: 'Dòng: {0}',
            col: 'Cột: {0}'
          },
          empty: '(trống)',
          reError: 'Biểu thức chính quy không hợp lệ',
          recordCount: 'Đã tìm thấy {0} ô',
          notCell: 'Không tìm thấy ô phù hợp',
          replaceSuccess: 'Đã thay thế thành công {0} ô'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Nhóm',
          values: 'Giá trị',
          groupPlaceholder: 'Kéo vào đây để nhóm',
          valuesPlaceholder: 'Kéo vào đây để tổng hợp',
          dragExistCol: 'Cột này đã tồn tại',
          sortHelpTip: 'Nhấn vào biểu tượng để bắt đầu kéo'
        },
        aggFuncs: {
          sum: 'Tổng',
          count: 'Đếm',
          avg: 'Trung bình',
          min: 'Nhỏ nhất',
          max: 'Lớn nhất',
          first: 'Giá trị đầu',
          last: 'Giá trị cuối'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Cột cố định',
          fixedGroup: 'Nhóm cố định',
          cancelFixed: 'Bỏ cố định',
          fixedLeft: 'Cố định trái',
          fixedRight: 'Cố định phải'
        },
        cases: {
          equal: 'Bằng',
          gt: 'Lớn hơn',
          lt: 'Nhỏ hơn',
          begin: 'Bắt đầu bằng',
          endin: 'Kết thúc bằng',
          include: 'Bao gồm',
          isSensitive: 'Phân biệt chữ hoa chữ thường'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sắp xếp',
          clearSort: 'Xóa sắp xếp',
          sortAsc: 'Tăng dần',
          sortDesc: 'Giảm dần',
          fixedColumn: 'Cột cố định',
          fixedGroup: 'Nhóm cố định',
          cancelFixed: 'Bỏ cố định',
          fixedLeft: 'Cố định trái',
          fixedRight: 'Cố định phải',
          clearFilter: 'Xóa bộ lọc',
          textOption: 'Lọc văn bản',
          numberOption: 'Lọc số',
          dateOption: 'Lọc ngày'
        },
        popup: {
          title: 'Cách lọc tùy chỉnh',
          currColumnTitle: 'Hiển thị dòng:',
          and: 'Và',
          or: 'Hoặc',
          describeHtml: 'Dùng ? để đại diện một ký tự<br/>Dùng * để đại diện nhiều ký tự bất kỳ'
        },
        cases: {
          equal: 'Bằng',
          unequal: 'Không bằng',
          gt: 'Lớn hơn',
          ge: 'Lớn hơn hoặc bằng',
          lt: 'Nhỏ hơn',
          le: 'Nhỏ hơn hoặc bằng',
          begin: 'Bắt đầu bằng',
          notbegin: 'Không bắt đầu bằng',
          endin: 'Kết thúc bằng',
          notendin: 'Không kết thúc bằng',
          include: 'Bao gồm',
          exclude: 'Không bao gồm',
          between: 'Giữa',
          isAfter: 'Sau ngày',
          eqAfter: 'Vào hoặc sau ngày',
          isBefore: 'Trước ngày',
          eqBefore: 'Vào hoặc trước ngày',
          top10: 'Top 10',
          aboveAverage: 'Trên trung bình',
          belowAverage: 'Dưới trung bình',
          before: 'Trước',
          after: 'Sau',
          tomorrow: 'Ngày mai',
          today: 'Hôm nay',
          yesterday: 'Hôm qua',
          nextWeek: 'Tuần sau',
          thisWeek: 'Tuần này',
          lastWeek: 'Tuần trước',
          nextMonth: 'Tháng sau',
          thisMonth: 'Tháng này',
          lastMonth: 'Tháng trước',
          nextYear: 'Năm sau',
          thisYear: 'Năm nay',
          lastYear: 'Năm trước',
          yearToDate: 'Từ đầu năm đến hiện tại',
          custom: 'Lọc tùy chỉnh',
          insensitive: 'Không phân biệt chữ hoa chữ thường',
          isSensitive: 'Phân biệt chữ hoa chữ thường'
        },
        empty: '(trống)',
        notData: 'Không có mục phù hợp'
      }
    },
    pro: {
      area: {
        mergeErr: 'Không thể thực hiện thao tác này trên ô đã gộp',
        multiErr: 'Không thể thực hiện thao tác này trên nhiều vùng đã chọn',
        extendErr: 'Để thực hiện thao tác này, tất cả ô đã gộp phải có cùng kích thước',
        pasteMultiErr: 'Không thể dán; vùng sao chép và vùng dán phải cùng kích thước để thực hiện thao tác này'
      },
      fnr: {
        title: 'Tìm và thay thế',
        titleFd: 'Tìm',
        titleRe: 'Thay thế',
        findLabel: 'Tìm',
        replaceLabel: 'Thay thế',
        findTitle: 'Tìm:',
        replaceTitle: 'Thay thế bằng:',
        tabs: {
          find: 'Tìm',
          replace: 'Thay thế'
        },
        filter: {
          re: 'Biểu thức chính quy',
          whole: 'Khớp toàn bộ từ',
          sensitive: 'Phân biệt chữ hoa chữ thường'
        },
        btns: {
          findNext: 'Tìm tiếp',
          findAll: 'Tìm tất cả',
          replace: 'Thay thế',
          replaceAll: 'Thay thế tất cả',
          cancel: 'Hủy'
        },
        header: {
          seq: '#',
          cell: 'Ô',
          value: 'Giá trị'
        },
        empty: '(trống)',
        reError: 'Biểu thức chính quy không hợp lệ',
        recordCount: 'Đã tìm thấy {0} ô',
        notCell: 'Không tìm thấy ô phù hợp',
        replaceSuccess: 'Đã thay thế thành công {0} ô'
      }
    },
    renderer: {
      search: 'Tìm kiếm',
      cases: {
        equal: 'Bằng',
        unequal: 'Không bằng',
        gt: 'Lớn hơn',
        ge: 'Lớn hơn hoặc bằng',
        lt: 'Nhỏ hơn',
        le: 'Nhỏ hơn hoặc bằng',
        begin: 'Bắt đầu bằng',
        notbegin: 'Không bắt đầu bằng',
        endin: 'Kết thúc bằng',
        notendin: 'Không kết thúc bằng',
        include: 'Bao gồm',
        exclude: 'Không bao gồm',
        between: 'Giữa',
        top10: 'Top 10',
        aboveAverage: 'Trên trung bình',
        belowAverage: 'Dưới trung bình',
        custom: 'Lọc tùy chỉnh',
        insensitive: 'Không phân biệt chữ hoa chữ thường',
        isSensitive: 'Phân biệt chữ hoa chữ thường'
      },
      combination: {
        menus: {
          sort: 'Sắp xếp',
          clearSort: 'Xóa sắp xếp',
          sortAsc: 'Tăng dần',
          sortDesc: 'Giảm dần',
          fixedColumn: 'Cột cố định',
          fixedGroup: 'Nhóm cố định',
          cancelFixed: 'Bỏ cố định',
          fixedLeft: 'Cố định trái',
          fixedRight: 'Cố định phải',
          clearFilter: 'Xóa bộ lọc',
          textOption: 'Lọc văn bản',
          numberOption: 'Lọc số',
          dateOption: 'Lọc ngày'
        },
        popup: {
          title: 'Cách lọc tùy chỉnh',
          currColumnTitle: 'Hiển thị dòng:',
          and: 'Và',
          or: 'Hoặc',
          describeHtml: 'Dùng ? để đại diện một ký tự<br/>Dùng * để đại diện nhiều ký tự bất kỳ'
        },
        empty: '(trống)',
        notData: 'Không có mục phù hợp'
      }
    }
  }
}
