export default {
  vxe: {
    base: {
      pleaseInput: 'الرجاء الدخول',
      pleaseSelect: 'الرجاء تحديد',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'تحميل...'
    },
    error: {
      downErr: 'فشل التنزيل',
      errLargeData: 'عندما تكون كمية البيانات المرتبطة كبيرة جدًا ، يرجى استخدام {0} ، وإلا فقد يتسبب ذلك في تأخر',
      groupFixed: 'إذا كنت تستخدم الرؤوس المجمعة ، فيجب تعيين العمود المجمد بواسطة المجموعة',
      groupMouseRange: 'لا يمكن استخدام رأس التجميع في نفس الوقت مثل "{0}" وقد يسبب هذا خطأ',
      groupTag: 'يجب أن تستخدم رؤوس عمود التجميع "{0}" بدلاً من "{1}" ، والتي قد تسبب أخطاء',
      scrollErrProp: 'لا يتم دعم هذه المعلمة "{0}" بعد تمكين التمرير الظاهري',
      errConflicts: 'المعلمة "{0}" تتعارض مع "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      notSupportProp: 'لا يتم دعم "{1}" عند تمكين المعلمة "{0}" ، يجب أن يكون "{2}" ، وإلا',
      notConflictProp: 'عند استخدام "{0}" ، يجب تعيين "{1}" ، وإلا قد يكون هناك تعارضات وظيفية',
      unableInsert: 'لا يمكن إدراجها في الموقع المحدد ، يرجى التحقق مما إذا كانت المعلمات صحيحة',
      useErr: 'حدث خطأ أثناء تثبيت وحدة "{0}". قد يكون الطلب غير صحيح. يجب تثبيت الوحدة التابعة قبل الجدول',
      barUnableLink: 'لا يمكن أن يربط شريط الأدوات الجداول',
      expandContent: 'يجب أن تكون الفتحة الخاصة بالخط الموسع "محتوى" ، يرجى التحقق مما إذا كان هذا صحيحًا',
      reqComp: 'مكون المكون "{0}" مفقود ، يرجى التحقق مما إذا تم تثبيته بشكل صحيح. https://vxeui.com/#/start/usglobal',
      reqModule: 'مفقود "{0}" الوحدة النمطية',
      reqProp: 'المعلمة الضرورية "{0}" مفقودة ، والتي قد تسبب خطأ',
      emptyProp: 'المعلمة "{0}" غير مسموح لها أن تكون فارغة',
      errProp: 'المعلمة غير المدعومة "{0}" ، ربما "{1}"',
      colRepet: 'يتكرر العمود. {0} = "{1}" ، مما قد يتسبب في أن تصبح بعض الوظائف غير صالحة للاستعمال',
      notFunc: 'الطريقة "{0}" غير موجودة',
      errFunc: 'المعلمة "{0}" ليست طريقة',
      notValidators: 'التحقق العالمي "{0}" غير موجود',
      notFormats: 'التنسيق العالمي "{0}" غير موجود',
      notCommands: 'التوجيه العالمي "{0}" غير موجود',
      notSlot: 'الفتحة "{0}" غير موجودة',
      noTree: '"{0}" غير مدعوم في بنية الشجرة',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'المعلمة غير المدعومة "{0}"',
      checkProp: 'عندما يكون حجم البيانات كبيرًا جدًا ، قد يتم تعثر خانة الاختيار. يوصى بتعيين المعلمة "{0}" لتحسين سرعة التقديم',
      coverProp: 'يتم تعريف المعلمة "{1}" من "{0}" مرارًا وتكرارًا ، والتي قد تسبب خطأً',
      uniField: 'يتم تعريف اسم الحقل "{0}" مرارًا وتكرارًا ، مما قد يسبب خطأ',
      repeatKey: 'كرر المفتاح الأساسي {0} = "{1}" ، والذي قد يسبب خطأ',
      delFunc: 'تم إهمال الطريقة "{0}" ، يرجى استخدام "{1}"',
      delProp: 'يتم إهمال المعلمة "{0}" ، يرجى استخدام "{1}"',
      delEvent: 'تم إهمال الحدث "{0}" ، يرجى استخدام "{1}"',
      removeProp: 'يتم إهمال المعلمة "{0}" ولا ينصح بها ، مما قد يتسبب في حدوث خطأ',
      errFormat: 'يجب تعريف المحتوى العالمي المنسق باستخدام "vxetable.formats" وطريقة تصاعد "Formatter = {0}" لم يعد موصى به.',
      notType: 'نوع الملف غير المدعوم "{0}"',
      notExp: 'لا يدعم هذا المتصفح وظيفة الاستيراد/التصدير',
      impFields: 'فشل الاستيراد. يرجى التحقق مما إذا كان اسم الحقل وتنسيق البيانات صحيحين.',
      treeNotImp: 'لا تدعم جداول الأشجار الاستيراد',
      treeCrossDrag: 'فقط اسحب المستوى الأول',
      treeDragChild: 'لا يمكن للآباء السحب إلى أطفالهم',
      reqPlugin: '"{1}" لم يتم تثبيته على https://vxeui.com/other',
      errMaxRow: 'تجاوز الحد الأقصى لصفوف البيانات المدعومة {0} ، قد يتسبب ذلك في حدوث خطأ',
      useNew: '不建议使用 {0}，请使用 {1}'
    },
    table: {
      emptyText: 'لا توجد بيانات حتى الآن',
      allTitle: 'حدد الكل/إلغاء',
      seqTitle: 'رقم سري',
      actionTitle: 'تعمل',
      confirmFilter: 'فلتر',
      resetFilter: 'إعادة ضبط',
      allFilter: 'الجميع',
      sortAsc: 'ترتيب تصاعدي: أدنى إلى الأعلى',
      sortDesc: 'ترتيب تنازلي: الأعلى إلى الأدنى',
      filter: 'تمكين التصفية للأعمدة المحددة',
      impSuccess: 'سجلات {0} التي تم استيرادها بنجاح',
      expLoading: 'التصدير',
      expSuccess: 'التصدير بنجاح',
      expError: 'فشل التصدير',
      expFilename: 'export_ {0}',
      expOriginFilename: 'export_source_ {0}',
      customTitle: 'إعدادات العمود',
      customAll: 'الجميع',
      customConfirm: 'يتأكد',
      customClose: 'إنهاء',
      customCancel: 'يلغي',
      customRestore: 'استعادة الافتراضي',
      maxFixedCol: 'لا يمكن أن يتجاوز الحد الأقصى لعدد الأعمدة المجمدة {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'نقل: {0}',
      resizeColTip: 'العرض: {0} بكسل',
      resizeRowTip: 'الارتفاع: {0} بكسل',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'الرجاء تحديد سجل واحد على الأقل!',
      deleteSelectRecord: 'هل أنت متأكد من أنك تريد حذف السجل المحدد؟',
      removeSelectRecord: 'هل أنت متأكد من أنك تريد إزالة السجل المحدد؟',
      dataUnchanged: 'البيانات لم تتغير!',
      delSuccess: 'تم حذف السجل المحدد بنجاح!',
      saveSuccess: 'حفظ بنجاح!',
      operError: 'حدث خطأ وفشلت العملية!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'يبحث',
      loadingText: 'تحميل',
      emptyText: 'لا توجد بيانات حتى الآن',
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
      search: 'Search',
      emptyText: '暂无数据'
    },
    pager: {
      goto: 'يذهب',
      gotoTitle: 'عدد الصفحات',
      pagesize: '{0} العناصر/الصفحة',
      total: 'إجمالي السجلات {0}',
      pageClassifier: 'صفحة',
      homePage: 'الصفحة الأولى',
      homePageTitle: 'الصفحة الأولى',
      prevPage: 'الصفحة السابقة',
      prevPageTitle: 'الصفحة السابقة',
      nextPage: 'الصفحة التالية',
      nextPageTitle: 'الصفحة التالية',
      prevJump: 'القفز فوق الصفحة',
      prevJumpTitle: 'القفز فوق الصفحة',
      nextJump: 'القفز أسفل الصفحة',
      nextJumpTitle: 'القفز أسفل الصفحة',
      endPage: 'الصفحة الأخيرة',
      endPageTitle: 'الصفحة الأخيرة'
    },
    alert: {
      title: 'مطالبات النظام'
    },
    button: {
      confirm: 'يتأكد',
      cancel: 'يلغي',
      clear: 'واضح'
    },
    filter: {
      search: 'يبحث'
    },
    custom: {
      cstmTitle: 'إعدادات العمود',
      cstmRestore: 'استعادة الافتراضي',
      cstmCancel: 'يلغي',
      cstmConfirm: 'بالتأكيد',
      cstmConfirmRestore: 'يرجى تأكيد ما إذا كان تم استعادته إلى تكوين العمود الافتراضي؟',
      cstmDragTarget: 'نقل: {0}',
      setting: {
        colSort: 'نوع',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'عنوان العمود',
        colResizable: 'عرض العمود (بكسل)',
        colVisible: 'ما إذا كان لعرض',
        colFixed: 'عمود تجميد',
        colFixedMax: 'أعمدة تجميد (تصل إلى {0})',
        fixedLeft: 'الجانب الأيسر',
        fixedUnset: 'لم يتم تعيينه',
        fixedRight: 'الجانب الأيمن'
      }
    },
    import: {
      modes: {
        covering: 'طريقة الكتابة فوق (بيانات جدول الكتابة مباشرة)',
        insert: 'إلحاق في الأسفل (إلحاق بيانات جديدة في أسفل الجدول)',
        insertTop: 'إلحاق في الجزء العلوي (إلحاق بيانات جديدة في الجزء العلوي من الجدول)',
        insertBottom: 'إلحاق في الأسفل (إلحاق بيانات جديدة في أسفل الجدول)'
      },
      impTitle: 'استيراد البيانات',
      impFile: 'اسم الملف',
      impSelect: 'حدد الملف',
      impType: 'نوع الملف',
      impOpts: 'إعدادات المعلمة',
      impMode: 'وضع الاستيراد',
      impConfirm: 'يستورد',
      impCancel: 'يلغي'
    },
    export: {
      types: {
        csv: 'CSV (فاصلة منفصلة) (*. CSV)',
        html: 'صفحة الويب (*.html)',
        xml: 'بيانات XML (*.xml)',
        txt: 'ملف نصي (علامة تبويب مفصول) (*. txt)',
        xls: 'Excel 97-2003 مصنف (*.xls)',
        xlsx: 'مصنف Excel (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'بيانات فارغة',
        current: 'البيانات الحالية (بيانات على الصفحة الحالية)',
        selected: 'البيانات المحددة (البيانات المحددة في الصفحة الحالية)',
        all: 'البيانات الكاملة (بما في ذلك جميع البيانات المليئة)'
      },
      printTitle: 'طباعة البيانات',
      expTitle: 'بيانات التصدير',
      expName: 'اسم الملف',
      expNamePlaceholder: 'الرجاء إدخال اسم ملف',
      expSheetName: 'عنوان',
      expSheetNamePlaceholder: 'الرجاء إدخال العنوان',
      expType: 'حفظ النوع',
      expMode: 'حدد البيانات',
      expCurrentColumn: 'جميع الحقول',
      expColumn: 'حدد الحقل',
      expOpts: 'إعدادات المعلمة',
      expOptHeader: 'رأس',
      expHeaderTitle: 'هل رأس الجدول مطلوب',
      expOptFooter: 'نهاية الجدول',
      expFooterTitle: 'هل نهاية الجدول مطلوبة؟',
      expOptColgroup: 'تجميع رأس',
      expOptTitle: 'عنوان العمود',
      expTitleTitle: 'سواء كان عنوان العمود ، وإلا سيتم عرضه كاسم حقل العمود',
      expColgroupTitle: 'إذا كان موجودًا ، يتم دعم رأس بهكل تجميع',
      expOptMerge: 'دمج',
      expMergeTitle: 'إذا كانت موجودة ، يتم دعم الخلايا ذات الهياكل المدمجة',
      expOptAllExpand: 'توسيع الشجرة',
      expAllExpandTitle: 'إذا كانت موجودة ، فسيتم دعمها لتوسيع جميع البيانات بالهياكل الهرمية',
      expOptUseStyle: 'أسلوب',
      expUseStyleTitle: 'إذا كانت موجودة ، يتم دعم الخلايا ذات الأناقة',
      expOptOriginal: 'بيانات المصدر',
      expOriginalTitle: 'إذا كانت بيانات المصدر ، فسيتم دعم الاستيراد إلى الجداول',
      expPrint: 'مطبعة',
      expConfirm: 'يصدّر',
      expCancel: 'يلغي'
    },
    modal: {
      errTitle: 'رسالة الخطأ',
      zoomMin: 'تقليل',
      zoomIn: 'تعظيم',
      zoomOut: 'تخفيض',
      close: 'إنهاء',
      miniMaxSize: 'لا يمكن أن يتجاوز عدد Windows المصقول {0}',
      footPropErr: 'يتم استخدام show-tooter فقط لتمكين ذيل الجدول ، ويجب استخدامه مع عرض الظهور | عرض العظام بوت | فتحات'
    },
    drawer: {
      close: 'إنهاء'
    },
    form: {
      folding: 'يغلق',
      unfolding: 'يوسع'
    },
    toolbar: {
      import: 'يستورد',
      export: 'يصدّر',
      print: 'مطبعة',
      refresh: 'ينعش',
      zoomIn: 'ملء الشاشة',
      zoomOut: 'تخفيض',
      custom: 'إعدادات العمود',
      customAll: 'الجميع',
      customConfirm: 'يتأكد',
      customRestore: 'إعادة ضبط',
      fixedLeft: 'تجميد اليسار',
      fixedRight: 'تجميد الحق',
      cancelFixed: 'إلغاء التجميد'
    },
    datePicker: {
      yearTitle: '{0} سنوات'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'يناير',
        m2: 'فبراير',
        m3: 'يمشي',
        m4: 'أبريل',
        m5: 'يمكن',
        m6: 'يونيو',
        m7: 'يوليو',
        m8: 'أغسطس',
        m9: 'سبتمبر',
        m10: 'أكتوبر',
        m11: 'نوفمبر',
        m12: 'ديسمبر',
        quarterLabel: '{0} سنوات',
        monthLabel: '{0} سنوات',
        dayLabel: '{0} year {1}',
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
          w0: 'شمس',
          w1: 'الاثنين',
          w2: 'الثلاثاء',
          w3: 'تزوج',
          w4: 'الخميس',
          w5: 'الجمعة',
          w6: 'قعد'
        },
        months: {
          m0: 'يناير',
          m1: 'فبراير',
          m2: 'يمشي',
          m3: 'أبريل',
          m4: 'يمكن',
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
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'معاينة',
      operBtn: {
        zoomOut: 'تقلص',
        zoomIn: 'تكبير',
        pctFull: 'التحجيم بالتساوي',
        pct11: 'إظهار الحجم الأصلي',
        rotateLeft: 'تدوير اليسار',
        rotateRight: 'تدوير إلى اليمين',
        print: 'انقر لطباعة الصورة',
        download: 'انقر لتنزيل الصورة'
      }
    },
    upload: {
      fileBtnText: 'انقر أو اسحب للتحميل',
      imgBtnText: 'انقر أو اسحب للتحميل',
      dragPlaceholder: 'يرجى سحب الملف وإسقاطه إلى هذا المجال لتحميل',
      imgSizeHint: 'نشرة {0}',
      imgCountHint: 'أقصى صور {0}',
      fileTypeHint: 'دعم {0} أنواع الملفات',
      fileSizeHint: 'حجم ملف واحد لا يتجاوز {0}',
      fileCountHint: 'يمكن تحميل ملفات ما يصل إلى {0}',
      uploadTypeErr: 'نوع الملف عدم تطابق!',
      overCountErr: 'يمكن تحديد ملفات {0} فقط على الأكثر!',
      overCountExtraErr: 'تم تجاوز الحد الأقصى لعدد {0} ، وسيتم تجاهل الملفات الزائدة {1}!',
      overSizeErr: 'لا يمكن أن يتجاوز حجم الملف الأقصى {0}!',
      manualUpload: '点击上传',
      reUpload: 'إعادة التحميل',
      uploadProgress: 'تحميل {0} ٪',
      uploadErr: 'فشل التحميل',
      uploadSuccess: 'التحميل بنجاح',
      moreBtnText: 'المزيد ({0})',
      viewItemTitle: 'انقر للعرض',
      morePopup: {
        readTitle: 'عرض قائمة',
        imageTitle: 'تحميل الصور',
        fileTitle: 'ملف تحميل'
      }
    },
    empty: {
      defText: 'لا توجد بيانات حتى الآن'
    },
    colorPicker: {
      clear: 'واضح',
      confirm: 'يتأكد',
      copySuccess: 'نسخ إلى الحافظة: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'اسم النموذج',
      defFormTitle: 'شكل لم يكشف عن اسمه',
      widgetPropTab: 'خصائص التحكم',
      widgetFormTab: 'تشكيل الخصائص',
      error: {
        wdFormUni: 'يُسمح لهذا النوع من التحكم بإضافة واحدة فقط في النموذج',
        wdSubUni: 'يُسمح لهذا النوع من التحكم بإضافة واحدة فقط في الخضوع'
      },
      styleSetting: {
        btn: 'إعدادات النمط',
        title: 'إعدادات النمط النموذج',
        layoutTitle: 'تخطيط التحكم',
        verticalLayout: 'التصميم العلوي والسفلي',
        horizontalLayout: 'التصميم الأفقي',
        styleTitle: 'نمط العنوان',
        boldTitle: 'العنوان جريئة',
        fontBold: 'عريض',
        fontNormal: 'عادي',
        colonTitle: 'عرض القولون',
        colonVisible: 'يعرض',
        colonHidden: 'يخفي',
        alignTitle: 'تنسيق',
        widthTitle: 'عرض العنوان',
        alignLeft: 'على اليسار',
        alignRight: 'على اليمين',
        unitPx: 'بكسل',
        unitPct: 'نسبة مئوية'
      },
      widget: {
        group: {
          base: 'الضوابط الأساسية',
          layout: 'عناصر التحكم في التصميم',
          system: 'ضوابط النظام',
          module: 'عناصر التحكم في الوحدة النمطية',
          chart: 'التحكم في المخطط',
          advanced: 'الضوابط المتقدمة'
        },
        copyTitle: 'copy_ {0}',
        component: {
          input: 'مربع الإدخال',
          textarea: 'حقل النص',
          select: 'انسحب للاختيار',
          row: 'صف واحد وأعمدة متعددة',
          title: 'عنوان',
          text: 'نص',
          subtable: 'الطاولة الفرعية',
          VxeSwitch: 'سواء',
          VxeInput: 'مربع الإدخال',
          VxeNumberInput: 'رقم',
          VxeDatePicker: 'تاريخ',
          VxeTextarea: 'حقل النص',
          VxeSelect: 'انسحب للاختيار',
          VxeTreeSelect: 'اختيار الأشجار',
          VxeRadioGroup: 'زر الراديو',
          VxeCheckboxGroup: 'مربع الاختيار',
          VxeUploadFile: 'وثيقة',
          VxeUploadImage: 'صورة',
          VxeRate: 'نتيجة',
          VxeSlider: 'شريط التمرير'
        }
      },
      widgetProp: {
        name: 'اسم التحكم',
        placeholder: 'اِسْتَدْعَى',
        required: 'التحقق المطلوب',
        multiple: 'يُسمح بخيارات متعددة',
        displaySetting: {
          name: 'عرض الإعدادات',
          pc: 'الكمبيوتر الشخصي',
          mobile: 'متحرك',
          visible: 'يعرض',
          hidden: 'يخفي'
        },
        dataSource: {
          name: 'مصدر البيانات',
          defValue: 'الخيار {0}',
          addOption: 'أضف الخيارات',
          batchEditOption: 'تحرير الدُفعات',
          batchEditTip: 'يتوافق كل صف مع خيار ، يدعم النسخ المباشرة واللصق من الجداول ، Excel ، و WPS.',
          batchEditSubTip: 'كل صف يتوافق مع خيار. إذا كانت مجموعة ، يمكن أن تبدأ العناصر الفرعية بمساحة أو مفتاح علامة تبويب ، ويدعم النسخ المباشرة واللصق من الجداول ، Excel ، و WPS.',
          buildOption: 'بناء الخيارات'
        },
        rowProp: {
          colSize: 'عدد الأعمدة',
          col2: 'عمودين',
          col3: 'ثلاثة أعمدة',
          col4: 'أربعة أعمدة',
          col6: 'ستة أعمدة',
          layout: 'تَخطِيط'
        },
        textProp: {
          name: 'محتوى',
          alignTitle: 'تنسيق',
          alignLeft: 'على اليسار',
          alignCenter: 'مركز',
          alignRight: 'على اليمين',
          colorTitle: 'لون الخط',
          sizeTitle: 'حجم الخط',
          boldTitle: 'خط غامق',
          fontNormal: 'عادي',
          fontBold: 'عريض'
        },
        subtableProp: {
          seqTitle: 'رقم سري',
          showSeq: 'عرض الرقم التسلسلي',
          showCheckbox: 'يُسمح بخيارات متعددة',
          errSubDrag: 'لا يدعم القابلية الخاطئة هذا التحكم ، يرجى استخدام عناصر تحكم أخرى',
          colPlace: 'اسحب السيطرة في'
        },
        uploadProp: {
          limitFileCount: 'حد الملف كمية',
          limitFileSize: 'حد حجم الملف',
          multiFile: 'السماح بتحميل ملفات متعددة',
          limitImgCount: 'الحد من عدد الصور',
          limitImgSize: 'حد حجم الصورة',
          multiImg: 'السماح للصور المتعددة بالتحميل'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'إعدادات الحقل',
      listSettingTab: 'إعدادات المعلمة',
      searchTitle: 'معايير الاستعلام',
      listTitle: 'حقل قائمة',
      searchField: 'حقول الاستعلام',
      listField: 'حقل قائمة',
      activeBtn: {
        ActionButtonUpdate: 'يحرر',
        ActionButtonDelete: 'يمسح'
      },
      search: {
        addBtn: 'يحرر',
        emptyText: 'شروط الاستعلام لم يتم تكوينها',
        editPopupTitle: 'تحرير حقول الاستعلام'
      },
      searchPopup: {
        colTitle: 'عنوان',
        saveBtn: 'يحفظ'
      }
    },
    text: {
      copySuccess: 'نسخ إلى الحافظة',
      copyError: 'البيئة الحالية لا تدعم هذه العملية'
    },
    countdown: {
      formats: {
        yyyy: 'سنة',
        MM: 'قمر',
        dd: 'سماء',
        HH: 'ساعة',
        mm: 'نقطة',
        ss: 'ثانية'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'لا يمكن تنفيذ هذه العملية على الخلايا المدمجة',
          multiErr: 'لا يمكن تنفيذ هذه العملية في مناطق اختيار متعددة',
          selectErr: 'غير قادر على العمل على الخلايا في النطاق المحدد',
          extendErr: 'إذا كان النطاق الممتد يحتوي على خلايا مدمجة ، فيجب أن تكون جميع الخلايا المدمجة بنفس الحجم',
          pasteMultiErr: 'غير قادر على لصق ، يجب أن تكون المساحات المنسوخة ولصقها من نفس الحجم لأداء هذه العملية',
          cpInvalidErr: 'لا يمكن تنفيذ العملية. هناك أعمدة محظورة ({0}) في النطاق الذي حددته.'
        },
        fnr: {
          title: 'البحث واستبدل',
          findLabel: 'يجد',
          replaceLabel: 'يستبدل',
          findTitle: 'تجد ماذا:',
          replaceTitle: 'استبدال:',
          tabs: {
            find: 'يجد',
            replace: 'يستبدل'
          },
          filter: {
            re: 'تعبيرات منتظمة',
            whole: 'كلمة كاملة مطابقة',
            sensitive: 'حساسية الموضوع'
          },
          btns: {
            findNext: 'العثور على التالي',
            findAll: 'ابحث عن كل شيء',
            replace: 'يستبدل',
            replaceAll: 'استبدل كل شيء',
            cancel: 'يلغي'
          },
          header: {
            seq: '#',
            cell: 'خلية',
            value: 'قيمة'
          },
          body: {
            row: 'الصف: {0}',
            col: 'العمود: {0}'
          },
          empty: '(القيمة الخالية)',
          reError: 'تعبير منتظم غير صالح',
          recordCount: '{0} وجدت الخلايا',
          notCell: 'لا يمكن العثور على الخلية المطابقة',
          replaceSuccess: 'تم استبدال خلايا {0} بنجاح'
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
          fixedColumn: 'عمود تجميد',
          fixedGroup: 'مجموعة تجميد',
          cancelFixed: 'إلغاء التجميد',
          fixedLeft: 'تجميد اليسار',
          fixedRight: 'تجميد الحق'
        },
        cases: {
          equal: 'متساوي',
          gt: 'أكبر من',
          lt: 'أقل من',
          begin: 'البداية',
          endin: 'النهاية',
          include: 'يشمل',
          isSensitive: 'حساسية الموضوع'
        }
      },
      filterCombination: {
        menus: {
          sort: 'نوع',
          clearSort: 'نوع واضح',
          sortAsc: 'ترتيب تصاعدي',
          sortDesc: 'ترتيب تنازلي',
          fixedColumn: 'عمود تجميد',
          fixedGroup: 'مجموعة تجميد',
          cancelFixed: 'إلغاء التجميد',
          fixedLeft: 'تجميد اليسار',
          fixedRight: 'تجميد الحق',
          clearFilter: 'مرشح واضح',
          textOption: 'مرشح النص',
          numberOption: 'مرشح عددي'
        },
        popup: {
          title: 'طرق التصفية المخصصة',
          currColumnTitle: 'العمود الحالي:',
          and: 'و',
          or: 'أو',
          describeHtml: 'متاح؟ يمثل حرفًا واحدًا <br/> استخدام * يمثل أي أحرف متعددة'
        },
        cases: {
          equal: 'متساوي',
          unequal: 'لا يساوي',
          gt: 'أكبر من',
          ge: 'أكبر من أو يساوي',
          lt: 'أقل من',
          le: 'أقل من أو يساوي',
          begin: 'البداية',
          notbegin: 'انها ليست في البداية',
          endin: 'النهاية',
          notendin: 'النهاية ليست',
          include: 'يشمل',
          exclude: 'غير مدرج',
          between: 'بين',
          custom: 'مرشح مخصص',
          insensitive: 'حالة غير حساسة',
          isSensitive: 'حساسية الموضوع'
        },
        empty: '(فارغ)',
        notData: 'لا تطابق'
      }
    },
    pro: {
      area: {
        mergeErr: 'لا يمكن تنفيذ هذه العملية على الخلايا المدمجة',
        multiErr: 'لا يمكن تنفيذ هذه العملية في مناطق اختيار متعددة',
        extendErr: 'إذا كان النطاق الممتد يحتوي على خلايا مدمجة ، فيجب أن تكون جميع الخلايا المدمجة بنفس الحجم',
        pasteMultiErr: 'غير قادر على لصق ، يجب أن تكون المساحات المنسوخة ولصقها من نفس الحجم لأداء هذه العملية'
      },
      fnr: {
        title: 'البحث واستبدل',
        findLabel: 'يجد',
        replaceLabel: 'يستبدل',
        findTitle: 'العثور على المحتوى:',
        replaceTitle: 'استبدال:',
        tabs: {
          find: 'يجد',
          replace: 'يستبدل'
        },
        filter: {
          re: 'تعبيرات منتظمة',
          whole: 'كلمة كاملة مطابقة',
          sensitive: 'حساسية الموضوع'
        },
        btns: {
          findNext: 'العثور على التالي',
          findAll: 'ابحث عن كل شيء',
          replace: 'يستبدل',
          replaceAll: 'استبدل كل شيء',
          cancel: 'يلغي'
        },
        header: {
          seq: '#',
          cell: 'خلية',
          value: 'قيمة'
        },
        empty: '(القيمة الخالية)',
        reError: 'تعبير منتظم غير صالح',
        recordCount: '{0} وجدت الخلايا',
        notCell: 'لم يتم العثور على خلية مطابقة',
        replaceSuccess: 'تم استبدال خلايا {0} بنجاح'
      }
    },
    renderer: {
      search: 'يبحث',
      cases: {
        equal: 'متساوي',
        unequal: 'لا يساوي',
        gt: 'أكبر من',
        ge: 'أكبر من أو يساوي',
        lt: 'أقل من',
        le: 'أقل من أو يساوي',
        begin: 'البداية',
        notbegin: 'انها ليست في البداية',
        endin: 'النهاية',
        notendin: 'النهاية ليست',
        include: 'يشمل',
        exclude: 'غير مدرج',
        between: 'بين',
        custom: 'مرشح مخصص',
        insensitive: 'حالة غير حساسة',
        isSensitive: 'حساسية الموضوع'
      },
      combination: {
        menus: {
          sort: 'نوع',
          clearSort: 'نوع واضح',
          sortAsc: 'ترتيب تصاعدي',
          sortDesc: 'ترتيب تنازلي',
          fixedColumn: 'عمود تجميد',
          fixedGroup: 'مجموعة تجميد',
          cancelFixed: 'إلغاء التجميد',
          fixedLeft: 'تجميد اليسار',
          fixedRight: 'تجميد الحق',
          clearFilter: 'مرشح واضح',
          textOption: 'تصفية النص',
          numberOption: 'تصفية عددية'
        },
        popup: {
          title: 'طرق التصفية المخصصة',
          currColumnTitle: 'العمود الحالي:',
          and: 'و',
          or: 'أو',
          describeHtml: 'متاح؟ يمثل حرفًا واحدًا <br/> استخدام * يمثل أي أحرف متعددة'
        },
        empty: '(فارغ)',
        notData: 'لا تطابق'
      }
    }
  }
}
