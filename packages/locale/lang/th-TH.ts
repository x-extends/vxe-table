export default {
  vxe: {
    base: {
      pleaseInput: 'โปรดป้อน',
      pleaseSelect: 'โปรดเลือก',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'กำลังโหลด ...'
    },
    error: {
      downErr: 'ดาวน์โหลดล้มเหลว',
      errLargeData: 'เมื่อจำนวนข้อมูลที่ถูกผูกไว้มีขนาดใหญ่เกินไปโปรดใช้ {0} มิฉะนั้นอาจทำให้เกิดความล่าช้า',
      groupFixed: 'หากใช้ส่วนหัวที่จัดกลุ่มคอลัมน์แช่แข็งจะต้องตั้งค่าเป็นกลุ่ม',
      groupMouseRange: 'ส่วนหัวการจัดกลุ่มไม่สามารถใช้ในเวลาเดียวกันกับ "{0}" และสิ่งนี้อาจทำให้เกิดข้อผิดพลาด',
      groupTag: 'ส่วนหัวคอลัมน์การจัดกลุ่มควรใช้ "{0}" แทน "{1}" ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      scrollErrProp: 'พารามิเตอร์นี้ "{0}" นี้ไม่ได้รับการสนับสนุนหลังจากเปิดใช้งานการเลื่อนเสมือนจริง',
      errConflicts: 'พารามิเตอร์ "{0}" ขัดแย้งกับ "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      notSupportProp: '"{1}" ไม่ได้รับการสนับสนุนเมื่อเปิดใช้งานพารามิเตอร์ "{0}" มันควรจะเป็น "{2}" มิฉะนั้นจะเกิดข้อผิดพลาดเกิดขึ้น',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notConflictProp: 'เมื่อใช้ "{0}", "{1}" ควรตั้งค่ามิฉะนั้นอาจมีความขัดแย้งในการทำงาน',
      unableInsert: 'ไม่สามารถแทรกลงในตำแหน่งที่ระบุได้โปรดตรวจสอบว่าพารามิเตอร์ถูกต้องหรือไม่',
      useErr: 'เกิดข้อผิดพลาดขณะติดตั้งโมดูล "{0}" คำสั่งซื้ออาจไม่ถูกต้อง ต้องติดตั้งโมดูลขึ้นอยู่กับก่อนตาราง',
      barUnableLink: 'แถบเครื่องมือไม่สามารถเชื่อมโยงตารางได้',
      expandContent: 'สล็อตสำหรับบรรทัดที่ขยายควรเป็น "เนื้อหา" โปรดตรวจสอบว่าถูกต้องหรือไม่',
      reqComp: 'ส่วนประกอบ "{0}" หายไปโปรดตรวจสอบว่าติดตั้งอย่างถูกต้องหรือไม่ https://vxeui.com/#/start/useglobal',
      reqModule: 'ไม่มีโมดูล "{0}"',
      reqProp: 'พารามิเตอร์ "{0}" ที่จำเป็นหายไปซึ่งอาจทำให้เกิดข้อผิดพลาด',
      emptyProp: 'พารามิเตอร์ "{0}" ไม่ได้รับอนุญาตให้ว่างเปล่า',
      errProp: 'พารามิเตอร์ที่ไม่ได้รับการสนับสนุน "{0}" อาจเป็น "{1}"',
      colRepet: 'คอลัมน์. {0} = "{1}" ซ้ำซึ่งอาจทำให้ฟังก์ชั่นบางอย่างไม่สามารถใช้งานได้',
      notFunc: 'วิธี "{0}" ไม่มีอยู่จริง',
      errFunc: 'พารามิเตอร์ "{0}" ไม่ใช่วิธีการ',
      notValidators: 'การตรวจสอบทั่วโลก "{0}" ไม่มีอยู่จริง',
      notFormats: 'การจัดรูปแบบทั่วโลก "{0}" ไม่มีอยู่จริง',
      notCommands: 'คำสั่งทั่วโลก "{0}" ไม่มีอยู่จริง',
      notSlot: 'สล็อต "{0}" ไม่มีอยู่จริง',
      noTree: '"{0}" ไม่รองรับในโครงสร้างต้นไม้',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'พารามิเตอร์ที่ไม่ได้รับการสนับสนุน "{0}"',
      checkProp: 'เมื่อปริมาณข้อมูลมีขนาดใหญ่เกินไปช่องทำเครื่องหมายอาจถูกพูดติดอ่าง ขอแนะนำให้ตั้งค่าพารามิเตอร์ "{0}" เพื่อปรับปรุงความเร็วในการแสดงผล',
      coverProp: 'พารามิเตอร์ "{1}" ของ "{0}" ถูกกำหนดซ้ำ ๆ ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      uniField: 'ชื่อฟิลด์ "{0}" ถูกกำหนดซ้ำ ๆ ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      repeatKey: 'ทำซ้ำคีย์หลัก {0} = "{1}" ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'วิธีการ "{0}" เลิกใช้โปรดใช้ "{1}"',
      delProp: 'พารามิเตอร์ "{0}" เลิกใช้โปรดใช้ "{1}"',
      delEvent: 'เหตุการณ์ "{0}" เลิกใช้โปรดใช้ "{1}"',
      removeProp: 'พารามิเตอร์ "{0}" เลิกใช้แล้วและไม่แนะนำซึ่งอาจทำให้เกิดข้อผิดพลาด',
      errFormat: 'ควรกำหนดเนื้อหาที่จัดรูปแบบทั่วโลกโดยใช้ "vxetable.formats" และวิธีการติดตั้ง "formatter = {0}" ไม่แนะนำอีกต่อไป',
      notType: 'ประเภทไฟล์ที่ไม่ได้รับการสนับสนุน "{0}"',
      notExp: 'เบราว์เซอร์นี้ไม่รองรับฟังก์ชั่นการนำเข้า/ส่งออก',
      impFields: 'การนำเข้าล้มเหลว โปรดตรวจสอบว่าชื่อฟิลด์และรูปแบบข้อมูลถูกต้องหรือไม่',
      treeNotImp: 'ตารางต้นไม้ไม่รองรับการนำเข้า',
      treeCrossDrag: 'ลากระดับแรกเท่านั้น',
      treeDragChild: 'พ่อแม่ไม่สามารถลากลูกของตัวเองได้',
      reqPlugin: '"{1}" ไม่ได้ติดตั้งที่ https://vxeui.com/other {0}/#/{1}/install',
      errMaxRow: 'เกินปริมาณข้อมูลที่รองรับสูงสุด {0} แถวซึ่งอาจทำให้เกิดข้อผิดพลาด',
      useNew: '不建议使用 {0}，请使用 {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'ยังไม่มีข้อมูล',
      allTitle: 'เลือกทั้งหมด/ยกเลิก',
      seqTitle: 'หมายเลขซีเรียล',
      actionTitle: 'ดำเนินงาน',
      confirmFilter: 'กรอง',
      resetFilter: 'รีเซ็ต',
      allFilter: 'ทั้งหมด',
      sortAsc: 'คำสั่งซื้อจากน้อยไปมาก: ต่ำสุดถึงสูงสุด',
      sortDesc: 'คำสั่งลดลง: สูงสุดถึงต่ำสุด',
      filter: 'เปิดใช้งานการกรองสำหรับคอลัมน์ที่เลือก',
      impSuccess: 'นำเข้าสำเร็จ {0} บันทึก',
      expLoading: 'การส่งออก',
      expSuccess: 'ส่งออกได้สำเร็จ',
      expError: 'การส่งออกล้มเหลว',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_Source_ {0}',
      customTitle: 'การตั้งค่าคอลัมน์',
      customAll: 'ทั้งหมด',
      customConfirm: 'ยืนยัน',
      customClose: 'การปิด',
      customCancel: 'ยกเลิก',
      customRestore: 'กู้คืนค่าเริ่มต้น',
      maxFixedCol: 'จำนวนคอลัมน์แช่แข็งสูงสุดไม่เกิน {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'ย้าย: {0}',
      resizeColTip: 'ความกว้าง: {0} พิกเซล',
      resizeRowTip: 'ความสูง: {0} พิกเซล',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: '加载中...'
    },
    grid: {
      selectOneRecord: 'กรุณาเลือกอย่างน้อยหนึ่งบันทึก!',
      deleteSelectRecord: 'แน่ใจหรือว่าต้องการลบบันทึกที่เลือก?',
      removeSelectRecord: 'แน่ใจหรือว่าต้องการลบบันทึกที่เลือกไว้?',
      dataUnchanged: 'ข้อมูลไม่เปลี่ยนแปลง!',
      delSuccess: 'บันทึกที่เลือกถูกลบออกแล้ว!',
      saveSuccess: 'ประหยัดได้สำเร็จ!',
      operError: 'เกิดข้อผิดพลาดและการดำเนินการล้มเหลว!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'ค้นหา',
      loadingText: 'การโหลด',
      emptyText: 'ยังไม่มีข้อมูล',
      maxOpt: '最大可选择的数量不能超过 {0} 个',
      overSizeErr: '已超出最大可选数量 {0} 个，超出部分将被忽略！',
      searchEmpty: '未匹配到数据！'
    },
    tree: {
      searchEmpty: '未匹配到数据！',
      dragTip: '移动：{0}'
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
      goto: 'ไป',
      gotoTitle: 'จำนวนหน้า',
      pagesize: '{0} รายการ/หน้า',
      total: 'บันทึกทั้งหมด {0}',
      pageClassifier: 'หน้าหนังสือ',
      homePage: 'หน้าแรก',
      homePageTitle: 'หน้าแรก',
      prevPage: 'หน้าก่อนหน้า',
      prevPageTitle: 'หน้าก่อนหน้า',
      nextPage: 'หน้าถัดไป',
      nextPageTitle: 'หน้าถัดไป',
      prevJump: 'กระโดดขึ้นหน้า',
      prevJumpTitle: 'กระโดดขึ้นหน้า',
      nextJump: 'กระโดดลงหน้า',
      nextJumpTitle: 'กระโดดลงหน้า',
      endPage: 'หน้าสุดท้าย',
      endPageTitle: 'หน้าสุดท้าย'
    },
    alert: {
      title: 'ระบบแจ้งเตือน'
    },
    button: {
      confirm: 'ยืนยัน',
      cancel: 'ยกเลิก',
      clear: 'ชัดเจน'
    },
    filter: {
      search: 'ค้นหา'
    },
    custom: {
      cstmTitle: 'การตั้งค่าคอลัมน์',
      cstmRestore: 'กู้คืนค่าเริ่มต้น',
      cstmCancel: 'ยกเลิก',
      cstmConfirm: 'แน่นอน',
      cstmConfirmRestore: 'โปรดยืนยันว่าจะถูกกู้คืนไปยังการกำหนดค่าคอลัมน์เริ่มต้นหรือไม่?',
      cstmDragTarget: 'ย้าย: {0}',
      setting: {
        colSort: 'เรียงลำดับ',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'ชื่อคอลัมน์',
        colResizable: 'ความกว้างของคอลัมน์ (พิกเซล)',
        colVisible: 'ไม่ว่าจะแสดง',
        colFixed: 'คอลัมน์แช่แข็ง',
        colFixedMax: 'คอลัมน์แช่แข็ง (คอลัมน์ {0} สูงสุด)',
        fixedLeft: 'ด้านซ้าย',
        fixedUnset: 'ไม่ได้ตั้งค่า',
        fixedRight: 'ด้านขวา'
      }
    },
    import: {
      modes: {
        covering: 'วิธีการเขียนทับ (เขียนทับข้อมูลตารางโดยตรง)',
        insert: 'ผนวกที่ด้านล่าง (ผนวกข้อมูลใหม่ที่ด้านล่างของตาราง)',
        insertTop: 'ผนวกที่ด้านบน (ผนวกข้อมูลใหม่ที่ด้านบนของตาราง)',
        insertBottom: 'ผนวกที่ด้านล่าง (ผนวกข้อมูลใหม่ที่ด้านล่างของตาราง)'
      },
      impTitle: 'นำเข้าข้อมูล',
      impFile: 'ชื่อไฟล์',
      impSelect: 'เลือกไฟล์',
      impType: 'ประเภทไฟล์',
      impOpts: 'การตั้งค่าพารามิเตอร์',
      impMode: 'โหมดนำเข้า',
      impConfirm: 'นำเข้า',
      impCancel: 'ยกเลิก'
    },
    export: {
      types: {
        csv: 'CSV (คั่นด้วยเครื่องหมายจุลภาค) (*. CSV)',
        html: 'หน้าเว็บ (*.html)',
        xml: 'ข้อมูล XML (*.xml)',
        txt: 'ไฟล์ข้อความ (คั่นแท็บ) (*. txt)',
        xls: 'Excel 97-2003 เวิร์กบุ๊ก (*.xls)',
        xlsx: 'สมุดงาน Excel (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'ข้อมูลเปล่า',
        current: 'ข้อมูลปัจจุบัน (ข้อมูลในหน้าปัจจุบัน)',
        selected: 'ข้อมูลที่เลือก (ข้อมูลที่เลือกในหน้าปัจจุบัน)',
        all: 'ข้อมูลเต็มรูปแบบ (รวมถึงข้อมูลเพจทั้งหมด)'
      },
      printTitle: 'พิมพ์ข้อมูล',
      expTitle: 'ข้อมูลส่งออก',
      expName: 'ชื่อไฟล์',
      expNamePlaceholder: 'กรุณากรอกชื่อไฟล์',
      expSheetName: 'ชื่อ',
      expSheetNamePlaceholder: 'กรุณากรอกชื่อเรื่อง',
      expType: 'บันทึกประเภท',
      expMode: 'เลือกข้อมูล',
      expCurrentColumn: 'ทั้งหมดฟิลด์',
      expColumn: 'เลือกฟิลด์',
      expOpts: 'การตั้งค่าพารามิเตอร์',
      expOptHeader: 'ส่วนหัว',
      expHeaderTitle: 'เป็นส่วนหัวของตารางหรือไม่',
      expOptFooter: 'จุดสิ้นสุดของตาราง',
      expFooterTitle: 'จำเป็นต้องใช้จุดสิ้นสุดของตารางหรือไม่?',
      expOptColgroup: 'ส่วนหัวการจัดกลุ่ม',
      expOptTitle: 'ชื่อคอลัมน์',
      expTitleTitle: 'ไม่ว่าจะเป็นชื่อคอลัมน์มิฉะนั้นจะแสดงเป็นชื่อฟิลด์คอลัมน์',
      expColgroupTitle: 'หากมีอยู่จะรองรับส่วนหัวที่มีโครงสร้างการจัดกลุ่ม',
      expOptMerge: 'ผสาน',
      expMergeTitle: 'หากมีอยู่จะรองรับเซลล์ที่มีโครงสร้างที่ผสานเข้าด้วยกัน',
      expOptAllExpand: 'ขยายต้นไม้',
      expAllExpandTitle: 'หากมีอยู่จะได้รับการสนับสนุนเพื่อขยายข้อมูลทั้งหมดด้วยโครงสร้างแบบลำดับชั้น',
      expOptUseStyle: 'สไตล์',
      expUseStyleTitle: 'หากมีอยู่จะรองรับเซลล์ที่มีสไตล์',
      expOptOriginal: 'แหล่งข้อมูล',
      expOriginalTitle: 'หากเป็นข้อมูลต้นฉบับให้รองรับการนำเข้าสู่ตาราง',
      expPrint: 'พิมพ์',
      expConfirm: 'ส่งออก',
      expCancel: 'ยกเลิก'
    },
    modal: {
      errTitle: 'ข้อความแสดงข้อผิดพลาด',
      zoomMin: 'ลดขนาด',
      zoomIn: 'ทำให้สูงสุด',
      zoomOut: 'การลดน้อยลง',
      close: 'การปิด',
      miniMaxSize: 'จำนวนหน้าต่างที่ย่อเล็กสุดไม่เกิน {0}',
      footPropErr: 'Show-footer ใช้เพื่อเปิดใช้งานหางโต๊ะเท่านั้นและต้องใช้กับการแสดงการยืนยัน-ปุ่ม | Show-Cancel-Button | ช่องเสียบ'
    },
    drawer: {
      close: 'การปิด'
    },
    form: {
      folding: 'ปิด',
      unfolding: 'ขยาย'
    },
    toolbar: {
      import: 'นำเข้า',
      export: 'ส่งออก',
      print: 'พิมพ์',
      refresh: 'รีเฟรช',
      zoomIn: 'เต็มหน้าจอ',
      zoomOut: 'การลดน้อยลง',
      custom: 'การตั้งค่าคอลัมน์',
      customAll: 'ทั้งหมด',
      customConfirm: 'ยืนยัน',
      customRestore: 'รีเซ็ต',
      fixedLeft: 'แช่แข็งซ้าย',
      fixedRight: 'แช่แข็งขวา',
      cancelFixed: 'สูดดม'
    },
    datePicker: {
      yearTitle: '{0} ปี'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'มกราคม',
        m2: 'กุมภาพันธ์',
        m3: 'มีนาคม',
        m4: 'เมษายน',
        m5: 'อาจ',
        m6: 'มิถุนายน',
        m7: 'กรกฎาคม',
        m8: 'สิงหาคม',
        m9: 'กันยายน',
        m10: 'ตุลาคม',
        m11: 'พฤศจิกายน',
        m12: 'ธันวาคม',
        quarterLabel: '{0} ปี',
        monthLabel: '{0} ปี',
        dayLabel: '{0} ปี {1}',
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
          w0: 'ดวงอาทิตย์',
          w1: 'จอน',
          w2: 'อ.',
          w3: 'แต่งงาน',
          w4: 'เทือกเขา',
          w5: 'วันศุกร์',
          w6: 'นั่ง'
        },
        months: {
          m0: 'มกราคม',
          m1: 'กุมภาพันธ์',
          m2: 'มีนาคม',
          m3: 'เมษายน',
          m4: 'อาจ',
          m5: 'มิถุนายน',
          m6: 'กรกฎาคม',
          m7: 'สิงหาคม',
          m8: 'กันยายน',
          m9: 'ตุลาคม',
          m10: 'พฤศจิกายน',
          m11: 'ธันวาคม'
        },
        quarters: {
          q1: 'ไตรมาสแรก',
          q2: 'ไตรมาสที่สอง',
          q3: 'ไตรมาสที่สาม',
          q4: 'ไตรมาสที่สี่'
        }
      }
    },
    calendar: {
      yearLabel: '{0} 年',
      monthLabel: '{0} 月'
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'ดูตัวอย่าง',
      operBtn: {
        zoomOut: 'หด',
        zoomIn: 'ขยาย',
        pctFull: 'ปรับขนาดเท่ากัน',
        pct11: 'แสดงขนาดดั้งเดิม',
        rotateLeft: 'หมุนซ้าย',
        rotateRight: 'หมุนไปทางขวา',
        print: 'คลิกเพื่อพิมพ์รูปภาพ',
        download: 'คลิกเพื่อดาวน์โหลดรูปภาพ'
      }
    },
    upload: {
      fileBtnText: 'คลิกหรือลากเพื่ออัปโหลด',
      imgBtnText: 'คลิกหรือลากเพื่ออัปโหลด',
      dragPlaceholder: 'โปรดลากและวางไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด',
      imgSizeHint: 'ใบปลิว {0}',
      imgCountHint: 'รูปภาพสูงสุด {0}',
      fileTypeHint: 'สนับสนุนประเภทไฟล์ {0}',
      fileSizeHint: 'ขนาดไฟล์เดียวไม่เกิน {0}',
      fileCountHint: 'สามารถอัปโหลดไฟล์ได้สูงสุด {0}',
      uploadTypeErr: 'ประเภทไฟล์ไม่ตรงกัน!',
      overCountErr: 'สามารถเลือกไฟล์ {0} ได้อย่างมากเท่านั้น!',
      overCountExtraErr: 'เกินจำนวนสูงสุดของ {0} และไฟล์ {1} ส่วนเกินจะถูกละเว้น!',
      overSizeErr: 'ขนาดไฟล์สูงสุดไม่เกิน {0}!',
      manualUpload: '点击上传',
      reUpload: 'อัปเดตใหม่',
      uploadProgress: 'การอัปโหลด {0}%',
      uploadErr: 'การอัปโหลดล้มเหลว',
      uploadSuccess: 'อัปโหลดสำเร็จ',
      moreBtnText: 'เพิ่มเติม ({0})',
      moreImgBtnText: '图片（{0}）',
      moreFileBtnText: '文件（{0}）',
      viewItemTitle: 'คลิกเพื่อดู',
      morePopup: {
        readTitle: 'รายการดู',
        imageTitle: 'อัปโหลดรูปภาพ',
        fileTitle: 'อัปโหลดไฟล์'
      }
    },
    empty: {
      defText: 'ยังไม่มีข้อมูล'
    },
    colorPicker: {
      clear: 'ชัดเจน',
      confirm: 'ยืนยัน',
      copySuccess: 'คัดลอกไปยังคลิปบอร์ด: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'ชื่อแบบฟอร์ม',
      defFormTitle: 'รูปแบบที่ไม่มีชื่อ',
      widgetPropTab: 'คุณสมบัติควบคุม',
      widgetFormTab: 'รูปแบบคุณสมบัติ',
      error: {
        wdFormUni: 'การควบคุมประเภทนี้ได้รับอนุญาตให้เพิ่มเพียงหนึ่งในรูปแบบ',
        wdSubUni: 'การควบคุมประเภทนี้ได้รับอนุญาตให้เพิ่มเพียงหนึ่งใน subtable'
      },
      styleSetting: {
        btn: 'การตั้งค่าสไตล์',
        title: 'การตั้งค่าสไตล์แบบฟอร์ม',
        layoutTitle: 'เค้าโครงควบคุม',
        verticalLayout: 'เค้าโครงด้านบนและล่าง',
        horizontalLayout: 'เค้าโครงแนวนอน',
        styleTitle: 'รูปแบบชื่อเรื่อง',
        boldTitle: 'ชื่อเป็นตัวหนา',
        fontBold: 'ตัวหนา',
        fontNormal: 'ธรรมดา',
        colonTitle: 'แสดงลำไส้ใหญ่',
        colonVisible: 'แสดง',
        colonHidden: 'ซ่อน',
        alignTitle: 'การจัดตำแหน่ง',
        widthTitle: 'ความกว้างของชื่อ',
        alignLeft: 'ด้านซ้าย',
        alignRight: 'ทางด้านขวา',
        unitPx: 'พิกเซล',
        unitPct: 'เปอร์เซ็นต์'
      },
      widget: {
        group: {
          base: 'การควบคุมพื้นฐาน',
          layout: 'การควบคุมเค้าโครง',
          system: 'การควบคุมระบบ',
          module: 'การควบคุมโมดูล',
          chart: 'การควบคุมแผนภูมิ',
          advanced: 'การควบคุมขั้นสูง'
        },
        copyTitle: 'copy_ {0}',
        component: {
          input: 'กล่องป้อนเข้า',
          textarea: 'ฟิลด์ข้อความ',
          select: 'ดึงลงเพื่อเลือก',
          row: 'หนึ่งแถวและหลายคอลัมน์',
          title: 'ชื่อ',
          text: 'ข้อความ',
          subtable: 'ตารางย่อย',
          VxeSwitch: 'ไม่ว่า',
          VxeInput: 'กล่องป้อนเข้า',
          VxeNumberInput: 'ตัวเลข',
          VxeDatePicker: 'วันที่',
          VxeTextarea: 'ฟิลด์ข้อความ',
          VxeSelect: 'ดึงลงเพื่อเลือก',
          VxeTreeSelect: 'การเลือกต้นไม้',
          VxeRadioGroup: 'ปุ่มตัวเลือก',
          VxeCheckboxGroup: 'ช่องทำเครื่องหมาย',
          VxeUploadFile: 'เอกสาร',
          VxeUploadImage: 'รูปภาพ',
          VxeRate: 'คะแนน',
          VxeSlider: 'ตัวเลื่อน'
        }
      },
      widgetProp: {
        name: 'ชื่อควบคุม',
        placeholder: 'แจ้ง',
        required: 'การตรวจสอบที่จำเป็น',
        multiple: 'อนุญาตให้เลือกหลายทางเลือก',
        displaySetting: {
          name: 'แสดงการตั้งค่า',
          pc: 'พีซี',
          mobile: 'มือถือ',
          visible: 'แสดง',
          hidden: 'ซ่อน'
        },
        dataSource: {
          name: 'แหล่งข้อมูล',
          defValue: 'ตัวเลือก {0}',
          addOption: 'เพิ่มตัวเลือก',
          batchEditOption: 'การแก้ไขชุด',
          batchEditTip: 'แต่ละแถวสอดคล้องกับตัวเลือกซึ่งรองรับสำเนาโดยตรงและวางจากตาราง Excel และ WPS',
          batchEditSubTip: 'แต่ละแถวสอดคล้องกับตัวเลือก หากเป็นกลุ่มรายการเด็กสามารถเริ่มต้นด้วยพื้นที่หรือคีย์แท็บและรองรับสำเนาโดยตรงและวางจากตาราง Excel และ WPS',
          buildOption: 'สร้างตัวเลือก'
        },
        rowProp: {
          colSize: 'จำนวนคอลัมน์',
          col2: 'สองคอลัมน์',
          col3: 'สามคอลัมน์',
          col4: 'สี่คอลัมน์',
          col6: 'หกคอลัมน์',
          layout: 'เค้าโครง'
        },
        textProp: {
          name: 'เนื้อหา',
          alignTitle: 'การจัดตำแหน่ง',
          alignLeft: 'ด้านซ้าย',
          alignCenter: 'ศูนย์',
          alignRight: 'ทางด้านขวา',
          colorTitle: 'สีตัวอักษร',
          sizeTitle: 'ขนาดตัวอักษร',
          boldTitle: 'ตัวอักษรหนา',
          fontNormal: 'ธรรมดา',
          fontBold: 'ตัวหนา'
        },
        subtableProp: {
          seqTitle: 'หมายเลขซีเรียล',
          showSeq: 'แสดงหมายเลขซีเรียล',
          showCheckbox: 'อนุญาตให้เลือกหลายทางเลือก',
          errSubDrag: 'Subtable ไม่รองรับการควบคุมนี้โปรดใช้การควบคุมอื่น ๆ',
          colPlace: 'ลากตัวควบคุมใน'
        },
        uploadProp: {
          limitFileCount: 'ขีด จำกัด ปริมาณไฟล์',
          limitFileSize: 'ขีด จำกัด ขนาดไฟล์',
          multiFile: 'อนุญาตให้อัปโหลดหลายไฟล์',
          limitImgCount: 'จำกัด จำนวนรูปภาพ',
          limitImgSize: 'ขีด จำกัด ขนาดภาพ',
          multiImg: 'อนุญาตให้อัพโหลดรูปภาพหลายภาพ'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'การตั้งค่าฟิลด์',
      listSettingTab: 'การตั้งค่าพารามิเตอร์',
      searchTitle: 'เกณฑ์การสอบถาม',
      listTitle: 'ฟิลด์รายการ',
      searchField: 'ฟิลด์แบบสอบถาม',
      listField: 'ฟิลด์รายการ',
      activeBtn: {
        ActionButtonUpdate: 'แก้ไข',
        ActionButtonDelete: 'ลบ'
      },
      search: {
        addBtn: 'แก้ไข',
        emptyText: 'เงื่อนไขการสอบถามไม่ได้กำหนดค่า',
        editPopupTitle: 'แก้ไขเขตข้อมูลสอบถาม'
      },
      searchPopup: {
        colTitle: 'ชื่อ',
        saveBtn: 'บันทึก'
      }
    },
    text: {
      copySuccess: 'คัดลอกไปยังคลิปบอร์ด',
      copyError: 'สภาพแวดล้อมปัจจุบันไม่สนับสนุนการดำเนินการนี้'
    },
    countdown: {
      formats: {
        yyyy: 'ปี',
        MM: 'ดวงจันทร์',
        dd: 'ท้องฟ้า',
        HH: 'ชั่วโมง',
        mm: 'จุด',
        ss: 'ที่สอง'
      }
    },
    contextMenu: {
      loadingText: '加载中...'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}年',
        quarter: '{yyyy}年第{q}季度',
        month: '{yyyy}年{MM}月',
        week: '{yyyy}年第{W}周',
        day: '{yyyy}年{MM}月 {E}',
        date: '{yyyy}年{MM}月{dd}日',
        hour: '{yyyy}年{MM}月{dd}日{HH}时',
        minute: '{yyyy}年{MM}月{dd}日{HH}时{mm}分',
        second: '{yyyy}年{MM}月{dd}日{HH}时{mm}分{ss}秒'
      },
      tSimpleFormat: {
        year: '{yyyy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}周',
        day: '{d}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      dayss: {
        w0: '日',
        w1: '一',
        w2: '二',
        w3: '三',
        w4: '四',
        w5: '五',
        w6: '六'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'การดำเนินการนี้ไม่สามารถทำได้ในเซลล์ที่ผสาน',
          multiErr: 'การดำเนินการนี้ไม่สามารถทำได้ในหลาย ๆ การเลือก',
          selectErr: 'ไม่สามารถใช้งานกับเซลล์ในช่วงที่กำหนด',
          extendErr: 'หากช่วงขยายมีเซลล์ที่ผสานเซลล์ทั้งหมดที่ผสานจะต้องมีขนาดเท่ากัน',
          pasteMultiErr: 'ไม่สามารถวางได้พื้นที่ที่คัดลอกและวางจะต้องมีขนาดเท่ากันเพื่อดำเนินการนี้',
          cpInvalidErr: 'การดำเนินการไม่สามารถทำได้ มีคอลัมน์ต้องห้าม ({0}) ในช่วงที่คุณเลือก'
        },
        fnr: {
          title: 'ค้นหาและแทนที่',
          titleFd: '查找',
          titleRe: '替换',
          findLabel: 'หา',
          replaceLabel: 'แทนที่',
          findTitle: 'ค้นหาอะไร:',
          replaceTitle: 'แทนที่ด้วย:',
          tabs: {
            find: 'หา',
            replace: 'แทนที่'
          },
          filter: {
            re: 'การแสดงออกปกติ',
            whole: 'การจับคู่คำเต็มคำ',
            sensitive: 'ตัวพิมพ์เล็ก'
          },
          btns: {
            findNext: 'ค้นหาถัดไป',
            findAll: 'ค้นหาทั้งหมด',
            replace: 'แทนที่',
            replaceAll: 'เปลี่ยนทั้งหมด',
            cancel: 'ยกเลิก'
          },
          header: {
            seq: '#',
            cell: 'ห้องขัง',
            value: 'ค่า'
          },
          body: {
            row: 'แถว: {0}',
            col: 'คอลัมน์: {0}'
          },
          empty: '(ค่าว่าง)',
          reError: 'นิพจน์ปกติที่ไม่ถูกต้อง',
          recordCount: 'พบเซลล์ {0}',
          notCell: 'ไม่พบเซลล์ที่ตรงกัน',
          replaceSuccess: 'แทนที่เซลล์ {0} สำเร็จ'
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
          fixedColumn: 'คอลัมน์แช่แข็ง',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'สูดดม',
          fixedLeft: 'แช่แข็งซ้าย',
          fixedRight: 'แช่แข็งขวา'
        },
        cases: {
          equal: 'เท่ากัน',
          gt: 'สูงกว่า',
          lt: 'น้อยกว่า',
          begin: 'จุดเริ่มต้นคือ',
          endin: 'จุดจบคือ',
          include: 'รวม',
          isSensitive: 'ตัวพิมพ์เล็ก'
        }
      },
      filterCombination: {
        menus: {
          sort: 'เรียงลำดับ',
          clearSort: 'จัดเรียงให้ชัดเจน',
          sortAsc: 'คำสั่งจากน้อยไปมาก',
          sortDesc: 'คำสั่งลดลง',
          fixedColumn: 'คอลัมน์แช่แข็ง',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'สูดดม',
          fixedLeft: 'แช่แข็งซ้าย',
          fixedRight: 'แช่แข็งขวา',
          clearFilter: 'ตัวกรองที่ชัดเจน',
          textOption: 'ตัวกรองข้อความ',
          numberOption: 'ตัวกรองตัวเลข',
          dateOption: '日期筛选'
        },
        popup: {
          title: 'วิธีการกรองที่กำหนดเอง',
          currColumnTitle: 'คอลัมน์ปัจจุบัน:',
          and: 'และ',
          or: 'หรือ',
          describeHtml: 'มีอยู่? แสดงถึงอักขระตัวเดียว <br/> ใช้ * แสดงถึงอักขระหลายตัว'
        },
        cases: {
          equal: 'เท่ากัน',
          unequal: 'ไม่เท่ากับ',
          gt: 'สูงกว่า',
          ge: 'มากกว่าหรือเท่ากับ',
          lt: 'น้อยกว่า',
          le: 'น้อยกว่าหรือเท่ากับ',
          begin: 'จุดเริ่มต้นคือ',
          notbegin: 'มันไม่ได้เป็นจุดเริ่มต้น',
          endin: 'จุดจบคือ',
          notendin: 'ตอนจบไม่ได้',
          include: 'รวม',
          exclude: 'ไม่รวมอยู่',
          between: 'ระหว่าง',
          isAfter: '在以下日期之后',
          eqAfter: '在以下日期之后或与之相同',
          isBefore: '在以下日期之前',
          eqBefore: '在以下日期之前或与之相同',
          top10: '前10项',
          aboveAverage: '高于平均值',
          belowAverage: '低于平均值',
          before: '之前',
          after: '之后',
          tomorrow: '明天',
          today: '今天',
          yesterday: '昨天',
          nextWeek: '下周',
          thisWeek: '本周',
          lastWeek: '上周',
          nextMonth: '下月',
          thisMonth: '本月',
          lastMonth: '上月',
          nextYear: '明年',
          thisYear: '今年',
          lastYear: '去年',
          yearToDate: '本年度截止到现在',
          custom: 'ตัวกรองที่กำหนดเอง',
          insensitive: 'กรณีที่ไม่รู้สึก',
          isSensitive: 'ตัวพิมพ์เล็ก'
        },
        empty: '(ว่างเปล่า)',
        notData: 'ไม่มีการแข่งขัน'
      }
    },
    pro: {
      area: {
        mergeErr: 'การดำเนินการนี้ไม่สามารถทำได้ในเซลล์ที่ผสาน',
        multiErr: 'การดำเนินการนี้ไม่สามารถทำได้ในหลาย ๆ การเลือก',
        extendErr: 'หากช่วงขยายมีเซลล์ที่ผสานเซลล์ทั้งหมดที่ผสานจะต้องมีขนาดเท่ากัน',
        pasteMultiErr: 'ไม่สามารถวางได้พื้นที่ที่คัดลอกและวางจะต้องมีขนาดเท่ากันเพื่อดำเนินการนี้'
      },
      fnr: {
        title: 'ค้นหาและแทนที่',
        titleFd: '查找',
        titleRe: '替换',
        findLabel: 'หา',
        replaceLabel: 'แทนที่',
        findTitle: 'ค้นหาเนื้อหา:',
        replaceTitle: 'แทนที่ด้วย:',
        tabs: {
          find: 'หา',
          replace: 'แทนที่'
        },
        filter: {
          re: 'การแสดงออกปกติ',
          whole: 'การจับคู่คำเต็มคำ',
          sensitive: 'ตัวพิมพ์เล็ก'
        },
        btns: {
          findNext: 'ค้นหาถัดไป',
          findAll: 'ค้นหาทั้งหมด',
          replace: 'แทนที่',
          replaceAll: 'เปลี่ยนทั้งหมด',
          cancel: 'ยกเลิก'
        },
        header: {
          seq: '#',
          cell: 'ห้องขัง',
          value: 'ค่า'
        },
        empty: '(ค่าว่าง)',
        reError: 'นิพจน์ปกติที่ไม่ถูกต้อง',
        recordCount: 'พบเซลล์ {0}',
        notCell: 'ไม่พบเซลล์ที่ตรงกัน',
        replaceSuccess: 'แทนที่เซลล์ {0} สำเร็จ'
      }
    },
    renderer: {
      search: 'ค้นหา',
      cases: {
        equal: 'เท่ากัน',
        unequal: 'ไม่เท่ากับ',
        gt: 'สูงกว่า',
        ge: 'มากกว่าหรือเท่ากับ',
        lt: 'น้อยกว่า',
        le: 'น้อยกว่าหรือเท่ากับ',
        begin: 'จุดเริ่มต้นคือ',
        notbegin: 'มันไม่ได้เป็นจุดเริ่มต้น',
        endin: 'จุดจบคือ',
        notendin: 'ตอนจบไม่ได้',
        include: 'รวม',
        exclude: 'ไม่รวมอยู่',
        between: 'ระหว่าง',
        top10: '前10项',
        aboveAverage: '高于平均值',
        belowAverage: '低于平均值',
        custom: 'ตัวกรองที่กำหนดเอง',
        insensitive: 'กรณีที่ไม่รู้สึก',
        isSensitive: 'ตัวพิมพ์เล็ก'
      },
      combination: {
        menus: {
          sort: 'เรียงลำดับ',
          clearSort: 'จัดเรียงให้ชัดเจน',
          sortAsc: 'คำสั่งจากน้อยไปมาก',
          sortDesc: 'คำสั่งลดลง',
          fixedColumn: 'คอลัมน์แช่แข็ง',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'สูดดม',
          fixedLeft: 'แช่แข็งซ้าย',
          fixedRight: 'แช่แข็งขวา',
          clearFilter: 'ตัวกรองที่ชัดเจน',
          textOption: 'การกรองข้อความ',
          numberOption: 'การกรองตัวเลข',
          dateOption: '日期筛选'
        },
        popup: {
          title: 'วิธีการกรองที่กำหนดเอง',
          currColumnTitle: 'คอลัมน์ปัจจุบัน:',
          and: 'และ',
          or: 'หรือ',
          describeHtml: 'มีอยู่? แสดงถึงอักขระตัวเดียว <br/> ใช้ * แสดงถึงอักขระหลายตัว'
        },
        empty: '(ว่างเปล่า)',
        notData: 'ไม่มีการแข่งขัน'
      }
    }
  }
}
