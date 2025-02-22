export default {
  vxe: {
    base: {
      pleaseInput: 'กรุณาเข้า',
      pleaseSelect: 'กรุณาเลือก',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'กำลังโหลด...'
    },
    error: {
      downErr: 'การดาวน์โหลดล้มเหลว',
      errLargeData: '当绑定的数据量过大时，应该请使用 {0}，否则可能会出现卡顿',
      groupFixed: 'หากใช้ส่วนหัวของกลุ่ม คอลัมน์ที่ตรึงจะต้องตั้งค่าตามกลุ่ม',
      groupMouseRange: 'ส่วนหัวของกลุ่มและ "{0}" ไม่สามารถนำมาใช้พร้อมกันได้ ซึ่งอาจทำให้เกิดข้อผิดพลาดได้',
      groupTag: 'การจัดกลุ่มส่วนหัวคอลัมน์ควรใช้ "{0}" แทน "{1}" ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      scrollErrProp: 'ไม่สนับสนุนพารามิเตอร์ "{0}" เมื่อเปิดใช้งานการเลื่อนเสมือน',
      errConflicts: 'พารามิเตอร์ "{0}" ขัดแย้งกับ "{1}"',
      unableInsert: 'ไม่สามารถแทรกลงในตำแหน่งที่ระบุได้ โปรดตรวจสอบว่าพารามิเตอร์ถูกต้องหรือไม่',
      useErr: 'เกิดข้อผิดพลาดขณะติดตั้งโมดูล "{0}" ลำดับอาจไม่ถูกต้อง จำเป็นต้องติดตั้งโมดูลที่ต้องพึ่งพาก่อนตาราง',
      barUnableLink: 'แถบเครื่องมือไม่สามารถเชื่อมโยงกับตารางได้',
      expandContent: 'ช่องที่จะขยายแถวควรเป็น "เนื้อหา" โปรดตรวจสอบว่าถูกต้องหรือไม่',
      reqComp: 'ส่วนประกอบ "{0}" หายไป โปรดตรวจสอบว่ามีการติดตั้งอย่างถูกต้องหรือไม่ https://vxeui.com/#/start/useGlobal',
      reqModule: 'โมดูล "{0}" หายไป',
      reqProp: 'พารามิเตอร์ "{0}" ที่จำเป็นหายไป ซึ่งอาจส่งผลให้เกิดข้อผิดพลาด',
      emptyProp: 'พารามิเตอร์ "{0}" ไม่ได้รับอนุญาตให้เว้นว่าง',
      errProp: 'พารามิเตอร์ที่ไม่สนับสนุน "{0}" อาจเป็น "{1}"',
      colRepet: 'column.{0}="{1}" ซ้ำกัน ซึ่งอาจทำให้บางฟังก์ชันใช้งานไม่ได้',
      notFunc: 'ไม่มีวิธีการ "{0}"',
      errFunc: 'พารามิเตอร์ "{0}" ไม่ใช่วิธีการ',
      notValidators: 'ไม่มีเช็คสากล "{0}"',
      notFormats: 'ไม่มีรูปแบบสากล "{0}"',
      notCommands: 'ไม่มีคำสั่งสากล "{0}"',
      notSlot: 'ไม่มีสล็อต "{0}"',
      noTree: 'โครงสร้างแบบต้นไม้ไม่สนับสนุน "{0}"',
      notProp: 'พารามิเตอร์ที่ไม่สนับสนุน "{0}"',
      checkProp: 'เมื่อปริมาณข้อมูลมากเกินไป อาจทำให้ช่องทำเครื่องหมายค้าง ขอแนะนำให้ตั้งค่าพารามิเตอร์ "{0}" เพื่อปรับปรุงความเร็วในการเรนเดอร์',
      coverProp: 'พารามิเตอร์ "{1}" ของ "{0}" ถูกกำหนดซ้ำๆ ซึ่งอาจทำให้เกิดข้อผิดพลาด',
      uniField: 'ชื่อฟิลด์ "{0}" ถูกกำหนดซ้ำๆ ซึ่งอาจทำให้เกิดข้อผิดพลาดได้',
      repeatKey: 'คีย์หลักซ้ำกัน {0}="{1}" ซึ่งอาจทำให้เกิดข้อผิดพลาดได้',
      delFunc: 'วิธีการ "{0}" เลิกใช้แล้ว โปรดใช้ "{1}"',
      delProp: 'พารามิเตอร์ "{0}" ล้าสมัย โปรดใช้ "{1}"',
      delEvent: 'กิจกรรม "{0}" เลิกใช้แล้ว โปรดใช้ "{1}"',
      removeProp: 'พารามิเตอร์ "{0}" เลิกใช้แล้วและไม่แนะนำและอาจส่งผลให้เกิดข้อผิดพลาด',
      errFormat: 'เนื้อหาการจัดรูปแบบสากลควรถูกกำหนดโดยใช้ "VXETable.formats" ไม่แนะนำให้ใช้วิธีการเมานต์ "formatter={0}" อีกต่อไป',
      notType: 'ประเภทไฟล์ที่ไม่สนับสนุน "{0}"',
      notExp: 'เบราว์เซอร์นี้ไม่รองรับฟังก์ชันการนำเข้า/ส่งออก',
      impFields: 'การนำเข้าล้มเหลว โปรดตรวจสอบว่าชื่อฟิลด์และรูปแบบข้อมูลถูกต้องหรือไม่',
      treeNotImp: 'ตารางแผนผังไม่รองรับการนำเข้า',
      treeCrossDrag: 'สามารถลากได้เฉพาะระดับแรกเท่านั้น',
      treeDragChild: 'ผู้ปกครองไม่สามารถถูกลากเข้าไปในลูกของตัวเองได้',
      reqPlugin: '扩展插件未安装 "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: 'ยังไม่มีข้อมูล',
      allTitle: 'เลือกทั้งหมด/ยกเลิก',
      seqTitle: 'หมายเลขซีเรียล',
      actionTitle: 'ดำเนินงาน',
      confirmFilter: 'กรอง',
      resetFilter: 'รีเซ็ต',
      allFilter: 'ทั้งหมด',
      sortAsc: 'ลำดับจากน้อยไปมาก: ต่ำสุดไปสูงสุด',
      sortDesc: 'ลำดับจากมากไปน้อย: จากมากไปน้อย',
      filter: 'เปิดใช้งานการกรองในคอลัมน์ที่เลือก',
      impSuccess: 'นำเข้าระเบียน {0} สำเร็จแล้ว',
      expLoading: 'กำลังส่งออก',
      expSuccess: 'ส่งออกสำเร็จ',
      expError: 'การส่งออกล้มเหลว',
      expFilename: 'ส่งออก_{0}',
      expOriginFilename: 'ส่งออก_แหล่งที่มา_{0}',
      customTitle: 'การตั้งค่าคอลัมน์',
      customAll: 'ทั้งหมด',
      customConfirm: 'ยืนยัน',
      customClose: 'ปิด',
      customCancel: 'ยกเลิก',
      customRestore: 'คืนค่าเริ่มต้น',
      maxFixedCol: 'จำนวนคอลัมน์ที่ตรึงไว้สูงสุดต้องไม่เกิน {0}',
      dragTip: 'ย้าย: {0}',
      resizeColTip: '宽：{0} 像素',
      resizeRowTip: '高：{0} 像素'
    },
    grid: {
      selectOneRecord: 'โปรดเลือกอย่างน้อยหนึ่งรายการ!',
      deleteSelectRecord: 'คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกที่เลือก',
      removeSelectRecord: 'คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกที่เลือก',
      dataUnchanged: 'ข้อมูลไม่มีการเปลี่ยนแปลง!',
      delSuccess: 'ลบบันทึกที่เลือกเรียบร้อยแล้ว!',
      saveSuccess: 'บันทึกเรียบร้อยแล้ว!',
      operError: 'เกิดข้อผิดพลาดและการดำเนินการล้มเหลว!'
    },
    select: {
      search: 'ค้นหา',
      loadingText: 'กำลังโหลด',
      emptyText: 'ยังไม่มีข้อมูล'
    },
    pager: {
      goto: 'ไปที่',
      gotoTitle: 'จำนวนหน้า',
      pagesize: '{0} รายการ/หน้า',
      total: 'รวม {0} บันทึก',
      pageClassifier: 'หน้าหนังสือ',
      homePage: 'หน้าแรก',
      homePageTitle: 'หน้าแรก',
      prevPage: 'หน้าก่อนหน้า',
      prevPageTitle: 'หน้าก่อนหน้า',
      nextPage: 'หน้าถัดไป',
      nextPageTitle: 'หน้าถัดไป',
      prevJump: 'กระโดดหน้าขึ้น',
      prevJumpTitle: 'กระโดดหน้าขึ้น',
      nextJump: 'ข้ามหน้าลง',
      nextJumpTitle: 'ข้ามหน้าลง',
      endPage: 'หน้าสุดท้าย',
      endPageTitle: 'หน้าสุดท้าย'
    },
    alert: {
      title: 'พร้อมท์ระบบ'
    },
    button: {
      confirm: 'ยืนยัน',
      cancel: 'ยกเลิก',
      clear: '清除'
    },
    filter: {
      search: 'ค้นหา'
    },
    custom: {
      cstmTitle: 'การตั้งค่าคอลัมน์',
      cstmRestore: 'คืนค่าเริ่มต้น',
      cstmCancel: 'ยกเลิก',
      cstmConfirm: 'แน่นอน',
      cstmConfirmRestore: 'โปรดยืนยันว่าจะคืนค่าเป็นการกำหนดค่าคอลัมน์เริ่มต้นหรือไม่',
      cstmDragTarget: 'ย้าย: {0}',
      setting: {
        colSort: 'เรียงลำดับ',
        sortHelpTip: 'คลิกและลากไอคอนเพื่อปรับการเรียงลำดับคอลัมน์',
        colTitle: 'ส่วนหัวของคอลัมน์',
        colResizable: 'ความกว้างของคอลัมน์ (พิกเซล)',
        colVisible: 'ไม่ว่าจะแสดง',
        colFixed: 'ตรึงคอลัมน์',
        colFixedMax: 'ตรึงคอลัมน์ (สูงสุด {0} คอลัมน์)',
        fixedLeft: 'ด้านซ้าย',
        fixedUnset: 'ไม่ได้ตั้งค่า',
        fixedRight: 'ด้านขวา'
      }
    },
    import: {
      modes: {
        covering: 'วิธีการเขียนทับ (เขียนทับข้อมูลตารางโดยตรง)',
        insert: 'ผนวกที่ด้านล่าง (ผนวกข้อมูลใหม่ที่ด้านล่างของตาราง)',
        insertTop: 'ผนวกด้านบน (ผนวกข้อมูลใหม่ที่ด้านบนของตาราง)',
        insertBottom: 'ผนวกที่ด้านล่าง (ผนวกข้อมูลใหม่ที่ด้านล่างของตาราง)'
      },
      impTitle: 'นำเข้าข้อมูล',
      impFile: 'ชื่อไฟล์',
      impSelect: 'เลือกไฟล์',
      impType: 'ประเภทไฟล์',
      impOpts: 'การตั้งค่าพารามิเตอร์',
      impMode: 'โหมดการนำเข้า',
      impConfirm: 'นำเข้า',
      impCancel: 'ยกเลิก'
    },
    export: {
      types: {
        csv: 'CSV (คั่นด้วยเครื่องหมายจุลภาค)(*.csv)',
        html: 'หน้าเว็บ (*.html)',
        xml: 'ข้อมูล XML (*.xml)',
        txt: 'ไฟล์ข้อความ (คั่นด้วยแท็บ) (*.txt)',
        xls: 'สมุดงาน Excel 97-2003 (*.xls)',
        xlsx: 'สมุดงาน Excel (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空数据',
        current: 'ข้อมูลปัจจุบัน (ข้อมูลของหน้าปัจจุบัน)',
        selected: 'ข้อมูลที่เลือก (ข้อมูลที่เลือกในหน้าปัจจุบัน)',
        all: 'ข้อมูลทั้งหมด (รวมถึงข้อมูลที่แบ่งหน้าทั้งหมด)'
      },
      printTitle: 'พิมพ์ข้อมูล',
      expTitle: 'ส่งออกข้อมูล',
      expName: 'ชื่อไฟล์',
      expNamePlaceholder: 'กรุณากรอกชื่อไฟล์',
      expSheetName: 'ชื่อ',
      expSheetNamePlaceholder: 'กรุณากรอกชื่อ',
      expType: 'บันทึกประเภท',
      expMode: 'เลือกข้อมูล',
      expCurrentColumn: 'ทุกสาขา',
      expColumn: 'เลือกฟิลด์',
      expOpts: 'การตั้งค่าพารามิเตอร์',
      expOptHeader: 'ส่วนหัว',
      expHeaderTitle: 'จำเป็นต้องมีส่วนหัวหรือไม่?',
      expOptFooter: 'ท้ายตาราง',
      expFooterTitle: 'จำเป็นต้องมีส่วนท้ายของตารางหรือไม่?',
      expOptColgroup: 'ส่วนหัวของกลุ่ม',
      expColgroupTitle: 'หากมี รองรับส่วนหัวที่มีโครงสร้างการจัดกลุ่ม',
      expOptMerge: 'ผสาน',
      expMergeTitle: 'รองรับเซลล์ที่มีโครงสร้างผสาน หากมี',
      expOptAllExpand: 'ขยายระดับ',
      expAllExpandTitle: 'หากมีอยู่จะรองรับการขยายข้อมูลทั้งหมดด้วยโครงสร้างแบบลำดับชั้น',
      expOptUseStyle: 'สไตล์',
      expUseStyleTitle: 'เซลล์ที่มีสไตล์ได้รับการสนับสนุน หากมี',
      expOptOriginal: 'แหล่งข้อมูล',
      expOriginalTitle: 'หากเป็นแหล่งข้อมูลก็รองรับการนำเข้าลงในตาราง',
      expPrint: 'พิมพ์',
      expConfirm: 'ส่งออก',
      expCancel: 'ยกเลิก'
    },
    modal: {
      errTitle: 'ข้อความแสดงข้อผิดพลาด',
      zoomMin: 'ย่อเล็กสุด',
      zoomIn: 'ขยายใหญ่สุด',
      zoomOut: 'การลดน้อยลง',
      close: 'ปิด',
      miniMaxSize: 'จำนวนหน้าต่างที่ย่อเล็กสุดต้องไม่เกิน {0}',
      footPropErr: 'show-footer ใช้เพื่อเปิดใช้งานส่วนท้ายของตารางเท่านั้นและจำเป็นต้องใช้กับ show-confirm-button |. show-cancel-button |'
    },
    drawer: {
      close: 'ปิด'
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
      zoomIn: 'เต็มจอ',
      zoomOut: 'การลดน้อยลง',
      custom: 'การตั้งค่าคอลัมน์',
      customAll: 'ทั้งหมด',
      customConfirm: 'ยืนยัน',
      customRestore: 'รีเซ็ต',
      fixedLeft: 'แช่แข็งทางซ้าย',
      fixedRight: 'แช่แข็งทางด้านขวา',
      cancelFixed: 'เลิกตรึงคอลัมน์'
    },
    input: {
      date: {
        m1: 'มกราคม',
        m2: 'กุมภาพันธ์',
        m3: 'มีนาคม',
        m4: 'เมษายน',
        m5: 'อาจ',
        m6: '06 มิถุนายน',
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
          w: 'สัปดาห์',
          w0: 'วันอาทิตย์',
          w1: 'ในวันจันทร์',
          w2: 'วันอังคาร',
          w3: 'วันพุธ',
          w4: 'วันพฤหัสบดี',
          w5: 'วันศุกร์',
          w6: 'วันเสาร์'
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
    numberInput: {
      currencySymbol: '￥'
    },
    imagePreview: {
      popupTitle: 'ดูตัวอย่าง',
      operBtn: {
        zoomOut: 'ซูมออก',
        zoomIn: 'ขยาย',
        pctFull: 'การปรับขนาดตามสัดส่วน',
        pct11: 'แสดงขนาดต้นฉบับ',
        rotateLeft: 'หมุนไปทางซ้าย',
        rotateRight: 'หมุนไปทางขวา',
        print: 'คลิกเพื่อพิมพ์ภาพ',
        download: 'คลิกเพื่อดาวน์โหลดภาพ'
      }
    },
    upload: {
      fileBtnText: 'คลิกหรือลากเพื่ออัปโหลด',
      imgBtnText: 'คลิกหรือลากเพื่ออัปโหลด',
      dragPlaceholder: 'โปรดลากและวางไฟล์ลงในบริเวณนี้เพื่ออัปโหลด',
      imgSizeHint: 'แผ่นพับ {0}',
      imgCountHint: 'สูงสุด {0} รูปภาพ',
      fileTypeHint: 'รองรับไฟล์ประเภท {0}',
      fileSizeHint: 'ขนาดของไฟล์เดียวไม่เกิน {0}',
      fileCountHint: 'สามารถอัปโหลดได้สูงสุด {0} ไฟล์',
      uploadTypeErr: 'ประเภทไฟล์ไม่ตรงกัน!',
      overCountErr: 'สามารถเลือกได้เพียง {0} ไฟล์เท่านั้น!',
      overCountExtraErr: 'เกินจำนวนไฟล์สูงสุด {0} ไฟล์แล้ว ไฟล์ {1} ที่เกินมาจะถูกละเว้น!',
      overSizeErr: 'ขนาดไฟล์สูงสุดต้องไม่เกิน {0}!',
      reUpload: 'อัปโหลดอีกครั้ง',
      uploadProgress: 'กำลังอัปโหลด {0}%',
      uploadErr: 'การอัปโหลดล้มเหลว',
      uploadSuccess: 'อัปโหลดสำเร็จ',
      moreBtnText: 'เพิ่มเติม ({0})',
      viewItemTitle: 'คลิกเพื่อดู',
      morePopup: {
        readTitle: 'ดูรายการ',
        imageTitle: 'อัพโหลดรูปภาพ',
        fileTitle: 'อัพโหลดไฟล์'
      }
    },
    empty: {
      defText: 'ยังไม่มีข้อมูล'
    },
    colorPicker: {
      clear: 'ชัดเจน',
      confirm: 'ยืนยัน',
      copySuccess: 'คัดลอกไปยังคลิปบอร์ด: {0}'
    },
    formDesign: {
      formName: 'ชื่อแบบฟอร์ม',
      defFormTitle: 'แบบฟอร์มที่ไม่มีชื่อ',
      widgetPropTab: 'คุณสมบัติการควบคุม',
      widgetFormTab: 'คุณสมบัติแบบฟอร์ม',
      error: {
        wdFormUni: 'อนุญาตให้เพิ่มตัวควบคุมประเภทนี้ลงในแบบฟอร์มได้เพียงรายการเดียวเท่านั้น',
        wdSubUni: 'อนุญาตให้เพิ่มการควบคุมประเภทนี้ได้เพียงรายการเดียวในตารางย่อย'
      },
      styleSetting: {
        btn: 'การตั้งค่าสไตล์',
        title: 'การตั้งค่ารูปแบบแบบฟอร์ม',
        layoutTitle: 'รูปแบบการควบคุม',
        verticalLayout: 'เค้าโครงด้านบนและด้านล่าง',
        horizontalLayout: 'เค้าโครงแนวนอน',
        styleTitle: 'สไตล์ชื่อเรื่อง',
        boldTitle: 'ชื่อเรื่องเป็นตัวหนา',
        fontBold: 'ตัวหนา',
        fontNormal: 'ธรรมดา',
        colonTitle: 'แสดงลำไส้ใหญ่',
        colonVisible: 'แสดง',
        colonHidden: 'ซ่อน',
        alignTitle: 'การจัดตำแหน่ง',
        widthTitle: 'ความกว้างของชื่อเรื่อง',
        alignLeft: 'ด้านซ้าย',
        alignRight: 'ทางด้านขวา',
        unitPx: 'พิกเซล',
        unitPct: 'เปอร์เซ็นต์'
      },
      widget: {
        group: {
          base: 'การควบคุมขั้นพื้นฐาน',
          layout: 'การควบคุมเค้าโครง',
          system: 'การควบคุมระบบ',
          module: 'การควบคุมโมดูล',
          chart: 'การควบคุมแผนภูมิ',
          advanced: 'การควบคุมขั้นสูง'
        },
        copyTitle: 'คัดลอก_{0}',
        component: {
          input: 'กล่องขาเข้า',
          textarea: 'ช่องข้อความ',
          select: 'การเลือกแบบเลื่อนลง',
          row: 'หนึ่งแถวและหลายคอลัมน์',
          title: 'ชื่อ',
          text: 'ข้อความ',
          subtable: 'ตารางย่อย',
          VxeSwitch: 'ไม่ว่า',
          VxeInput: 'กล่องขาเข้า',
          VxeNumberInput: 'ตัวเลข',
          VxeDatePicker: 'วันที่',
          VxeTextarea: 'ช่องข้อความ',
          VxeSelect: 'การเลือกแบบเลื่อนลง',
          VxeTreeSelect: 'การเลือกต้นไม้',
          VxeRadioGroup: 'ปุ่มตัวเลือก',
          VxeCheckboxGroup: 'ช่องทำเครื่องหมาย',
          VxeUploadFile: 'เอกสาร',
          VxeUploadImage: 'รูปภาพ',
          VxeRate: 'คะแนน',
          VxeSlider: 'แถบเลื่อน'
        }
      },
      widgetProp: {
        name: 'ชื่อการควบคุม',
        placeholder: 'พร้อมท์',
        required: 'การตรวจสอบที่จำเป็น',
        multiple: 'อนุญาตให้เลือกได้หลายรายการ',
        displaySetting: {
          name: 'การตั้งค่าการแสดงผล',
          pc: 'พีซี',
          mobile: 'รุ่นมือถือ',
          visible: 'แสดง',
          hidden: 'ซ่อน'
        },
        dataSource: {
          name: 'แหล่งข้อมูล',
          defValue: 'ตัวเลือก {0}',
          addOption: 'เพิ่มตัวเลือก',
          batchEditOption: 'การแก้ไขเป็นกลุ่ม',
          batchEditTip: 'แต่ละแถวสอดคล้องกับตัวเลือก และรองรับการคัดลอกและวางโดยตรงจากตาราง, Excel และ WPS',
          batchEditSubTip: 'แต่ละแถวสอดคล้องกับตัวเลือก หากเป็นกลุ่ม รายการย่อยสามารถเริ่มต้นด้วยการเว้นวรรคหรือคีย์แท็บ',
          buildOption: 'ตัวเลือกการสร้าง'
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
          boldTitle: 'ตัวอักษรตัวหนา',
          fontNormal: 'ธรรมดา',
          fontBold: 'ตัวหนา'
        },
        subtableProp: {
          seqTitle: 'หมายเลขซีเรียล',
          showSeq: 'แสดงหมายเลขซีเรียล',
          showCheckbox: 'อนุญาตให้เลือกได้หลายรายการ',
          errSubDrag: 'ตารางย่อยไม่รองรับการควบคุมนี้ โปรดใช้การควบคุมอื่น',
          colPlace: 'ลากตัวควบคุมเข้าไป'
        },
        uploadProp: {
          limitFileCount: 'ขีดจำกัดปริมาณไฟล์',
          limitFileSize: 'ขีดจำกัดขนาดไฟล์',
          multiFile: 'อนุญาตให้อัปโหลดหลายไฟล์',
          limitImgCount: 'ขีดจำกัดปริมาณรูปภาพ',
          limitImgSize: 'ขีดจำกัดขนาดรูปภาพ',
          multiImg: 'อนุญาตให้อัปโหลดหลายภาพ'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'การตั้งค่าภาคสนาม',
      listSettingTab: 'การตั้งค่าพารามิเตอร์',
      searchTitle: 'เงื่อนไขการสืบค้น',
      listTitle: 'ฟิลด์รายการ',
      searchField: 'ฟิลด์แบบสอบถาม',
      listField: 'ฟิลด์รายการ',
      activeBtn: {
        ActionButtonUpdate: 'แก้ไข',
        ActionButtonDelete: 'ลบ'
      },
      search: {
        addBtn: 'แก้ไข',
        emptyText: 'ไม่มีการกำหนดค่าเงื่อนไขแบบสอบถาม',
        editPopupTitle: 'แก้ไขฟิลด์แบบสอบถาม'
      },
      searchPopup: {
        colTitle: 'ชื่อ',
        saveBtn: 'บันทึก'
      }
    },
    text: {
      copySuccess: 'คัดลอกไปยังคลิปบอร์ดแล้ว',
      copyError: 'สภาพแวดล้อมปัจจุบันไม่รองรับการดำเนินการนี้'
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
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'การดำเนินการนี้ไม่สามารถทำได้บนเซลล์ที่ผสานแล้ว',
          multiErr: 'การดำเนินการนี้ไม่สามารถทำได้ในพื้นที่การเลือกหลายพื้นที่',
          selectErr: 'ไม่สามารถดำเนินการกับเซลล์ในช่วงที่กำหนดได้',
          extendErr: 'ถ้าช่วงขยายมีเซลล์ที่ผสาน เซลล์ที่ผสานทั้งหมดจะต้องมีขนาดเท่ากัน',
          pasteMultiErr: 'ไม่สามารถวางได้ พื้นที่ที่คัดลอกและวางจะต้องมีขนาดเท่ากันจึงจะดำเนินการนี้ได้',
          cpInvalidErr: 'ไม่สามารถดำเนินการได้ มีคอลัมน์ต้องห้าม ({0}) ในช่วงที่คุณเลือก'
        },
        fnr: {
          title: 'ค้นหาและแทนที่',
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
            whole: 'การจับคู่คำทั้งหมด',
            sensitive: 'คำนึงถึงขนาดตัวพิมพ์'
          },
          btns: {
            findNext: 'ค้นหาต่อไป',
            findAll: 'ค้นหาทั้งหมด',
            replace: 'แทนที่',
            replaceAll: 'เปลี่ยนทั้งหมด',
            cancel: 'ยกเลิก'
          },
          header: {
            seq: '#',
            cell: 'เซลล์',
            value: 'ค่า'
          },
          body: {
            row: 'แถว: {0}',
            col: 'คอลัมน์: {0}'
          },
          empty: '(ค่าว่าง)',
          reError: 'นิพจน์ทั่วไปไม่ถูกต้อง',
          recordCount: 'พบ {0} เซลล์',
          notCell: 'ไม่พบเซลล์ที่ตรงกัน',
          replaceSuccess: 'แทนที่เซลล์ {0} สำเร็จแล้ว'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'ตรึงคอลัมน์',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'เลิกตรึง',
          fixedLeft: 'แช่แข็งไปทางซ้าย',
          fixedRight: 'แช่แข็งขวา'
        },
        cases: {
          equal: 'เท่ากัน',
          gt: 'มากกว่า',
          lt: 'น้อยกว่า',
          begin: 'จุดเริ่มต้นก็คือ',
          endin: 'จุดสิ้นสุดคือ',
          include: 'รวม',
          isSensitive: 'คำนึงถึงขนาดตัวพิมพ์'
        }
      },
      filterCombination: {
        menus: {
          clearSort: 'เรียงลำดับให้ชัดเจน',
          sortAsc: 'ลำดับจากน้อยไปหามาก',
          sortDesc: 'ลำดับจากมากไปน้อย',
          fixedColumn: 'ตรึงคอลัมน์',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'เลิกตรึง',
          fixedLeft: 'แช่แข็งไปทางซ้าย',
          fixedRight: 'แช่แข็งขวา',
          clearFilter: 'ล้างตัวกรอง',
          textOption: 'ตัวกรองข้อความ',
          numberOption: 'ตัวกรองตัวเลข'
        },
        popup: {
          title: 'วิธีปรับแต่งการกรอง',
          currColumnTitle: 'คอลัมน์ปัจจุบัน:',
          and: 'และ',
          or: 'หรือ',
          describeHtml: 'Available ? แสดงถึงอักขระตัวเดียว<br/>ใช้ * เพื่อแสดงอักขระจำนวนเท่าใดก็ได้'
        },
        cases: {
          equal: 'เท่ากัน',
          unequal: 'ไม่เท่ากับ',
          gt: 'มากกว่า',
          ge: 'มากกว่าหรือเท่ากับ',
          lt: 'น้อยกว่า',
          le: 'น้อยกว่าหรือเท่ากับ',
          begin: 'จุดเริ่มต้นก็คือ',
          notbegin: 'ไม่ใช่ที่จุดเริ่มต้น',
          endin: 'จุดสิ้นสุดคือ',
          notendin: 'ตอนจบไม่ได้',
          include: 'รวม',
          exclude: 'ไม่รวม',
          between: 'ระหว่าง',
          custom: 'ตัวกรองแบบกำหนดเอง',
          insensitive: 'ไม่คำนึงถึงขนาดตัวพิมพ์',
          isSensitive: 'คำนึงถึงขนาดตัวพิมพ์'
        },
        empty: '(ว่างเปล่า)',
        notData: 'ไม่มีการแข่งขัน'
      }
    },
    pro: {
      area: {
        mergeErr: 'การดำเนินการนี้ไม่สามารถทำได้บนเซลล์ที่ผสานแล้ว',
        multiErr: 'การดำเนินการนี้ไม่สามารถทำได้ในพื้นที่การเลือกหลายพื้นที่',
        extendErr: 'ถ้าช่วงขยายมีเซลล์ที่ผสาน เซลล์ที่ผสานทั้งหมดจะต้องมีขนาดเท่ากัน',
        pasteMultiErr: 'ไม่สามารถวางได้ พื้นที่ที่คัดลอกและวางจะต้องมีขนาดเท่ากันจึงจะดำเนินการนี้ได้'
      },
      fnr: {
        title: 'ค้นหาและแทนที่',
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
          whole: 'การจับคู่คำทั้งหมด',
          sensitive: 'คำนึงถึงขนาดตัวพิมพ์'
        },
        btns: {
          findNext: 'ค้นหาต่อไป',
          findAll: 'ค้นหาทั้งหมด',
          replace: 'แทนที่',
          replaceAll: 'เปลี่ยนทั้งหมด',
          cancel: 'ยกเลิก'
        },
        header: {
          seq: '#',
          cell: 'เซลล์',
          value: 'ค่า'
        },
        empty: '(ค่าว่าง)',
        reError: 'นิพจน์ทั่วไปไม่ถูกต้อง',
        recordCount: 'พบ {0} เซลล์',
        notCell: 'ไม่พบเซลล์ที่ตรงกัน',
        replaceSuccess: 'แทนที่เซลล์ {0} สำเร็จแล้ว'
      }
    },
    renderer: {
      search: 'ค้นหา',
      cases: {
        equal: 'เท่ากัน',
        unequal: 'ไม่เท่ากับ',
        gt: 'มากกว่า',
        ge: 'มากกว่าหรือเท่ากับ',
        lt: 'น้อยกว่า',
        le: 'น้อยกว่าหรือเท่ากับ',
        begin: 'จุดเริ่มต้นก็คือ',
        notbegin: 'ไม่ใช่ที่จุดเริ่มต้น',
        endin: 'จุดสิ้นสุดคือ',
        notendin: 'ตอนจบไม่ได้',
        include: 'รวม',
        exclude: 'ไม่รวม',
        between: 'ระหว่าง',
        custom: 'ตัวกรองแบบกำหนดเอง',
        insensitive: 'ไม่คำนึงถึงขนาดตัวพิมพ์',
        isSensitive: 'คำนึงถึงขนาดตัวพิมพ์'
      },
      combination: {
        menus: {
          clearSort: 'เรียงลำดับให้ชัดเจน',
          sortAsc: 'ลำดับจากน้อยไปหามาก',
          sortDesc: 'ลำดับจากมากไปน้อย',
          fixedColumn: 'ตรึงคอลัมน์',
          fixedGroup: 'กลุ่มแช่แข็ง',
          cancelFixed: 'เลิกตรึง',
          fixedLeft: 'แช่แข็งไปทางซ้าย',
          fixedRight: 'แช่แข็งไปทางขวา',
          clearFilter: 'ล้างตัวกรอง',
          textOption: 'ตัวกรองข้อความ',
          numberOption: 'ตัวกรองตัวเลข'
        },
        popup: {
          title: 'วิธีปรับแต่งการกรอง',
          currColumnTitle: 'คอลัมน์ปัจจุบัน:',
          and: 'และ',
          or: 'หรือ',
          describeHtml: 'Available ? แสดงถึงอักขระตัวเดียว<br/>ใช้ * เพื่อแสดงอักขระจำนวนเท่าใดก็ได้'
        },
        empty: '(ว่างเปล่า)',
        notData: 'ไม่มีการแข่งขัน'
      }
    }
  }
}
