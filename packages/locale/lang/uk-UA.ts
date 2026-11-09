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
      downErr: 'Помилка завантаження',
      errLargeData: "Якщо обсяг прив'язаних даних занадто великий, використовуйте {0}, інакше можливі затримки",
      groupFixed: 'Якщо використовуються згруповані заголовки, фіксовані стовпці потрібно задавати за групами',
      groupMouseRange: 'Згруповані заголовки не можна використовувати разом із "{0}", це може спричинити помилки',
      groupTag: 'Для згрупованих заголовків стовпців слід використовувати "{0}", а не "{1}", це може спричинити помилки',
      scrollErrProp: 'Після ввімкнення віртуального прокручування параметр "{0}" не підтримується',
      errConflicts: 'Параметр "{0}" конфліктує з "{1}"',
      modelConflicts: "Значення прив'язаного поля \"{0}\" конфліктує з \"{1}\", виникнуть помилки",
      notSupportProp: 'Коли ввімкнено параметр "{0}", "{1}" не підтримується; має бути "{2}", інакше виникнуть помилки',
      reqSupportProp: 'Під час використання "{0}" слід задати "{1}", інакше можливі помилки',
      notConflictProp: 'Під час використання "{0}" слід задати "{1}", інакше можливий конфлікт функцій',
      unableInsert: 'Не вдається вставити в указане місце, перевірте правильність параметрів',
      useErr: 'Під час установлення модуля "{0}" сталася помилка, можливо, неправильний порядок; залежні модулі потрібно встановлювати перед Table',
      barUnableLink: "Панель інструментів не може бути пов'язана з таблицею",
      expandContent: 'Слот розгорнутого рядка має бути "content", перевірте правильність',
      reqComp: 'Відсутній компонент "{0}", перевірте правильність установлення. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Відсутній модуль "{0}"',
      reqProp: "Відсутній обов'язковий параметр \"{0}\", це може спричинити помилки",
      emptyProp: 'Параметр "{0}" не може бути порожнім',
      errProp: 'Непідтримуваний параметр "{0}", можливо "{1}"',
      colRepet: 'column.{0}="{1}" повторюється, це може призвести до недоступності деяких функцій',
      notFunc: 'Метод "{0}" не існує',
      errFunc: 'Параметр "{0}" не є методом',
      notValidators: 'Глобальний валідатор "{0}" не існує',
      notFormats: 'Глобальний форматер "{0}" не існує',
      notCommands: 'Глобальна команда "{0}" не існує',
      notSlot: 'Слот "{0}" не існує',
      noTree: 'Деревоподібна структура не підтримує "{0}"',
      noGroup: 'Після групування даних "{0}" не підтримується',
      notProp: 'Непідтримуваний параметр "{0}"',
      returnErr: 'Очікуване значення повернення параметра "{0}" — "{1}", фактично "{2}"',
      notSupportReturn: 'Коли значення повернення "{0}", у параметрі слід використовувати "{1}", а не "{2}"',
      checkProp: 'Якщо обсяг даних занадто великий, прапорці можуть гальмувати; рекомендується задати параметр "{0}" для підвищення швидкості рендерингу',
      coverProp: 'Параметр "{1}" у "{0}" визначено повторно, це може спричинити помилки',
      uniField: 'Назву поля "{0}" визначено повторно, це може спричинити помилки',
      repeatKey: 'Повтор первинного ключа {0}="{1}", це може спричинити помилки',
      repeatProp: 'Повтор параметра {0}="{1}", це може спричинити помилки',
      delFunc: 'Метод "{0}" застарілий, використовуйте "{1}"',
      delProp: 'Параметр "{0}" застарілий, використовуйте "{1}"',
      delEvent: 'Подія "{0}" застаріла, використовуйте "{1}"',
      removeProp: 'Параметр "{0}" застарілий і не рекомендується; це може спричинити помилки',
      errFormat: 'Глобальний вміст форматування слід визначати через "VXETable.formats"; монтування "formatter={0}" більше не рекомендується',
      notType: 'Непідтримуваний тип файлу "{0}"',
      notExp: 'Цей браузер не підтримує імпорт/експорт',
      impFields: 'Помилка імпорту, перевірте правильність назв полів і формату даних',
      treeNotImp: 'Таблиця-дерево не підтримує імпорт',
      treeCrossDrag: 'Можна перетягувати лише перший рівень',
      treeDragChild: 'Батьківський елемент не можна перетягнути в його дочірні елементи',
      reqPlugin: 'Розширювальний плагін не встановлено "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Перевищено максимальний підтримуваний обсяг даних {0} рядків, це може спричинити помилки',
      useNew: 'Не рекомендується використовувати {0}, використовуйте {1}',
      errorVersion: 'Невідповідність версії, поточна версія {0}, мінімальна підтримувана версія {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Немає даних',
      allTitle: 'Вибрати все/Скасувати',
      seqTitle: '№',
      actionTitle: 'Дія',
      confirmFilter: 'Фільтр',
      resetFilter: 'Скинути',
      allFilter: 'Усі',
      sortAsc: 'За зростанням: від найнижчого до найвищого',
      sortDesc: 'За спаданням: від найвищого до найнижчого',
      filter: 'Увімкнути фільтр для вибраного стовпця',
      impSuccess: 'Успішно імпортовано записів: {0}',
      expLoading: 'Виконується експорт',
      expSuccess: 'Експорт успішний',
      expError: 'Помилка експорту',
      expFilename: 'Експорт_{0}',
      expOriginFilename: 'Експорт_джерело_{0}',
      customTitle: 'Персоналізація',
      customAll: 'Усі',
      customConfirm: 'Підтвердити',
      customClose: 'Закрити',
      customCancel: 'Скасувати',
      customRestore: 'Відновити за замовчуванням',
      maxFixedCol: 'Максимальна кількість фіксованих стовпців не може перевищувати {0}',
      maxGroupCol: 'Максимальна кількість згрупованих полів не може перевищувати {0}',
      dragTip: 'Перемістити: {0}',
      resizeColTip: 'Ширина: {0} пікселів',
      resizeRowTip: 'Висота: {0} пікселів',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Завантаження...'
    },
    grid: {
      selectOneRecord: 'Виберіть принаймні один запис!',
      deleteSelectRecord: 'Ви впевнені, що хочете видалити вибрані записи?',
      removeSelectRecord: 'Ви впевнені, що хочете прибрати вибрані записи?',
      dataUnchanged: 'Дані не змінено!',
      delSuccess: 'Вибрані записи успішно видалено!',
      saveSuccess: 'Успішно збережено!',
      operError: 'Сталася помилка, операція не вдалася!'
    },
    select: {
      clear: 'Очистити',
      allChecked: 'Вибрати все',
      total: 'Вибрано: {0}',
      close: 'Закрити',
      search: 'Пошук',
      loadingText: 'Завантаження...',
      emptyText: 'Немає даних',
      maxSize: 'Максимальна кількість для вибору не може перевищувати {0}',
      overSizeErr: 'Перевищено максимальну кількість для вибору {0}; надлишок буде проігноровано!',
      searchEmpty: 'Не знайдено відповідних даних!'
    },
    list: {
      allChecked: 'Вибрати все',
      dragTip: 'Перемістити: {0}'
    },
    tree: {
      searchEmpty: 'Не знайдено відповідних даних!',
      dragTip: 'Перемістити: {0}'
    },
    treeSelect: {
      clearChecked: 'Очистити',
      allChecked: 'Вибрати все',
      allExpand: 'Розгорнути все',
      clearExpand: 'Згорнути все',
      total: 'Вибрано: {0}',
      filterCount: 'Знайдено записів: {0}',
      close: 'Закрити',
      search: 'Пошук',
      emptyText: 'Немає даних'
    },
    tableSelect: {
      filterCount: 'Знайдено записів: {0}'
    },
    pager: {
      goto: 'Перейти',
      gotoTitle: 'Сторінка',
      pagesize: '{0}/стор.',
      total: 'Усього записів: {0}',
      pageClassifier: 'Стор.',
      homePage: 'Перша',
      homePageTitle: 'Перша сторінка',
      prevPage: 'Назад',
      prevPageTitle: 'Попередня сторінка',
      nextPage: 'Уперед',
      nextPageTitle: 'Наступна сторінка',
      prevJump: 'Стрибок назад',
      prevJumpTitle: 'Стрибок назад',
      nextJump: 'Стрибок уперед',
      nextJumpTitle: 'Стрибок уперед',
      endPage: 'Остання',
      endPageTitle: 'Остання сторінка'
    },
    alert: {
      title: 'Системне повідомлення'
    },
    button: {
      confirm: 'Підтвердити',
      cancel: 'Скасувати',
      clear: 'Очистити'
    },
    filter: {
      search: 'Пошук'
    },
    custom: {
      cstmTitle: 'Персоналізація',
      cstmRestore: 'Відновити за замовчуванням',
      cstmCancel: 'Скасувати',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Підтвердити відновлення стандартної конфігурації стовпців?',
      cstmDragTarget: 'Перемістити: {0}',
      setting: {
        colSort: 'Сортування',
        sortHelpTip: 'Натисніть на значок, щоб почати перетягування',
        colTitle: 'Заголовок стовпця',
        colResizable: 'Ширина стовпця (пікселі)',
        colVisible: 'Показати',
        colFixed: 'Фіксований стовпець',
        colFixedMax: 'Фіксовані стовпці ({0})',
        colAlign: 'Вирівнювання',
        colHeadAlign: 'Вирівнювання заголовка',
        colFootAlign: 'Вирівнювання нижнього колонтитула',
        fixedLeft: 'Ліворуч',
        fixedUnset: 'Немає',
        fixedRight: 'Праворуч',
        alignLeft: 'Ліворуч',
        alignCenter: 'По центру',
        alignRight: 'Праворуч',
        moveUp: 'Вгору',
        moveDn: 'Вниз',
        putTop: 'На початок',
        putBottom: 'У кінець',
        moveUpTitle: 'Натисніть, щоб перемістити вгору',
        moveDnTitle: 'Натисніть, щоб перемістити вниз',
        putTopTitle: 'Натисніть, щоб перемістити на початок',
        putBottomTitle: 'Натисніть, щоб перемістити в кінець',
        anLeftTitle: 'Вирівняти ліворуч',
        anCenterTitle: 'Вирівняти по центру',
        anRightTitle: 'Вирівняти праворуч'
      }
    },
    import: {
      modes: {
        covering: 'Перезапис (безпосередньо перезаписати дані таблиці)',
        insert: 'Додати в кінець (додати нові дані в кінець таблиці)',
        insertTop: 'Додати на початок (додати нові дані на початок таблиці)',
        insertBottom: 'Додати в кінець (додати нові дані в кінець таблиці)'
      },
      impTitle: 'Імпорт даних',
      impFile: "Ім'я файлу",
      impSelect: 'Вибрати файл',
      impType: 'Тип файлу',
      impOpts: 'Налаштування параметрів',
      impMode: 'Режим імпорту',
      impConfirm: 'Імпорт',
      impCancel: 'Скасувати'
    },
    export: {
      types: {
        csv: 'CSV (розділювач — кома)(*.csv)',
        html: 'Веб-сторінка(*.html)',
        xml: 'Дані XML(*.xml)',
        txt: 'Текстовий файл (розділювач — табуляція)(*.txt)',
        xls: 'Книга Excel 97-2003(*.xls)',
        xlsx: 'Книга Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Порожні дані',
        current: 'Поточні дані (дані поточної сторінки)',
        selected: 'Вибрані дані (вибрані на поточній сторінці)',
        all: 'Усі дані (включно з даними всіх сторінок)'
      },
      printTitle: 'Друк даних',
      expTitle: 'Експорт даних',
      expName: "Ім'я файлу",
      expNamePlaceholder: "Введіть ім'я файлу",
      expSheetName: 'Заголовок',
      expSheetNamePlaceholder: 'Введіть заголовок',
      expType: 'Тип збереження',
      expMode: 'Вибір даних',
      expCurrentColumn: 'Усі поля',
      expColumn: 'Вибір полів',
      widthMode: 'Налаштування ширини стовпців',
      wModeTitle: 'Налаштувати спосіб відображення ширини стовпців під час друку',
      wdModes: {
        default: 'За замовчуванням',
        auto: 'Автоматично (за вмістом)',
        scale: 'Масштаб (за масштабом сторінки)'
      },
      expOpts: 'Налаштування параметрів',
      expOptHeader: 'Заголовок',
      expHeaderTitle: 'Чи потрібен заголовок',
      expOptFooter: 'Нижній колонтитул',
      expFooterTitle: 'Чи потрібен нижній колонтитул',
      expOptColgroup: 'Згрупований заголовок',
      expOptTitle: 'Заголовки стовпців',
      expTitleTitle: 'Чи використовувати заголовки стовпців, інакше показувати назви полів',
      expColgroupTitle: 'Якщо є, підтримуються заголовки з груповою структурою',
      expOptMerge: "Об'єднання",
      expMergeTitle: "Якщо є, підтримуються клітинки з об'єднаною структурою",
      expOptAllExpand: 'Розгорнути дерево',
      expAllExpandTitle: 'Якщо є, підтримується повне розгортання ієрархічних даних',
      expOptTreeAllExpand: 'Розгорнути дерево',
      expTreeAllExpandTitle: 'Якщо є, автоматично розгортати всі рівні дерева',
      expOptRowGroupAllExpand: 'Розгорнути групи',
      expRowGroupAllExpandTitle: 'Якщо є, автоматично розгортати всі рівні груп',
      expOptUseStyle: 'Стилі',
      expUseStyleTitle: 'Якщо є, підтримуються клітинки зі стилями',
      expOptOriginal: 'Вихідні дані',
      expOriginalTitle: 'Якщо вихідні дані, підтримується імпорт у таблицю',
      expPrint: 'Друк',
      expConfirm: 'Експорт',
      expCancel: 'Скасувати'
    },
    modal: {
      errTitle: 'Помилка',
      zoomMin: 'Згорнути',
      zoomIn: 'Розгорнути',
      zoomOut: 'Відновити',
      close: 'Закрити',
      miniMaxSize: 'Кількість згорнутих вікон не може перевищувати {0}',
      footPropErr: 'show-footer використовується лише для ввімкнення нижнього колонтитула; потрібно використовувати разом із show-confirm-button | show-cancel-button | слотами'
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
      zoomIn: 'Повний екран',
      zoomOut: 'Відновити',
      custom: 'Персоналізація',
      customAll: 'Усі',
      customConfirm: 'Підтвердити',
      customRestore: 'Скинути',
      fixedLeft: 'Зафіксувати ліворуч',
      fixedRight: 'Зафіксувати праворуч',
      cancelFixed: 'Скасувати фіксацію стовпців'
    },
    iconPicker: {
      search: 'Пошук',
      emptyText: 'Немає даних'
    },
    datePicker: {
      yearTitle: '{0} р.'
    },
    dateRangePicker: {
      pleaseRange: 'Виберіть дату початку та дату завершення'
    },
    input: {
      date: {
        m1: 'січ.',
        m2: 'лют.',
        m3: 'бер.',
        m4: 'квіт.',
        m5: 'трав.',
        m6: 'черв.',
        m7: 'лип.',
        m8: 'серп.',
        m9: 'вер.',
        m10: 'жовт.',
        m11: 'лист.',
        m12: 'груд.',
        quarterLabel: '{0} р.',
        monthLabel: '{0} р.',
        dayLabel: '{0} р. {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy, тиждень WW',
          month: 'yyyy-MM',
          quarter: 'yyyy, q-й квартал',
          year: 'yyyy'
        },
        weeks: {
          w: '',
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
    calendar: {
      yearLabel: '{0} р.',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Очистити',
      allChecked: 'Вибрати все',
      total: 'Вибрано: {0}',
      close: 'Закрити',
      search: 'Пошук'
    },
    numberInput: {
      currencySymbol: '₴'
    },
    imagePreview: {
      popupTitle: 'Перегляд',
      operBtn: {
        zoomOut: 'Зменшити',
        zoomIn: 'Збільшити',
        pctFull: 'Вписати в сторінку',
        pct11: 'Показати оригінальний розмір',
        rotateLeft: 'Повернути ліворуч',
        rotateRight: 'Повернути праворуч',
        print: 'Натисніть, щоб надрукувати зображення',
        download: 'Натисніть, щоб завантажити зображення'
      }
    },
    upload: {
      fileBtnText: 'Натисніть або перетягніть для завантаження',
      imgBtnText: 'Натисніть або перетягніть для завантаження',
      dragPlaceholder: 'Перетягніть файли в цю область для завантаження',
      imgSizeHint: 'Одне зображення {0}',
      imgCountHint: 'Не більше {0} зображень',
      fileTypeHint: 'Підтримуються файли {0}',
      fileSizeHint: 'Розмір одного файлу не перевищує {0}',
      fileCountHint: 'Можна завантажити не більше {0} файлів',
      uploadTypeErr: 'Невідповідність типу файлу!',
      overCountErr: 'Можна вибрати не більше {0} файлів!',
      overCountExtraErr: 'Перевищено максимальну кількість {0}; надлишкові {1} файлів буде проігноровано!',
      overSizeErr: 'Розмір файлу не може перевищувати {0}!',
      manualUpload: 'Натисніть для завантаження',
      reUpload: 'Завантажити знову',
      uploadProgress: 'Завантаження {0}%',
      uploadErr: 'Помилка завантаження',
      uploadSuccess: 'Завантажено успішно',
      moreBtnText: 'Ще ({0})',
      moreImgBtnText: 'Зображення ({0})',
      moreFileBtnText: 'Файли ({0})',
      viewItemTitle: 'Натисніть для перегляду',
      morePopup: {
        readTitle: 'Переглянути список',
        imageTitle: 'Завантажити зображення',
        fileTitle: 'Завантажити файли'
      }
    },
    empty: {
      defText: 'Немає даних'
    },
    colorPicker: {
      clear: 'Очистити',
      confirm: 'Підтвердити',
      copySuccess: 'Скопійовано в буфер обміну: {0}',
      hex: 'Шістнадцятковий'
    },
    formDesign: {
      formName: 'Назва форми',
      defFormTitle: 'Форма без назви',
      widgetPropTab: 'Властивості віджета',
      widgetFormTab: 'Властивості форми',
      error: {
        wdFormUni: 'У форму можна додати лише один віджет цього типу',
        wdSubUni: 'У підтаблицю можна додати лише один віджет цього типу'
      },
      styleSetting: {
        btn: 'Налаштування стилю',
        title: 'Налаштування стилю форми',
        layoutTitle: 'Макет віджетів',
        verticalLayout: 'Вертикальний макет',
        horizontalLayout: 'Горизонтальний макет',
        styleTitle: 'Стиль заголовка',
        boldTitle: 'Жирний заголовок',
        fontBold: 'Жирний',
        fontNormal: 'Звичайний',
        colonTitle: 'Показувати двокрапку',
        colonVisible: 'Показати',
        colonHidden: 'Приховати',
        alignTitle: 'Вирівнювання',
        widthTitle: 'Ширина заголовка',
        alignLeft: 'Ліворуч',
        alignRight: 'Праворуч',
        unitPx: 'пікселі',
        unitPct: 'відсотки'
      },
      widget: {
        group: {
          base: 'Базові віджети',
          layout: 'Віджети макета',
          system: 'Системні віджети',
          module: 'Модульні віджети',
          chart: 'Віджети діаграм',
          advanced: 'Розширені віджети'
        },
        copyTitle: 'Копія_{0}',
        component: {
          input: 'Поле введення',
          textarea: 'Текстова область',
          select: 'Випадаючий список',
          row: 'Рядок із кількома стовпцями',
          title: 'Заголовок',
          text: 'Текст',
          subtable: 'Підтаблиця',
          VxeSwitch: 'Так/Ні',
          VxeInput: 'Поле введення',
          VxeNumberInput: 'Число',
          VxeDatePicker: 'Дата',
          VxeTextarea: 'Текстова область',
          VxeSelect: 'Випадаючий список',
          VxeTreeSelect: 'Вибір із дерева',
          VxeRadioGroup: 'Радіокнопки',
          VxeCheckboxGroup: 'Прапорці',
          VxeUploadFile: 'Файл',
          VxeUploadImage: 'Зображення',
          VxeRate: 'Рейтинг',
          VxeSlider: 'Повзунок'
        },
        row: {
          placeholder: '控件位置'
        }
      },
      widgetProp: {
        name: 'Назва віджета',
        placeholder: 'Підказка',
        required: "Обов'язкова перевірка",
        multiple: 'Дозволити множинний вибір',
        displaySetting: {
          name: 'Налаштування відображення',
          pc: "Комп'ютер",
          mobile: 'Мобільний',
          visible: 'Показати',
          hidden: 'Приховати'
        },
        dataSource: {
          name: 'Джерело даних',
          defValue: 'Варіант {0}',
          addOption: 'Додати варіант',
          batchEditOption: 'Пакетне редагування',
          batchEditTip: 'Кожен рядок відповідає одному варіанту; підтримується копіювання та вставлення безпосередньо з таблиць, Excel і WPS.',
          batchEditSubTip: 'Кожен рядок відповідає одному варіанту; якщо це група, підпункти можуть починатися з пробілу або табуляції; підтримується копіювання та вставлення безпосередньо з таблиць, Excel і WPS.',
          buildOption: 'Згенерувати варіанти'
        },
        rowProp: {
          colSize: 'Кількість стовпців',
          col2: 'Два стовпці',
          col3: 'Три стовпці',
          col4: 'Чотири стовпці',
          col6: 'Шість стовпців',
          layout: 'Макет'
        },
        textProp: {
          name: 'Вміст',
          alignTitle: 'Вирівнювання',
          alignLeft: 'Ліворуч',
          alignCenter: 'По центру',
          alignRight: 'Праворуч',
          colorTitle: 'Колір шрифту',
          sizeTitle: 'Розмір шрифту',
          boldTitle: 'Жирний шрифт',
          fontNormal: 'Звичайний',
          fontBold: 'Жирний'
        },
        subtableProp: {
          seqTitle: '№',
          showSeq: 'Показувати номер',
          showCheckbox: 'Дозволити множинний вибір',
          errSubDrag: 'Підтаблиця не підтримує цей віджет; використовуйте інший віджет',
          colPlace: 'Перетягніть віджет сюди'
        },
        uploadProp: {
          limitFileCount: 'Обмеження кількості файлів',
          limitFileSize: 'Обмеження розміру файлу',
          multiFile: 'Дозволити завантаження кількох файлів',
          limitImgCount: 'Обмеження кількості зображень',
          limitImgSize: 'Обмеження розміру зображення',
          multiImg: 'Дозволити завантаження кількох зображень'
        },
        rules: {
          required: "Обов'язкове поле"
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Налаштування полів',
      listSettingTab: 'Налаштування параметрів',
      searchTitle: 'Умови пошуку',
      listTitle: 'Поля списку',
      searchField: 'Поле пошуку',
      listField: 'Поле списку',
      activeBtn: {
        ActionButtonUpdate: 'Редагувати',
        ActionButtonDelete: 'Видалити'
      },
      search: {
        addBtn: 'Редагувати',
        emptyText: 'Умови пошуку не налаштовано',
        editPopupTitle: 'Редагувати поле пошуку'
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
        yyyy: 'рік',
        MM: 'місяць',
        dd: 'день',
        HH: 'година',
        mm: 'хвилина',
        ss: 'секунда'
      }
    },
    contextMenu: {
      loadingText: 'Завантаження...'
    },
    switch: {
      onText: 'Увімк.',
      offText: 'Вимк.'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy} р.',
        quarter: '{yyyy} р., {q}-й квартал',
        month: '{yyyy} р., {MM}',
        week: '{yyyy} р., тиждень {W}',
        day: '{yyyy} р., {MM} {eLabel}',
        date: '{yyyy}-{MM}-{dd}',
        hour: '{yyyy}-{MM}-{dd} {HH}:00',
        minute: '{yyyy}-{MM}-{dd} {HH}:{mm}',
        second: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy} р.',
        quarter: '{q} кв.',
        month: '{M}',
        week: 'Т{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy} р.',
        quarter: '{start.q}~{end.q} кв.',
        month: '{start.M}~{end.M}',
        week: 'Т{start.W}~Т{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'Нд',
        w1: 'Пн',
        w2: 'Вт',
        w3: 'Ср',
        w4: 'Чт',
        w5: 'Пт',
        w6: 'Сб'
      },
      days: {
        w0: 'Неділя',
        w1: 'Понеділок',
        w2: 'Вівторок',
        w3: 'Середа',
        w4: 'Четвер',
        w5: "П'ятниця",
        w6: 'Субота'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: "Цю операцію не можна виконувати з об'єднаними клітинками",
          multiErr: 'Цю операцію не можна виконувати з кількома вибраними областями',
          selectErr: 'Неможливо виконати операцію з клітинками вказаної області',
          extendErr: "Щоб виконати цю операцію, усі об'єднані клітинки повинні бути однакового розміру",
          pasteMultiErr: 'Неможливо вставити: область копіювання та область вставлення повинні бути однакового розміру',
          cpInvalidErr: 'Операцію неможливо виконати: у вибраній області є заборонені стовпці ({0})'
        },
        fnr: {
          title: 'Пошук і заміна',
          titleFd: 'Пошук',
          titleRe: 'Заміна',
          findLabel: 'Знайти',
          replaceLabel: 'Замінити',
          findTitle: 'Знайти:',
          replaceTitle: 'Замінити на:',
          tabs: {
            find: 'Знайти',
            replace: 'Замінити'
          },
          filter: {
            re: 'Регулярний вираз',
            whole: 'Ціле слово',
            sensitive: 'З урахуванням регістру'
          },
          btns: {
            findNext: 'Знайти далі',
            findAll: 'Знайти все',
            replace: 'Замінити',
            replaceAll: 'Замінити все',
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
          empty: '(порожньо)',
          reError: 'Недійсний регулярний вираз',
          recordCount: 'Знайдено клітинок: {0}',
          notCell: 'Відповідних клітинок не знайдено',
          replaceSuccess: 'Успішно замінено клітинок: {0}'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Групування',
          values: 'Значення',
          groupPlaceholder: 'Перетягніть сюди для групування',
          valuesPlaceholder: 'Перетягніть сюди для агрегування',
          dragExistCol: 'Цей стовпець уже існує',
          sortHelpTip: 'Натисніть на значок, щоб почати перетягування'
        },
        aggFuncs: {
          sum: 'Сума',
          count: 'Кількість',
          avg: 'Середнє',
          min: 'Мінімум',
          max: 'Максимум',
          first: 'Перше значення',
          last: 'Останнє значення'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Фіксований стовпець',
          fixedGroup: 'Фіксована група',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Зафіксувати ліворуч',
          fixedRight: 'Зафіксувати праворуч'
        },
        cases: {
          equal: 'Дорівнює',
          gt: 'Більше',
          lt: 'Менше',
          begin: 'Починається з',
          endin: 'Закінчується на',
          include: 'Містить',
          isSensitive: 'З урахуванням регістру'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Сортувати',
          clearSort: 'Очистити сортування',
          sortAsc: 'За зростанням',
          sortDesc: 'За спаданням',
          fixedColumn: 'Фіксований стовпець',
          fixedGroup: 'Фіксована група',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Зафіксувати ліворуч',
          fixedRight: 'Зафіксувати праворуч',
          clearFilter: 'Очистити фільтр',
          textOption: 'Текстовий фільтр',
          numberOption: 'Числовий фільтр',
          dateOption: 'Фільтр за датою'
        },
        popup: {
          title: 'Спосіб користувацького фільтра',
          currColumnTitle: 'Показувати рядки:',
          and: 'І',
          or: 'Або',
          describeHtml: 'Використовуйте ? для одного символу<br/>Використовуйте * для будь-якої кількості символів'
        },
        cases: {
          equal: 'Дорівнює',
          unequal: 'Не дорівнює',
          gt: 'Більше',
          ge: 'Більше або дорівнює',
          lt: 'Менше',
          le: 'Менше або дорівнює',
          begin: 'Починається з',
          notbegin: 'Не починається з',
          endin: 'Закінчується на',
          notendin: 'Не закінчується на',
          include: 'Містить',
          exclude: 'Не містить',
          between: 'Між',
          isAfter: 'Після дати',
          eqAfter: 'У дату або після',
          isBefore: 'До дати',
          eqBefore: 'У дату або до',
          top10: 'Перші 10',
          aboveAverage: 'Вище середнього',
          belowAverage: 'Нижче середнього',
          before: 'До',
          after: 'Після',
          tomorrow: 'Завтра',
          today: 'Сьогодні',
          yesterday: 'Учора',
          nextWeek: 'Наступний тиждень',
          thisWeek: 'Цей тиждень',
          lastWeek: 'Минулий тиждень',
          nextMonth: 'Наступний місяць',
          thisMonth: 'Цей місяць',
          lastMonth: 'Минулий місяць',
          nextYear: 'Наступний рік',
          thisYear: 'Цей рік',
          lastYear: 'Минулий рік',
          yearToDate: 'З початку року до поточної дати',
          custom: 'Користувацький фільтр',
          insensitive: 'Без урахування регістру',
          isSensitive: 'З урахуванням регістру'
        },
        empty: '(порожньо)',
        notData: 'Немає збігів'
      }
    },
    pro: {
      area: {
        mergeErr: "Цю операцію не можна виконувати з об'єднаними клітинками",
        multiErr: 'Цю операцію не можна виконувати з кількома вибраними областями',
        extendErr: "Щоб виконати цю операцію, усі об'єднані клітинки повинні бути однакового розміру",
        pasteMultiErr: 'Неможливо вставити: область копіювання та область вставлення повинні бути однакового розміру'
      },
      fnr: {
        title: 'Пошук і заміна',
        titleFd: 'Пошук',
        titleRe: 'Заміна',
        findLabel: 'Знайти',
        replaceLabel: 'Замінити',
        findTitle: 'Знайти:',
        replaceTitle: 'Замінити на:',
        tabs: {
          find: 'Знайти',
          replace: 'Замінити'
        },
        filter: {
          re: 'Регулярний вираз',
          whole: 'Ціле слово',
          sensitive: 'З урахуванням регістру'
        },
        btns: {
          findNext: 'Знайти далі',
          findAll: 'Знайти все',
          replace: 'Замінити',
          replaceAll: 'Замінити все',
          cancel: 'Скасувати'
        },
        header: {
          seq: '#',
          cell: 'Клітинка',
          value: 'Значення'
        },
        empty: '(порожньо)',
        reError: 'Недійсний регулярний вираз',
        recordCount: 'Знайдено клітинок: {0}',
        notCell: 'Відповідних клітинок не знайдено',
        replaceSuccess: 'Успішно замінено клітинок: {0}'
      }
    },
    renderer: {
      search: 'Пошук',
      cases: {
        equal: 'Дорівнює',
        unequal: 'Не дорівнює',
        gt: 'Більше',
        ge: 'Більше або дорівнює',
        lt: 'Менше',
        le: 'Менше або дорівнює',
        begin: 'Починається з',
        notbegin: 'Не починається з',
        endin: 'Закінчується на',
        notendin: 'Не закінчується на',
        include: 'Містить',
        exclude: 'Не містить',
        between: 'Між',
        top10: 'Перші 10',
        aboveAverage: 'Вище середнього',
        belowAverage: 'Нижче середнього',
        custom: 'Користувацький фільтр',
        insensitive: 'Без урахування регістру',
        isSensitive: 'З урахуванням регістру'
      },
      combination: {
        menus: {
          sort: 'Сортувати',
          clearSort: 'Очистити сортування',
          sortAsc: 'За зростанням',
          sortDesc: 'За спаданням',
          fixedColumn: 'Фіксований стовпець',
          fixedGroup: 'Фіксована група',
          cancelFixed: 'Скасувати фіксацію',
          fixedLeft: 'Зафіксувати ліворуч',
          fixedRight: 'Зафіксувати праворуч',
          clearFilter: 'Очистити фільтр',
          textOption: 'Текстовий фільтр',
          numberOption: 'Числовий фільтр',
          dateOption: 'Фільтр за датою'
        },
        popup: {
          title: 'Спосіб користувацького фільтра',
          currColumnTitle: 'Показувати рядки:',
          and: 'І',
          or: 'Або',
          describeHtml: 'Використовуйте ? для одного символу<br/>Використовуйте * для будь-якої кількості символів'
        },
        empty: '(порожньо)',
        notData: 'Немає збігів'
      }
    }
  }
}
