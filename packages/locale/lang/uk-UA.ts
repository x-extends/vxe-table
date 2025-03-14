export default {
  vxe: {
    base: {
      pleaseInput: 'Будь ласка, введіть',
      pleaseSelect: 'Будь ласка, виберіть',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Завантаження...'
    },
    error: {
      downErr: 'Не вдалося завантажити',
      errLargeData: 'При великому обсязі даних рекомендується використовувати {0}, інакше може виникнути зависання',
      groupFixed: 'Якщо використовуються груповані заголовки, стовпці з фіксацією повинні бути налаштовані по групах',
      groupMouseRange: 'Груповані заголовки та "{0}" не можуть бути використані одночасно, це може спричинити помилки',
      groupTag: 'Груповані заголовки повинні використовувати "{0}", а не "{1}", це може спричинити помилки',
      scrollErrProp: 'Параметр "{0}" не підтримується після включення віртуального скролінгу',
      errConflicts: 'Параметри "{0}" та "{1}" конфліктують',
      notSupportProp: '当启用参数 "{0}" 时不支持 "{1}"，应该为 "{2}"，否则将会出现错误',
      unableInsert: 'Неможливо вставити в задане місце, перевірте правильність параметрів',
      useErr: 'Сталася помилка під час встановлення модуля "{0}", можливо, порядок неправильний, залежні модулі повинні бути встановлені до таблиці',
      barUnableLink: "Панель інструментів не може бути пов'язана з таблицею",
      expandContent: 'Вставка для розширеного рядка повинна бути "content", будь ласка, перевірте правильність',
      reqComp: 'Відсутній компонент "{0}", будь ласка, перевірте правильність установки. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Відсутній модуль "{0}"',
      reqProp: 'Відсутній необхідний параметр "{0}", це може спричинити помилки',
      emptyProp: 'Параметр "{0}" не може бути порожнім',
      errProp: 'Непідтримуваний параметр "{0}", можливо, "{1}"',
      colRepet: 'column.{0}="{1}" дублюється, це може призвести до проблем у деяких функціях',
      notFunc: 'Метод "{0}" не існує',
      errFunc: 'Параметр "{0}" не є методом',
      notValidators: 'Глобальний валідатор "{0}" не існує',
      notFormats: 'Глобальний формат "{0}" не існує',
      notCommands: 'Глобальна команда "{0}" не існує',
      notSlot: 'Слот "{0}" не існує',
      noTree: 'Деревовидна структура не підтримує "{0}"',
      notProp: 'Непідтримуваний параметр "{0}"',
      checkProp: 'При великому обсязі даних може виникнути зависання при використанні чекбоксів, рекомендується встановити параметр "{0}" для прискорення рендерингу',
      coverProp: '"{0}" параметр "{1}" повторно визначено, це може спричинити помилки',
      repeatKey: 'Повторюваний основний ключ {0}="{1}", це може спричинити помилки',
      uniField: 'Поле "{0}" повторно визначено, це може спричинити помилки',
      delFunc: 'Метод "{0}" застарів, використовуйте "{1}"',
      delProp: 'Параметр "{0}" застарів, використовуйте "{1}"',
      delEvent: 'Подія "{0}" застаріла, використовуйте "{1}"',
      removeProp: 'Параметр "{0}" застарів і не рекомендується до використання, це може спричинити помилки',
      errFormat: 'Глобальне форматування має бути визначене в "VXETable.formats", спосіб використання "formatter={0}" більше не рекомендується',
      notType: 'Непідтримуваний тип файлу "{0}"',
      notExp: 'Цей браузер не підтримує імпорт/експорт',
      impFields: 'Імпорт не вдався, перевірте назви полів та формат даних',
      treeNotImp: 'Деревовидна таблиця не підтримує імпорт',
      treeCrossDrag: 'Можна перетягувати тільки на першому рівні',
      treeDragChild: 'Батьківський елемент не можна перетягнути в свій дочірній елемент',
      reqPlugin: '扩展插件未安装 "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: 'Немає даних',
      allTitle: 'Вибрати все/скасувати вибір',
      seqTitle: '№',
      actionTitle: 'Дії',
      confirmFilter: 'Фільтрувати',
      resetFilter: 'Скинути',
      allFilter: 'Всі',
      sortAsc: 'За зростанням: від мінімуму до максимуму',
      sortDesc: 'За спаданням: від максимуму до мінімуму',
      filter: 'Увімкнути фільтр для вибраних стовпців',
      impSuccess: 'Успішно імпортовано {0} записів',
      expLoading: 'Триває експорт',
      expSuccess: 'Експорт успішний',
      expError: 'Помилка експорту',
      expFilename: 'Експорт_{0}',
      expOriginFilename: 'Експорт_оригінал_{0}',
      customTitle: 'Налаштування стовпців',
      customAll: 'Все',
      customConfirm: 'Підтвердити',
      customClose: 'Закрити',
      customCancel: 'Скасувати',
      customRestore: 'Відновити за замовчуванням',
      maxFixedCol: 'Максимальна кількість зафіксованих стовпців не повинна перевищувати {0}',
      dragTip: 'Переміщення: {0}',
      resizeColTip: '宽：{0} 像素',
      resizeRowTip: '高：{0} 像素'
    },
    grid: {
      selectOneRecord: 'Будь ласка, виберіть хоча б один запис!',
      deleteSelectRecord: 'Ви впевнені, що хочете видалити вибрані записи?',
      removeSelectRecord: 'Ви впевнені, що хочете видалити вибрані записи?',
      dataUnchanged: 'Дані не змінено!',
      delSuccess: 'Записи успішно видалено!',
      saveSuccess: 'Збережено успішно!',
      operError: 'Сталася помилка, операція не вдалася!'
    },
    select: {
      search: 'Пошук',
      loadingText: 'Завантаження',
      emptyText: 'Немає даних'
    },
    pager: {
      goto: 'Перейти',
      gotoTitle: 'Номер сторінки',
      pagesize: '{0} записів/сторінка',
      total: 'Загалом {0} записів',
      pageClassifier: 'Сторінка',
      homePage: 'Головна',
      homePageTitle: 'Головна сторінка',
      prevPage: 'Попередня сторінка',
      prevPageTitle: 'Попередня сторінка',
      nextPage: 'Наступна сторінка',
      nextPageTitle: 'Наступна сторінка',
      prevJump: 'Перейти на попередню сторінку',
      prevJumpTitle: 'Перейти на попередню сторінку',
      nextJump: 'Перейти на наступну сторінку',
      nextJumpTitle: 'Перейти на наступну сторінку',
      endPage: 'Остання сторінка',
      endPageTitle: 'Остання сторінка'
    },
    alert: {
      title: 'Системне повідомлення'
    },
    button: {
      confirm: 'Підтвердити',
      cancel: 'Скасувати',
      clear: '清除'
    },
    filter: {
      search: 'Пошук'
    },
    custom: {
      cstmTitle: 'Налаштування стовпців',
      cstmRestore: 'Відновити за замовчуванням',
      cstmCancel: 'Скасувати',
      cstmConfirm: 'Підтвердити',
      cstmConfirmRestore: 'Будь ласка, підтвердіть, чи хочете ви відновити стандартні налаштування стовпців?',
      cstmDragTarget: 'Переміщення: {0}',
      setting: {
        colSort: 'Сортування',
        sortHelpTip: 'Натискайте та перетягуйте іконки, щоб змінити порядок стовпців',
        colTitle: 'Заголовок стовпця',
        colResizable: 'Розмір стовпця (пікселі)',
        colVisible: 'Показати стовпець',
        colFixed: 'Зафіксувати стовпець',
        colFixedMax: 'Максимальна кількість зафіксованих стовпців ({0})',
        fixedLeft: 'Ліва сторона',
        fixedUnset: 'Не налаштовано',
        fixedRight: 'Права сторона'
      }
    },
    import: {
      modes: {
        covering: 'Перезапис (безпосередньо перезаписує дані таблиці)',
        insert: 'Додавання знизу (додає нові дані в кінець таблиці)',
        insertTop: 'Додавання згори (додає нові дані на початок таблиці)',
        insertBottom: 'Додавання знизу (додає нові дані в кінець таблиці)'
      },
      impTitle: 'Імпорт даних',
      impFile: 'Назва файлу',
      impSelect: 'Вибрати файл',
      impType: 'Тип файлу',
      impOpts: 'Налаштування параметрів',
      impMode: 'Режим імпорту',
      impConfirm: 'Імпортувати',
      impCancel: 'Скасувати'
    },
    export: {
      types: {
        csv: 'CSV (розділювач комами)(*.csv)',
        html: 'Веб-сторінка (*.html)',
        xml: 'XML дані (*.xml)',
        txt: 'Текстовий файл (табуляція як розділювач)(*.txt)',
        xls: 'Excel 97-2003 робоча книга (*.xls)',
        xlsx: 'Excel робоча книга (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空数据',
        current: 'Поточні дані (дані поточної сторінки)',
        selected: 'Вибрані дані (дані, вибрані на поточній сторінці)',
        all: 'Всі дані (включаючи дані з усіх сторінок)'
      },
      printTitle: 'Друк даних',
      expTitle: 'Експорт даних',
      expName: 'Назва файлу',
      expNamePlaceholder: 'Введіть назву файлу',
      expSheetName: 'Заголовок',
      expSheetNamePlaceholder: 'Введіть заголовок',
      expType: 'Тип збереження',
      expMode: 'Вибір даних',
      expCurrentColumn: 'Усі поля',
      expColumn: 'Вибір полів',
      expOpts: 'Налаштування параметрів',
      expOptHeader: 'Заголовок таблиці',
      expHeaderTitle: 'Чи потрібен заголовок таблиці',
      expOptFooter: 'Нижній колонтитул',
      expFooterTitle: 'Чи потрібен нижній колонтитул',
      expOptColgroup: 'Групування заголовків',
      expColgroupTitle: 'Якщо є, підтримується групування заголовків',
      expOptMerge: 'Злиття',
      expMergeTitle: 'Якщо є, підтримується злиття клітинок',
      expOptAllExpand: 'Розгорнути рівні',
      expAllExpandTitle: 'Якщо є, підтримується розгортання даних з рівневими структурами',
      expOptUseStyle: 'Стилі',
      expUseStyleTitle: 'Якщо є, підтримується використання стилів у клітинках',
      expOptOriginal: 'Оригінальні дані',
      expOriginalTitle: 'Якщо вибрано оригінальні дані, вони можуть бути імпортовані назад у таблицю',
      expPrint: 'Друк',
      expConfirm: 'Експортувати',
      expCancel: 'Скасувати'
    },
    modal: {
      errTitle: 'Помилка',
      zoomMin: 'Мінімізувати',
      zoomIn: 'Розгорнути на весь екран',
      zoomOut: 'Відновити',
      close: 'Закрити',
      miniMaxSize: 'Кількість мінімізованих вікон не повинна перевищувати {0}',
      footPropErr: 'show-footer використовується лише для включення нижнього колонтитула і повинно поєднуватися з show-confirm-button | show-cancel-button | слотами'
    },
    drawer: {
      close: 'Закрити'
    },
    form: {
      folding: 'Згорнути',
      unfolding: 'Розгорнути'
    },
    toolbar: {
      import: 'Імпорт',
      export: 'Експорт',
      print: 'Друк',
      refresh: 'Оновити',
      zoomIn: 'На весь екран',
      zoomOut: 'Відновити',
      custom: 'Налаштування стовпців',
      customAll: 'Всі',
      customConfirm: 'Підтвердити',
      customRestore: 'Відновити за замовчуванням',
      fixedLeft: 'Зафіксувати ліворуч',
      fixedRight: 'Зафіксувати праворуч',
      cancelFixed: 'Скасувати фіксацію стовпця'
    },
    datePicker: {
      yearTitle: '{0} 年'
    },
    input: {
      date: {
        m1: '01 місяць',
        m2: '02 місяць',
        m3: '03 місяць',
        m4: '04 місяць',
        m5: '05 місяць',
        m6: '06 місяць',
        m7: '07 місяць',
        m8: '08 місяць',
        m9: '09 місяць',
        m10: '10 місяць',
        m11: '11 місяць',
        m12: '12 місяць',
        quarterLabel: '{0} рік',
        monthLabel: '{0} рік',
        dayLabel: '{0} рік {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy рік, тиждень WW',
          month: 'yyyy-MM',
          quarter: 'yyyy рік, квартал q',
          year: 'yyyy'
        },
        weeks: {
          w: 'тиждень',
          w0: 'Неділя',
          w1: 'Понеділок',
          w2: 'Вівторок',
          w3: 'Середа',
          w4: 'Четвер',
          w5: "П'ятниця",
          w6: 'Субота'
        },
        months: {
          m0: 'Січень',
          m1: 'Лютий',
          m2: 'Березень',
          m3: 'Квітень',
          m4: 'Травень',
          m5: 'Червень',
          m6: 'Липень',
          m7: 'Серпень',
          m8: 'Вересень',
          m9: 'Жовтень',
          m10: 'Листопад',
          m11: 'Грудень'
        },
        quarters: {
          q1: 'Перший квартал',
          q2: 'Другий квартал',
          q3: 'Третій квартал',
          q4: 'Четвертий квартал'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Попередній перегляд',
      operBtn: {
        zoomOut: 'Зменшити',
        zoomIn: 'Збільшити',
        pctFull: 'Пропорційне масштабування',
        pct11: 'Показати оригінальний розмір',
        rotateLeft: 'Повернути ліворуч',
        rotateRight: 'Повернути праворуч',
        print: 'Натисніть для друку зображення',
        download: 'Натисніть для завантаження зображення'
      }
    },
    upload: {
      fileBtnText: 'Натисніть або перетягніть для завантаження',
      imgBtnText: 'Натисніть або перетягніть для завантаження',
      dragPlaceholder: 'Перетягніть файл у цю зону для завантаження',
      imgSizeHint: 'Один файл {0}',
      imgCountHint: 'Максимум {0} файлів',
      fileTypeHint: 'Підтримуються файли типу {0}',
      fileSizeHint: 'Розмір одного файлу не більше {0}',
      fileCountHint: 'Максимум можна завантажити {0} файлів',
      uploadTypeErr: 'Невідповідність типу файлу!',
      overCountErr: 'Можна вибрати не більше {0} файлів!',
      overCountExtraErr: 'Перевищено максимальну кількість {0} файлів, {1} файлів буде проігноровано!',
      overSizeErr: 'Максимальний розмір файлу не може перевищувати {0}!',
      reUpload: 'Перезавантажити',
      uploadProgress: 'Завантаження {0}%',
      uploadErr: 'Завантаження не вдалося',
      uploadSuccess: 'Завантаження успішне',
      moreBtnText: 'Більше ({0})',
      viewItemTitle: 'Натисніть для перегляду',
      morePopup: {
        readTitle: 'Перегляд списку',
        imageTitle: 'Завантажити зображення',
        fileTitle: 'Завантажити файл'
      }
    },
    empty: {
      defText: 'Немає даних'
    },
    colorPicker: {
      clear: 'Очистити',
      confirm: 'Підтвердити',
      copySuccess: 'Скопійовано в буфер обміну: {0}'
    },
    formDesign: {
      formName: 'Назва форми',
      defFormTitle: 'Без назви',
      widgetPropTab: 'Властивості елементів керування',
      widgetFormTab: 'Властивості форми',
      error: {
        wdFormUni: 'Цей тип елемента керування можна додавати до форми лише один раз',
        wdSubUni: 'Цей тип елемента керування можна додавати до підтаблиці лише один раз'
      },
      styleSetting: {
        btn: 'Налаштування стилю',
        title: 'Налаштування стилю форми',
        layoutTitle: 'Розташування елементів керування',
        verticalLayout: 'Вертикальне розташування',
        horizontalLayout: 'Горизонтальне розташування',
        styleTitle: 'Стиль заголовка',
        boldTitle: 'Жирний заголовок',
        fontBold: 'Жирний',
        fontNormal: 'Звичайний',
        colonTitle: 'Показати двокрапку',
        colonVisible: 'Показати',
        colonHidden: 'Сховати',
        alignTitle: 'Вирівнювання',
        widthTitle: 'Ширина заголовка',
        alignLeft: 'По лівому краю',
        alignRight: 'По правому краю',
        unitPx: 'Пікселі',
        unitPct: 'Відсотки'
      },
      widget: {
        group: {
          base: 'Базові елементи керування',
          layout: 'Елементи керування макетом',
          system: 'Системні елементи керування',
          module: 'Модульні елементи керування',
          chart: 'Елементи керування діаграмою',
          advanced: 'Розширені елементи керування'
        },
        copyTitle: 'Копія_{0}',
        component: {
          input: 'Поле вводу',
          textarea: 'Текстове поле',
          select: 'Випадаючий список',
          row: 'Один рядок з кількома колонками',
          title: 'Заголовок',
          text: 'Текст',
          subtable: 'Підтаблиця',
          VxeSwitch: 'Так/Ні',
          VxeInput: 'Поле вводу',
          VxeNumberInput: 'Число',
          VxeDatePicker: 'Календар',
          VxeTextarea: 'Текстове поле',
          VxeSelect: 'Випадаючий список',
          VxeTreeSelect: 'Вибір з дерева',
          VxeRadioGroup: 'Група радіокнопок',
          VxeCheckboxGroup: 'Група прапорців',
          VxeUploadFile: 'Файл',
          VxeUploadImage: 'Зображення',
          VxeRate: 'Оцінка',
          VxeSlider: 'Слайдер'
        }
      },
      widgetProp: {
        name: 'Назва елемента керування',
        placeholder: 'Підказка',
        required: "Перевірка на обов'язковість",
        multiple: 'Дозволити вибір кількох елементів',
        displaySetting: {
          name: 'Налаштування відображення',
          pc: 'ПК',
          mobile: 'Мобільний телефон',
          visible: 'Показати',
          hidden: 'Сховати'
        },
        dataSource: {
          name: 'Джерело даних',
          defValue: 'Опція {0}',
          addOption: 'Додати опцію',
          batchEditOption: 'Пакетне редагування',
          batchEditTip: 'Кожен рядок — це одна опція, підтримується копіювання з таблиць, Excel, WPS.',
          batchEditSubTip: 'Кожен рядок — це одна опція, для групи підпункти можуть починатися пробілами або табуляцією, підтримується копіювання з таблиць, Excel, WPS.',
          buildOption: 'Створити опції'
        },
        rowProp: {
          colSize: 'Кількість колонок',
          col2: 'Дві колонки',
          col3: 'Три колонки',
          col4: 'Чотири колонки',
          col6: 'Шість колонок',
          layout: 'Макет'
        },
        textProp: {
          name: 'Вміст',
          alignTitle: 'Вирівнювання',
          alignLeft: 'По лівому краю',
          alignCenter: 'По центру',
          alignRight: 'По правому краю',
          colorTitle: 'Колір шрифту',
          sizeTitle: 'Розмір шрифту',
          boldTitle: 'Жирний шрифт',
          fontNormal: 'Звичайний',
          fontBold: 'Жирний'
        },
        subtableProp: {
          seqTitle: 'Порядковий номер',
          showSeq: 'Показати порядковий номер',
          showCheckbox: 'Дозволити вибір кількох елементів',
          errSubDrag: 'Підтаблиця не підтримує цей елемент керування, використовуйте інший елемент',
          colPlace: 'Перетягніть елемент керування сюди'
        },
        uploadProp: {
          limitFileCount: 'Обмеження на кількість файлів',
          limitFileSize: 'Обмеження на розмір файлів',
          multiFile: 'Дозволити завантаження кількох файлів',
          limitImgCount: 'Обмеження на кількість зображень',
          limitImgSize: 'Обмеження на розмір зображень',
          multiImg: 'Дозволити завантаження кількох зображень'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Налаштування полів',
      listSettingTab: 'Налаштування параметрів',
      searchTitle: 'Умови пошуку',
      listTitle: 'Поля списку',
      searchField: 'Поля пошуку',
      listField: 'Поля списку',
      activeBtn: {
        ActionButtonUpdate: 'Редагувати',
        ActionButtonDelete: 'Видалити'
      },
      search: {
        addBtn: 'Редагувати',
        emptyText: 'Умови пошуку не налаштовані',
        editPopupTitle: 'Редагувати поля пошуку'
      },
      searchPopup: {
        colTitle: 'Заголовок',
        saveBtn: 'Зберегти'
      }
    },
    text: {
      copySuccess: 'Скопійовано в буфер обміну',
      copyError: 'Поточне середовище не підтримує цю операцію'
    },
    countdown: {
      formats: {
        yyyy: 'Рік',
        MM: 'Місяць',
        dd: 'День',
        HH: 'Година',
        mm: 'Хвилина',
        ss: 'Секунда'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: "Цю операцію неможливо виконати для об'єднаних клітинок",
          multiErr: 'Цю операцію неможливо виконати для множинних вибраних областей',
          selectErr: 'Цю операцію неможливо виконати для зазначених клітинок',
          extendErr: "Якщо область містить об'єднані клітинки, всі об'єднані клітинки повинні мати однакові розміри",
          pasteMultiErr: 'Неможливо вставити, для виконання цієї операції копійована область повинна мати такий самий розмір, як і область вставки',
          cpInvalidErr: 'Цю операцію неможливо виконати, оскільки обрана область містить заборонені стовпці ({0})'
        },
        fnr: {
          title: 'Пошук і заміна',
          findLabel: 'Знайти',
          replaceLabel: 'Замінити',
          findTitle: 'Текст для пошуку:',
          replaceTitle: 'Замінити на:',
          tabs: {
            find: 'Пошук',
            replace: 'Замінити'
          },
          filter: {
            re: 'Регулярний вираз',
            whole: 'Точний збіг',
            sensitive: 'Чутливий до регістру'
          },
          btns: {
            findNext: 'Знайти наступний',
            findAll: 'Знайти всі',
            replace: 'Замінити',
            replaceAll: 'Замінити всі',
            cancel: 'Скасувати'
          },
          header: {
            seq: '#',
            cell: 'Клітинка',
            value: 'Значення'
          },
          body: {
            row: 'Рядок: {0}',
            col: 'Стовпець: {0}'
          },
          empty: '(порожнє значення)',
          reError: 'Невірний регулярний вираз',
          recordCount: 'Знайдено {0} клітинок',
          notCell: 'Не знайдено відповідних клітинок',
          replaceSuccess: 'Успішно замінено {0} клітинок'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Закріпити стовпець',
          fixedGroup: 'Закріпити групу',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Закріпити ліворуч',
          fixedRight: 'Закріпити праворуч'
        },
        cases: {
          equal: 'Рівно',
          gt: 'Більше',
          lt: 'Менше',
          begin: 'Починається з',
          endin: 'Закінчується на',
          include: 'Включає',
          isSensitive: 'Чутливий до регістру'
        }
      },
      filterCombination: {
        menus: {
          sort: '排序',
          clearSort: 'Очистити сортування',
          sortAsc: 'По зростанню',
          sortDesc: 'По спаданню',
          fixedColumn: 'Закріпити стовпець',
          fixedGroup: 'Закріпити групу',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Закріпити ліворуч',
          fixedRight: 'Закріпити праворуч',
          clearFilter: 'Очистити фільтр',
          textOption: 'Текстовий фільтр',
          numberOption: 'Числовий фільтр'
        },
        popup: {
          title: 'Налаштування користувацького фільтру',
          currColumnTitle: 'Поточний стовпець:',
          and: 'І',
          or: 'Або',
          describeHtml: 'Використовуйте ? для одного символу<br/> і * для кількох символів'
        },
        cases: {
          equal: 'Рівно',
          unequal: 'Не рівно',
          gt: 'Більше',
          ge: 'Більше або рівно',
          lt: 'Менше',
          le: 'Менше або рівно',
          begin: 'Починається з',
          notbegin: 'Не починається з',
          endin: 'Закінчується на',
          notendin: 'Не закінчується на',
          include: 'Включає',
          exclude: 'Не включає',
          between: 'Між',
          custom: 'Користувацький фільтр',
          insensitive: 'Не чутливий до регістру',
          isSensitive: 'Чутливий до регістру'
        },
        empty: '(порожнє)',
        notData: 'Не знайдено відповідностей'
      }
    },
    pro: {
      area: {
        mergeErr: "Цю операцію неможливо виконати для об'єднаних клітинок",
        multiErr: 'Цю операцію неможливо виконати для множинних вибраних областей',
        extendErr: "Якщо область містить об'єднані клітинки, всі об'єднані клітинки повинні мати однакові розміри",
        pasteMultiErr: 'Неможливо вставити, для виконання цієї операції копійована область повинна мати такий самий розмір, як і область вставки'
      },
      fnr: {
        title: 'Пошук і заміна',
        findLabel: 'Знайти',
        replaceLabel: 'Замінити',
        findTitle: 'Текст для пошуку:',
        replaceTitle: 'Замінити на:',
        tabs: {
          find: 'Пошук',
          replace: 'Замінити'
        },
        filter: {
          re: 'Регулярний вираз',
          whole: 'Точний збіг',
          sensitive: 'Чутливий до регістру'
        },
        btns: {
          findNext: 'Знайти наступний',
          findAll: 'Знайти всі',
          replace: 'Замінити',
          replaceAll: 'Замінити всі',
          cancel: 'Скасувати'
        },
        header: {
          seq: '#',
          cell: 'Клітинка',
          value: 'Значення'
        },
        empty: '(порожнє значення)',
        reError: 'Невірний регулярний вираз',
        recordCount: 'Знайдено {0} клітинок',
        notCell: 'Не знайдено відповідних клітинок',
        replaceSuccess: 'Успішно замінено {0} клітинок'
      }
    },
    renderer: {
      search: 'Пошук',
      cases: {
        equal: 'Рівно',
        unequal: 'Не рівно',
        gt: 'Більше',
        ge: 'Більше або рівно',
        lt: 'Менше',
        le: 'Менше або рівно',
        begin: 'Починається з',
        notbegin: 'Не починається з',
        endin: 'Закінчується на',
        notendin: 'Не закінчується на',
        include: 'Включає',
        exclude: 'Не включає',
        between: 'Між',
        custom: 'Користувацький фільтр',
        insensitive: 'Не чутливий до регістру',
        isSensitive: 'Чутливий до регістру'
      },
      combination: {
        menus: {
          sort: '排序',
          clearSort: 'Очистити сортування',
          sortAsc: 'По зростанню',
          sortDesc: 'По спаданню',
          fixedColumn: 'Закріпити стовпець',
          fixedGroup: 'Закріпити групу',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Закріпити ліворуч',
          fixedRight: 'Закріпити праворуч',
          clearFilter: 'Очистити фільтр',
          textOption: 'Текстовий фільтр',
          numberOption: 'Числовий фільтр'
        },
        popup: {
          title: 'Налаштування користувацького фільтру',
          currColumnTitle: 'Поточний стовпець:',
          and: 'І',
          or: 'Або',
          describeHtml: 'Використовуйте ? для одного символу<br/> і * для кількох символів'
        },
        empty: '(порожнє)',
        notData: 'Не знайдено відповідностей'
      }
    }
  }
}
