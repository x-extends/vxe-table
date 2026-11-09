export default {
  vxe: {
    base: {
      pleaseInput: 'Пожалуйста, введите',
      pleaseSelect: 'Пожалуйста, выберите',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Загрузка...'
    },
    error: {
      downErr: 'Ошибка загрузки',
      errLargeData: 'Если объём привязанных данных слишком велик, используйте {0}, иначе возможны подвисания',
      groupFixed: 'При использовании сгруппированных заголовков закреплённые столбцы должны задаваться по группам',
      groupMouseRange: 'Сгруппированные заголовки нельзя использовать одновременно с "{0}", это может вызвать ошибки',
      groupTag: 'Для сгруппированных заголовков столбцов следует использовать "{0}", а не "{1}", это может вызвать ошибки',
      scrollErrProp: 'После включения виртуальной прокрутки параметр "{0}" не поддерживается',
      errConflicts: 'Параметр "{0}" конфликтует с "{1}"',
      modelConflicts: 'Значение привязанного поля "{0}" конфликтует с "{1}", это вызовет ошибки',
      notSupportProp: 'Когда включён параметр "{0}", "{1}" не поддерживается; должно быть "{2}", иначе возникнут ошибки',
      reqSupportProp: 'При использовании "{0}" следует задать "{1}", иначе возможны ошибки',
      notConflictProp: 'При использовании "{0}" следует задать "{1}", иначе возможны конфликты функций',
      unableInsert: 'Невозможно вставить в указанное место. Проверьте правильность параметров',
      useErr: 'При установке модуля "{0}" произошла ошибка. Возможно, порядок неверен; зависимые модули нужно устанавливать до Table',
      barUnableLink: 'Панель инструментов не может быть связана с таблицей',
      expandContent: 'Слот раскрытой строки должен быть "content". Проверьте правильность',
      reqComp: 'Отсутствует компонент "{0}". Проверьте правильность установки. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Отсутствует модуль "{0}"',
      reqProp: 'Отсутствует обязательный параметр "{0}", это может вызвать ошибки',
      emptyProp: 'Параметр "{0}" не может быть пустым',
      errProp: 'Неподдерживаемый параметр "{0}", возможно "{1}"',
      colRepet: 'column.{0}="{1}" повторяется, это может привести к недоступности некоторых функций',
      notFunc: 'Метод "{0}" не существует',
      errFunc: 'Параметр "{0}" не является методом',
      notValidators: 'Глобальный валидатор "{0}" не существует',
      notFormats: 'Глобальный форматтер "{0}" не существует',
      notCommands: 'Глобальная команда "{0}" не существует',
      notSlot: 'Слот "{0}" не существует',
      noTree: 'Древовидная структура не поддерживает "{0}"',
      noGroup: 'После группировки данных "{0}" не поддерживается',
      notProp: 'Неподдерживаемый параметр "{0}"',
      returnErr: 'Ожидаемое возвращаемое значение параметра "{0}" — "{1}", фактически "{2}"',
      notSupportReturn: 'Когда возвращаемое значение — "{0}", в параметре следует использовать "{1}", а не "{2}"',
      checkProp: 'При большом объёме данных возможны подвисания флажков. Рекомендуется задать параметр "{0}" для ускорения отрисовки',
      coverProp: 'Параметр "{1}" у "{0}" определён повторно, это может вызвать ошибки',
      uniField: 'Имя поля "{0}" определено повторно, это может вызвать ошибки',
      repeatKey: 'Повтор первичного ключа {0}="{1}", это может вызвать ошибки',
      repeatProp: 'Повтор параметра {0}="{1}", это может вызвать ошибки',
      delFunc: 'Метод "{0}" устарел, используйте "{1}"',
      delProp: 'Параметр "{0}" устарел, используйте "{1}"',
      delEvent: 'Событие "{0}" устарело, используйте "{1}"',
      removeProp: 'Параметр "{0}" устарел и не рекомендуется; это может вызвать ошибки',
      errFormat: 'Глобальное форматирование следует определять через "VXETable.formats"; монтирование "formatter={0}" больше не рекомендуется',
      notType: 'Неподдерживаемый тип файла "{0}"',
      notExp: 'Этот браузер не поддерживает импорт/экспорт',
      impFields: 'Ошибка импорта. Проверьте правильность имён полей и формата данных',
      treeNotImp: 'Древовидная таблица не поддерживает импорт',
      treeCrossDrag: 'Можно перетаскивать только первый уровень',
      treeDragChild: 'Родительский элемент нельзя перетащить в собственные дочерние элементы',
      reqPlugin: 'Плагин расширения не установлен "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Превышен поддерживаемый максимальный объём данных {0} строк, это может вызвать ошибки',
      useNew: 'Не рекомендуется использовать {0}, используйте {1}',
      errorVersion: 'Несовпадение версий. Текущая версия {0}, минимальная поддерживаемая версия — {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Нет данных',
      allTitle: 'Выбрать все/Отменить',
      seqTitle: '№',
      actionTitle: 'Действия',
      confirmFilter: 'Фильтр',
      resetFilter: 'Сбросить',
      allFilter: 'Все',
      sortAsc: 'По возрастанию: от низшего к высшему',
      sortDesc: 'По убыванию: от высшего к низшему',
      filter: 'Включить фильтр для выбранного столбца',
      impSuccess: 'Успешно импортировано записей: {0}',
      expLoading: 'Выполняется экспорт',
      expSuccess: 'Экспорт выполнен',
      expError: 'Ошибка экспорта',
      expFilename: 'Экспорт_{0}',
      expOriginFilename: 'Экспорт_исходный_{0}',
      customTitle: 'Персонализация',
      customAll: 'Все',
      customConfirm: 'Подтвердить',
      customClose: 'Закрыть',
      customCancel: 'Отмена',
      customRestore: 'Восстановить по умолчанию',
      maxFixedCol: 'Максимальное количество закреплённых столбцов не может превышать {0}',
      maxGroupCol: 'Максимальное количество сгруппированных полей не может превышать {0}',
      dragTip: 'Переместить: {0}',
      resizeColTip: 'Ширина: {0} пикс.',
      resizeRowTip: 'Высота: {0} пикс.',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Загрузка...'
    },
    grid: {
      selectOneRecord: 'Выберите хотя бы одну запись!',
      deleteSelectRecord: 'Вы уверены, что хотите удалить выбранные записи?',
      removeSelectRecord: 'Вы уверены, что хотите убрать выбранные записи?',
      dataUnchanged: 'Данные не изменены!',
      delSuccess: 'Выбранные записи успешно удалены!',
      saveSuccess: 'Сохранено успешно!',
      operError: 'Произошла ошибка, операция не выполнена!'
    },
    select: {
      clear: 'Очистить',
      allChecked: 'Выбрать все',
      total: 'Выбрано: {0}',
      close: 'Закрыть',
      search: 'Поиск',
      loadingText: 'Загрузка...',
      emptyText: 'Нет данных',
      maxSize: 'Максимальное количество для выбора не может превышать {0}',
      overSizeErr: 'Превышено максимальное количество для выбора {0}; лишние будут проигнорированы!',
      searchEmpty: 'Совпадений не найдено!'
    },
    list: {
      allChecked: 'Выбрать все',
      dragTip: 'Переместить: {0}'
    },
    tree: {
      searchEmpty: 'Совпадений не найдено!',
      dragTip: 'Переместить: {0}'
    },
    treeSelect: {
      clearChecked: 'Очистить',
      allChecked: 'Выбрать все',
      allExpand: 'Развернуть все',
      clearExpand: 'Свернуть все',
      total: 'Выбрано: {0}',
      filterCount: 'Найдено записей: {0}',
      close: 'Закрыть',
      search: 'Поиск',
      emptyText: 'Нет данных'
    },
    tableSelect: {
      filterCount: 'Найдено записей: {0}'
    },
    pager: {
      goto: 'Перейти',
      gotoTitle: 'Страница',
      pagesize: '{0}/стр.',
      total: 'Всего записей: {0}',
      pageClassifier: 'Стр.',
      homePage: 'Первая',
      homePageTitle: 'Первая страница',
      prevPage: 'Назад',
      prevPageTitle: 'Предыдущая страница',
      nextPage: 'Вперёд',
      nextPageTitle: 'Следующая страница',
      prevJump: 'Прыжок назад',
      prevJumpTitle: 'Прыжок назад',
      nextJump: 'Прыжок вперёд',
      nextJumpTitle: 'Прыжок вперёд',
      endPage: 'Последняя',
      endPageTitle: 'Последняя страница'
    },
    alert: {
      title: 'Системное сообщение'
    },
    button: {
      confirm: 'Подтвердить',
      cancel: 'Отмена',
      clear: 'Очистить'
    },
    filter: {
      search: 'Поиск'
    },
    custom: {
      cstmTitle: 'Персонализация',
      cstmRestore: 'Восстановить по умолчанию',
      cstmCancel: 'Отмена',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Восстановить конфигурацию столбцов по умолчанию?',
      cstmDragTarget: 'Переместить: {0}',
      setting: {
        colSort: 'Сортировка',
        sortHelpTip: 'Нажмите на значок, чтобы начать перетаскивание',
        colTitle: 'Заголовок столбца',
        colResizable: 'Ширина столбца (пикс.)',
        colVisible: 'Показать',
        colFixed: 'Закреплённый столбец',
        colFixedMax: 'Закреплённые столбцы ({0})',
        colAlign: 'Выравнивание',
        colHeadAlign: 'Выравнивание заголовка',
        colFootAlign: 'Выравнивание нижнего колонтитула',
        fixedLeft: 'Слева',
        fixedUnset: 'Нет',
        fixedRight: 'Справа',
        alignLeft: 'Слева',
        alignCenter: 'По центру',
        alignRight: 'Справа',
        moveUp: 'Вверх',
        moveDn: 'Вниз',
        putTop: 'В начало',
        putBottom: 'В конец',
        moveUpTitle: 'Нажмите, чтобы переместить вверх',
        moveDnTitle: 'Нажмите, чтобы переместить вниз',
        putTopTitle: 'Нажмите, чтобы переместить в начало',
        putBottomTitle: 'Нажмите, чтобы переместить в конец',
        anLeftTitle: 'Выровнять по левому краю',
        anCenterTitle: 'Выровнять по центру',
        anRightTitle: 'Выровнять по правому краю'
      }
    },
    import: {
      modes: {
        covering: 'Перезапись (напрямую перезаписать данные таблицы)',
        insert: 'Добавить в конец (добавить новые данные в конец таблицы)',
        insertTop: 'Добавить в начало (добавить новые данные в начало таблицы)',
        insertBottom: 'Добавить в конец (добавить новые данные в конец таблицы)'
      },
      impTitle: 'Импорт данных',
      impFile: 'Имя файла',
      impSelect: 'Выбрать файл',
      impType: 'Тип файла',
      impOpts: 'Настройки',
      impMode: 'Режим импорта',
      impConfirm: 'Импорт',
      impCancel: 'Отмена'
    },
    export: {
      types: {
        csv: 'CSV (разделитель — запятая)(*.csv)',
        html: 'Веб-страница(*.html)',
        xml: 'Данные XML(*.xml)',
        txt: 'Текстовый файл (разделитель — табуляция)(*.txt)',
        xls: 'Книга Excel 97-2003(*.xls)',
        xlsx: 'Книга Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Пустые данные',
        current: 'Текущие данные (данные текущей страницы)',
        selected: 'Выбранные данные (выбранные на текущей странице)',
        all: 'Все данные (включая данные всех страниц)'
      },
      printTitle: 'Печать данных',
      expTitle: 'Экспорт данных',
      expName: 'Имя файла',
      expNamePlaceholder: 'Введите имя файла',
      expSheetName: 'Заголовок',
      expSheetNamePlaceholder: 'Введите заголовок',
      expType: 'Тип сохранения',
      expMode: 'Выбор данных',
      expCurrentColumn: 'Все поля',
      expColumn: 'Выбрать поля',
      widthMode: 'Настройка ширины столбцов',
      wModeTitle: 'Настройка способа отрисовки ширины столбцов при печати',
      wdModes: {
        default: 'По умолчанию',
        auto: 'Автоматически (по содержимому)',
        scale: 'Масштабирование (по масштабу страницы)'
      },
      expOpts: 'Настройки',
      expOptHeader: 'Заголовок',
      expHeaderTitle: 'Нужен ли заголовок',
      expOptFooter: 'Нижний колонтитул',
      expFooterTitle: 'Нужен ли нижний колонтитул',
      expOptColgroup: 'Сгруппированный заголовок',
      expOptTitle: 'Заголовки столбцов',
      expTitleTitle: 'Использовать заголовки столбцов; иначе отображать имена полей',
      expColgroupTitle: 'Если есть, поддерживаются заголовки с групповой структурой',
      expOptMerge: 'Объединение',
      expMergeTitle: 'Если есть, поддерживаются ячейки с объединённой структурой',
      expOptAllExpand: 'Развернуть дерево',
      expAllExpandTitle: 'Если есть, поддерживается полное разворачивание иерархических данных',
      expOptTreeAllExpand: 'Развернуть дерево',
      expTreeAllExpandTitle: 'Если есть, автоматически разворачивать все уровни дерева',
      expOptRowGroupAllExpand: 'Развернуть группы',
      expRowGroupAllExpandTitle: 'Если есть, автоматически разворачивать все уровни групп',
      expOptUseStyle: 'Стили',
      expUseStyleTitle: 'Если есть, поддерживаются ячейки со стилями',
      expOptOriginal: 'Исходные данные',
      expOriginalTitle: 'Если исходные данные, поддерживается импорт в таблицу',
      expPrint: 'Печать',
      expConfirm: 'Экспорт',
      expCancel: 'Отмена'
    },
    modal: {
      errTitle: 'Ошибка',
      zoomMin: 'Свернуть',
      zoomIn: 'Развернуть',
      zoomOut: 'Восстановить',
      close: 'Закрыть',
      miniMaxSize: 'Количество свёрнутых окон не может превышать {0}',
      footPropErr: 'show-footer используется только для включения нижнего колонтитула; требуется совместно с show-confirm-button | show-cancel-button | слотами'
    },
    drawer: {
      close: 'Закрыть'
    },
    form: {
      folding: 'Свернуть',
      unfolding: 'Развернуть'
    },
    toolbar: {
      import: 'Импорт',
      export: 'Экспорт',
      print: 'Печать',
      refresh: 'Обновить',
      zoomIn: 'Полный экран',
      zoomOut: 'Восстановить',
      custom: 'Персонализация',
      customAll: 'Все',
      customConfirm: 'Подтвердить',
      customRestore: 'Сбросить',
      fixedLeft: 'Закрепить слева',
      fixedRight: 'Закрепить справа',
      cancelFixed: 'Отменить закрепление столбцов'
    },
    iconPicker: {
      search: 'Поиск',
      emptyText: 'Нет данных'
    },
    datePicker: {
      yearTitle: '{0} г.'
    },
    dateRangePicker: {
      pleaseRange: 'Выберите начальную и конечную дату'
    },
    input: {
      date: {
        m1: 'янв.',
        m2: 'февр.',
        m3: 'март',
        m4: 'апр.',
        m5: 'май',
        m6: 'июнь',
        m7: 'июль',
        m8: 'авг.',
        m9: 'сент.',
        m10: 'окт.',
        m11: 'нояб.',
        m12: 'дек.',
        quarterLabel: '{0} г.',
        monthLabel: '{0} г.',
        dayLabel: '{0} г. {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy, неделя WW',
          month: 'yyyy-MM',
          quarter: 'yyyy, q-й квартал',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Воскресенье',
          w1: 'Понедельник',
          w2: 'Вторник',
          w3: 'Среда',
          w4: 'Четверг',
          w5: 'Пятница',
          w6: 'Суббота'
        },
        months: {
          m0: 'Январь',
          m1: 'Февраль',
          m2: 'Март',
          m3: 'Апрель',
          m4: 'Май',
          m5: 'Июнь',
          m6: 'Июль',
          m7: 'Август',
          m8: 'Сентябрь',
          m9: 'Октябрь',
          m10: 'Ноябрь',
          m11: 'Декабрь'
        },
        quarters: {
          q1: '1-й квартал',
          q2: '2-й квартал',
          q3: '3-й квартал',
          q4: '4-й квартал'
        }
      }
    },
    calendar: {
      yearLabel: '{0} г.',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Очистить',
      allChecked: 'Выбрать все',
      total: 'Выбрано: {0}',
      close: 'Закрыть',
      search: 'Поиск'
    },
    numberInput: {
      currencySymbol: '₽'
    },
    imagePreview: {
      popupTitle: 'Предпросмотр',
      operBtn: {
        zoomOut: 'Уменьшить',
        zoomIn: 'Увеличить',
        pctFull: 'Вписать в страницу',
        pct11: 'Показать исходный размер',
        rotateLeft: 'Повернуть влево',
        rotateRight: 'Повернуть вправо',
        print: 'Нажмите, чтобы напечатать изображение',
        download: 'Нажмите, чтобы скачать изображение'
      }
    },
    upload: {
      fileBtnText: 'Нажмите или перетащите для загрузки',
      imgBtnText: 'Нажмите или перетащите для загрузки',
      dragPlaceholder: 'Перетащите файлы в эту область для загрузки',
      imgSizeHint: 'Одно изображение {0}',
      imgCountHint: 'Не более {0} изображений',
      fileTypeHint: 'Поддерживаются файлы {0}',
      fileSizeHint: 'Размер одного файла не более {0}',
      fileCountHint: 'Можно загрузить не более {0} файлов',
      uploadTypeErr: 'Несовпадение типа файла!',
      overCountErr: 'Можно выбрать не более {0} файлов!',
      overCountExtraErr: 'Превышено максимальное количество {0}; лишние {1} файлов будут проигнорированы!',
      overSizeErr: 'Размер файла не может превышать {0}!',
      manualUpload: 'Нажмите для загрузки',
      reUpload: 'Загрузить заново',
      uploadProgress: 'Загрузка {0}%',
      uploadErr: 'Ошибка загрузки',
      uploadSuccess: 'Загрузка выполнена',
      moreBtnText: 'Ещё ({0})',
      moreImgBtnText: 'Изображения ({0})',
      moreFileBtnText: 'Файлы ({0})',
      viewItemTitle: 'Нажмите для просмотра',
      morePopup: {
        readTitle: 'Просмотреть список',
        imageTitle: 'Загрузить изображения',
        fileTitle: 'Загрузить файлы'
      }
    },
    empty: {
      defText: 'Нет данных'
    },
    colorPicker: {
      clear: 'Очистить',
      confirm: 'Подтвердить',
      copySuccess: 'Скопировано в буфер обмена: {0}',
      hex: 'Шестнадцатеричный'
    },
    formDesign: {
      formName: 'Имя формы',
      defFormTitle: 'Форма без названия',
      widgetPropTab: 'Свойства виджета',
      widgetFormTab: 'Свойства формы',
      error: {
        wdFormUni: 'В форму можно добавить только один виджет этого типа',
        wdSubUni: 'В подтаблицу можно добавить только один виджет этого типа'
      },
      styleSetting: {
        btn: 'Настройки стиля',
        title: 'Настройки стиля формы',
        layoutTitle: 'Макет виджетов',
        verticalLayout: 'Вертикальный макет',
        horizontalLayout: 'Горизонтальный макет',
        styleTitle: 'Стиль заголовка',
        boldTitle: 'Жирный заголовок',
        fontBold: 'Жирный',
        fontNormal: 'Обычный',
        colonTitle: 'Показывать двоеточие',
        colonVisible: 'Показать',
        colonHidden: 'Скрыть',
        alignTitle: 'Выравнивание',
        widthTitle: 'Ширина заголовка',
        alignLeft: 'Слева',
        alignRight: 'Справа',
        unitPx: 'пикс.',
        unitPct: '%'
      },
      widget: {
        group: {
          base: 'Базовые виджеты',
          layout: 'Виджеты макета',
          system: 'Системные виджеты',
          module: 'Модульные виджеты',
          chart: 'Виджеты диаграмм',
          advanced: 'Расширенные виджеты'
        },
        copyTitle: 'Копия_{0}',
        component: {
          input: 'Поле ввода',
          textarea: 'Текстовое поле',
          select: 'Выпадающий список',
          row: 'Строка с несколькими столбцами',
          title: 'Заголовок',
          text: 'Текст',
          subtable: 'Подтаблица',
          VxeSwitch: 'Да/Нет',
          VxeInput: 'Поле ввода',
          VxeNumberInput: 'Число',
          VxeDatePicker: 'Дата',
          VxeTextarea: 'Текстовое поле',
          VxeSelect: 'Выпадающий список',
          VxeTreeSelect: 'Выбор из дерева',
          VxeRadioGroup: 'Радиокнопки',
          VxeCheckboxGroup: 'Флажки',
          VxeUploadFile: 'Файл',
          VxeUploadImage: 'Изображение',
          VxeRate: 'Рейтинг',
          VxeSlider: 'Ползунок'
        },
        row: {
          placeholder: 'Позиция виджета'
        }
      },
      widgetProp: {
        name: 'Имя виджета',
        placeholder: 'Подсказка',
        required: 'Обязательная проверка',
        multiple: 'Разрешить множественный выбор',
        displaySetting: {
          name: 'Настройки отображения',
          pc: 'Компьютер',
          mobile: 'Мобильное устройство',
          visible: 'Показать',
          hidden: 'Скрыть'
        },
        dataSource: {
          name: 'Источник данных',
          defValue: 'Вариант {0}',
          addOption: 'Добавить вариант',
          batchEditOption: 'Пакетное редактирование',
          batchEditTip: 'Каждая строка соответствует одному варианту; поддерживается копирование и вставка из таблиц, Excel и WPS.',
          batchEditSubTip: 'Каждая строка соответствует одному варианту; для групп подчинённые элементы могут начинаться с пробела или табуляции; поддерживается копирование и вставка из таблиц, Excel и WPS.',
          buildOption: 'Сгенерировать варианты'
        },
        rowProp: {
          colSize: 'Количество столбцов',
          col2: 'Два столбца',
          col3: 'Три столбца',
          col4: 'Четыре столбца',
          col6: 'Шесть столбцов',
          layout: 'Макет'
        },
        textProp: {
          name: 'Содержимое',
          alignTitle: 'Выравнивание',
          alignLeft: 'Слева',
          alignCenter: 'По центру',
          alignRight: 'Справа',
          colorTitle: 'Цвет шрифта',
          sizeTitle: 'Размер шрифта',
          boldTitle: 'Жирный шрифт',
          fontNormal: 'Обычный',
          fontBold: 'Жирный'
        },
        subtableProp: {
          seqTitle: '№',
          showSeq: 'Показывать номер',
          showCheckbox: 'Разрешить множественный выбор',
          errSubDrag: 'Подтаблица не поддерживает этот виджет; используйте другой виджет',
          colPlace: 'Перетащите виджет сюда'
        },
        uploadProp: {
          limitFileCount: 'Ограничение количества файлов',
          limitFileSize: 'Ограничение размера файла',
          multiFile: 'Разрешить загрузку нескольких файлов',
          limitImgCount: 'Ограничение количества изображений',
          limitImgSize: 'Ограничение размера изображения',
          multiImg: 'Разрешить загрузку нескольких изображений'
        },
        rules: {
          required: 'Обязательное поле'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Настройки полей',
      listSettingTab: 'Настройки параметров',
      searchTitle: 'Условия поиска',
      listTitle: 'Поля списка',
      searchField: 'Поле поиска',
      listField: 'Поле списка',
      activeBtn: {
        ActionButtonUpdate: 'Изменить',
        ActionButtonDelete: 'Удалить'
      },
      search: {
        addBtn: 'Изменить',
        emptyText: 'Условия поиска не настроены',
        editPopupTitle: 'Изменить поле поиска'
      },
      searchPopup: {
        colTitle: 'Заголовок',
        saveBtn: 'Сохранить'
      }
    },
    text: {
      copySuccess: 'Скопировано в буфер обмена',
      copyError: 'Текущая среда не поддерживает эту операцию'
    },
    countdown: {
      formats: {
        yyyy: 'год',
        MM: 'мес.',
        dd: 'д',
        HH: 'ч',
        mm: 'мин',
        ss: 'с'
      }
    },
    contextMenu: {
      loadingText: 'Загрузка...'
    },
    switch: {
      onText: 'Вкл.',
      offText: 'Выкл.'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy} г.',
        quarter: '{yyyy} г., {q}-й квартал',
        month: '{yyyy} г., {MM}',
        week: '{yyyy} г., неделя {W}',
        day: '{yyyy} г., {MM} {eLabel}',
        date: '{yyyy}-{MM}-{dd}',
        hour: '{yyyy}-{MM}-{dd} {HH}:00',
        minute: '{yyyy}-{MM}-{dd} {HH}:{mm}',
        second: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy} г.',
        quarter: '{q} кв.',
        month: '{M}',
        week: 'Н{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy} г.',
        quarter: '{start.q}~{end.q} кв.',
        month: '{start.M}~{end.M}',
        week: 'Н{start.W}~Н{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'Вс',
        w1: 'Пн',
        w2: 'Вт',
        w3: 'Ср',
        w4: 'Чт',
        w5: 'Пт',
        w6: 'Сб'
      },
      days: {
        w0: 'Вс',
        w1: 'Пн',
        w2: 'Вт',
        w3: 'Ср',
        w4: 'Чт',
        w5: 'Пт',
        w6: 'Сб'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Эту операцию нельзя выполнить с объединёнными ячейками',
          multiErr: 'Эту операцию нельзя выполнить с несколькими выделенными областями',
          selectErr: 'Невозможно выполнить операцию с ячейками указанной области',
          extendErr: 'Для выполнения этой операции все объединённые ячейки должны быть одинакового размера',
          pasteMultiErr: 'Невозможно вставить: область копирования и область вставки должны быть одинакового размера',
          cpInvalidErr: 'Операцию невозможно выполнить: в выбранной области есть запрещённые столбцы ({0})'
        },
        fnr: {
          title: 'Найти и заменить',
          titleFd: 'Найти',
          titleRe: 'Заменить',
          findLabel: 'Найти',
          replaceLabel: 'Заменить',
          findTitle: 'Найти:',
          replaceTitle: 'Заменить на:',
          tabs: {
            find: 'Найти',
            replace: 'Заменить'
          },
          filter: {
            re: 'Регулярное выражение',
            whole: 'Совпадение целого слова',
            sensitive: 'С учётом регистра'
          },
          btns: {
            findNext: 'Найти далее',
            findAll: 'Найти все',
            replace: 'Заменить',
            replaceAll: 'Заменить все',
            cancel: 'Отмена'
          },
          header: {
            seq: '#',
            cell: 'Ячейка',
            value: 'Значение'
          },
          body: {
            row: 'Строка: {0}',
            col: 'Столбец: {0}'
          },
          empty: '(пусто)',
          reError: 'Неверное регулярное выражение',
          recordCount: 'Найдено ячеек: {0}',
          notCell: 'Подходящие ячейки не найдены',
          replaceSuccess: 'Успешно заменено ячеек: {0}'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Группировка',
          values: 'Значения',
          groupPlaceholder: 'Перетащите сюда для группировки',
          valuesPlaceholder: 'Перетащите сюда для агрегирования',
          dragExistCol: 'Этот столбец уже существует',
          sortHelpTip: 'Нажмите на значок, чтобы начать перетаскивание'
        },
        aggFuncs: {
          sum: 'Сумма',
          count: 'Количество',
          avg: 'Среднее',
          min: 'Минимум',
          max: 'Максимум',
          first: 'Первое значение',
          last: 'Последнее значение'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Закреплённый столбец',
          fixedGroup: 'Закреплённая группа',
          cancelFixed: 'Отменить закрепление',
          fixedLeft: 'Закрепить слева',
          fixedRight: 'Закрепить справа'
        },
        cases: {
          equal: 'Равно',
          gt: 'Больше',
          lt: 'Меньше',
          begin: 'Начинается с',
          endin: 'Заканчивается на',
          include: 'Содержит',
          isSensitive: 'С учётом регистра'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Сортировка',
          clearSort: 'Очистить сортировку',
          sortAsc: 'По возрастанию',
          sortDesc: 'По убыванию',
          fixedColumn: 'Закреплённый столбец',
          fixedGroup: 'Закреплённая группа',
          cancelFixed: 'Отменить закрепление',
          fixedLeft: 'Закрепить слева',
          fixedRight: 'Закрепить справа',
          clearFilter: 'Очистить фильтр',
          textOption: 'Текстовый фильтр',
          numberOption: 'Числовой фильтр',
          dateOption: 'Фильтр по дате'
        },
        popup: {
          title: 'Способ пользовательского фильтра',
          currColumnTitle: 'Показывать строки:',
          and: 'И',
          or: 'Или',
          describeHtml: '? обозначает один символ<br/>* обозначает любое количество символов'
        },
        cases: {
          equal: 'Равно',
          unequal: 'Не равно',
          gt: 'Больше',
          ge: 'Больше или равно',
          lt: 'Меньше',
          le: 'Меньше или равно',
          begin: 'Начинается с',
          notbegin: 'Не начинается с',
          endin: 'Заканчивается на',
          notendin: 'Не заканчивается на',
          include: 'Содержит',
          exclude: 'Не содержит',
          between: 'Между',
          isAfter: 'После даты',
          eqAfter: 'В дату или после',
          isBefore: 'До даты',
          eqBefore: 'В дату или до',
          top10: 'Первые 10',
          aboveAverage: 'Выше среднего',
          belowAverage: 'Ниже среднего',
          before: 'До',
          after: 'После',
          tomorrow: 'Завтра',
          today: 'Сегодня',
          yesterday: 'Вчера',
          nextWeek: 'Следующая неделя',
          thisWeek: 'Текущая неделя',
          lastWeek: 'Прошлая неделя',
          nextMonth: 'Следующий месяц',
          thisMonth: 'Текущий месяц',
          lastMonth: 'Прошлый месяц',
          nextYear: 'Следующий год',
          thisYear: 'Текущий год',
          lastYear: 'Прошлый год',
          yearToDate: 'С начала года по текущую дату',
          custom: 'Пользовательский фильтр',
          insensitive: 'Без учёта регистра',
          isSensitive: 'С учётом регистра'
        },
        empty: '(пусто)',
        notData: 'Нет совпадений'
      }
    },
    pro: {
      area: {
        mergeErr: 'Эту операцию нельзя выполнить с объединёнными ячейками',
        multiErr: 'Эту операцию нельзя выполнить с несколькими выделенными областями',
        extendErr: 'Для выполнения этой операции все объединённые ячейки должны быть одинакового размера',
        pasteMultiErr: 'Невозможно вставить: область копирования и область вставки должны быть одинакового размера'
      },
      fnr: {
        title: 'Найти и заменить',
        titleFd: 'Найти',
        titleRe: 'Заменить',
        findLabel: 'Найти',
        replaceLabel: 'Заменить',
        findTitle: 'Найти:',
        replaceTitle: 'Заменить на:',
        tabs: {
          find: 'Найти',
          replace: 'Заменить'
        },
        filter: {
          re: 'Регулярное выражение',
          whole: 'Совпадение целого слова',
          sensitive: 'С учётом регистра'
        },
        btns: {
          findNext: 'Найти далее',
          findAll: 'Найти все',
          replace: 'Заменить',
          replaceAll: 'Заменить все',
          cancel: 'Отмена'
        },
        header: {
          seq: '#',
          cell: 'Ячейка',
          value: 'Значение'
        },
        empty: '(пусто)',
        reError: 'Неверное регулярное выражение',
        recordCount: 'Найдено ячеек: {0}',
        notCell: 'Подходящие ячейки не найдены',
        replaceSuccess: 'Успешно заменено ячеек: {0}'
      }
    },
    renderer: {
      search: 'Поиск',
      cases: {
        equal: 'Равно',
        unequal: 'Не равно',
        gt: 'Больше',
        ge: 'Больше или равно',
        lt: 'Меньше',
        le: 'Меньше или равно',
        begin: 'Начинается с',
        notbegin: 'Не начинается с',
        endin: 'Заканчивается на',
        notendin: 'Не заканчивается на',
        include: 'Содержит',
        exclude: 'Не содержит',
        between: 'Между',
        top10: 'Первые 10',
        aboveAverage: 'Выше среднего',
        belowAverage: 'Ниже среднего',
        custom: 'Пользовательский фильтр',
        insensitive: 'Без учёта регистра',
        isSensitive: 'С учётом регистра'
      },
      combination: {
        menus: {
          sort: 'Сортировка',
          clearSort: 'Очистить сортировку',
          sortAsc: 'По возрастанию',
          sortDesc: 'По убыванию',
          fixedColumn: 'Закреплённый столбец',
          fixedGroup: 'Закреплённая группа',
          cancelFixed: 'Отменить закрепление',
          fixedLeft: 'Закрепить слева',
          fixedRight: 'Закрепить справа',
          clearFilter: 'Очистить фильтр',
          textOption: 'Текстовый фильтр',
          numberOption: 'Числовой фильтр',
          dateOption: 'Фильтр по дате'
        },
        popup: {
          title: 'Способ пользовательского фильтра',
          currColumnTitle: 'Показывать строки:',
          and: 'И',
          or: 'Или',
          describeHtml: '? обозначает один символ<br/>* обозначает любое количество символов'
        },
        empty: '(пусто)',
        notData: 'Нет совпадений'
      }
    }
  }
}
