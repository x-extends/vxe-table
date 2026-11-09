export default {
  vxe: {
    base: {
      pleaseInput: 'يرجى الإدخال',
      pleaseSelect: 'يرجى الاختيار',
      comma: '،',
      fullStop: '.'
    },
    loading: {
      text: 'جارٍ التحميل...'
    },
    error: {
      downErr: 'فشل التنزيل',
      errLargeData: 'عندما تكون كمية البيانات المرتبطة كبيرة جدًا، يرجى استخدام {0}، وإلا فقد يحدث تقطيع',
      groupFixed: 'إذا تم استخدام رؤوس مجموعات، يجب تعيين الأعمدة المثبتة حسب المجموعة',
      groupMouseRange: 'لا يمكن استخدام رؤوس المجموعات مع "{0}" في نفس الوقت، وقد يحدث خطأ',
      groupTag: 'يجب استخدام "{0}" بدلاً من "{1}" لأعمدة رؤوس المجموعات، وقد يحدث خطأ',
      scrollErrProp: 'بعد تمكين التمرير الافتراضي، لا يتم دعم المعامل "{0}"',
      errConflicts: 'المعامل "{0}" يتعارض مع "{1}"',
      modelConflicts: 'قيمة الحقل المرتبط "{0}" تتعارض مع "{1}"، وسيحدث خطأ',
      notSupportProp: 'عند تمكين المعامل "{0}"، لا يتم دعم "{1}"، ويجب أن يكون "{2}"، وإلا سيحدث خطأ',
      reqSupportProp: 'عند استخدام "{0}"، يجب تعيين "{1}"، وإلا فقد يحدث خطأ',
      notConflictProp: 'عند استخدام "{0}"، يجب تعيين "{1}"، وإلا فقد يحدث تعارض في الوظائف',
      unableInsert: 'تعذر الإدراج في الموضع المحدد، يرجى التحقق من صحة المعاملات',
      useErr: 'حدث خطأ أثناء تثبيت الوحدة "{0}"، قد يكون الترتيب غير صحيح، ويجب تثبيت الوحدات التابعة قبل Table',
      barUnableLink: 'لا يمكن ربط شريط الأدوات بالجدول',
      expandContent: 'يجب أن يكون فتحة الصف الموسع "content"، يرجى التحقق من صحتها',
      reqComp: 'المكوّن "{0}" مفقود، يرجى التحقق من تثبيته بشكل صحيح. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'الوحدة "{0}" مفقودة',
      reqProp: 'المعامل المطلوب "{0}" مفقود، وقد يؤدي ذلك إلى حدوث خطأ',
      emptyProp: 'المعامل "{0}" لا يُسمح بأن يكون فارغًا',
      errProp: 'المعامل "{0}" غير مدعوم، قد يكون "{1}"',
      colRepet: 'column.{0}="{1}" مكرر، وقد يؤدي ذلك إلى عدم إمكانية استخدام بعض الوظائف',
      notFunc: 'الطريقة "{0}" غير موجودة',
      errFunc: 'المعامل "{0}" ليس طريقة',
      notValidators: 'المدقق العام "{0}" غير موجود',
      notFormats: 'المنسق العام "{0}" غير موجود',
      notCommands: 'الأمر العام "{0}" غير موجود',
      notSlot: 'الفتحة "{0}" غير موجودة',
      noTree: 'بنية الشجرة لا تدعم "{0}"',
      noGroup: 'بعد تجميع البيانات، لا يتم دعم "{0}"',
      notProp: 'المعامل "{0}" غير مدعوم',
      returnErr: 'القيمة المرجعة للمعامل "{0}" متوقعة أن تكون "{1}" لكنها فعليًا "{2}"',
      notSupportReturn: 'عندما تكون القيمة المرجعة "{0}"، يجب استخدام "{1}" بدلاً من "{2}" في المعامل',
      checkProp: 'عندما تكون كمية البيانات كبيرة جدًا، قد تتأخر مربعات الاختيار، ويُنصح بتعيين المعامل "{0}" لتحسين سرعة العرض',
      coverProp: 'المعامل "{1}" في "{0}" معرف بشكل مكرر، وقد يحدث خطأ',
      uniField: 'اسم الحقل "{0}" معرف بشكل مكرر، وقد يحدث خطأ',
      repeatKey: 'المفتاح الأساسي مكرر {0}="{1}"، وقد يحدث خطأ',
      repeatProp: 'المعامل مكرر {0}="{1}"، وقد يحدث خطأ',
      delFunc: 'الطريقة "{0}" مهجورة، يرجى استخدام "{1}"',
      delProp: 'المعامل "{0}" مهجور، يرجى استخدام "{1}"',
      delEvent: 'الحدث "{0}" مهجور، يرجى استخدام "{1}"',
      removeProp: 'المعامل "{0}" مهجور ولا يُنصح باستخدامه، وقد يؤدي إلى حدوث خطأ',
      errFormat: 'يجب تعريف محتوى التنسيق العام باستخدام "VXETable.formats"، وطريقة تركيب "formatter={0}" لم تعد موصى بها',
      notType: 'نوع الملف "{0}" غير مدعوم',
      notExp: 'هذا المتصفح لا يدعم وظيفة الاستيراد/التصدير',
      impFields: 'فشل الاستيراد، يرجى التحقق من صحة أسماء الحقول وتنسيق البيانات',
      treeNotImp: 'جدول الشجرة لا يدعم الاستيراد',
      treeCrossDrag: 'يمكن سحب المستوى الأول فقط',
      treeDragChild: 'لا يمكن سحب الأصل إلى أبنائه',
      reqPlugin: 'الإضافة الموسعة غير مثبتة "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'تم تجاوز الحد الأقصى المدعوم للبيانات {0} صفًا، وقد يحدث خطأ',
      useNew: 'لا يُنصح باستخدام {0}، يرجى استخدام {1}',
      errorVersion: 'عدم تطابق الإصدار، الإصدار الحالي {0}، والحد الأدنى المدعوم هو {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'لا توجد بيانات',
      allTitle: 'تحديد الكل/إلغاء',
      seqTitle: 'الرقم',
      actionTitle: 'الإجراء',
      confirmFilter: 'تصفية',
      resetFilter: 'إعادة تعيين',
      allFilter: 'الكل',
      sortAsc: 'تصاعدي: من الأقل إلى الأعلى',
      sortDesc: 'تنازلي: من الأعلى إلى الأقل',
      filter: 'تمكين التصفية للعمود المحدد',
      impSuccess: 'تم استيراد {0} سجل بنجاح',
      expLoading: 'جارٍ التصدير',
      expSuccess: 'تم التصدير بنجاح',
      expError: 'فشل التصدير',
      expFilename: 'تصدير_{0}',
      expOriginFilename: 'تصدير_المصدر_{0}',
      customTitle: 'إعدادات مخصصة',
      customAll: 'الكل',
      customConfirm: 'تأكيد',
      customClose: 'إغلاق',
      customCancel: 'إلغاء',
      customRestore: 'استعادة الافتراضي',
      maxFixedCol: 'الحد الأقصى لعدد الأعمدة المثبتة لا يمكن أن يتجاوز {0}',
      maxGroupCol: 'الحد الأقصى لعدد حقول التجميع لا يمكن أن يتجاوز {0}',
      dragTip: 'نقل: {0}',
      resizeColTip: 'العرض: {0} بكسل',
      resizeRowTip: 'الارتفاع: {0} بكسل',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'جارٍ التحميل...'
    },
    grid: {
      selectOneRecord: 'يرجى اختيار سجل واحد على الأقل!',
      deleteSelectRecord: 'هل أنت متأكد من حذف السجلات المحددة؟',
      removeSelectRecord: 'هل أنت متأكد من إزالة السجلات المحددة؟',
      dataUnchanged: 'لم تتغير البيانات!',
      delSuccess: 'تم حذف السجلات المحددة بنجاح!',
      saveSuccess: 'تم الحفظ بنجاح!',
      operError: 'حدث خطأ، فشلت العملية!'
    },
    select: {
      clear: 'مسح',
      allChecked: 'تحديد الكل',
      total: 'تم تحديد {0} عنصر',
      close: 'إغلاق',
      search: 'بحث',
      loadingText: 'جارٍ التحميل...',
      emptyText: 'لا توجد بيانات',
      maxSize: 'الحد الأقصى لعدد العناصر القابلة للتحديد لا يمكن أن يتجاوز {0}',
      overSizeErr: 'تم تجاوز الحد الأقصى للعناصر القابلة للتحديد {0}، وسيتم تجاهل الزائد!',
      searchEmpty: 'لم يتم العثور على بيانات مطابقة!'
    },
    list: {
      allChecked: 'تحديد الكل',
      dragTip: 'نقل: {0}'
    },
    tree: {
      searchEmpty: 'لم يتم العثور على بيانات مطابقة!',
      dragTip: 'نقل: {0}'
    },
    treeSelect: {
      clearChecked: 'مسح',
      allChecked: 'تحديد الكل',
      allExpand: 'توسيع الكل',
      clearExpand: 'طي الكل',
      total: 'تم تحديد {0} عنصر',
      filterCount: 'تم العثور على {0} سجل',
      close: 'إغلاق',
      search: 'بحث',
      emptyText: 'لا توجد بيانات'
    },
    tableSelect: {
      filterCount: 'تم العثور على {0} سجل'
    },
    pager: {
      goto: 'الانتقال إلى',
      gotoTitle: 'الصفحة',
      pagesize: '{0}/صفحة',
      total: 'إجمالي {0} سجل',
      pageClassifier: 'صفحة',
      homePage: 'الرئيسية',
      homePageTitle: 'الصفحة الأولى',
      prevPage: 'السابق',
      prevPageTitle: 'الصفحة السابقة',
      nextPage: 'التالي',
      nextPageTitle: 'الصفحة التالية',
      prevJump: 'قفز لأعلى',
      prevJumpTitle: 'قفز لأعلى',
      nextJump: 'قفز لأسفل',
      nextJumpTitle: 'قفز لأسفل',
      endPage: 'الأخيرة',
      endPageTitle: 'الصفحة الأخيرة'
    },
    alert: {
      title: 'رسالة النظام'
    },
    button: {
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      clear: 'مسح'
    },
    filter: {
      search: 'بحث'
    },
    custom: {
      cstmTitle: 'إعدادات مخصصة',
      cstmRestore: 'استعادة الافتراضي',
      cstmCancel: 'إلغاء',
      cstmConfirm: 'موافق',
      cstmConfirmRestore: 'يرجى تأكيد ما إذا كنت تريد استعادة إعدادات الأعمدة الافتراضية؟',
      cstmDragTarget: 'نقل: {0}',
      setting: {
        colSort: 'ترتيب',
        sortHelpTip: 'انقر على الأيقونة لبدء السحب',
        colTitle: 'عنوان العمود',
        colResizable: 'عرض العمود (بكسل)',
        colVisible: 'إظهار',
        colFixed: 'عمود مثبت',
        colFixedMax: 'أعمدة مثبتة ({0})',
        colAlign: 'محاذاة',
        colHeadAlign: 'محاذاة الرأس',
        colFootAlign: 'محاذاة التذييل',
        fixedLeft: 'يسار',
        fixedUnset: 'بدون',
        fixedRight: 'يمين',
        alignLeft: 'يسار',
        alignCenter: 'وسط',
        alignRight: 'يمين',
        moveUp: 'نقل لأعلى',
        moveDn: 'نقل لأسفل',
        putTop: 'نقل للأعلى',
        putBottom: 'نقل للأسفل',
        moveUpTitle: 'انقر للنقل لأعلى',
        moveDnTitle: 'انقر للنقل لأسفل',
        putTopTitle: 'انقر للنقل للأعلى',
        putBottomTitle: 'انقر للنقل للأسفل',
        anLeftTitle: 'محاذاة لليسار',
        anCenterTitle: 'محاذاة للوسط',
        anRightTitle: 'محاذاة لليمين'
      }
    },
    import: {
      modes: {
        covering: 'الكتابة فوق (استبدال بيانات الجدول مباشرة)',
        insert: 'إضافة في النهاية (إضافة بيانات جديدة في نهاية الجدول)',
        insertTop: 'إضافة في البداية (إضافة بيانات جديدة في بداية الجدول)',
        insertBottom: 'إضافة في النهاية (إضافة بيانات جديدة في نهاية الجدول)'
      },
      impTitle: 'استيراد البيانات',
      impFile: 'اسم الملف',
      impSelect: 'اختيار ملف',
      impType: 'نوع الملف',
      impOpts: 'إعدادات المعاملات',
      impMode: 'وضع الاستيراد',
      impConfirm: 'استيراد',
      impCancel: 'إلغاء'
    },
    export: {
      types: {
        csv: 'CSV (مفصول بفواصل)(*.csv)',
        html: 'صفحة ويب(*.html)',
        xml: 'بيانات XML(*.xml)',
        txt: 'ملف نصي (مفصول بعلامة تبويب)(*.txt)',
        xls: 'مصنف Excel 97-2003(*.xls)',
        xlsx: 'مصنف Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'بيانات فارغة',
        current: 'البيانات الحالية (بيانات الصفحة الحالية)',
        selected: 'البيانات المحددة (البيانات المحددة في الصفحة الحالية)',
        all: 'كل البيانات (بما في ذلك بيانات جميع الصفحات)'
      },
      printTitle: 'طباعة البيانات',
      expTitle: 'تصدير البيانات',
      expName: 'اسم الملف',
      expNamePlaceholder: 'يرجى إدخال اسم الملف',
      expSheetName: 'العنوان',
      expSheetNamePlaceholder: 'يرجى إدخال العنوان',
      expType: 'نوع الحفظ',
      expMode: 'اختيار البيانات',
      expCurrentColumn: 'كل الحقول',
      expColumn: 'اختيار الحقول',
      widthMode: 'إعدادات عرض العمود',
      wModeTitle: 'تعيين طريقة عرض عرض الأعمدة عند الطباعة',
      wdModes: {
        default: 'افتراضي',
        auto: 'تلقائي (ضبط عرض العمود حسب المحتوى)',
        scale: 'مقياس (عرض عرض العمود حسب مقياس الصفحة)'
      },
      expOpts: 'إعدادات المعاملات',
      expOptHeader: 'الرأس',
      expHeaderTitle: 'هل الرأس مطلوب',
      expOptFooter: 'التذييل',
      expFooterTitle: 'هل التذييل مطلوب',
      expOptColgroup: 'رأس مجمع',
      expOptTitle: 'عناوين الأعمدة',
      expTitleTitle: 'هل يتم استخدام عنوان العمود، وإلا يتم عرض اسم حقل العمود',
      expColgroupTitle: 'إذا كان موجودًا، فإنه يدعم الرؤوس ذات بنية المجموعات',
      expOptMerge: 'دمج',
      expMergeTitle: 'إذا كان موجودًا، فإنه يدعم الخلايا ذات بنية الدمج',
      expOptAllExpand: 'توسيع الشجرة',
      expAllExpandTitle: 'إذا كان موجودًا، فإنه يدعم توسيع كل البيانات ذات البنية الهرمية',
      expOptTreeAllExpand: 'توسيع الشجرة',
      expTreeAllExpandTitle: 'إذا كان موجودًا، يتم توسيع جميع مستويات الشجرة تلقائيًا',
      expOptRowGroupAllExpand: 'توسيع المجموعات',
      expRowGroupAllExpandTitle: 'إذا كان موجودًا، يتم توسيع جميع مستويات المجموعات تلقائيًا',
      expOptUseStyle: 'الأنماط',
      expUseStyleTitle: 'إذا كان موجودًا، فإنه يدعم الخلايا ذات الأنماط',
      expOptOriginal: 'البيانات المصدر',
      expOriginalTitle: 'إذا كانت بيانات مصدر، فإنه يدعم الاستيراد إلى الجدول',
      expPrint: 'طباعة',
      expConfirm: 'تصدير',
      expCancel: 'إلغاء'
    },
    modal: {
      errTitle: 'خطأ',
      zoomMin: 'تصغير',
      zoomIn: 'تكبير',
      zoomOut: 'استعادة',
      close: 'إغلاق',
      miniMaxSize: 'عدد النوافذ المصغرة لا يمكن أن يتجاوز {0}',
      footPropErr: 'show-footer يُستخدم فقط لتمكين التذييل، ويجب استخدامه مع show-confirm-button | show-cancel-button | الفتحات'
    },
    drawer: {
      close: 'إغلاق'
    },
    form: {
      folding: 'طي',
      unfolding: 'توسيع'
    },
    toolbar: {
      import: 'استيراد',
      export: 'تصدير',
      print: 'طباعة',
      refresh: 'تحديث',
      zoomIn: 'شاشة كاملة',
      zoomOut: 'استعادة',
      custom: 'إعدادات مخصصة',
      customAll: 'الكل',
      customConfirm: 'تأكيد',
      customRestore: 'إعادة تعيين',
      fixedLeft: 'تثبيت على اليسار',
      fixedRight: 'تثبيت على اليمين',
      cancelFixed: 'إلغاء تثبيت الأعمدة'
    },
    iconPicker: {
      search: 'بحث',
      emptyText: 'لا توجد بيانات'
    },
    datePicker: {
      yearTitle: 'سنة {0}'
    },
    dateRangePicker: {
      pleaseRange: 'يرجى اختيار تاريخ البداية وتاريخ النهاية'
    },
    input: {
      date: {
        m1: 'يناير',
        m2: 'فبراير',
        m3: 'مارس',
        m4: 'أبريل',
        m5: 'مايو',
        m6: 'يونيو',
        m7: 'يوليو',
        m8: 'أغسطس',
        m9: 'سبتمبر',
        m10: 'أكتوبر',
        m11: 'نوفمبر',
        m12: 'ديسمبر',
        quarterLabel: 'سنة {0}',
        monthLabel: 'سنة {0}',
        dayLabel: 'سنة {0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'الأسبوع WW من سنة yyyy',
          month: 'yyyy-MM',
          quarter: 'الربع q من سنة yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'الأحد',
          w1: 'الاثنين',
          w2: 'الثلاثاء',
          w3: 'الأربعاء',
          w4: 'الخميس',
          w5: 'الجمعة',
          w6: 'السبت'
        },
        months: {
          m0: 'يناير',
          m1: 'فبراير',
          m2: 'مارس',
          m3: 'أبريل',
          m4: 'مايو',
          m5: 'يونيو',
          m6: 'يوليو',
          m7: 'أغسطس',
          m8: 'سبتمبر',
          m9: 'أكتوبر',
          m10: 'نوفمبر',
          m11: 'ديسمبر'
        },
        quarters: {
          q1: 'الربع الأول',
          q2: 'الربع الثاني',
          q3: 'الربع الثالث',
          q4: 'الربع الرابع'
        }
      }
    },
    calendar: {
      yearLabel: 'سنة {0}',
      monthLabel: 'شهر {0}'
    },
    cascader: {
      clearChecked: 'مسح',
      allChecked: 'تحديد الكل',
      total: 'تم تحديد {0} عنصر',
      close: 'إغلاق',
      search: 'بحث'
    },
    numberInput: {
      currencySymbol: 'ج.م'
    },
    imagePreview: {
      popupTitle: 'معاينة',
      operBtn: {
        zoomOut: 'تصغير',
        zoomIn: 'تكبير',
        pctFull: 'ملاءمة الصفحة',
        pct11: 'عرض الحجم الأصلي',
        rotateLeft: 'تدوير لليسار',
        rotateRight: 'تدوير لليمين',
        print: 'انقر لطباعة الصورة',
        download: 'انقر لتنزيل الصورة'
      }
    },
    upload: {
      fileBtnText: 'انقر أو اسحب للرفع',
      imgBtnText: 'انقر أو اسحب للرفع',
      dragPlaceholder: 'يرجى سحب الملفات إلى هذه المنطقة للرفع',
      imgSizeHint: 'صورة واحدة {0}',
      imgCountHint: 'بحد أقصى {0} صورة',
      fileTypeHint: 'يدعم نوع الملف {0}',
      fileSizeHint: 'حجم الملف الواحد لا يتجاوز {0}',
      fileCountHint: 'يمكن رفع {0} ملف كحد أقصى',
      uploadTypeErr: 'نوع الملف غير مطابق!',
      overCountErr: 'يمكن اختيار {0} ملف كحد أقصى!',
      overCountExtraErr: 'تم تجاوز الحد الأقصى {0}، وسيتم تجاهل {1} ملف زائد!',
      overSizeErr: 'حجم الملف لا يمكن أن يتجاوز {0}!',
      manualUpload: 'انقر للرفع',
      reUpload: 'إعادة الرفع',
      uploadProgress: 'جارٍ الرفع {0}%',
      uploadErr: 'فشل الرفع',
      uploadSuccess: 'تم الرفع بنجاح',
      moreBtnText: 'المزيد ({0})',
      moreImgBtnText: 'الصور ({0})',
      moreFileBtnText: 'الملفات ({0})',
      viewItemTitle: 'انقر للعرض',
      morePopup: {
        readTitle: 'عرض القائمة',
        imageTitle: 'رفع الصور',
        fileTitle: 'رفع الملفات'
      }
    },
    empty: {
      defText: 'لا توجد بيانات'
    },
    colorPicker: {
      clear: 'مسح',
      confirm: 'تأكيد',
      copySuccess: 'تم النسخ إلى الحافظة: {0}',
      hex: 'ست عشري'
    },
    formDesign: {
      formName: 'اسم النموذج',
      defFormTitle: 'نموذج بدون اسم',
      widgetPropTab: 'خصائص عنصر التحكم',
      widgetFormTab: 'خصائص النموذج',
      error: {
        wdFormUni: 'هذا النوع من عناصر التحكم يمكن إضافته مرة واحدة فقط في النموذج',
        wdSubUni: 'هذا النوع من عناصر التحكم يمكن إضافته مرة واحدة فقط في الجدول الفرعي'
      },
      styleSetting: {
        btn: 'إعدادات النمط',
        title: 'إعدادات نمط النموذج',
        layoutTitle: 'تخطيط عناصر التحكم',
        verticalLayout: 'تخطيط عمودي',
        horizontalLayout: 'تخطيط أفقي',
        styleTitle: 'نمط العنوان',
        boldTitle: 'عنوان عريض',
        fontBold: 'عريض',
        fontNormal: 'عادي',
        colonTitle: 'إظهار النقطتين',
        colonVisible: 'إظهار',
        colonHidden: 'إخفاء',
        alignTitle: 'محاذاة',
        widthTitle: 'عرض العنوان',
        alignLeft: 'يسار',
        alignRight: 'يمين',
        unitPx: 'بكسل',
        unitPct: 'نسبة مئوية'
      },
      widget: {
        group: {
          base: 'عناصر تحكم أساسية',
          layout: 'عناصر تحكم التخطيط',
          system: 'عناصر تحكم النظام',
          module: 'عناصر تحكم الوحدات',
          chart: 'عناصر تحكم الرسوم البيانية',
          advanced: 'عناصر تحكم متقدمة'
        },
        copyTitle: 'نسخة_{0}',
        component: {
          input: 'مربع إدخال',
          textarea: 'منطقة نص',
          select: 'اختيار منسدل',
          row: 'صف متعدد الأعمدة',
          title: 'عنوان',
          text: 'نص',
          subtable: 'جدول فرعي',
          VxeSwitch: 'نعم/لا',
          VxeInput: 'مربع إدخال',
          VxeNumberInput: 'رقم',
          VxeDatePicker: 'تاريخ',
          VxeTextarea: 'منطقة نص',
          VxeSelect: 'اختيار منسدل',
          VxeTreeSelect: 'اختيار شجري',
          VxeRadioGroup: 'أزرار اختيار',
          VxeCheckboxGroup: 'مربعات اختيار',
          VxeUploadFile: 'ملف',
          VxeUploadImage: 'صورة',
          VxeRate: 'تقييم',
          VxeSlider: 'شريط تمرير'
        },
        row: {
          placeholder: 'موضع عنصر التحكم'
        }
      },
      widgetProp: {
        name: 'اسم عنصر التحكم',
        placeholder: 'نص التلميح',
        required: 'تحقق مطلوب',
        multiple: 'السماح بالتحديد المتعدد',
        displaySetting: {
          name: 'إعدادات العرض',
          pc: 'الكمبيوتر',
          mobile: 'الهاتف المحمول',
          visible: 'إظهار',
          hidden: 'إخفاء'
        },
        dataSource: {
          name: 'مصدر البيانات',
          defValue: 'خيار {0}',
          addOption: 'إضافة خيار',
          batchEditOption: 'تعديل جماعي',
          batchEditTip: 'كل سطر يقابل خيارًا واحدًا، ويدعم النسخ واللصق مباشرة من الجداول وExcel وWPS.',
          batchEditSubTip: 'كل سطر يقابل خيارًا واحدًا، وإذا كان تجميعًا، يمكن أن تبدأ العناصر الفرعية بمسافة أو مفتاح جدولة، ويدعم النسخ واللصق مباشرة من الجداول وExcel وWPS.',
          buildOption: 'إنشاء خيارات'
        },
        rowProp: {
          colSize: 'عدد الأعمدة',
          col2: 'عمودان',
          col3: 'ثلاثة أعمدة',
          col4: 'أربعة أعمدة',
          col6: 'ستة أعمدة',
          layout: 'تخطيط'
        },
        textProp: {
          name: 'المحتوى',
          alignTitle: 'محاذاة',
          alignLeft: 'يسار',
          alignCenter: 'وسط',
          alignRight: 'يمين',
          colorTitle: 'لون الخط',
          sizeTitle: 'حجم الخط',
          boldTitle: 'خط عريض',
          fontNormal: 'عادي',
          fontBold: 'عريض'
        },
        subtableProp: {
          seqTitle: 'الرقم',
          showSeq: 'إظهار الرقم',
          showCheckbox: 'السماح بالتحديد المتعدد',
          errSubDrag: 'الجدول الفرعي لا يدعم عنصر التحكم هذا، يرجى استخدام عنصر تحكم آخر',
          colPlace: 'اسحب عنصر التحكم إلى هنا'
        },
        uploadProp: {
          limitFileCount: 'حد عدد الملفات',
          limitFileSize: 'حد حجم الملف',
          multiFile: 'السماح برفع ملفات متعددة',
          limitImgCount: 'حد عدد الصور',
          limitImgSize: 'حد حجم الصورة',
          multiImg: 'السماح برفع صور متعددة'
        },
        rules: {
          required: 'حقل مطلوب'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'إعدادات الحقول',
      listSettingTab: 'إعدادات المعاملات',
      searchTitle: 'شروط البحث',
      listTitle: 'حقول القائمة',
      searchField: 'حقل البحث',
      listField: 'حقل القائمة',
      activeBtn: {
        ActionButtonUpdate: 'تعديل',
        ActionButtonDelete: 'حذف'
      },
      search: {
        addBtn: 'تعديل',
        emptyText: 'لم يتم تكوين شروط البحث',
        editPopupTitle: 'تعديل حقل البحث'
      },
      searchPopup: {
        colTitle: 'العنوان',
        saveBtn: 'حفظ'
      }
    },
    text: {
      copySuccess: 'تم النسخ إلى الحافظة',
      copyError: 'البيئة الحالية لا تدعم هذه العملية'
    },
    countdown: {
      formats: {
        yyyy: 'سنة',
        MM: 'شهر',
        dd: 'يوم',
        HH: 'ساعة',
        mm: 'دقيقة',
        ss: 'ثانية'
      }
    },
    contextMenu: {
      loadingText: 'جارٍ التحميل...'
    },
    switch: {
      onText: 'تشغيل',
      offText: 'إيقاف'
    },
    gantt: {
      tFullFormat: {
        year: 'سنة {yyyy}',
        quarter: 'الربع {q} من سنة {yyyy}',
        month: 'شهر {MM} من سنة {yyyy}',
        week: 'الأسبوع {W} من سنة {yyyy}',
        day: 'سنة {yyyy} شهر {MM} {eLabel}',
        date: 'سنة {yyyy} شهر {MM} يوم {dd}',
        hour: 'سنة {yyyy} شهر {MM} يوم {dd} الساعة {HH}',
        minute: 'سنة {yyyy} شهر {MM} يوم {dd} الساعة {HH}:{mm}',
        second: 'سنة {yyyy} شهر {MM} يوم {dd} الساعة {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: 'سنة {yyyy}',
        quarter: 'الربع {q}',
        month: 'شهر {M}',
        week: 'أسبوع {W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: 'سنة {start.yyyy}~{end.yyyy}',
        quarter: 'الربع {start.q}~{end.q}',
        month: 'شهر {start.M}~{end.M}',
        week: 'أسبوع {start.W}~{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'أحد',
        w1: 'اثن',
        w2: 'ثلا',
        w3: 'أرب',
        w4: 'خمي',
        w5: 'جمع',
        w6: 'سبت'
      },
      days: {
        w0: 'الأحد',
        w1: 'الاثنين',
        w2: 'الثلاثاء',
        w3: 'الأربعاء',
        w4: 'الخميس',
        w5: 'الجمعة',
        w6: 'السبت'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'لا يمكن تنفيذ هذه العملية على الخلايا المدمجة',
          multiErr: 'لا يمكن تنفيذ هذه العملية على مناطق متعددة محددة',
          selectErr: 'لا يمكن تشغيل خلايا المنطقة المحددة',
          extendErr: 'لتنفيذ هذه العملية، يجب أن تكون جميع الخلايا المدمجة بنفس الحجم',
          pasteMultiErr: 'تعذر اللصق، يجب أن تكون منطقة النسخ ومنطقة اللصق بنفس الحجم لتنفيذ هذه العملية',
          cpInvalidErr: 'لا يمكن تنفيذ هذه العملية، المنطقة المحددة تحتوي على أعمدة محظورة ({0})'
        },
        fnr: {
          title: 'بحث واستبدال',
          titleFd: 'بحث',
          titleRe: 'استبدال',
          findLabel: 'بحث',
          replaceLabel: 'استبدال',
          findTitle: 'البحث عن:',
          replaceTitle: 'استبدال بـ:',
          tabs: {
            find: 'بحث',
            replace: 'استبدال'
          },
          filter: {
            re: 'تعبير نمطي',
            whole: 'مطابقة الكلمة كاملة',
            sensitive: 'حساس لحالة الأحرف'
          },
          btns: {
            findNext: 'بحث عن التالي',
            findAll: 'بحث عن الكل',
            replace: 'استبدال',
            replaceAll: 'استبدال الكل',
            cancel: 'إلغاء'
          },
          header: {
            seq: '#',
            cell: 'الخلية',
            value: 'القيمة'
          },
          body: {
            row: 'الصف: {0}',
            col: 'العمود: {0}'
          },
          empty: '(فارغ)',
          reError: 'تعبير نمطي غير صالح',
          recordCount: 'تم العثور على {0} خلية',
          notCell: 'لم يتم العثور على خلية مطابقة',
          replaceSuccess: 'تم استبدال {0} خلية بنجاح'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'تجميع',
          values: 'قيم',
          groupPlaceholder: 'اسحب إلى هنا للتجميع',
          valuesPlaceholder: 'اسحب إلى هنا للتجميع الإحصائي',
          dragExistCol: 'هذا العمود موجود بالفعل',
          sortHelpTip: 'انقر على الأيقونة لبدء السحب'
        },
        aggFuncs: {
          sum: 'المجموع',
          count: 'العدد',
          avg: 'المتوسط',
          min: 'الحد الأدنى',
          max: 'الحد الأقصى',
          first: 'أول قيمة',
          last: 'آخر قيمة'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'عمود مثبت',
          fixedGroup: 'مجموعة مثبتة',
          cancelFixed: 'إلغاء التثبيت',
          fixedLeft: 'تثبيت على اليسار',
          fixedRight: 'تثبيت على اليمين'
        },
        cases: {
          equal: 'يساوي',
          gt: 'أكبر من',
          lt: 'أصغر من',
          begin: 'يبدأ بـ',
          endin: 'ينتهي بـ',
          include: 'يحتوي على',
          isSensitive: 'حساس لحالة الأحرف'
        }
      },
      filterCombination: {
        menus: {
          sort: 'ترتيب',
          clearSort: 'مسح الترتيب',
          sortAsc: 'تصاعدي',
          sortDesc: 'تنازلي',
          fixedColumn: 'عمود مثبت',
          fixedGroup: 'مجموعة مثبتة',
          cancelFixed: 'إلغاء التثبيت',
          fixedLeft: 'تثبيت على اليسار',
          fixedRight: 'تثبيت على اليمين',
          clearFilter: 'مسح التصفية',
          textOption: 'تصفية النص',
          numberOption: 'تصفية الأرقام',
          dateOption: 'تصفية التاريخ'
        },
        popup: {
          title: 'طريقة التصفية المخصصة',
          currColumnTitle: 'عرض الصفوف:',
          and: 'و',
          or: 'أو',
          describeHtml: 'يمكن استخدام ? لتمثيل حرف واحد<br/>واستخدام * لتمثيل أي عدد من الأحرف'
        },
        cases: {
          equal: 'يساوي',
          unequal: 'لا يساوي',
          gt: 'أكبر من',
          ge: 'أكبر من أو يساوي',
          lt: 'أصغر من',
          le: 'أصغر من أو يساوي',
          begin: 'يبدأ بـ',
          notbegin: 'لا يبدأ بـ',
          endin: 'ينتهي بـ',
          notendin: 'لا ينتهي بـ',
          include: 'يحتوي على',
          exclude: 'لا يحتوي على',
          between: 'بين',
          isAfter: 'بعد التاريخ التالي',
          eqAfter: 'بعد التاريخ التالي أو نفس التاريخ',
          isBefore: 'قبل التاريخ التالي',
          eqBefore: 'قبل التاريخ التالي أو نفس التاريخ',
          top10: 'أعلى 10 عناصر',
          aboveAverage: 'أعلى من المتوسط',
          belowAverage: 'أقل من المتوسط',
          before: 'قبل',
          after: 'بعد',
          tomorrow: 'غدًا',
          today: 'اليوم',
          yesterday: 'أمس',
          nextWeek: 'الأسبوع القادم',
          thisWeek: 'هذا الأسبوع',
          lastWeek: 'الأسبوع الماضي',
          nextMonth: 'الشهر القادم',
          thisMonth: 'هذا الشهر',
          lastMonth: 'الشهر الماضي',
          nextYear: 'السنة القادمة',
          thisYear: 'هذه السنة',
          lastYear: 'السنة الماضية',
          yearToDate: 'من بداية العام حتى الآن',
          custom: 'تصفية مخصصة',
          insensitive: 'غير حساس لحالة الأحرف',
          isSensitive: 'حساس لحالة الأحرف'
        },
        empty: '(فارغ)',
        notData: 'لا توجد مطابقات'
      }
    },
    pro: {
      area: {
        mergeErr: 'لا يمكن تنفيذ هذه العملية على الخلايا المدمجة',
        multiErr: 'لا يمكن تنفيذ هذه العملية على مناطق متعددة محددة',
        extendErr: 'لتنفيذ هذه العملية، يجب أن تكون جميع الخلايا المدمجة بنفس الحجم',
        pasteMultiErr: 'تعذر اللصق، يجب أن تكون منطقة النسخ ومنطقة اللصق بنفس الحجم لتنفيذ هذه العملية'
      },
      fnr: {
        title: 'بحث واستبدال',
        titleFd: 'بحث',
        titleRe: 'استبدال',
        findLabel: 'بحث',
        replaceLabel: 'استبدال',
        findTitle: 'البحث عن:',
        replaceTitle: 'استبدال بـ:',
        tabs: {
          find: 'بحث',
          replace: 'استبدال'
        },
        filter: {
          re: 'تعبير نمطي',
          whole: 'مطابقة الكلمة كاملة',
          sensitive: 'حساس لحالة الأحرف'
        },
        btns: {
          findNext: 'بحث عن التالي',
          findAll: 'بحث عن الكل',
          replace: 'استبدال',
          replaceAll: 'استبدال الكل',
          cancel: 'إلغاء'
        },
        header: {
          seq: '#',
          cell: 'الخلية',
          value: 'القيمة'
        },
        empty: '(فارغ)',
        reError: 'تعبير نمطي غير صالح',
        recordCount: 'تم العثور على {0} خلية',
        notCell: 'لم يتم العثور على خلية مطابقة',
        replaceSuccess: 'تم استبدال {0} خلية بنجاح'
      }
    },
    renderer: {
      search: 'بحث',
      cases: {
        equal: 'يساوي',
        unequal: 'لا يساوي',
        gt: 'أكبر من',
        ge: 'أكبر من أو يساوي',
        lt: 'أصغر من',
        le: 'أصغر من أو يساوي',
        begin: 'يبدأ بـ',
        notbegin: 'لا يبدأ بـ',
        endin: 'ينتهي بـ',
        notendin: 'لا ينتهي بـ',
        include: 'يحتوي على',
        exclude: 'لا يحتوي على',
        between: 'بين',
        top10: 'أعلى 10 عناصر',
        aboveAverage: 'أعلى من المتوسط',
        belowAverage: 'أقل من المتوسط',
        custom: 'تصفية مخصصة',
        insensitive: 'غير حساس لحالة الأحرف',
        isSensitive: 'حساس لحالة الأحرف'
      },
      combination: {
        menus: {
          sort: 'ترتيب',
          clearSort: 'مسح الترتيب',
          sortAsc: 'تصاعدي',
          sortDesc: 'تنازلي',
          fixedColumn: 'عمود مثبت',
          fixedGroup: 'مجموعة مثبتة',
          cancelFixed: 'إلغاء التثبيت',
          fixedLeft: 'تثبيت على اليسار',
          fixedRight: 'تثبيت على اليمين',
          clearFilter: 'مسح التصفية',
          textOption: 'تصفية النص',
          numberOption: 'تصفية الأرقام',
          dateOption: 'تصفية التاريخ'
        },
        popup: {
          title: 'طريقة التصفية المخصصة',
          currColumnTitle: 'عرض الصفوف:',
          and: 'و',
          or: 'أو',
          describeHtml: 'يمكن استخدام ? لتمثيل حرف واحد<br/>واستخدام * لتمثيل أي عدد من الأحرف'
        },
        empty: '(فارغ)',
        notData: 'لا توجد مطابقات'
      }
    }
  }
}
